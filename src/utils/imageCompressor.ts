/**
 * Compresses an image file or DataURL to ensure it doesn't exceed localStorage quotas.
 * Resizes max dimension to 1200px and encodes to JPEG/WebP at 0.8 quality.
 */
export async function compressImageFile(file: File, maxDimension = 1200, quality = 0.8): Promise<string> {
  // If it's a GIF, we preserve it as is (canvas breaks animated GIFs) unless too huge
  if (file.type === 'image/gif') {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Convert to WebP or JPEG for massive reduction (typically 90% smaller)
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      img.onerror = () => resolve(e.target?.result as string);
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Safe localStorage wrapper with try-catch
 */
export const safeStorage = {
  get: <T>(key: string, fallback: T): T => {
    try {
      const item = localStorage.getItem(key);
      if (!item) return fallback;
      return JSON.parse(item) as T;
    } catch (err) {
      console.warn(`Error reading ${key} from localStorage:`, err);
      return fallback;
    }
  },
  set: (key: string, value: any): boolean => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      console.warn(`Quota exceeded or error writing ${key} to localStorage:`, err);
      return false;
    }
  },
  remove: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.warn(`Error removing ${key} from localStorage:`, err);
    }
  },
};

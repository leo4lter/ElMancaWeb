import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parser with 50mb limit for image payloads
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // File paths for persistent storage in workspace
  const workspaceDataDir = path.join(process.cwd(), 'src', 'data');
  const workspaceDataFile = path.join(workspaceDataDir, 'siteContent.json');
  const distDataDir = path.join(process.cwd(), 'dist', 'data');
  const distDataFile = path.join(distDataDir, 'siteContent.json');

  // Ensure directories exist
  try {
    if (!fs.existsSync(workspaceDataDir)) {
      fs.mkdirSync(workspaceDataDir, { recursive: true });
    }
  } catch (err) {
    console.warn('Could not create workspace data dir:', err);
  }

  // API Route: Health Check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // API Route: Get Global Site Content (Public to all visitors)
  app.get('/api/content', (req, res) => {
    try {
      if (fs.existsSync(workspaceDataFile)) {
        const raw = fs.readFileSync(workspaceDataFile, 'utf-8');
        return res.setHeader('Content-Type', 'application/json').send(raw);
      }
      if (fs.existsSync(distDataFile)) {
        const raw = fs.readFileSync(distDataFile, 'utf-8');
        return res.setHeader('Content-Type', 'application/json').send(raw);
      }
      return res.status(404).json({ error: 'No content found' });
    } catch (err) {
      console.error('Error reading site content:', err);
      return res.status(500).json({ error: 'Error reading site content' });
    }
  });

  // API Route: Save Global Site Content (Published by Admin)
  app.post('/api/content', (req, res) => {
    try {
      const payload = req.body;
      if (!payload || typeof payload !== 'object') {
        return res.status(400).json({ error: 'Invalid payload' });
      }

      const contentString = JSON.stringify(payload, null, 2);

      // Save to src/data/siteContent.json (Source of truth in workspace code)
      try {
        if (!fs.existsSync(workspaceDataDir)) {
          fs.mkdirSync(workspaceDataDir, { recursive: true });
        }
        fs.writeFileSync(workspaceDataFile, contentString, 'utf-8');
      } catch (e) {
        console.warn('Could not write to src/data/siteContent.json:', e);
      }

      // Also save to dist/data/siteContent.json if in production
      try {
        if (fs.existsSync(path.join(process.cwd(), 'dist'))) {
          if (!fs.existsSync(distDataDir)) {
            fs.mkdirSync(distDataDir, { recursive: true });
          }
          fs.writeFileSync(distDataFile, contentString, 'utf-8');
        }
      } catch (e) {
        console.warn('Could not write to dist/data/siteContent.json:', e);
      }

      const timestamp = new Date().toLocaleTimeString('es-AR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });

      return res.json({
        success: true,
        message: 'Contenido guardado permanentemente en el servidor y código fuente.',
        timestamp,
      });
    } catch (err) {
      console.error('Error saving site content:', err);
      return res.status(500).json({ error: 'Error saving site content' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

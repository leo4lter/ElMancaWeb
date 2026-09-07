import React, { createContext, useContext, useState, useEffect } from 'react';
import { MarqueeItem, BrandItem, WebProjectItem, ChannelVideoItem, FestivalNightItem } from '../types';
import { safeStorage } from '../utils/imageCompressor';
import initialSiteData from '../data/siteContent.json';

interface SiteContentState {
  // Routing / Admin mode
  isAdminRoute: boolean;
  navigateToAdmin: () => void;
  navigateToPublic: () => void;

  // Brand Icon / Logo
  customIconUrl: string | null;
  setCustomIconUrl: (url: string | null) => void;

  // Footer Logo
  customFooterLogoUrl: string | null;
  setCustomFooterLogoUrl: (url: string | null) => void;

  // Marquee under Home
  marqueeItems: MarqueeItem[];
  setMarqueeItems: React.Dispatch<React.SetStateAction<MarqueeItem[]>>;
  updateMarqueeItem: (id: string, updated: Partial<MarqueeItem>) => void;
  addMarqueeItem: (item: Omit<MarqueeItem, 'id'>) => void;
  deleteMarqueeItem: (id: string) => void;

  // Partner Brands Carousel
  brandLogos: BrandItem[];
  setBrandLogos: React.Dispatch<React.SetStateAction<BrandItem[]>>;
  addBrandLogo: (brand: Omit<BrandItem, 'id'>) => void;
  deleteBrandLogo: (id: string) => void;

  // Developed Web Projects Carousel
  webProjects: WebProjectItem[];
  setWebProjects: React.Dispatch<React.SetStateAction<WebProjectItem[]>>;
  addWebProject: (project: Omit<WebProjectItem, 'id'>) => void;
  updateWebProject: (id: string, updated: Partial<WebProjectItem>) => void;
  deleteWebProject: (id: string) => void;

  // Festival Nights (Playas Doradas 2026)
  festivalNights: FestivalNightItem[];
  setFestivalNights: React.Dispatch<React.SetStateAction<FestivalNightItem[]>>;
  updateFestivalNight: (index: number, updated: Partial<FestivalNightItem>) => void;

  // Channel Videos (@elmancasg)
  channelVideos: ChannelVideoItem[];
  setChannelVideos: React.Dispatch<React.SetStateAction<ChannelVideoItem[]>>;
  updateChannelVideo: (id: string, updated: Partial<ChannelVideoItem>) => void;

  // Apply changes mechanism
  hasPendingChanges: boolean;
  setHasPendingChanges: (val: boolean) => void;
  lastAppliedTime: string | null;
  applyAllChanges: () => Promise<{ success: boolean; message: string; timestamp: string }>;

  // Backup & Restore
  exportContentJson: () => string;
  importContentJson: (jsonString: string) => boolean;

  // Reset to default
  resetToDefaults: () => void;

  // Active admin tab
  adminActiveTab: 'icon' | 'marquee' | 'brands' | 'webs' | 'festival';
  setAdminActiveTab: (tab: 'icon' | 'marquee' | 'brands' | 'webs' | 'festival') => void;
}

const defaultFestivalNights: FestivalNightItem[] = [
  {
    night: 'Noche 1',
    title: 'Apertura & Escenario Principal',
    youtubeId: 'QMQ4kJgnf0M',
    url: 'https://www.youtube.com/live/QMQ4kJgnf0M?si=u7LGmLoHpSz_uQM1',
    thumbnail: 'https://i.ytimg.com/vi/QMQ4kJgnf0M/hqdefault.jpg',
    badge: 'Transmisión Oficial Noche 1',
  },
  {
    night: 'Noche 2',
    title: 'Artistas, Shows & Cobertura',
    youtubeId: '6sBlnahh6Y4',
    url: 'https://www.youtube.com/live/6sBlnahh6Y4?si=HVbcGwsiHIRzuAfj',
    thumbnail: 'https://i.ytimg.com/vi/6sBlnahh6Y4/hqdefault.jpg',
    badge: 'Transmisión Oficial Noche 2',
  },
  {
    night: 'Noche 3',
    title: 'Gran Cierre del Festival',
    youtubeId: 'dHIYvORgujw',
    url: 'https://www.youtube.com/live/dHIYvORgujw?si=J7qhGi9FixakN2CB',
    thumbnail: 'https://i.ytimg.com/vi/dHIYvORgujw/hqdefault.jpg',
    badge: 'Transmisión Oficial Noche 3',
  },
];

const defaultMarqueeItems: MarqueeItem[] = [
  {
    id: 'm1',
    title: 'Fiesta Nacional de Playas Doradas 2026',
    category: 'Streaming de Gran Escala',
    image: 'https://i.ytimg.com/vi/QMQ4kJgnf0M/hqdefault.jpg',
    tag: 'Noches en Vivo 1, 2 y 3',
  },
  {
    id: 'm2',
    title: 'Transmisión Multicámara en Directo',
    category: 'Producción & Broadcast',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
    tag: 'Calidad Broadcast HD',
  },
  {
    id: 'm3',
    title: 'Radio Municipal & Estudios',
    category: 'Audio & Streaming',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
    tag: 'Sonido & Enlace Digital',
  },
  {
    id: 'm4',
    title: 'El Canal: Deportes Locales @elmancasg',
    category: 'Impacto Comunitario',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80',
    tag: 'Visibilidad a Jóvenes Talentos',
  },
  {
    id: 'm5',
    title: 'Diseño Web Integral con Hosting',
    category: 'Agencia Digital 360',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    tag: 'Web + Dominio + Webmail',
  },
  {
    id: 'm6',
    title: 'Publicidad Audiovisual (4 videos/mes)',
    category: 'Contenido Comercial',
    image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=800&q=80',
    tag: 'Promoción $200.000',
  },
  {
    id: 'm7',
    title: 'Historias que Inspiran a Nuestra Comunidad',
    category: 'El Canal Comunitario',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    tag: 'Referentes para Niños & Jóvenes',
  },
  {
    id: 'm8',
    title: 'Planes de Sponsor & Banners en Pantalla',
    category: 'Patrocinio en Video',
    image: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=800&q=80',
    tag: 'Menciones & Presencia de Marca',
  },
];

const defaultBrandLogos: BrandItem[] = [
  {
    id: 'b1',
    name: 'Fiesta Nacional de Playas Doradas',
    logo: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=240&h=120&q=80',
    category: 'Evento Oficial',
  },
  {
    id: 'b2',
    name: 'Radio Municipal Sierra Grande',
    logo: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=240&h=120&q=80',
    category: 'Medio Aliado',
  },
  {
    id: 'b3',
    name: 'Municipalidad Sierra Grande',
    logo: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=240&h=120&q=80',
    category: 'Institucional',
  },
  {
    id: 'b4',
    name: 'Club Atlético Comunitario',
    logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=240&h=120&q=80',
    category: 'Deportes',
  },
  {
    id: 'b5',
    name: 'Comercio & Empresa Regional',
    logo: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=240&h=120&q=80',
    category: 'Comercio Local',
  },
  {
    id: 'b6',
    name: 'Parador & Turismo Playas',
    logo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=240&h=120&q=80',
    category: 'Turismo',
  },
  {
    id: 'b7',
    name: 'Distribuidora Costa Atlántica',
    logo: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=240&h=120&q=80',
    category: 'Sponsor Oficial',
  },
];

const defaultWebProjects: WebProjectItem[] = [
  {
    id: 'w1',
    title: 'Portal Playas Doradas Turismo & Hospedajes',
    client: 'Secretaría de Turismo & Paradores',
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    liveUrl: '#',
    tag: 'Web Responsive + Webmail',
    description: 'Guía interactiva de balnearios, reservas y eventos con dominio oficial y hosting de alta velocidad.',
  },
  {
    id: 'w2',
    title: 'Comercio Digital & Catálogo Sierra Grande',
    client: 'Red de Comercios Regionales',
    thumbnail: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80',
    liveUrl: '#',
    tag: 'E-commerce & WhatsApp',
    description: 'Catálogo autogestionable con integración a WhatsApp Business para pedidos y consultas directas.',
  },
  {
    id: 'w3',
    title: 'Radio Municipal Streaming & Noticias Web',
    client: 'Emisora Municipal FM',
    thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
    liveUrl: '#',
    tag: 'Streaming Audio Player + Noticias',
    description: 'Plataforma web con reproductor de radio en vivo las 24 hs, podcasts y noticias locales actualizadas.',
  },
  {
    id: 'w4',
    title: 'Portal de Eventos & Coberturas Comunitarias',
    client: 'Manca Productora',
    thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    liveUrl: '#',
    tag: 'Plataforma Multimedia',
    description: 'Transmisiones en vivo, galerías de fotos de alta resolución y archivo de transmisiones pasadas.',
  },
];

const defaultChannelVideos: ChannelVideoItem[] = [
  {
    id: 'v1',
    title: 'Fiesta Nacional de Playas Doradas 2026 - Noche 1 en Vivo',
    youtubeId: 'QMQ4kJgnf0M',
    thumbnail: 'https://i.ytimg.com/vi/QMQ4kJgnf0M/hqdefault.jpg',
    views: 'Transmisión Oficial',
    duration: 'En Vivo',
    date: 'Playas Doradas 2026',
  },
  {
    id: 'v2',
    title: 'Fiesta Nacional de Playas Doradas 2026 - Noche 2 en Vivo',
    youtubeId: '6sBlnahh6Y4',
    thumbnail: 'https://i.ytimg.com/vi/6sBlnahh6Y4/hqdefault.jpg',
    views: 'Transmisión Oficial',
    duration: 'En Vivo',
    date: 'Playas Doradas 2026',
  },
  {
    id: 'v3',
    title: 'Fiesta Nacional de Playas Doradas 2026 - Noche 3 en Vivo',
    youtubeId: 'dHIYvORgujw',
    thumbnail: 'https://i.ytimg.com/vi/dHIYvORgujw/hqdefault.jpg',
    views: 'Transmisión Oficial',
    duration: 'En Vivo',
    date: 'Playas Doradas 2026',
  },
  {
    id: 'v4',
    title: 'Historias de Nuestro Deporte: Jóvenes Referentes Locales',
    youtubeId: 'elmancasg-deportes',
    thumbnail: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80',
    views: 'Comunidad & Pasión',
    duration: '14:20',
    date: 'El Canal @elmancasg',
  },
];

const SiteContentContext = createContext<SiteContentState | undefined>(undefined);

function checkIsAdminUrl(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.location.pathname.startsWith('/admin') ||
    window.location.hash.startsWith('#admin') ||
    window.location.search.includes('admin=true')
  );
}

export const SiteContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Admin Route state
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(() => checkIsAdminUrl());
  const [adminActiveTab, setAdminActiveTab] = useState<
    'icon' | 'marquee' | 'brands' | 'webs' | 'festival'
  >('icon');

  // Watch for URL changes (popstate and hashchange)
  useEffect(() => {
    const handleUrlChange = () => {
      setIsAdminRoute(checkIsAdminUrl());
    };
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const navigateToAdmin = () => {
    window.location.hash = '#admin';
    setIsAdminRoute(true);
  };

  const navigateToPublic = () => {
    if (window.location.hash.startsWith('#admin')) {
      window.location.hash = '';
    }
    if (window.location.pathname.startsWith('/admin')) {
      window.history.pushState(null, '', '/');
    }
    setIsAdminRoute(false);
  };

  // State with safeStorage fallback to initialSiteData
  const [customIconUrl, setCustomIconUrlState] = useState<string | null>(() => {
    return safeStorage.get<string | null>(
      'manca_custom_icon',
      initialSiteData?.customIconUrl || null
    );
  });

  const [customFooterLogoUrl, setCustomFooterLogoUrlState] = useState<string | null>(() => {
    return safeStorage.get<string | null>(
      'manca_footer_logo',
      initialSiteData?.customFooterLogoUrl || null
    );
  });

  const [hasPendingChanges, setHasPendingChanges] = useState<boolean>(false);
  const [lastAppliedTime, setLastAppliedTime] = useState<string | null>(() => {
    return safeStorage.get<string | null>(
      'manca_last_applied_time',
      initialSiteData?.lastAppliedTime || null
    );
  });

  const [marqueeItems, setMarqueeItemsState] = useState<MarqueeItem[]>(() => {
    return safeStorage.get<MarqueeItem[]>(
      'manca_marquee_items',
      (initialSiteData?.marqueeItems as MarqueeItem[]) || defaultMarqueeItems
    );
  });

  const [brandLogos, setBrandLogosState] = useState<BrandItem[]>(() => {
    return safeStorage.get<BrandItem[]>(
      'manca_brand_logos',
      (initialSiteData?.brandLogos as BrandItem[]) || defaultBrandLogos
    );
  });

  const [webProjects, setWebProjectsState] = useState<WebProjectItem[]>(() => {
    return safeStorage.get<WebProjectItem[]>(
      'manca_web_projects',
      (initialSiteData?.webProjects as WebProjectItem[]) || defaultWebProjects
    );
  });

  const [festivalNights, setFestivalNightsState] = useState<FestivalNightItem[]>(() => {
    return safeStorage.get<FestivalNightItem[]>(
      'manca_festival_nights',
      (initialSiteData?.festivalNights as FestivalNightItem[]) || defaultFestivalNights
    );
  });

  const [channelVideos, setChannelVideosState] = useState<ChannelVideoItem[]>(() => {
    return safeStorage.get<ChannelVideoItem[]>(
      'manca_channel_videos',
      (initialSiteData?.channelVideos as ChannelVideoItem[]) || defaultChannelVideos
    );
  });

  // Global Sync: Fetch live published content from server API on boot (for all visitors)
  useEffect(() => {
    let isMounted = true;
    fetch('/api/content')
      .then((res) => {
        if (!res.ok) throw new Error('API content not available');
        return res.json();
      })
      .then((data) => {
        if (!isMounted || !data || typeof data !== 'object') return;

        if (data.customIconUrl !== undefined) {
          setCustomIconUrlState(data.customIconUrl);
          if (data.customIconUrl) {
            safeStorage.set('manca_custom_icon', data.customIconUrl);
            const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
            if (link) link.href = data.customIconUrl;
          }
        }
        if (data.customFooterLogoUrl !== undefined) {
          setCustomFooterLogoUrlState(data.customFooterLogoUrl);
          if (data.customFooterLogoUrl) {
            safeStorage.set('manca_footer_logo', data.customFooterLogoUrl);
          }
        }
        if (Array.isArray(data.marqueeItems) && data.marqueeItems.length > 0) {
          setMarqueeItemsState(data.marqueeItems);
          safeStorage.set('manca_marquee_items', data.marqueeItems);
        }
        if (Array.isArray(data.brandLogos) && data.brandLogos.length > 0) {
          setBrandLogosState(data.brandLogos);
          safeStorage.set('manca_brand_logos', data.brandLogos);
        }
        if (Array.isArray(data.webProjects) && data.webProjects.length > 0) {
          setWebProjectsState(data.webProjects);
          safeStorage.set('manca_web_projects', data.webProjects);
        }
        if (Array.isArray(data.festivalNights) && data.festivalNights.length > 0) {
          setFestivalNightsState(data.festivalNights);
          safeStorage.set('manca_festival_nights', data.festivalNights);
        }
        if (Array.isArray(data.channelVideos) && data.channelVideos.length > 0) {
          setChannelVideosState(data.channelVideos);
          safeStorage.set('manca_channel_videos', data.channelVideos);
        }
        if (data.lastAppliedTime) {
          setLastAppliedTime(data.lastAppliedTime);
          safeStorage.set('manca_last_applied_time', data.lastAppliedTime);
        }
      })
      .catch(() => {
        // Fallback silently to local cache or bundled data
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const setCustomFooterLogoUrl = (url: string | null) => {
    setCustomFooterLogoUrlState(url);
    setHasPendingChanges(true);
    if (url) {
      safeStorage.set('manca_footer_logo', url);
    } else {
      safeStorage.remove('manca_footer_logo');
    }
  };

  // Sync favicon if icon changed
  const setCustomIconUrl = (url: string | null) => {
    setCustomIconUrlState(url);
    setHasPendingChanges(true);
    if (url) {
      safeStorage.set('manca_custom_icon', url);
      const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (link) link.href = url;
    } else {
      safeStorage.remove('manca_custom_icon');
    }
  };

  const setMarqueeItems: React.Dispatch<React.SetStateAction<MarqueeItem[]>> = (val) => {
    setHasPendingChanges(true);
    setMarqueeItemsState((prev) => {
      const next = typeof val === 'function' ? val(prev) : val;
      safeStorage.set('manca_marquee_items', next);
      return next;
    });
  };

  const updateMarqueeItem = (id: string, updated: Partial<MarqueeItem>) => {
    setHasPendingChanges(true);
    setMarqueeItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  const addMarqueeItem = (item: Omit<MarqueeItem, 'id'>) => {
    setHasPendingChanges(true);
    const newItem: MarqueeItem = { ...item, id: `m_${Date.now()}` };
    setMarqueeItems((prev) => [newItem, ...prev]);
  };

  const deleteMarqueeItem = (id: string) => {
    setHasPendingChanges(true);
    setMarqueeItems((prev) => prev.filter((item) => item.id !== id));
  };

  const setBrandLogos: React.Dispatch<React.SetStateAction<BrandItem[]>> = (val) => {
    setHasPendingChanges(true);
    setBrandLogosState((prev) => {
      const next = typeof val === 'function' ? val(prev) : val;
      safeStorage.set('manca_brand_logos', next);
      return next;
    });
  };

  const addBrandLogo = (brand: Omit<BrandItem, 'id'>) => {
    setHasPendingChanges(true);
    const newBrand: BrandItem = { ...brand, id: `b_${Date.now()}` };
    setBrandLogos((prev) => [...prev, newBrand]);
  };

  const deleteBrandLogo = (id: string) => {
    setHasPendingChanges(true);
    setBrandLogos((prev) => prev.filter((b) => b.id !== id));
  };

  const setWebProjects: React.Dispatch<React.SetStateAction<WebProjectItem[]>> = (val) => {
    setHasPendingChanges(true);
    setWebProjectsState((prev) => {
      const next = typeof val === 'function' ? val(prev) : val;
      safeStorage.set('manca_web_projects', next);
      return next;
    });
  };

  const addWebProject = (project: Omit<WebProjectItem, 'id'>) => {
    setHasPendingChanges(true);
    const newProj: WebProjectItem = { ...project, id: `w_${Date.now()}` };
    setWebProjects((prev) => [newProj, ...prev]);
  };

  const updateWebProject = (id: string, updated: Partial<WebProjectItem>) => {
    setHasPendingChanges(true);
    setWebProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  const deleteWebProject = (id: string) => {
    setHasPendingChanges(true);
    setWebProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const setFestivalNights: React.Dispatch<React.SetStateAction<FestivalNightItem[]>> = (val) => {
    setHasPendingChanges(true);
    setFestivalNightsState((prev) => {
      const next = typeof val === 'function' ? val(prev) : val;
      safeStorage.set('manca_festival_nights', next);
      return next;
    });
  };

  const updateFestivalNight = (index: number, updated: Partial<FestivalNightItem>) => {
    setHasPendingChanges(true);
    setFestivalNights((prev) =>
      prev.map((item, i) => (i === index ? { ...item, ...updated } : item))
    );
  };

  const setChannelVideos: React.Dispatch<React.SetStateAction<ChannelVideoItem[]>> = (val) => {
    setHasPendingChanges(true);
    setChannelVideosState((prev) => {
      const next = typeof val === 'function' ? val(prev) : val;
      safeStorage.set('manca_channel_videos', next);
      return next;
    });
  };

  const updateChannelVideo = (id: string, updated: Partial<ChannelVideoItem>) => {
    setHasPendingChanges(true);
    setChannelVideos((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  // Export content as JSON string
  const exportContentJson = () => {
    const data = {
      customIconUrl,
      customFooterLogoUrl,
      lastAppliedTime,
      marqueeItems,
      brandLogos,
      webProjects,
      festivalNights,
      channelVideos,
    };
    return JSON.stringify(data, null, 2);
  };

  // Import content from JSON string
  const importContentJson = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (!data || typeof data !== 'object') return false;

      if (data.customIconUrl !== undefined) {
        setCustomIconUrl(data.customIconUrl);
      }
      if (data.customFooterLogoUrl !== undefined) {
        setCustomFooterLogoUrl(data.customFooterLogoUrl);
      }
      if (Array.isArray(data.marqueeItems)) {
        setMarqueeItems(data.marqueeItems);
      }
      if (Array.isArray(data.brandLogos)) {
        setBrandLogos(data.brandLogos);
      }
      if (Array.isArray(data.webProjects)) {
        setWebProjects(data.webProjects);
      }
      if (Array.isArray(data.festivalNights)) {
        setFestivalNights(data.festivalNights);
      }
      if (Array.isArray(data.channelVideos)) {
        setChannelVideos(data.channelVideos);
      }

      setHasPendingChanges(true);
      return true;
    } catch (e) {
      console.error('Invalid JSON import:', e);
      return false;
    }
  };

  // Master APPLY CHANGES function - Persists to browser, server API & workspace code
  const applyAllChanges = async () => {
    const now = new Date().toLocaleTimeString('es-AR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    // 1. Immediate client-side update
    if (customIconUrl) {
      safeStorage.set('manca_custom_icon', customIconUrl);
      const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (link) link.href = customIconUrl;
    } else {
      safeStorage.remove('manca_custom_icon');
    }

    if (customFooterLogoUrl) {
      safeStorage.set('manca_footer_logo', customFooterLogoUrl);
    } else {
      safeStorage.remove('manca_footer_logo');
    }

    safeStorage.set('manca_marquee_items', marqueeItems);
    safeStorage.set('manca_brand_logos', brandLogos);
    safeStorage.set('manca_web_projects', webProjects);
    safeStorage.set('manca_festival_nights', festivalNights);
    safeStorage.set('manca_channel_videos', channelVideos);
    safeStorage.set('manca_last_applied_time', now);
    setLastAppliedTime(now);
    setHasPendingChanges(false);

    // 2. Server-side persistence to src/data/siteContent.json (persists across redeploys & visitors)
    const payload = {
      customIconUrl,
      customFooterLogoUrl,
      lastAppliedTime: now,
      marqueeItems,
      brandLogos,
      webProjects,
      festivalNights,
      channelVideos,
    };

    let serverSaved = false;
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        serverSaved = true;
      }
    } catch (err) {
      console.warn('Could not reach /api/content:', err);
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('manca_content_applied', { detail: { timestamp: now, serverSaved } })
      );
    }

    return {
      success: true,
      message: serverSaved
        ? '¡Cambios aplicados y guardados en el servidor! Todos los visitantes verán esta versión permanentemente.'
        : '¡Cambios aplicados en el navegador local!',
      timestamp: now,
    };
  };

  const resetToDefaults = () => {
    safeStorage.remove('manca_custom_icon');
    safeStorage.remove('manca_footer_logo');
    safeStorage.remove('manca_marquee_items');
    safeStorage.remove('manca_brand_logos');
    safeStorage.remove('manca_web_projects');
    safeStorage.remove('manca_festival_nights');
    safeStorage.remove('manca_channel_videos');
    safeStorage.remove('manca_last_applied_time');
    setCustomIconUrlState(null);
    setCustomFooterLogoUrlState(null);
    setMarqueeItemsState(defaultMarqueeItems);
    setBrandLogosState(defaultBrandLogos);
    setWebProjectsState(defaultWebProjects);
    setFestivalNightsState(defaultFestivalNights);
    setChannelVideosState(defaultChannelVideos);
    setLastAppliedTime(null);
    setHasPendingChanges(false);

    // Also reset server content
    try {
      fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customIconUrl: null,
          customFooterLogoUrl: null,
          lastAppliedTime: null,
          marqueeItems: defaultMarqueeItems,
          brandLogos: defaultBrandLogos,
          webProjects: defaultWebProjects,
          festivalNights: defaultFestivalNights,
          channelVideos: defaultChannelVideos,
        }),
      }).catch(() => {});
    } catch (e) {}
  };

  return (
    <SiteContentContext.Provider
      value={{
        isAdminRoute,
        navigateToAdmin,
        navigateToPublic,
        customIconUrl,
        setCustomIconUrl,
        customFooterLogoUrl,
        setCustomFooterLogoUrl,
        marqueeItems,
        setMarqueeItems,
        updateMarqueeItem,
        addMarqueeItem,
        deleteMarqueeItem,
        brandLogos,
        setBrandLogos,
        addBrandLogo,
        deleteBrandLogo,
        webProjects,
        setWebProjects,
        addWebProject,
        updateWebProject,
        deleteWebProject,
        festivalNights,
        setFestivalNights,
        updateFestivalNight,
        channelVideos,
        setChannelVideos,
        updateChannelVideo,
        hasPendingChanges,
        setHasPendingChanges,
        lastAppliedTime,
        applyAllChanges,
        exportContentJson,
        importContentJson,
        resetToDefaults,
        adminActiveTab,
        setAdminActiveTab,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = () => {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error('useSiteContent must be used within a SiteContentProvider');
  }
  return context;
};

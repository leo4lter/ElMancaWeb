import React, { useState } from 'react';
import { useSiteContent } from '../context/SiteContentContext';
import { FadeIn } from './FadeIn';
import { ContactButton } from './ContactButton';
import { MancaCircularIcon } from './MancaBrand';
import {
  Play,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Youtube,
  Radio,
  Globe,
  Sparkles,
  X,
  Tv,
} from 'lucide-react';

export const ProjectsSection: React.FC<{ onOpenContact?: () => void }> = ({
  onOpenContact,
}) => {
  const { webProjects, channelVideos, customIconUrl, customFooterLogoUrl, festivalNights } = useSiteContent();

  // Active video modal state for playing directly
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  // Web carousel active index
  const [webIndex, setWebIndex] = useState(0);

  // Expandable/collapsible project cards (toggles support both click and mouse hover)
  const [openProject, setOpenProject] = useState<string | null>('01');

  const toggleProject = (id: string) => {
    setOpenProject((prev) => (prev === id ? null : id));
  };

  const nextWeb = () => {
    setWebIndex((prev) => (prev + 1) % webProjects.length);
  };
  const prevWeb = () => {
    setWebIndex((prev) => (prev - 1 + webProjects.length) % webProjects.length);
  };

  const playasDoradasNights = festivalNights;

  return (
    <section
      id="projects"
      className="relative z-10 w-full bg-[#060A14] pt-24 sm:pt-32 pb-24 px-4 sm:px-8 md:px-12 overflow-hidden select-none border-t border-[#2A52BE]/20"
    >
      {/* Glow aura */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#2A52BE]/10 blur-[140px] pointer-events-none rounded-full" />

      {/* Heading */}
      <div className="max-w-6xl mx-auto mb-16 sm:mb-24 text-center">
        <FadeIn delay={0} y={20}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111D42]/80 border border-[#2A52BE]/40 text-xs tracking-widest uppercase text-[#93C5FD] mb-4">
            <Radio className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span>COBERTURAS, EL CANAL & TRANSFORMACIÓN DIGITAL</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.05} y={35} className="w-full">
          <h2
            id="projects-heading"
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(2.8rem, 10vw, 130px)' }}
          >
            PROYECTOS
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#CBD5E1] font-light max-w-2xl mx-auto mt-2">
            Transmisiones en vivo masivas, producciones de El Canal y plataformas digitales para el desarrollo de nuestra gente.
          </p>
        </FadeIn>
      </div>

      {/* Interactive Accordion / Toggle Projects Container */}
      <div className="max-w-6xl mx-auto flex flex-col gap-6 sm:gap-8 pb-16">
        {/* ========================================================
            CARD 01: FIESTA NACIONAL DE PLAYAS DORADAS 2026
           ======================================================== */}
        <div
          className={`w-full rounded-[28px] sm:rounded-[38px] md:rounded-[48px] border-2 transition-all duration-300 ${
            openProject === '01'
              ? 'border-[#3870E0] bg-[#0A1224] shadow-[0_20px_50px_rgba(42,82,190,0.35)]'
              : 'border-[#2A52BE]/30 bg-[#070D1B] hover:border-[#2A52BE]/70'
          } p-5 sm:p-7 md:p-9`}
        >
          {/* Header & Toggle Button (Click & Hover) */}
          <div
            onClick={() => toggleProject('01')}
            onMouseEnter={() => setOpenProject('01')}
            className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 cursor-pointer group"
          >
            <div className="flex items-center gap-4 sm:gap-6">
              <span
                className={`font-black leading-none select-none transition-colors duration-300 ${
                  openProject === '01' ? 'text-[#3870E0]' : 'text-[#2A52BE]/60 group-hover:text-[#3870E0]'
                }`}
                style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)' }}
              >
                01
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-widest text-[#93C5FD] font-semibold">
                    Producción & Streaming Profesional
                  </span>
                  <span className="text-[#93C5FD]/40">•</span>
                  <span className="text-xs text-[#CBD5E1]/70">Cobertura Oficial Multicámara</span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wide text-white mt-0.5 group-hover:text-[#93C5FD] transition-colors">
                  Fiesta Nacional de Playas Doradas 2026
                </h3>
              </div>
            </div>

            {/* Badges & Interactive Toggle Pill */}
            <div className="flex items-center gap-3 self-end lg:self-auto">
              <span className="hidden sm:inline-flex px-3 py-1.5 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-semibold uppercase tracking-wider items-center gap-1.5">
                <Youtube className="w-4 h-4 text-red-500" />
                <span>3 Noches en Directo</span>
              </span>

              <button
                type="button"
                className={`px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                  openProject === '01'
                    ? 'bg-[#2A52BE] text-white border-[#3870E0] shadow-md'
                    : 'bg-[#101D3D] text-[#93C5FD] border-[#2A52BE]/40 group-hover:bg-[#2A52BE] group-hover:text-white'
                }`}
              >
                <span>{openProject === '01' ? 'Plegar' : 'Desplegar'}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    openProject === '01' ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Collapsible Content */}
          {openProject === '01' && (
            <div className="pt-6 mt-6 border-t border-[#2A52BE]/30 animate-fadeIn">
              <p className="text-xs sm:text-sm text-[#CBD5E1] font-light max-w-3xl leading-relaxed mb-6">
                Transmisión de gran escala en directo para miles de espectadores. Mirá las 3 transmisiones completas con audio de consola y cámaras en escenario.
              </p>

              {/* THE 3 EXACT DIRECT THUMBNAILS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                {playasDoradasNights.map((nightItem) => (
                  <div
                    key={nightItem.night}
                    className="group relative rounded-2xl overflow-hidden bg-[#040812] border-2 border-[#2A52BE]/30 hover:border-[#3870E0] shadow-lg transition-all duration-300 flex flex-col"
                  >
                    {/* Thumbnail with overlay */}
                    <div className="relative aspect-video w-full overflow-hidden bg-black">
                      <img
                        src={nightItem.thumbnail}
                        alt={nightItem.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => setActiveVideoId(nightItem.youtubeId)}
                          className="w-12 h-12 rounded-full bg-[#2A52BE] text-white flex items-center justify-center shadow-[0_0_20px_rgba(42,82,190,0.9)] transform group-hover:scale-110 transition-transform cursor-pointer"
                          title="Ver en pantalla completa"
                        >
                          <Play className="w-5 h-5 fill-white ml-0.5" />
                        </button>
                      </div>

                      {/* Night Pill */}
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/80 border border-white/20 backdrop-blur-md">
                        <span className="text-[11px] font-bold tracking-wider text-white uppercase">
                          {nightItem.night}
                        </span>
                      </div>

                      {/* Live indicator */}
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-red-600/90 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        <span className="text-[9px] font-bold text-white uppercase tracking-wider">
                          EN VIVO
                        </span>
                      </div>
                    </div>

                    {/* Info Footer */}
                    <div className="p-4 flex-1 flex flex-col justify-between bg-[#081126]">
                      <div>
                        <span className="text-[10px] text-[#60A5FA] uppercase tracking-wider font-semibold block">
                          Fiesta Nacional 2026
                        </span>
                        <h4 className="text-sm font-bold text-white uppercase tracking-tight mt-0.5">
                          {nightItem.title}
                        </h4>
                      </div>

                      <a
                        href={nightItem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-[#14234C] hover:bg-[#2A52BE] text-xs font-semibold uppercase tracking-wider text-white transition-colors"
                      >
                        <Youtube className="w-4 h-4 text-red-500" />
                        <span>Ver en YouTube</span>
                        <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ========================================================
            CARD 02: EL CANAL (@elmancasg) WITH RECENT VIDEOS
           ======================================================== */}
        <div
          className={`w-full rounded-[28px] sm:rounded-[38px] md:rounded-[48px] border-2 transition-all duration-300 ${
            openProject === '02'
              ? 'border-[#3870E0] bg-[#0A1224] shadow-[0_20px_50px_rgba(42,82,190,0.35)]'
              : 'border-[#2A52BE]/30 bg-[#070D1B] hover:border-[#2A52BE]/70'
          } p-5 sm:p-7 md:p-9`}
        >
          {/* Header & Toggle Button (Click & Hover) */}
          <div
            onClick={() => toggleProject('02')}
            onMouseEnter={() => setOpenProject('02')}
            className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 cursor-pointer group"
          >
            <div className="flex items-center gap-4 sm:gap-6">
              <span
                className={`font-black leading-none select-none transition-colors duration-300 ${
                  openProject === '02' ? 'text-[#3870E0]' : 'text-[#2A52BE]/60 group-hover:text-[#3870E0]'
                }`}
                style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)' }}
              >
                02
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-widest text-[#93C5FD] font-semibold">
                    Impacto Comunitario
                  </span>
                  <span className="text-[#93C5FD]/40">•</span>
                  <span className="text-xs text-[#CBD5E1]/70">Contenido Propio & Deportes</span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wide text-white mt-0.5 group-hover:text-[#93C5FD] transition-colors">
                  El Canal: @elmancasg
                </h3>
              </div>
            </div>

            {/* Badges & Interactive Toggle Pill */}
            <div className="flex items-center gap-3 self-end lg:self-auto">
              <a
                href="https://www.youtube.com/@elmancasg"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-semibold uppercase tracking-wider hover:bg-red-600 hover:text-white transition-colors"
              >
                <Youtube className="w-4 h-4 text-red-500" />
                <span>@elmancasg</span>
              </a>

              <button
                type="button"
                className={`px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                  openProject === '02'
                    ? 'bg-[#2A52BE] text-white border-[#3870E0] shadow-md'
                    : 'bg-[#101D3D] text-[#93C5FD] border-[#2A52BE]/40 group-hover:bg-[#2A52BE] group-hover:text-white'
                }`}
              >
                <span>{openProject === '02' ? 'Plegar' : 'Desplegar'}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    openProject === '02' ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Collapsible Content */}
          {openProject === '02' && (
            <div className="pt-6 mt-6 border-t border-[#2A52BE]/30 animate-fadeIn">
              <p className="text-xs sm:text-sm text-[#CBD5E1] font-light max-w-3xl leading-relaxed mb-6">
                Creamos contenido propio que le da voz a deportes, eventos y personas que normalmente no tienen visibilidad. Un compromiso social que inspira a los niños de la zona como verdaderos referentes.
              </p>

              {/* Grid of channel videos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                {channelVideos.map((vid) => (
                  <div
                    key={vid.id}
                    className="group/item rounded-2xl overflow-hidden bg-[#070E20] border border-[#2A52BE]/30 hover:border-[#3870E0] transition-all flex flex-col"
                  >
                    <div className="relative aspect-video w-full overflow-hidden bg-black">
                      <img
                        src={vid.thumbnail}
                        alt={vid.title}
                        className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => setActiveVideoId(vid.youtubeId)}
                          className="w-10 h-10 rounded-full bg-[#2A52BE] text-white flex items-center justify-center shadow-lg transform group-hover/item:scale-110 transition-transform cursor-pointer"
                        >
                          <Play className="w-4 h-4 fill-white ml-0.5" />
                        </button>
                      </div>

                      {vid.duration && (
                        <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white">
                          {vid.duration}
                        </span>
                      )}
                    </div>

                    <div className="p-3 flex-1 flex flex-col justify-between bg-[#081228]">
                      <div>
                        <span className="text-[10px] text-[#60A5FA] font-semibold uppercase tracking-wider">
                          {vid.date || 'El Canal'}
                        </span>
                        <h4 className="text-xs font-bold text-white uppercase tracking-tight line-clamp-2 mt-0.5">
                          {vid.title}
                        </h4>
                      </div>

                      <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-[#94A3B8]">
                        <span>{vid.views || 'Comunidad'}</span>
                        <a
                          href={`https://www.youtube.com/watch?v=${vid.youtubeId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#60A5FA] hover:underline flex items-center gap-1"
                        >
                          <span>Ver</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ========================================================
            CARD 03: TRANSFORMACIÓN DIGITAL & SITIOS WEB
           ======================================================== */}
        <div
          className={`w-full rounded-[28px] sm:rounded-[38px] md:rounded-[48px] border-2 transition-all duration-300 ${
            openProject === '03'
              ? 'border-[#3870E0] bg-[#0A1224] shadow-[0_20px_50px_rgba(42,82,190,0.35)]'
              : 'border-[#2A52BE]/30 bg-[#070D1B] hover:border-[#2A52BE]/70'
          } p-5 sm:p-7 md:p-9`}
        >
          {/* Header & Toggle Button (Click & Hover) */}
          <div
            onClick={() => toggleProject('03')}
            onMouseEnter={() => setOpenProject('03')}
            className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 cursor-pointer group"
          >
            <div className="flex items-center gap-4 sm:gap-6">
              <span
                className={`font-black leading-none select-none transition-colors duration-300 ${
                  openProject === '03' ? 'text-[#3870E0]' : 'text-[#2A52BE]/60 group-hover:text-[#3870E0]'
                }`}
                style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)' }}
              >
                03
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-widest text-[#93C5FD] font-semibold">
                    Agencia Digital 360
                  </span>
                  <span className="text-[#93C5FD]/40">•</span>
                  <span className="text-xs text-[#CBD5E1]/70">Hosting, Dominio & Webmail</span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wide text-white mt-0.5 group-hover:text-[#93C5FD] transition-colors">
                  Transformación Digital & Sitios Web
                </h3>
              </div>
            </div>

            {/* Badges & Interactive Toggle Pill */}
            <div className="flex items-center gap-3 self-end lg:self-auto">
              <span className="hidden sm:inline-flex px-3 py-1.5 rounded-full bg-[#162A60] border border-[#2A52BE]/50 text-[#93C5FD] text-xs font-semibold uppercase tracking-wider items-center gap-1.5">
                <Globe className="w-4 h-4 text-[#3B82F6]" />
                <span>Webs Llave en Mano</span>
              </span>

              <button
                type="button"
                className={`px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                  openProject === '03'
                    ? 'bg-[#2A52BE] text-white border-[#3870E0] shadow-md'
                    : 'bg-[#101D3D] text-[#93C5FD] border-[#2A52BE]/40 group-hover:bg-[#2A52BE] group-hover:text-white'
                }`}
              >
                <span>{openProject === '03' ? 'Plegar' : 'Desplegar'}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    openProject === '03' ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Collapsible Content */}
          {openProject === '03' && (
            <div className="pt-6 mt-6 border-t border-[#2A52BE]/30 animate-fadeIn">
              <p className="text-xs sm:text-sm text-[#CBD5E1] font-light max-w-3xl leading-relaxed mb-6">
                Diseños web llave en mano para comerciantes y empresas. Cada proyecto incluye hosting de alta velocidad, dominio propio y webmail corporativo con 1 año de mantenimiento preventivo.
              </p>

              {/* INTERACTIVE CAROUSEL OF DEVELOPED WEBS */}
              {webProjects.length > 0 && (
                <div className="relative rounded-3xl overflow-hidden bg-[#060B18] border border-[#2A52BE]/40 p-4 sm:p-6 mb-4">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    {/* Web Preview (Thumbnail PNG or GIF) */}
                    <div className="lg:col-span-8 relative aspect-[16/9] sm:aspect-[16/10] rounded-2xl overflow-hidden bg-[#02050D] border border-[#2A52BE]/50 shadow-2xl group/web">
                      <img
                        src={webProjects[webIndex].thumbnail}
                        alt={webProjects[webIndex].title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/web:scale-105"
                        loading="lazy"
                      />

                      {/* Pill with client and format */}
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-black/80 border border-white/20 text-xs font-semibold text-white tracking-wider uppercase backdrop-blur-md">
                          {webProjects[webIndex].client}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#2A52BE]/90 text-[10px] font-bold text-white uppercase tracking-wider">
                          {webProjects[webIndex].tag}
                        </span>
                      </div>

                      {/* Bottom live button */}
                      {webProjects[webIndex].liveUrl && (
                        <div className="absolute bottom-3 right-3">
                          <a
                            href={webProjects[webIndex].liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-black/80 hover:bg-[#2A52BE] border border-white/20 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-md transition-all shadow-lg hover:scale-105"
                          >
                            <span>Visitar Sitio</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Web Information & Carousel Navigation */}
                    <div className="lg:col-span-4 flex flex-col justify-between h-full py-2">
                      <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#122045] border border-[#2A52BE]/40 text-xs font-semibold uppercase tracking-wider text-[#93C5FD] mb-3">
                          <Sparkles className="w-3 h-3 text-[#3B82F6]" />
                          <span>Desarrollo #{webIndex + 1} de {webProjects.length}</span>
                        </div>

                        <h4 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white mb-2">
                          {webProjects[webIndex].title}
                        </h4>

                        <p className="text-xs sm:text-sm text-[#93C5FD] font-semibold uppercase tracking-wider mb-2">
                          Cliente: {webProjects[webIndex].client}
                        </p>

                        <p className="text-xs sm:text-sm text-[#CBD5E1] font-light leading-relaxed mb-6">
                          {webProjects[webIndex].description ||
                            'Sitio web responsivo de alta velocidad, optimizado para conversión, catálogo y contacto directo vía WhatsApp.'}
                        </p>
                      </div>

                      {/* Navigation arrows and indicators */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div className="flex items-center gap-1.5">
                          {webProjects.map((_, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setWebIndex(i)}
                              className={`h-2 rounded-full transition-all cursor-pointer ${
                                i === webIndex ? 'w-6 bg-[#3B82F6]' : 'w-2 bg-white/20 hover:bg-white/40'
                              }`}
                              title={`Ir al proyecto ${i + 1}`}
                            />
                          ))}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={prevWeb}
                            className="p-2.5 rounded-full bg-[#101D3D] hover:bg-[#2A52BE] text-white border border-[#2A52BE]/40 transition-colors cursor-pointer"
                            title="Anterior"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={nextWeb}
                            className="p-2.5 rounded-full bg-[#101D3D] hover:bg-[#2A52BE] text-white border border-[#2A52BE]/40 transition-colors cursor-pointer"
                            title="Siguiente"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Video Modal Player (Playas Doradas or Channel) */}
      {activeVideoId && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden bg-black border-2 border-[#2A52BE] shadow-[0_0_80px_rgba(42,82,190,0.8)]">
            <button
              type="button"
              onClick={() => setActiveVideoId(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/80 hover:bg-red-600 text-white flex items-center justify-center transition-colors cursor-pointer shadow-lg"
              title="Cerrar video"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full h-full">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideoId}?autoplay=1`}
                title="Reproductor de Streaming Manca"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Footer Section with User's Uploaded Logo */}
      <div
        id="contact"
        className="max-w-6xl mx-auto mt-20 pt-16 border-t border-[#2A52BE]/30 flex flex-col md:flex-row items-center justify-between gap-8"
      >
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-3 mb-2.5">
            {customFooterLogoUrl ? (
              <img
                src={customFooterLogoUrl}
                alt="Logo Manca Footer"
                className="h-12 sm:h-14 w-auto max-w-[240px] object-contain"
              />
            ) : customIconUrl ? (
              <div className="flex items-center gap-3">
                <img
                  src={customIconUrl}
                  alt="Logo Manca"
                  className="h-12 w-12 rounded-full object-cover border-2 border-[#2A52BE] shadow-[0_0_15px_rgba(42,82,190,0.6)]"
                />
                <span className="text-white font-black text-2xl tracking-wider uppercase font-['Kanit']">
                  MANCA
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <MancaCircularIcon size={44} />
                <span className="text-white font-black text-2xl tracking-wider uppercase font-['Kanit']">
                  MANCA
                </span>
              </div>
            )}
          </div>
          <p className="text-xs uppercase tracking-widest text-[#93C5FD] font-semibold">
            #Conectando Personas • Productora Audiovisual & Agencia Digital 360
          </p>
          <p className="text-sm text-[#94A3B8] mt-1 max-w-md font-light">
            El puente entre las historias locales y la transformación digital de nuestros comercios y eventos.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <ContactButton
            id="footer-contact-button"
            label="Iniciar Conversación"
            onClick={onOpenContact}
          />
        </div>
      </div>

      {/* Discreet Copyright ONLY - No admin links */}
      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-[#64748B] gap-3">
        <p>© 2026 Manca • Todos los derechos reservados.</p>
        <p className="text-[11px] text-[#475569]">#Conectando Personas</p>
      </div>
    </section>
  );
};

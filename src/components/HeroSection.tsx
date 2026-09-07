import React from 'react';
import { useSiteContent } from '../context/SiteContentContext';
import { FadeIn } from './FadeIn';
import { Magnet } from './Magnet';
import { ContactButton } from './ContactButton';
import { MancaScriptLogo, MancaCircularIcon, RotatingStampBadge } from './MancaBrand';
import { Radio, Sparkles, Video, ArrowUpRight } from 'lucide-react';

interface HeroSectionProps {
  onOpenContact?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact }) => {
  const { customIconUrl } = useSiteContent();

  const navLinks = [
    { name: 'Nuestra Esencia', href: '#about' },
    { name: 'Pilares & Servicios', href: '#services' },
    { name: 'Marcas', href: '#brands' },
    { name: 'Planes & Precios', href: '#pricing' },
    { name: 'Streaming & Proyectos', href: '#projects' },
    { name: 'Contacto', href: '#contact', onClick: onOpenContact },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden select-none"
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 50% -10%, #0F1E4A 0%, #060A14 65%, #03050B 100%)',
      }}
    >
      {/* Subtle ambient light aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[#2A52BE]/15 blur-[120px] pointer-events-none rounded-full" />

      {/* 1. Navbar */}
      <FadeIn delay={0} y={-20} as="nav" className="w-full z-30">
        <div className="flex items-center justify-between px-4 sm:px-8 md:px-12 pt-6 md:pt-8 w-full max-w-7xl mx-auto">
          {/* Logo brand */}
          <div className="flex items-center gap-3">
            <a
              href="#hero"
              className="flex items-center gap-3 group transition-transform duration-200 hover:scale-105"
              aria-label="Manca Inicio"
            >
              {customIconUrl ? (
                <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#2A52BE] shadow-[0_0_15px_rgba(42,82,190,0.6)] flex items-center justify-center bg-[#002F6C]">
                  <img
                    src={customIconUrl}
                    alt="Logo Manca"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <MancaCircularIcon size={44} />
              )}
              <div className="hidden sm:flex flex-col">
                <span className="text-white font-bold text-lg tracking-wider uppercase leading-none font-['Kanit']">
                  MANCA
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#93C5FD]">
                  Audiovisual & Digital
                </span>
              </div>
            </a>
          </div>

          {/* Nav links */}
          <div className="flex items-center gap-3 sm:gap-5 md:gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  if (link.onClick) {
                    e.preventDefault();
                    link.onClick();
                  }
                }}
                className="text-[#E2E8F0] font-medium uppercase tracking-wider text-xs sm:text-sm md:text-[0.92rem] hover:text-[#3870E0] transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#2A52BE] hover:after:w-full after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* 2. Hero Headline Area */}
      <div className="w-full text-center z-20 px-4 pt-6 sm:pt-10 flex flex-col items-center">
        {/* "#Conectando Personas" Badge */}
        <FadeIn delay={0.1} y={15}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111C3D]/80 border border-[#2A52BE]/40 backdrop-blur-md shadow-[0_0_20px_rgba(42,82,190,0.3)] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-white">
              #Conectando Personas
            </span>
            <span className="hidden sm:inline text-xs text-[#93C5FD]/60">•</span>
            <span className="hidden sm:inline text-xs text-[#93C5FD] tracking-wider uppercase">
              Streaming & Agencia 360
            </span>
          </div>
        </FadeIn>

        {/* Big Monumental Title - Centered and Responsive */}
        <FadeIn delay={0.2} y={30} className="w-full max-w-7xl mx-auto flex justify-center">
          <h1
            id="hero-title"
            className="hero-heading font-black uppercase tracking-tight text-center leading-none select-none drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)] w-full"
            style={{ fontSize: 'clamp(2.4rem, 11.2vw, 155px)', letterSpacing: '-0.02em' }}
          >
            SOMOS MANCA
          </h1>
        </FadeIn>

        {/* Subtitle with Electric Blue highlight */}
        <FadeIn delay={0.3} y={20}>
          <p className="text-sm sm:text-base md:text-xl font-normal uppercase tracking-widest text-[#E2E8F0] mt-1 sm:mt-2 max-w-2xl">
            Productora <span className="text-[#3B82F6] font-semibold">Audiovisual</span> & Agencia <span className="text-[#3B82F6] font-semibold">Digital 360</span>
          </p>
        </FadeIn>
      </div>

      {/* 3. Hero Interactive Centerpiece with Magnet */}
      <div className="relative my-6 sm:my-8 z-20 flex justify-center items-center">
        <FadeIn delay={0.4} y={30}>
          <Magnet
            padding={160}
            strength={3.5}
            activeTransition="transform 0.25s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="flex items-center justify-center pointer-events-auto cursor-pointer"
          >
            <div className="relative flex flex-col items-center">
              {/* Rotating Circular Stamp Badge with #CONECTANDO PERSONAS */}
              <div className="relative p-6 sm:p-8 rounded-full bg-gradient-to-b from-[#0F1E4A] to-[#080E20] border-2 border-[#2A52BE]/50 shadow-[0_0_60px_rgba(42,82,190,0.5),inset_0_0_30px_rgba(42,82,190,0.3)]">
                {customIconUrl ? (
                  <div className="relative inline-flex items-center justify-center select-none w-[180px] sm:w-[200px] h-[180px] sm:h-[200px]">
                    <div className="absolute inset-0 animate-[spin_20s_linear_infinite]">
                      <svg viewBox="0 0 200 200" className="w-full h-full">
                        <path
                          id="textPathStampCustom"
                          d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                          fill="none"
                        />
                        <text
                          className="text-[12.5px] font-semibold tracking-[0.24em] uppercase fill-white"
                          style={{ fontFamily: "'Kanit', sans-serif" }}
                        >
                          <textPath href="#textPathStampCustom" startOffset="0%">
                            #CONECTANDO PERSONAS • MANCA • PRODUCTORA •
                          </textPath>
                        </text>
                      </svg>
                    </div>
                    <div className="relative z-10 w-24 h-24 rounded-full overflow-hidden border-2 border-[#2A52BE] shadow-[0_0_20px_rgba(42,82,190,0.7)]">
                      <img
                        src={customIconUrl}
                        alt="Logo personalizado"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ) : (
                  <RotatingStampBadge size={200} />
                )}
              </div>

              {/* Live Broadcast floating indicator */}
              <div className="absolute -bottom-3 sm:-bottom-4 px-4 py-1 rounded-full bg-[#060A14] border border-[#2A52BE] shadow-[0_0_15px_rgba(42,82,190,0.7)] flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span className="text-[11px] font-bold tracking-widest uppercase text-white">
                  TRANSMISIÓN & IMPACTO LOCAL
                </span>
              </div>
            </div>
          </Magnet>
        </FadeIn>
      </div>

      {/* 4. Bottom Bar */}
      <div className="w-full px-5 sm:px-8 md:px-12 pb-7 sm:pb-8 md:pb-10 flex flex-col sm:flex-row justify-between items-center sm:items-end gap-5 z-20 max-w-7xl mx-auto">
        <FadeIn delay={0.45} y={20} className="w-full sm:w-auto">
          <p
            className="text-[#E2E8F0] font-light uppercase tracking-wide leading-snug max-w-[280px] sm:max-w-[340px] md:max-w-[420px] text-center sm:text-left"
            style={{ fontSize: 'clamp(0.8rem, 1.2vw, 1.15rem)' }}
          >
            El puente entre las historias locales y la <span className="text-[#60A5FA] font-medium">transformación digital</span> de nuestra región.
          </p>
        </FadeIn>

        <FadeIn delay={0.55} y={20}>
          <div className="flex items-center gap-3">
            <ContactButton
              id="hero-contact-button"
              label="Cotizar Proyecto"
              onClick={onOpenContact}
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

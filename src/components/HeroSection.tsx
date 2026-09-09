import React, { useState } from 'react';
import { useSiteContent } from '../context/SiteContentContext';
import { FadeIn } from './FadeIn';
import { Magnet } from './Magnet';
import { ContactButton } from './ContactButton';
import { MancaScriptLogo, MancaCircularIcon, RotatingStampBadge } from './MancaBrand';
import {
  Sparkles,
  ArrowRight,
  Tv,
  Globe,
  Radio,
  Video,
  ShieldCheck,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react';

interface HeroSectionProps {
  onOpenContact?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact }) => {
  const { customIconUrl } = useSiteContent();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Servicios', href: '#services' },
    { name: 'Marcas', href: '#brands' },
    { name: 'Planes', href: '#pricing' },
    { name: 'Proyectos', href: '#projects' },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden select-none bg-[#060A14] text-white"
      style={{
        background: 'radial-gradient(ellipse 85% 75% at 50% 30%, #0C1A3E 0%, #060A14 65%, #03050B 100%)',
        fontFamily: "'Kanit', sans-serif",
      }}
    >
      {/* Background Atmospheric Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-[#2A52BE]/18 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-10 left-10 w-[350px] h-[350px] bg-[#1E3A8A]/10 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#2A52BE]/10 blur-[120px] pointer-events-none rounded-full" />

      {/* Floating 3D Decorative Assets */}
      <div className="absolute top-[14%] left-[2%] sm:left-[4%] md:left-[6%] z-10 pointer-events-none hidden sm:block">
        <Magnet padding={120} strength={4}>
          <FadeIn delay={0.2} x={-60} y={0} duration={1}>
            <img
              src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
              alt="3D Decorative Moon"
              className="w-[100px] sm:w-[130px] md:w-[170px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] opacity-85"
              loading="lazy"
            />
          </FadeIn>
        </Magnet>
      </div>

      <div className="absolute top-[16%] right-[2%] sm:right-[4%] md:right-[6%] z-10 pointer-events-none hidden sm:block">
        <Magnet padding={120} strength={4}>
          <FadeIn delay={0.25} x={60} y={0} duration={1}>
            <img
              src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
              alt="3D Decorative Lego"
              className="w-[100px] sm:w-[130px] md:w-[170px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] opacity-85"
              loading="lazy"
            />
          </FadeIn>
        </Magnet>
      </div>

      <div className="absolute bottom-[16%] left-[3%] sm:left-[6%] md:left-[8%] z-10 pointer-events-none hidden md:block">
        <Magnet padding={100} strength={5}>
          <FadeIn delay={0.35} x={-40} y={20} duration={1}>
            <img
              src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
              alt="3D Decorative Object"
              className="w-[90px] sm:w-[120px] md:w-[150px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] opacity-75"
              loading="lazy"
            />
          </FadeIn>
        </Magnet>
      </div>

      <div className="absolute bottom-[16%] right-[3%] sm:right-[6%] md:right-[8%] z-10 pointer-events-none hidden md:block">
        <Magnet padding={100} strength={5}>
          <FadeIn delay={0.4} x={40} y={20} duration={1}>
            <img
              src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
              alt="3D Decorative Cluster"
              className="w-[110px] sm:w-[140px] md:w-[180px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] opacity-75"
              loading="lazy"
            />
          </FadeIn>
        </Magnet>
      </div>

      {/* 1. TOP NAVIGATION BAR */}
      <header className="relative z-40 w-full px-5 sm:px-8 md:px-12 py-5 sm:py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            className="flex items-center gap-3 group transition-transform duration-200 hover:scale-[1.02] cursor-pointer"
          >
            {customIconUrl ? (
              <img
                src={customIconUrl}
                alt="Manca Logo"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-[#2A52BE] shadow-[0_0_20px_rgba(42,82,190,0.5)]"
              />
            ) : (
              <MancaCircularIcon size={42} interactive={true} />
            )}
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black uppercase tracking-wider text-white flex items-center gap-1.5 leading-tight">
                MANCA
                <span className="inline-block w-2 h-2 rounded-full bg-[#3870E0] animate-pulse" />
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium tracking-widest text-[#93C5FD] uppercase">
                Productora & Agencia 360
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 px-4 py-2 rounded-full bg-[#0A142A]/80 border border-[#2A52BE]/40 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#CBD5E1] hover:text-white hover:bg-[#2A52BE]/20 transition-all cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Header Action / Contact Button */}
          <div className="hidden sm:flex items-center gap-3">
            <ContactButton
              label="Contáctanos"
              onClick={onOpenContact}
              size="sm"
              className="shadow-[0_0_25px_rgba(42,82,190,0.4)]"
            />
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-[#0A142A] border border-[#2A52BE]/40 text-white hover:bg-[#12224A] transition-colors cursor-pointer"
            aria-label="Abrir Menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-5 rounded-2xl bg-[#081022] border border-[#2A52BE]/50 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold uppercase tracking-wider text-[#CBD5E1] hover:text-white hover:bg-[#2A52BE]/20 transition-all"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2 border-t border-[#2A52BE]/20">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenContact?.();
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#162B75] via-[#2A52BE] to-[#3870E0] text-white text-xs font-bold uppercase tracking-wider text-center shadow-lg"
                >
                  Contáctanos Ahora
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* 2. MAIN HERO CENTER */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-5 sm:px-8 md:px-12 py-8 sm:py-14 text-center max-w-5xl mx-auto w-full">
        {/* Subtitle Badge */}
        <FadeIn delay={0.05} y={20}>
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#101D42]/90 border border-[#2A52BE]/60 text-xs sm:text-sm tracking-widest uppercase text-[#93C5FD] mb-6 shadow-[0_0_30px_rgba(42,82,190,0.4)] backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-[#60A5FA]" />
            <span className="font-bold text-white">#CONECTANDO PERSONAS</span>
            <span className="text-[#3B82F6] font-normal">•</span>
            <span>MANCA</span>
          </div>
        </FadeIn>

        {/* Hero Main Heading */}
        <FadeIn delay={0.1} y={30} className="w-full">
          <h1
            id="hero-heading"
            className="hero-heading hero-heading-glow font-black uppercase leading-none tracking-tight text-center select-none"
            style={{ fontSize: 'clamp(3rem, 12vw, 150px)' }}
          >
            MANCA
          </h1>
        </FadeIn>

        {/* Rotating Stamp Motif in the Center */}
        <FadeIn delay={0.15} y={20} duration={0.8} className="my-3 sm:my-5">
          <div className="relative inline-block hover:scale-105 transition-transform duration-300">
            <RotatingStampBadge size={130} />
          </div>
        </FadeIn>

        {/* Hero Narrative Description */}
        <FadeIn delay={0.2} y={30} className="w-full max-w-3xl">
          <p className="text-base sm:text-lg md:text-xl text-[#CBD5E1] font-light leading-relaxed mb-8">
            Impulsamos la transformación digital y damos visibilidad a las historias de nuestra región.
            <strong className="text-white font-semibold"> Streaming multicámara profesional</strong>,
            coberturas en directo de festivales masivos, contenidos comunitarios y
            <strong className="text-white font-semibold"> desarrollo web llave en mano</strong> con hosting y soporte garantizado.
          </p>
        </FadeIn>

        {/* Primary Call to Action Buttons */}
        <FadeIn delay={0.25} y={20}>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center">
            <ContactButton
              id="hero-primary-cta"
              label="Comenzar Proyecto"
              onClick={onOpenContact}
              size="lg"
              className="w-full sm:w-auto shadow-[0_0_35px_rgba(42,82,190,0.5)]"
            />
            <a
              href="#services"
              className="w-full sm:w-auto px-8 py-3.5 sm:px-10 sm:py-4 rounded-full bg-[#0E1834] border border-[#2A52BE]/50 hover:border-[#60A5FA] text-white text-xs sm:text-sm font-semibold uppercase tracking-widest hover:bg-[#152554] transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Explorar Servicios</span>
              <ArrowRight className="w-4 h-4 text-[#60A5FA]" />
            </a>
          </div>
        </FadeIn>
      </div>

      {/* 3. HERO FOOTER: Highlights Strip & Scroll Indicator */}
      <div className="relative z-20 w-full px-5 sm:px-8 md:px-12 pb-6 pt-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 border-t border-[#2A52BE]/20 pt-6">
          {/* Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 w-full md:w-auto text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#12224A] border border-[#2A52BE]/40 flex items-center justify-center text-[#60A5FA] shrink-0">
                <Tv className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider">Streaming HD</p>
                <p className="text-[11px] text-[#93C5FD]">Sin cortes</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#12224A] border border-[#2A52BE]/40 flex items-center justify-center text-[#60A5FA] shrink-0">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider">Webs + Hosting</p>
                <p className="text-[11px] text-[#93C5FD]">Llave en mano</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#12224A] border border-[#2A52BE]/40 flex items-center justify-center text-[#60A5FA] shrink-0">
                <Radio className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider">El Canal</p>
                <p className="text-[11px] text-[#93C5FD]">Comunidad local</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#12224A] border border-[#2A52BE]/40 flex items-center justify-center text-[#60A5FA] shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider">1 Año Garantía</p>
                <p className="text-[11px] text-[#93C5FD]">Mantenimiento</p>
              </div>
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <a
            href="#marquee"
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#93C5FD] hover:text-white transition-colors cursor-pointer"
          >
            <span>Descubrir Producciones</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-[#60A5FA]" />
          </a>
        </div>
      </div>
    </section>
  );
};

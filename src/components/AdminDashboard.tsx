import React, { useState } from 'react';
import { useSiteContent } from '../context/SiteContentContext';
import { MancaCircularIcon } from './MancaBrand';
import { compressImageFile } from '../utils/imageCompressor';
import {
  Globe,
  SlidersHorizontal,
  Image as ImageIcon,
  Layers,
  Briefcase,
  Upload,
  Plus,
  Trash2,
  RotateCcw,
  Check,
  ExternalLink,
  ArrowLeft,
  Eye,
  Sparkles,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    navigateToPublic,
    customIconUrl,
    setCustomIconUrl,
    customFooterLogoUrl,
    setCustomFooterLogoUrl,
    marqueeItems,
    updateMarqueeItem,
    addMarqueeItem,
    deleteMarqueeItem,
    brandLogos,
    addBrandLogo,
    deleteBrandLogo,
    webProjects,
    addWebProject,
    updateWebProject,
    deleteWebProject,
    resetToDefaults,
    adminActiveTab,
    setAdminActiveTab,
  } = useSiteContent();

  const [activeTab, setActiveTab] = useState<'icon' | 'marquee' | 'brands' | 'webs'>(
    adminActiveTab || 'icon'
  );

  const [savedNotice, setSavedNotice] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const showNotification = (msg: string) => {
    setSavedNotice(msg);
    setTimeout(() => setSavedNotice(null), 3000);
  };

  // Safe file upload with automatic image compression to avoid quota issues
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setIsProcessing(true);
        const compressed = await compressImageFile(file, 1200, 0.8);
        onSuccess(compressed);
        showNotification('¡Imagen procesada y guardada correctamente!');
      } catch (err) {
        console.error('Error procesando imagen:', err);
        alert('Hubo un problema al procesar la imagen.');
      } finally {
        setIsProcessing(false);
      }
    }
  };

  // Temporary forms for new items
  const [newMarquee, setNewMarquee] = useState({
    title: '',
    category: 'Producción Audiovisual',
    image: '',
    tag: 'En Vivo',
  });

  const [newBrand, setNewBrand] = useState({
    name: '',
    logo: '',
    category: 'Comercio Local',
  });

  const [newWeb, setNewWeb] = useState({
    title: '',
    client: '',
    thumbnail: '',
    liveUrl: '#',
    tag: 'Web Responsive + Webmail',
    description: '',
  });

  return (
    <div
      className="min-h-screen w-full bg-[#040813] text-white flex flex-col font-['Kanit'] selection:bg-[#2A52BE] selection:text-white"
    >
      {/* Top Header Bar */}
      <header className="w-full bg-[#081024] border-b border-[#2A52BE]/40 px-5 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-0 z-50 backdrop-blur-lg">
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2A52BE]/20 border border-[#2A52BE] flex items-center justify-center text-[#60A5FA]">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-base tracking-wide uppercase">
                  MANCA ADMIN
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#2A52BE] text-white uppercase tracking-wider">
                  Panel Privado
                </span>
              </div>
              <p className="text-xs text-[#94A3B8]">
                Administración de contenidos, imágenes, marcas y proyectos web
              </p>
            </div>
          </div>

          {/* Quick exit on mobile */}
          <button
            type="button"
            onClick={navigateToPublic}
            className="sm:hidden p-2 rounded-xl bg-[#14234C] text-[#93C5FD]"
            title="Volver a la Web"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={() => {
              if (
                window.confirm(
                  '¿Estás seguro de que deseas restablecer todos los textos, imágenes y marcas a los originales?'
                )
              ) {
                resetToDefaults();
                showNotification('Contenidos restablecidos a valores originales');
              }
            }}
            className="px-3 py-2 rounded-xl border border-red-500/30 text-red-300 hover:bg-red-500/20 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restablecer</span>
          </button>

          <button
            type="button"
            onClick={navigateToPublic}
            className="px-4 py-2 rounded-xl bg-[#2A52BE] hover:bg-[#3870E0] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg hover:scale-105 cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>Ver Sitio Web en Vivo</span>
          </button>
        </div>
      </header>

      {/* Tabs Navigation */}
      <div className="w-full bg-[#060C1B] border-b border-[#2A52BE]/20 px-5 sm:px-8 flex overflow-x-auto select-none">
        <div className="max-w-6xl w-full mx-auto flex gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('icon')}
            className={`flex items-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'icon'
                ? 'border-[#3870E0] text-white bg-[#0E1A38]'
                : 'border-transparent text-[#94A3B8] hover:text-white'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-[#3870E0]" />
            <span>1. Ícono & Logo Web</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('marquee')}
            className={`flex items-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'marquee'
                ? 'border-[#3870E0] text-white bg-[#0E1A38]'
                : 'border-transparent text-[#94A3B8] hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4 text-[#3870E0]" />
            <span>2. Galería Bajo Home ({marqueeItems.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('brands')}
            className={`flex items-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'brands'
                ? 'border-[#3870E0] text-white bg-[#0E1A38]'
                : 'border-transparent text-[#94A3B8] hover:text-white'
            }`}
          >
            <Briefcase className="w-4 h-4 text-[#3870E0]" />
            <span>3. Marcas & Clientes ({brandLogos.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('webs')}
            className={`flex items-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'webs'
                ? 'border-[#3870E0] text-white bg-[#0E1A38]'
                : 'border-transparent text-[#94A3B8] hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4 text-[#3870E0]" />
            <span>4. Webs Desarrolladas ({webProjects.length})</span>
          </button>
        </div>
      </div>

      {/* Notifications Toast */}
      {savedNotice && (
        <div className="bg-[#2A52BE] text-white text-xs font-semibold uppercase tracking-wider py-2 px-4 text-center flex items-center justify-center gap-2 shadow-lg animate-pulse">
          <Check className="w-4 h-4" />
          <span>{savedNotice}</span>
        </div>
      )}

      {isProcessing && (
        <div className="bg-amber-600/90 text-white text-xs font-semibold uppercase tracking-wider py-1.5 px-4 text-center">
          Optimizando y procesando imagen...
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-5 sm:p-8 space-y-8">
        {/* TAB 1: ICON & LOGO */}
        {activeTab === 'icon' && (
          <div className="space-y-6">
            <div className="bg-[#0A1226] border border-[#2A52BE]/40 rounded-3xl p-6 sm:p-8">
              <h3 className="text-lg font-bold uppercase text-white tracking-wide mb-2">
                Ícono Oficial de la Web (Favicon & Cabecera)
              </h3>
              <p className="text-xs sm:text-sm text-[#CBD5E1] mb-6">
                Este ícono se muestra en la pestaña del navegador, en la barra de navegación y en el centro giratorio animado del Home. Podés subir cualquier imagen PNG, JPG o GIF, o ingresar su URL.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-8">
                {/* Visual Preview */}
                <div className="flex flex-col items-center gap-3 p-5 rounded-3xl bg-[#040813] border border-[#2A52BE]/40 shadow-xl">
                  <span className="text-[11px] uppercase tracking-wider text-[#93C5FD] font-semibold">
                    Vista Previa Actual
                  </span>
                  <div className="w-24 h-24 rounded-full bg-[#002F6C] border-2 border-[#2A52BE] flex items-center justify-center overflow-hidden shadow-2xl">
                    {customIconUrl ? (
                      <img
                        src={customIconUrl}
                        alt="Ícono personalizado"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <MancaCircularIcon size={90} />
                    )}
                  </div>
                  <span className="text-xs text-[#CBD5E1]">
                    {customIconUrl ? 'Ícono Personalizado' : 'Logo Oficial Vectorial'}
                  </span>
                </div>

                {/* Upload & Link Controls */}
                <div className="flex-1 w-full space-y-5">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#93C5FD] font-semibold block mb-2">
                      Opción 1: Subir Archivo desde tu Dispositivo (PNG, JPG o GIF)
                    </label>
                    <label className="flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-[#122045] border-2 border-dashed border-[#2A52BE]/70 hover:border-[#60A5FA] cursor-pointer text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-[#182B60]">
                      <Upload className="w-4 h-4 text-[#60A5FA]" />
                      <span>Seleccionar Archivo de Imagen</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, (dataUrl) => setCustomIconUrl(dataUrl))}
                      />
                    </label>
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#93C5FD] font-semibold block mb-2">
                      Opción 2: O Ingresar Enlace Directo (URL)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        placeholder="https://ejemplo.com/logo.png"
                        value={customIconUrl || ''}
                        onChange={(e) => setCustomIconUrl(e.target.value || null)}
                        className="flex-1 bg-[#040813] border border-[#2A52BE]/50 rounded-xl px-4 py-3 text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#3870E0]"
                      />
                      {customIconUrl && (
                        <button
                          type="button"
                          onClick={() => {
                            setCustomIconUrl(null);
                            showNotification('Restablecido al logo oficial');
                          }}
                          className="px-4 py-2 rounded-xl bg-red-500/20 text-red-300 hover:bg-red-500/30 text-xs font-semibold cursor-pointer"
                        >
                          Quitar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-Card: Logo Oficial del Footer */}
            <div className="bg-[#0A1226] border border-[#2A52BE]/40 rounded-3xl p-6 sm:p-8">
              <h3 className="text-lg font-bold uppercase text-white tracking-wide mb-2">
                Logo Oficial del Footer (Pie de Página)
              </h3>
              <p className="text-xs sm:text-sm text-[#CBD5E1] mb-6">
                Personalizá la imagen que firma la página en la parte inferior. Podés subir el logo oficial en PNG transparente, JPG o GIF, o ingresar su URL directa.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-8">
                {/* Visual Preview */}
                <div className="flex flex-col items-center gap-3 p-5 rounded-3xl bg-[#040813] border border-[#2A52BE]/40 shadow-xl min-w-[200px]">
                  <span className="text-[11px] uppercase tracking-wider text-[#93C5FD] font-semibold">
                    Vista Previa Footer
                  </span>
                  <div className="h-20 w-40 rounded-2xl bg-[#081228] border border-[#2A52BE]/50 flex items-center justify-center p-3 overflow-hidden shadow-inner">
                    {customFooterLogoUrl ? (
                      <img
                        src={customFooterLogoUrl}
                        alt="Logo Footer Personalizado"
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : customIconUrl ? (
                      <img
                        src={customIconUrl}
                        alt="Logo Web"
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <MancaCircularIcon size={32} />
                        <span className="text-white font-bold text-lg uppercase tracking-wider">
                          MANCA
                        </span>
                      </div>
                    )}
                  </div>
                  <span className="text-[11px] text-[#CBD5E1]">
                    {customFooterLogoUrl ? 'Logo Footer Cargado' : 'Logo Predeterminado'}
                  </span>
                </div>

                {/* Upload & Link Controls */}
                <div className="flex-1 w-full space-y-5">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#93C5FD] font-semibold block mb-2">
                      Subir Logo para el Footer desde tu Dispositivo (PNG transparente recomendado)
                    </label>
                    <label className="flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-[#122045] border-2 border-dashed border-[#2A52BE]/70 hover:border-[#60A5FA] cursor-pointer text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-[#182B60]">
                      <Upload className="w-4 h-4 text-[#60A5FA]" />
                      <span>Seleccionar Logo para el Footer</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, (dataUrl) => {
                          setCustomFooterLogoUrl(dataUrl);
                          showNotification('Logo del footer actualizado correctamente');
                        })}
                      />
                    </label>
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#93C5FD] font-semibold block mb-2">
                      O Ingresar Enlace Directo (URL) para el Footer
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        placeholder="https://ejemplo.com/logo-footer.png"
                        value={customFooterLogoUrl || ''}
                        onChange={(e) => setCustomFooterLogoUrl(e.target.value || null)}
                        className="flex-1 bg-[#040813] border border-[#2A52BE]/50 rounded-xl px-4 py-3 text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#3870E0]"
                      />
                      {customFooterLogoUrl && (
                        <button
                          type="button"
                          onClick={() => {
                            setCustomFooterLogoUrl(null);
                            showNotification('Logo del footer restablecido');
                          }}
                          className="px-4 py-2 rounded-xl bg-red-500/20 text-red-300 hover:bg-red-500/30 text-xs font-semibold cursor-pointer"
                        >
                          Quitar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MARQUEE UNDER HOME */}
        {activeTab === 'marquee' && (
          <div className="space-y-6">
            <div className="bg-[#0A1226] border border-[#2A52BE]/40 rounded-3xl p-6 sm:p-8">
              <h3 className="text-lg font-bold uppercase text-white tracking-wide mb-1">
                Galería de Tarjetas e Imágenes Debajo del Home
              </h3>
              <p className="text-xs sm:text-sm text-[#CBD5E1] mb-6">
                Modificá las imágenes, títulos y etiquetas de las producciones que rotan horizontalmente bajo el hero.
              </p>

              {/* Add New Marquee Card */}
              <div className="bg-[#060D1E] border border-[#2A52BE]/30 rounded-2xl p-5 mb-8">
                <h4 className="text-xs uppercase tracking-wider font-bold text-[#60A5FA] mb-4 flex items-center gap-1.5">
                  <Plus className="w-4 h-4" />
                  <span>Añadir Nueva Tarjeta a la Galería</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <input
                    type="text"
                    placeholder="Título (ej: Cobertura Especial)"
                    value={newMarquee.title}
                    onChange={(e) => setNewMarquee({ ...newMarquee, title: e.target.value })}
                    className="bg-[#040813] border border-[#2A52BE]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#3870E0]"
                  />
                  <input
                    type="text"
                    placeholder="Categoría (ej: Streaming HD)"
                    value={newMarquee.category}
                    onChange={(e) => setNewMarquee({ ...newMarquee, category: e.target.value })}
                    className="bg-[#040813] border border-[#2A52BE]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#3870E0]"
                  />
                  <input
                    type="text"
                    placeholder="Etiqueta / Tag (ej: En Directo)"
                    value={newMarquee.tag}
                    onChange={(e) => setNewMarquee({ ...newMarquee, tag: e.target.value })}
                    className="bg-[#040813] border border-[#2A52BE]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#3870E0]"
                  />
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="URL de Imagen o Subir Archivo"
                      value={newMarquee.image}
                      onChange={(e) => setNewMarquee({ ...newMarquee, image: e.target.value })}
                      className="flex-1 bg-[#040813] border border-[#2A52BE]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#3870E0]"
                    />
                    <label className="px-3 py-2 rounded-xl bg-[#14234C] hover:bg-[#2A52BE] text-white cursor-pointer transition-colors shrink-0 flex items-center gap-1 text-xs font-semibold">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Subir</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleFileUpload(e, (dataUrl) =>
                            setNewMarquee({ ...newMarquee, image: dataUrl })
                          )
                        }
                      />
                    </label>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (!newMarquee.title || !newMarquee.image) {
                      alert('Por favor ingresa al menos un título y una imagen');
                      return;
                    }
                    addMarqueeItem({
                      title: newMarquee.title,
                      category: newMarquee.category || 'Producción',
                      image: newMarquee.image,
                      tag: newMarquee.tag || 'Manca',
                    });
                    setNewMarquee({ title: '', category: 'Producción Audiovisual', image: '', tag: 'En Vivo' });
                    showNotification('Tarjeta añadida a la galería');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#2A52BE] hover:bg-[#3870E0] text-xs font-bold uppercase tracking-wider text-white transition-colors cursor-pointer"
                >
                  Guardar Tarjeta
                </button>
              </div>

              {/* List of existing marquee items */}
              <div className="space-y-3">
                {marqueeItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#060D1E] border border-[#2A52BE]/30 hover:border-[#2A52BE] transition-colors"
                  >
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <div className="w-24 h-16 rounded-xl overflow-hidden bg-[#040812] border border-[#2A52BE]/40 shrink-0 relative group">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                          <Upload className="w-4 h-4 text-white" />
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleFileUpload(e, (dataUrl) =>
                                updateMarqueeItem(item.id, { image: dataUrl })
                              )
                            }
                          />
                        </label>
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] text-[#60A5FA] uppercase tracking-wider font-semibold block">
                          {item.category} • {item.tag}
                        </span>
                        <h5 className="text-sm font-bold text-white truncate">{item.title}</h5>
                      </div>
                    </div>

                    {/* Inline Form Controls */}
                    <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => updateMarqueeItem(item.id, { title: e.target.value })}
                        className="bg-[#040813] border border-[#2A52BE]/40 rounded-lg px-3 py-1.5 text-xs text-white max-w-[200px] focus:outline-none focus:border-[#3870E0]"
                        title="Editar título"
                      />
                      <input
                        type="text"
                        value={item.tag}
                        onChange={(e) => updateMarqueeItem(item.id, { tag: e.target.value })}
                        className="bg-[#040813] border border-[#2A52BE]/40 rounded-lg px-2.5 py-1.5 text-xs text-[#93C5FD] max-w-[120px] focus:outline-none focus:border-[#3870E0]"
                        title="Editar etiqueta"
                      />
                      <label className="p-2 rounded-lg bg-[#14234C] text-[#93C5FD] hover:text-white cursor-pointer transition-colors" title="Cambiar imagen">
                        <Upload className="w-3.5 h-3.5" />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleFileUpload(e, (dataUrl) =>
                              updateMarqueeItem(item.id, { image: dataUrl })
                            )
                          }
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => deleteMarqueeItem(item.id)}
                        className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                        title="Eliminar tarjeta"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BRANDS & CLIENTS (GRAYSCALE/ILLUMINATED) */}
        {activeTab === 'brands' && (
          <div className="space-y-6">
            <div className="bg-[#0A1226] border border-[#2A52BE]/40 rounded-3xl p-6 sm:p-8">
              <h3 className="text-lg font-bold uppercase text-white tracking-wide mb-1">
                Marcas & Comercios Aliados (Carrusel Bajo Servicios)
              </h3>
              <p className="text-xs sm:text-sm text-[#CBD5E1] mb-6">
                Los logos aparecen en blanco y negro con fondo negro en la web pública, e iluminan sus colores y brillo neón al pasar el cursor.
              </p>

              {/* Add New Brand */}
              <div className="bg-[#060D1E] border border-[#2A52BE]/30 rounded-2xl p-5 mb-8">
                <h4 className="text-xs uppercase tracking-wider font-bold text-[#60A5FA] mb-4 flex items-center gap-1.5">
                  <Plus className="w-4 h-4" />
                  <span>Añadir Nueva Marca o Comercio</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                  <input
                    type="text"
                    placeholder="Nombre de la Marca"
                    value={newBrand.name}
                    onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
                    className="bg-[#040813] border border-[#2A52BE]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#3870E0]"
                  />
                  <input
                    type="text"
                    placeholder="Categoría (ej: Comercio Local)"
                    value={newBrand.category}
                    onChange={(e) => setNewBrand({ ...newBrand, category: e.target.value })}
                    className="bg-[#040813] border border-[#2A52BE]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#3870E0]"
                  />
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="URL del Logo o Subir"
                      value={newBrand.logo}
                      onChange={(e) => setNewBrand({ ...newBrand, logo: e.target.value })}
                      className="flex-1 bg-[#040813] border border-[#2A52BE]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#3870E0]"
                    />
                    <label className="px-3 py-2 rounded-xl bg-[#14234C] hover:bg-[#2A52BE] text-white cursor-pointer transition-colors shrink-0 flex items-center gap-1 text-xs font-semibold">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Subir</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleFileUpload(e, (dataUrl) =>
                            setNewBrand({ ...newBrand, logo: dataUrl })
                          )
                        }
                      />
                    </label>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (!newBrand.name || !newBrand.logo) {
                      alert('Ingresa el nombre y el logo de la marca');
                      return;
                    }
                    addBrandLogo({
                      name: newBrand.name,
                      logo: newBrand.logo,
                      category: newBrand.category || 'Sponsor',
                    });
                    setNewBrand({ name: '', logo: '', category: 'Comercio Local' });
                    showNotification('Marca añadida con éxito');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#2A52BE] hover:bg-[#3870E0] text-xs font-bold uppercase tracking-wider text-white transition-colors cursor-pointer"
                >
                  Guardar Marca
                </button>
              </div>

              {/* Grid of current brands */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {brandLogos.map((brand) => (
                  <div
                    key={brand.id}
                    className="group relative p-5 rounded-2xl bg-[#060D1E] border border-[#2A52BE]/30 flex flex-col items-center text-center justify-between transition-all hover:border-[#2A52BE]"
                  >
                    <div className="w-full h-20 flex items-center justify-center mb-2">
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="max-h-14 max-w-[120px] object-contain filter grayscale opacity-60 group-hover:filter-none group-hover:opacity-100 group-hover:scale-105 transition-all"
                      />
                    </div>
                    <span className="text-xs font-bold text-white truncate w-full">
                      {brand.name}
                    </span>
                    <span className="text-[10px] text-[#93C5FD] truncate">{brand.category}</span>

                    <button
                      type="button"
                      onClick={() => deleteBrandLogo(brand.id)}
                      className="absolute top-2 right-2 p-1.5 rounded-md bg-red-500/20 text-red-300 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      title="Eliminar marca"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: DEVELOPED WEBS & MINIATURES (PNG / GIF) */}
        {activeTab === 'webs' && (
          <div className="space-y-6">
            <div className="bg-[#0A1226] border border-[#2A52BE]/40 rounded-3xl p-6 sm:p-8">
              <h3 className="text-lg font-bold uppercase text-white tracking-wide mb-1">
                Webs Desarrolladas (Miniaturas en PNG o GIF Animado)
              </h3>
              <p className="text-xs sm:text-sm text-[#CBD5E1] mb-6">
                Mostrá capturas o GIFs animados de los sitios web creados para clientes de la región en el carrusel de Transformación Digital.
              </p>

              {/* Add New Web Project */}
              <div className="bg-[#060D1E] border border-[#2A52BE]/30 rounded-2xl p-5 mb-8">
                <h4 className="text-xs uppercase tracking-wider font-bold text-[#60A5FA] mb-4 flex items-center gap-1.5">
                  <Plus className="w-4 h-4" />
                  <span>Añadir Nuevo Sitio Web</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <input
                    type="text"
                    placeholder="Título del Sitio (ej: Portal Turístico)"
                    value={newWeb.title}
                    onChange={(e) => setNewWeb({ ...newWeb, title: e.target.value })}
                    className="bg-[#040813] border border-[#2A52BE]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#3870E0]"
                  />
                  <input
                    type="text"
                    placeholder="Cliente / Comercio"
                    value={newWeb.client}
                    onChange={(e) => setNewWeb({ ...newWeb, client: e.target.value })}
                    className="bg-[#040813] border border-[#2A52BE]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#3870E0]"
                  />
                  <input
                    type="text"
                    placeholder="Etiqueta (ej: Web + Hosting + Webmail)"
                    value={newWeb.tag}
                    onChange={(e) => setNewWeb({ ...newWeb, tag: e.target.value })}
                    className="bg-[#040813] border border-[#2A52BE]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#3870E0]"
                  />
                  <input
                    type="url"
                    placeholder="Enlace al Sitio (opcional)"
                    value={newWeb.liveUrl}
                    onChange={(e) => setNewWeb({ ...newWeb, liveUrl: e.target.value })}
                    className="bg-[#040813] border border-[#2A52BE]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#3870E0]"
                  />
                </div>

                <div className="flex gap-2 mb-3">
                  <input
                    type="url"
                    placeholder="URL de Miniatura (PNG o GIF)"
                    value={newWeb.thumbnail}
                    onChange={(e) => setNewWeb({ ...newWeb, thumbnail: e.target.value })}
                    className="flex-1 bg-[#040813] border border-[#2A52BE]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#3870E0]"
                  />
                  <label className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#14234C] hover:bg-[#2A52BE] text-white text-xs font-semibold cursor-pointer transition-colors shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Subir GIF o PNG</span>
                    <input
                      type="file"
                      accept="image/png, image/gif, image/jpeg, image/webp"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(e, (dataUrl) =>
                          setNewWeb({ ...newWeb, thumbnail: dataUrl })
                        )
                      }
                    />
                  </label>
                </div>

                <textarea
                  rows={2}
                  placeholder="Descripción breve de la solución o comercio..."
                  value={newWeb.description}
                  onChange={(e) => setNewWeb({ ...newWeb, description: e.target.value })}
                  className="w-full bg-[#040813] border border-[#2A52BE]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#3870E0] mb-4 resize-none"
                />

                <button
                  type="button"
                  onClick={() => {
                    if (!newWeb.title || !newWeb.thumbnail) {
                      alert('Ingresa el título y la miniatura (PNG o GIF)');
                      return;
                    }
                    addWebProject({
                      title: newWeb.title,
                      client: newWeb.client || 'Comercio Regional',
                      thumbnail: newWeb.thumbnail,
                      liveUrl: newWeb.liveUrl || '#',
                      tag: newWeb.tag || 'Web Integral',
                      description: newWeb.description,
                    });
                    setNewWeb({
                      title: '',
                      client: '',
                      thumbnail: '',
                      liveUrl: '#',
                      tag: 'Web Responsive + Webmail',
                      description: '',
                    });
                    showNotification('Sitio web añadido al carrusel');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#2A52BE] hover:bg-[#3870E0] text-xs font-bold uppercase tracking-wider text-white transition-colors cursor-pointer"
                >
                  Guardar Sitio Web
                </button>
              </div>

              {/* Grid of existing web projects */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {webProjects.map((web) => (
                  <div
                    key={web.id}
                    className="p-5 rounded-2xl bg-[#060D1E] border border-[#2A52BE]/30 flex flex-col justify-between relative group"
                  >
                    <div className="relative w-full h-44 rounded-xl overflow-hidden bg-[#02050D] border border-[#2A52BE]/40 mb-3">
                      <img
                        src={web.thumbnail}
                        alt={web.title}
                        className="w-full h-full object-cover"
                      />
                      <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 cursor-pointer transition-opacity">
                        <Upload className="w-4 h-4 text-white" />
                        <span className="text-xs text-white uppercase font-bold">Cambiar Miniatura</span>
                        <input
                          type="file"
                          accept="image/png, image/gif, image/jpeg, image/webp"
                          className="hidden"
                          onChange={(e) =>
                            handleFileUpload(e, (dataUrl) =>
                              updateWebProject(web.id, { thumbnail: dataUrl })
                            )
                          }
                        />
                      </label>
                    </div>

                    <div>
                      <span className="text-[10px] text-[#60A5FA] uppercase tracking-wider font-semibold">
                        {web.tag}
                      </span>
                      <h5 className="text-sm font-bold text-white truncate">{web.title}</h5>
                      <p className="text-xs text-[#94A3B8]">{web.client}</p>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
                      <span className="text-[10px] text-[#93C5FD]">
                        {web.thumbnail.startsWith('data:') ? 'Archivo cargado' : 'Enlace web'}
                      </span>
                      <button
                        type="button"
                        onClick={() => deleteWebProject(web.id)}
                        className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                        title="Eliminar"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

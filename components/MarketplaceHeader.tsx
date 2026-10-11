import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Search, ShoppingBag, FileText, Globe, ChevronDown, ArrowRight } from 'lucide-react';
import { Language } from '../data/marketplaceData';

interface MarketplaceHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenQuote: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  t: any;
}

export const MarketplaceHeader: React.FC<MarketplaceHeaderProps> = ({
  activeTab,
  setActiveTab,
  lang,
  setLang,
  cartCount,
  onOpenCart,
  onOpenQuote,
  searchQuery,
  setSearchQuery,
  t,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSProfessionalOpen, setIsSProfessionalOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isSearchOpenMobile, setIsSearchOpenMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const flags: Record<string, string> = { en: '🇺🇸', es: '🇪🇸', pt: '🇧🇷', it: '🇮🇹', fr: '🇫🇷' };

  const handleNav = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    setIsSProfessionalOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isEs = lang === 'es';

  const sProfessionalTreatments = [
    { id: 'sp-nutrology', label: t.sprofessional.lines.nutrology.split(' - ')[0] },
    { id: 'sp-hidratherapy', label: t.sprofessional.lines.hidratherapy.split(' - ')[0] },
    { id: 'sp-profusion', label: t.sprofessional.lines.profusion.split(' - ')[0] },
    { id: 'sp-brushing', label: t.sprofessional.lines.brushing.split(' - ')[0] },
    { id: 'sp-mycrown', label: t.sprofessional.lines.mycrown.split(' - ')[0] },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleNav('catalog');
  };

  return (
    <nav
      className={`fixed w-full z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/95 backdrop-blur-xl border-b border-zinc-800/80 py-2.5 shadow-2xl'
          : 'bg-black/70 backdrop-blur-md border-b border-white/5 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Wordmark & Logo */}
          <div
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-amber-200 to-amber-600 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.25)] transition-transform group-hover:scale-105">
              <span className="text-black font-serif font-bold text-lg sm:text-xl">MA</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-serif font-bold text-base sm:text-lg tracking-widest leading-none">
                MA FASHION
              </span>
              <span className="text-amber-400 text-[9px] sm:text-[10px] tracking-[0.2em] uppercase opacity-80 group-hover:opacity-100 transition-opacity">
                Global Biotech
              </span>
            </div>
          </div>

          {/* Center: Search Bar (Amazon-style quick lookup on desktop) */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden lg:flex items-center flex-1 max-w-md mx-4 relative"
          >
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={15} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => {
                if (activeTab !== 'catalog') setActiveTab('catalog');
              }}
              placeholder={isEs ? 'Buscar productos, códigos (SP-NUT-01)...' : 'Search products, codes...'}
              className="w-full bg-zinc-900/90 border border-zinc-700/80 hover:border-zinc-600 focus:border-amber-400 rounded-full pl-9 pr-8 py-2 text-xs text-white placeholder-zinc-500 outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                <X size={13} />
              </button>
            )}
          </form>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-6">
            <button
              onClick={() => handleNav('home')}
              className={`text-xs uppercase tracking-wider hover:text-amber-400 transition-all ${
                activeTab === 'home' ? 'text-amber-400 font-bold' : 'text-zinc-300'
              }`}
            >
              {t.nav.home}
            </button>

            {/* Catalog / Marketplace link highlighted */}
            <button
              onClick={() => handleNav('catalog')}
              className={`text-xs uppercase tracking-wider hover:text-amber-400 transition-all flex items-center gap-1.5 ${
                activeTab === 'catalog'
                  ? 'text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/30'
                  : 'text-zinc-300'
              }`}
            >
              <span>{isEs ? 'Catálogo' : 'Catalog'}</span>
            </button>

            {/* S Professional Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsSProfessionalOpen(true)}
              onMouseLeave={() => setIsSProfessionalOpen(false)}
            >
              <div className="flex items-center gap-1 cursor-pointer py-1">
                <button
                  onClick={() => handleNav('sprofessional')}
                  className={`text-xs uppercase tracking-wider hover:text-amber-400 transition-all ${
                    activeTab.startsWith('sp') && activeTab !== 'sprofessional' ? 'text-amber-400 font-bold' : 'text-zinc-300'
                  }`}
                >
                  {t.nav.s}
                </button>
                <ChevronDown
                  size={12}
                  className={`text-zinc-400 transition-transform ${isSProfessionalOpen ? 'rotate-180 text-amber-400' : ''}`}
                />
              </div>

              <AnimatePresence>
                {isSProfessionalOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-56 z-50"
                  >
                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg shadow-2xl overflow-hidden py-1.5">
                      <button
                        onClick={() => handleNav('sprofessional')}
                        className="w-full text-left px-5 py-2.5 text-xs uppercase tracking-wider text-amber-400 font-semibold hover:bg-zinc-800 transition-colors border-b border-zinc-800/80"
                      >
                        {isEs ? 'Ver Línea Completa' : 'View Full Line'}
                      </button>
                      {sProfessionalTreatments.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleNav(item.id)}
                          className="w-full text-left px-5 py-2 text-xs uppercase tracking-wider text-zinc-300 hover:text-amber-400 hover:bg-zinc-800 transition-colors flex items-center justify-between"
                        >
                          <span>{item.label}</span>
                          <ArrowRight size={10} className="text-zinc-600" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => handleNav('sweet')}
              className={`text-xs uppercase tracking-wider hover:text-amber-400 transition-all ${
                activeTab === 'sweet' || activeTab.startsWith('sw') ? 'text-amber-400 font-bold' : 'text-zinc-300'
              }`}
            >
              {t.nav.sweet}
            </button>

            <button
              onClick={() => handleNav('partner')}
              className={`text-xs uppercase tracking-wider hover:text-amber-400 transition-all ${
                activeTab === 'partner' ? 'text-amber-400 font-bold' : 'text-zinc-300'
              }`}
            >
              {t.nav.partner}
            </button>
          </div>

          {/* Right Action Icons: Language, Quote, Cart */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Language Selector */}
            <div
              className="relative hidden sm:block"
              onMouseEnter={() => setIsLangOpen(true)}
              onMouseLeave={() => setIsLangOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors text-xs uppercase tracking-wider py-1.5 px-2 rounded hover:bg-zinc-800"
              >
                <Globe size={13} />
                <span>{flags[lang]}</span>
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 pt-2 min-w-[120px] z-50"
                  >
                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg shadow-2xl overflow-hidden py-1">
                      {Object.keys(flags).map((code) => (
                        <button
                          key={code}
                          onClick={() => {
                            setLang(code as Language);
                            setIsLangOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-xs uppercase tracking-wider hover:bg-zinc-800 transition-colors flex items-center gap-2.5 ${
                            lang === code ? 'text-amber-400 bg-zinc-800/60 font-semibold' : 'text-zinc-400'
                          }`}
                        >
                          <span>{flags[code]}</span>
                          <span>{code.toUpperCase()}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Presupuesto (Quote) Quick Button - Visible on both mobile and desktop */}
            <button
              onClick={onOpenQuote}
              className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all border ${
                activeTab === 'quote'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                  : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-700/80 hover:text-white'
              }`}
              title={isEs ? 'Revisar Presupuesto' : 'Review Quote'}
            >
              <FileText size={14} className="text-amber-400 shrink-0" />
              <span className="hidden xs:inline sm:inline">{isEs ? 'Presupuesto' : 'Quote'}</span>
            </button>

            {/* Catálogo Direct Button for Mobile/Tablet */}
            <button
              onClick={() => handleNav('catalog')}
              className={`xl:hidden flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all border ${
                activeTab === 'catalog'
                  ? 'bg-amber-500 text-black border-amber-400 font-bold shadow-md'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
              }`}
              title={isEs ? 'Ver Catálogo Oficial' : 'View Official Catalog'}
            >
              <ShoppingBag size={14} className="shrink-0" />
              <span>{isEs ? 'Catálogo' : 'Catalog'}</span>
            </button>

            {/* Cart Icon with Dynamic Counter (Amazon-style clear badge) */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg border border-zinc-800 transition-all flex items-center gap-2 group"
              aria-label="Abrir Carrito"
            >
              <ShoppingBag size={18} className="text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="hidden md:inline text-xs font-bold text-white font-mono">
                {cartCount}
              </span>
              {/* Mobile badge */}
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-black text-[10px] font-mono font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg md:hidden">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              className="xl:hidden text-white p-2 hover:bg-zinc-800 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menú"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Expandable */}
        <div className="lg:hidden mt-2 pt-2 border-t border-zinc-900">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" size={14} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => {
                if (activeTab !== 'catalog') setActiveTab('catalog');
              }}
              placeholder={isEs ? 'Buscar en catálogo...' : 'Search catalog...'}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-8 pr-8 py-2 text-xs text-white placeholder-zinc-500 outline-none focus:border-amber-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 p-1"
              >
                <X size={12} />
              </button>
            )}
          </form>

          {/* Mobile Horizontal Quick Navigation Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2 pb-0.5">
            <button
              onClick={() => handleNav('catalog')}
              className={`shrink-0 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'catalog'
                  ? 'bg-amber-500 text-black shadow-md font-bold'
                  : 'bg-zinc-900 text-amber-400 border border-amber-500/30 hover:bg-zinc-800'
              }`}
            >
              <ShoppingBag size={12} className="shrink-0" />
              <span>{isEs ? 'Catálogo Oficial' : 'Official Catalog'}</span>
            </button>

            <button
              onClick={onOpenQuote}
              className={`shrink-0 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'quote'
                  ? 'bg-amber-500 text-black shadow-md font-bold'
                  : 'bg-zinc-900 text-zinc-300 border border-zinc-700 hover:border-amber-400'
              }`}
            >
              <FileText size={12} className="text-amber-400 shrink-0" />
              <span>{isEs ? 'Presupuesto' : 'Quote'}</span>
              {cartCount > 0 && (
                <span className="bg-amber-500 text-black text-[9px] font-mono px-1.5 rounded-full font-bold ml-0.5">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => handleNav('home')}
              className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-zinc-800 text-white border border-zinc-600'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white'
              }`}
            >
              <span>{t.nav.home}</span>
            </button>

            <button
              onClick={() => handleNav('sprofessional')}
              className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab.startsWith('sp')
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white'
              }`}
            >
              <span>S Professional</span>
            </button>

            <button
              onClick={() => handleNav('sweet')}
              className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'sweet'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white'
              }`}
            >
              <span>Sweet Professional</span>
            </button>

            <button
              onClick={() => handleNav('partner')}
              className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'partner'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white'
              }`}
            >
              <span>{t.nav.partner}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-black/98 border-b border-zinc-800 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <button
                onClick={() => handleNav('catalog')}
                className="w-full text-left py-2.5 text-base uppercase tracking-wider text-amber-400 font-bold flex items-center justify-between border-b border-zinc-800"
              >
                <span>{isEs ? 'Catálogo & Tienda' : 'Catalog & Store'}</span>
                <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded">Marketplace</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="w-full text-left py-2 text-sm uppercase tracking-wider text-zinc-300 flex items-center justify-between"
              >
                <span>{isEs ? 'Revisar mi Presupuesto' : 'Review My Quote'}</span>
                <FileText size={16} className="text-amber-400" />
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenCart();
                }}
                className="w-full text-left py-2 text-sm uppercase tracking-wider text-zinc-300 flex items-center justify-between"
              >
                <span>{isEs ? 'Ver Carrito de Compras' : 'View Shopping Cart'}</span>
                <span className="font-mono text-amber-400 font-bold">({cartCount})</span>
              </button>

              <button
                onClick={() => handleNav('home')}
                className="w-full text-left py-2 text-sm uppercase tracking-wider text-zinc-300"
              >
                {t.nav.home}
              </button>

              {/* S Professional Submenu in Mobile */}
              <div className="space-y-2 border-t border-zinc-900 pt-2">
                <button
                  onClick={() => setIsSProfessionalOpen(!isSProfessionalOpen)}
                  className="flex items-center justify-between w-full text-sm uppercase tracking-wider text-zinc-300 py-1"
                >
                  <span>{t.nav.s}</span>
                  <ChevronDown className={`transition-transform ${isSProfessionalOpen ? 'rotate-180 text-amber-400' : ''}`} size={16} />
                </button>
                {isSProfessionalOpen && (
                  <div className="pl-4 space-y-2 border-l border-amber-500/20 py-1">
                    <button
                      onClick={() => handleNav('sprofessional')}
                      className="block text-xs uppercase tracking-wider text-amber-400 py-1"
                    >
                      {t.nav.all}
                    </button>
                    {sProfessionalTreatments.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleNav(item.id)}
                        className="block text-xs uppercase tracking-wider text-zinc-400 hover:text-white py-1"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => handleNav('sweet')}
                className="w-full text-left py-2 text-sm uppercase tracking-wider text-zinc-300"
              >
                {t.nav.sweet}
              </button>

              <button
                onClick={() => handleNav('education')}
                className="w-full text-left py-2 text-sm uppercase tracking-wider text-zinc-300"
              >
                {t.nav.edu}
              </button>

              <button
                onClick={() => handleNav('about')}
                className="w-full text-left py-2 text-sm uppercase tracking-wider text-zinc-300"
              >
                {t.nav.about}
              </button>

              <button
                onClick={() => handleNav('partner')}
                className="w-full text-left py-2 text-sm uppercase tracking-wider text-zinc-300"
              >
                {t.nav.partner}
              </button>

              {/* Language Switcher in Mobile */}
              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-zinc-500">
                  {isEs ? 'Idioma' : 'Language'}
                </span>
                <div className="flex items-center gap-2">
                  {Object.keys(flags).map((code) => (
                    <button
                      key={code}
                      onClick={() => setLang(code as Language)}
                      className={`px-2 py-1 rounded text-xs ${
                        lang === code ? 'bg-amber-500 text-black font-bold' : 'bg-zinc-900 text-zinc-400'
                      }`}
                    >
                      {flags[code]} {code.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

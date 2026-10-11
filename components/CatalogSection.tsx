import React, { useState, useMemo, useEffect } from 'react';
import { Search, ShoppingBag, Eye, Check, Filter, Sparkles, X, ChevronRight } from 'lucide-react';
import { ProductItem, Language, MARKETPLACE_PRODUCTS, MARKETPLACE_CONFIG } from '../data/marketplaceData';
import { OptimizedImage } from './OptimizedImage';
import { preloadCatalogImages } from '../utils/imageOptimizer';

interface CatalogSectionProps {
  onSelectProduct: (product: ProductItem) => void;
  onAddToCart: (product: ProductItem, quantity: number) => void;
  onNavigateDetail: (lineId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  lang: Language;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  onSelectProduct,
  onAddToCart,
  onNavigateDetail,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  lang,
}) => {
  const isEs = lang === 'es';

  // Track quantities in local state per card
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [addedAnimation, setAddedAnimation] = useState<Record<string, boolean>>({});

  // Preload top catalog images in background for instant loading
  useEffect(() => {
    try {
      const topUrls = MARKETPLACE_PRODUCTS.slice(0, 8).map((p) => p.image);
      preloadCatalogImages(topUrls, 500);
    } catch {
      // Ignore background preload failures
    }
  }, []);

  const getQuantity = (id: string) => quantities[id] || 1;

  const setItemQuantity = (id: string, delta: number) => {
    const current = getQuantity(id);
    const updated = Math.max(1, current + delta);
    setQuantities((prev) => ({ ...prev, [id]: updated }));
  };

  const handleAdd = (product: ProductItem) => {
    const q = getQuantity(product.id);
    onAddToCart(product, q);
    setAddedAnimation((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedAnimation((prev) => ({ ...prev, [product.id]: false }));
    }, 1800);
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    return MARKETPLACE_PRODUCTS.filter((p) => {
      // Category match
      if (selectedCategory === 'sp' && p.brand !== 'S Professional') return false;
      if (selectedCategory === 'sweet' && p.brand !== 'Sweet Professional') return false;
      if (selectedCategory === 'homecare' && p.category !== 'homecare') return false;

      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const name = (p.name[lang] || p.name.es || p.name.en).toLowerCase();
        const code = p.code.toLowerCase();
        const brand = p.brand.toLowerCase();
        const desc = (p.description[lang] || p.description.es || '').toLowerCase();
        const assets = p.assets.join(' ').toLowerCase();

        return (
          name.includes(query) ||
          code.includes(query) ||
          brand.includes(query) ||
          desc.includes(query) ||
          assets.includes(query)
        );
      }

      return true;
    });
  }, [selectedCategory, searchQuery, lang]);

  const categories = [
    { id: 'all', label: isEs ? 'Todos los Productos' : 'All Products', count: MARKETPLACE_PRODUCTS.length },
    { id: 'sp', label: 'S Professional', count: MARKETPLACE_PRODUCTS.filter((p) => p.brand === 'S Professional').length },
    { id: 'sweet', label: 'Sweet Professional', count: MARKETPLACE_PRODUCTS.filter((p) => p.brand === 'Sweet Professional').length },
    { id: 'homecare', label: isEs ? 'Línea Home Care' : 'Home Care Line', count: MARKETPLACE_PRODUCTS.filter((p) => p.category === 'homecare').length },
  ];

  return (
    <section className="min-h-screen bg-black pt-32 pb-24 text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Marketplace Banner / Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 rounded-full">
            <Sparkles size={14} className="text-amber-400" />
            <span className="text-amber-300 text-xs font-bold tracking-[0.2em] uppercase">
              {isEs ? 'Marketplace Profesional Oficial' : 'Official Professional Marketplace'}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif text-white tracking-tight">
            {isEs ? 'Catálogo & Tienda Oficial' : 'Catalog & Store'}
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
            {isEs
              ? 'Explore las líneas biotecnológicas exclusivas de MA Fashion LLC. Arme su pedido o cotización para salón con facilidad y atención directa.'
              : 'Explore the exclusive biotechnological lines of MA Fashion LLC. Build your salon order and quote request directly.'}
          </p>
        </div>

        {/* Search Bar & Filter Controls (Amazon-style clean accessibility) */}
        <div className="bg-zinc-950/80 border border-zinc-800 rounded-2xl p-4 sm:p-6 mb-10 shadow-2xl backdrop-blur-md space-y-4">
          {/* Main Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isEs
                  ? 'Buscar por nombre, código (ej. SP-NUT-01), activo (papaína, ozono) o línea...'
                  : 'Search by name, code (e.g. SP-NUT-01), ingredient (papain, ozone), or line...'
              }
              className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl pl-11 pr-10 py-3.5 text-sm text-white placeholder-zinc-500 outline-none focus:border-amber-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-1"
                aria-label="Limpiar búsqueda"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Category Tabs Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-zinc-900">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-amber-500 text-black font-semibold shadow-md'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  {cat.label} ({cat.count})
                </button>
              ))}
            </div>

            <div className="text-xs text-zinc-500 font-mono">
              {filteredProducts.length} {filteredProducts.length === 1 ? (isEs ? 'producto encontrado' : 'product found') : (isEs ? 'productos encontrados' : 'products found')}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center bg-zinc-950 border border-zinc-800 rounded-2xl space-y-4 max-w-lg mx-auto">
            <Search size={36} className="mx-auto text-zinc-600" />
            <h3 className="text-lg font-serif text-white">
              {isEs ? 'No se encontraron productos' : 'No products found'}
            </h3>
            <p className="text-xs text-zinc-400">
              {isEs
                ? `No hay coincidencias para "${searchQuery}". Intente con otro término o seleccione otra categoría.`
                : `No matches found for "${searchQuery}". Try another keyword or category.`}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase rounded transition-colors"
            >
              {isEs ? 'Ver todos los productos' : 'View all products'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, idx) => {
              const name = product.name[lang] || product.name.es || product.name.en;
              const presentation = product.presentation[lang] || product.presentation.es || product.presentation.en;
              const headline = product.headline[lang] || product.headline.es || product.headline.en;
              const qty = getQuantity(product.id);
              const isAdded = addedAnimation[product.id];
              const isDemo = product.priceStatus === 'demo' && MARKETPLACE_CONFIG.USE_DEMO_PRICES;
              const isConfirmed = product.priceStatus === 'confirmed';
              const hasPrice = (isConfirmed || isDemo) && product.price;

              return (
                <div
                  key={product.id}
                  className="bg-zinc-950 border border-zinc-800/90 hover:border-amber-500/40 rounded-xl overflow-hidden shadow-lg transition-all duration-300 flex flex-col group"
                >
                  {/* Image Container with Consistent Aspect Ratio & Shimmer Skeleton */}
                  <div
                    onClick={() => onSelectProduct(product)}
                    className="relative aspect-square max-h-64 sm:max-h-none bg-gradient-to-b from-zinc-900 to-zinc-950 overflow-hidden cursor-pointer p-4 sm:p-5 flex items-center justify-center border-b border-zinc-900"
                  >
                    <OptimizedImage
                      src={product.image}
                      alt={name}
                      width={500}
                      quality={82}
                      fit="contain"
                      priority={idx < 4}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-md"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity pointer-events-none" />

                    {/* Code badge (Top Left) */}
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-mono uppercase bg-black/80 backdrop-blur-md text-amber-400 px-2 py-0.5 rounded border border-amber-500/30">
                        {product.code}
                      </span>
                    </div>

                    {/* Category indicator (Top Right) */}
                    <div className="absolute top-3 right-3">
                      <span className="text-[9px] uppercase tracking-wider bg-black/70 backdrop-blur-md text-zinc-300 px-2 py-0.5 rounded border border-white/10 font-medium">
                        {product.brand}
                      </span>
                    </div>

                    {/* Quick view button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                      <span className="px-3.5 py-1.5 bg-white/95 text-black text-xs font-bold uppercase tracking-wider rounded-full shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <Eye size={14} />
                        <span>{isEs ? 'Ver Ficha' : 'Quick View'}</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                    {/* Title & Specs */}
                    <div className="space-y-1.5">
                      <div
                        onClick={() => onSelectProduct(product)}
                        className="cursor-pointer"
                      >
                        <h3 className="text-base font-serif font-semibold text-white group-hover:text-amber-400 transition-colors line-clamp-1 leading-snug">
                          {name}
                        </h3>
                        <p className="text-xs text-amber-400/80 font-medium line-clamp-1">
                          {headline}
                        </p>
                      </div>

                      <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                        {presentation}
                      </p>

                      {/* Main key assets */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {product.assets.slice(0, 2).map((a, i) => (
                          <span
                            key={i}
                            className="text-[10px] text-zinc-400 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded"
                          >
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price Block & Action Controls */}
                    <div className="space-y-3 pt-2 border-t border-zinc-900">
                      {/* Price / Pending Status */}
                      <div>
                        {hasPrice ? (
                          <div className="flex items-baseline justify-between">
                            <div className="flex items-baseline gap-1">
                              <span className="text-xl font-bold font-mono text-white">
                                ${product.price!.toFixed(2)}
                              </span>
                              <span className="text-[10px] font-mono text-zinc-400">
                                USD{isDemo ? '*' : ''}
                              </span>
                            </div>
                            <span className="text-[9px] font-mono text-amber-400/80">
                              {isDemo ? (isEs ? 'Precio Demo' : 'Demo Ref') : (isEs ? 'Confirmado' : 'Confirmed')}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-amber-300 font-medium">
                              {isEs ? 'Precio pendiente' : 'Price pending'}
                            </span>
                            <span className="text-[9px] text-zinc-500 uppercase">
                              {isEs ? 'A cotizar' : 'To quote'}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Quantity Stepper & Add to Cart Button */}
                      <div className="flex items-center gap-2">
                        {/* Stepper */}
                        <div className="flex items-center border border-zinc-700 bg-zinc-900 rounded shrink-0">
                          <button
                            type="button"
                            onClick={() => setItemQuantity(product.id, -1)}
                            className="px-2 py-1 text-zinc-300 hover:text-white text-xs font-bold disabled:opacity-40"
                            disabled={qty <= 1}
                            aria-label="Disminuir"
                          >
                            −
                          </button>
                          <span className="px-2 py-1 text-xs font-mono font-medium text-white min-w-[22px] text-center">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => setItemQuantity(product.id, 1)}
                            className="px-2 py-1 text-zinc-300 hover:text-white text-xs font-bold"
                            aria-label="Aumentar"
                          >
                            +
                          </button>
                        </div>

                        {/* Add Button */}
                        <button
                          type="button"
                          onClick={() => handleAdd(product)}
                          className={`flex-1 py-2 px-3 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md ${
                            isAdded
                              ? 'bg-emerald-500 text-black shadow-emerald-500/20'
                              : 'bg-amber-500 hover:bg-amber-400 text-black'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check size={14} />
                              <span>{isEs ? '¡Agregado!' : 'Added!'}</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag size={14} />
                              <span>{isEs ? 'Agregar' : 'Add to Cart'}</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Technical detail link */}
                      <div className="flex justify-between items-center text-[11px] pt-1 text-zinc-500">
                        <button
                          onClick={() => onSelectProduct(product)}
                          className="hover:text-amber-400 transition-colors flex items-center gap-0.5"
                        >
                          <span>{isEs ? 'Ficha técnica' : 'Technical spec'}</span>
                          <ChevronRight size={12} />
                        </button>
                        <button
                          onClick={() => onNavigateDetail(product.lineId)}
                          className="hover:text-zinc-300 transition-colors"
                        >
                          {isEs ? 'Ver tratamiento' : 'View treatment'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

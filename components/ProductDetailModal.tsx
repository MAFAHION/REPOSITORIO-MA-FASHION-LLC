import React, { useState } from 'react';
import { X, Check, ShoppingBag, ShieldCheck, Beaker, CheckCircle2, ChevronRight, Activity } from 'lucide-react';
import { ProductItem, Language, MARKETPLACE_CONFIG } from '../data/marketplaceData';
import { OptimizedImage } from './OptimizedImage';

interface ProductDetailModalProps {
  product: ProductItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: ProductItem, quantity: number) => void;
  onViewQuote: () => void;
  lang: Language;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onViewQuote,
  lang,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  if (!isOpen || !product) return null;

  const name = product.name[lang] || product.name.es || product.name.en;
  const presentation = product.presentation[lang] || product.presentation.es || product.presentation.en;
  const headline = product.headline[lang] || product.headline.es || product.headline.en;
  const description = product.description[lang] || product.description.es || product.description.en;
  const benefits = product.benefits[lang] || product.benefits.es || product.benefits.en || [];

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2200);
  };

  const isEs = lang === 'es';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/80 bg-zinc-900/60 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
              {product.code}
            </span>
            <span className="text-xs text-zinc-400 tracking-wider uppercase font-medium">
              {product.brand} · {product.category === 'homecare' ? (isEs ? 'Mantenimiento' : 'Home Care') : (isEs ? 'Línea Salón' : 'Salon Grade')}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-colors"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Image Gallery Column */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] sm:aspect-square max-h-56 sm:max-h-[340px] bg-gradient-to-b from-zinc-900 to-zinc-950 rounded-xl overflow-hidden border border-zinc-800/90 p-3 sm:p-6 flex items-center justify-center group">
                <OptimizedImage
                  src={product.image}
                  alt={name}
                  width={700}
                  quality={85}
                  fit="contain"
                  priority={true}
                  className="w-full h-full object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded text-[11px] font-mono text-zinc-300 border border-white/10">
                  {product.volume}
                </div>
              </div>

              {/* Verified Product Quality Tag */}
              <div className="p-3.5 bg-zinc-900/50 rounded-lg border border-zinc-800/70 flex items-center gap-3 text-xs text-zinc-400">
                <ShieldCheck size={18} className="text-amber-400 shrink-0" />
                <span>
                  {isEs 
                    ? 'Producto original distribuido por MA Fashion LLC. 100% garantizado para uso profesional.'
                    : 'Authentic item distributed by MA Fashion LLC. Professional salon guaranteed.'}
                </span>
              </div>
            </div>

            {/* Product Info & Purchase Module */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-tight leading-snug">
                  {name}
                </h2>
                <p className="text-amber-400/90 text-sm font-medium mt-1">
                  {headline}
                </p>
                <p className="text-zinc-400 text-xs mt-1">
                  <span className="text-zinc-500">{isEs ? 'Presentación: ' : 'Presentation: '}</span>
                  <span className="text-zinc-300 font-medium">{presentation}</span>
                </p>
              </div>

              {/* Price Block */}
              <div className="p-4 bg-zinc-900/70 border border-zinc-800 rounded-xl space-y-2">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-zinc-400 block font-medium">
                      {isEs ? 'Precio unitario' : 'Unit Price'}
                    </span>
                    {product.priceStatus === 'confirmed' && product.price ? (
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold font-mono text-white">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className="text-xs font-mono text-emerald-400 uppercase">
                          {isEs ? 'Precio Confirmado' : 'Confirmed'}
                        </span>
                      </div>
                    ) : product.priceStatus === 'demo' && product.price && MARKETPLACE_CONFIG.USE_DEMO_PRICES ? (
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold font-mono text-amber-300">
                            ${product.price.toFixed(2)}*
                          </span>
                          <span className="text-xs font-mono text-zinc-400">
                            USD
                          </span>
                        </div>
                        <p className="text-[11px] text-amber-400/80 mt-1 flex items-center gap-1.5">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400" />
                          {isEs 
                            ? 'Precio de referencia de demostración — Sujeto a cotización oficial'
                            : 'Demo reference price — Subject to official salon quote'}
                        </p>
                      </div>
                    ) : (
                      <div className="py-1">
                        <span className="text-base font-medium text-amber-300">
                          {isEs ? 'Precio pendiente de confirmación' : 'Price pending confirmation'}
                        </span>
                        <p className="text-[11px] text-zinc-400 mt-0.5">
                          {isEs 
                            ? 'Solicite presupuesto para recibir precio oficial de salón' 
                            : 'Request quote for official wholesale salon pricing'}
                        </p>
                      </div>
                    )}
                  </div>

                  <span className="text-[10px] uppercase font-mono tracking-wider bg-zinc-800 px-2.5 py-1 rounded text-zinc-300">
                    {product.code}
                  </span>
                </div>
              </div>

              {/* Quantity Selector & Add to Cart */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-zinc-700 bg-zinc-900 rounded-lg overflow-hidden shrink-0">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3.5 py-2.5 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors text-base font-bold disabled:opacity-40"
                      disabled={quantity <= 1}
                      aria-label="Disminuir"
                    >
                      −
                    </button>
                    <span className="px-4 py-2 text-sm font-mono font-semibold text-white min-w-[42px] text-center">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3.5 py-2.5 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors text-base font-bold"
                      aria-label="Aumentar"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAdd}
                    className={`flex-1 py-3 px-6 rounded-lg font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2.5 transition-all shadow-lg ${
                      justAdded
                        ? 'bg-emerald-500 text-black shadow-emerald-500/20'
                        : 'bg-amber-500 hover:bg-amber-400 text-black shadow-amber-500/10 hover:shadow-amber-500/20'
                    }`}
                  >
                    {justAdded ? (
                      <>
                        <Check size={18} />
                        <span>{isEs ? '¡Agregado al Carrito!' : 'Added to Cart!'}</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={18} />
                        <span>{isEs ? 'Agregar al Carrito' : 'Add to Cart'}</span>
                      </>
                    )}
                  </button>
                </div>

                {justAdded && (
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => {
                        onClose();
                        onViewQuote();
                      }}
                      className="text-xs text-amber-400 hover:text-amber-300 underline underline-offset-4 flex items-center gap-1"
                    >
                      <span>{isEs ? 'Revisar presupuesto ahora' : 'Review quote now'}</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="border-t border-zinc-800 pt-5 space-y-2">
                <h4 className="text-xs uppercase tracking-widest font-semibold text-zinc-400">
                  {isEs ? 'Descripción del Producto' : 'Product Overview'}
                </h4>
                <p className="text-zinc-300 text-sm leading-relaxed font-light">
                  {description}
                </p>
              </div>

              {/* Intensity Indicators if applicable */}
              {product.intensity && (
                <div className="border-t border-zinc-800 pt-5 space-y-3">
                  <h4 className="text-xs uppercase tracking-widest font-semibold text-zinc-400 flex items-center gap-2">
                    <Activity size={14} className="text-amber-400" />
                    {isEs ? 'Perfil de Intensidad' : 'Intensity Profile'}
                  </h4>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-2.5 bg-zinc-900 rounded-lg border border-zinc-800">
                      <span className="text-[10px] uppercase text-zinc-400 block">
                        {isEs ? 'Hidratación' : 'Hydration'}
                      </span>
                      <span className="text-base font-bold font-mono text-blue-400">
                        {product.intensity.hydration}%
                      </span>
                    </div>
                    <div className="p-2.5 bg-zinc-900 rounded-lg border border-zinc-800">
                      <span className="text-[10px] uppercase text-zinc-400 block">
                        {isEs ? 'Nutrición' : 'Nutrition'}
                      </span>
                      <span className="text-base font-bold font-mono text-amber-400">
                        {product.intensity.nutrition}%
                      </span>
                    </div>
                    <div className="p-2.5 bg-zinc-900 rounded-lg border border-zinc-800">
                      <span className="text-[10px] uppercase text-zinc-400 block">
                        {isEs ? 'Reconstrucción' : 'Reconstruction'}
                      </span>
                      <span className="text-base font-bold font-mono text-rose-400">
                        {product.intensity.reconstruction}%
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Benefits */}
              {benefits.length > 0 && (
                <div className="border-t border-zinc-800 pt-5 space-y-3">
                  <h4 className="text-xs uppercase tracking-widest font-semibold text-zinc-400 flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-400" />
                    {isEs ? 'Beneficios Principales Verificados' : 'Verified Benefits'}
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
                    {benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-400 font-bold">✓</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Assets / Ingredients */}
              {product.assets.length > 0 && (
                <div className="border-t border-zinc-800 pt-5 space-y-3">
                  <h4 className="text-xs uppercase tracking-widest font-semibold text-zinc-400 flex items-center gap-2">
                    <Beaker size={14} className="text-amber-400" />
                    {isEs ? 'Activos y Tecnología Clave' : 'Key Technology'}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {product.assets.map((asset, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-zinc-900 text-zinc-300 border border-zinc-800 text-[11px] rounded"
                      >
                        {asset}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-zinc-900/90 border-t border-zinc-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
          >
            {isEs ? '← Seguir explorando catálogo' : '← Continue shopping'}
          </button>
          <span className="text-[11px] text-zinc-500 font-mono">
            MA Fashion LLC Catalog
          </span>
        </div>
      </div>
    </div>
  );
};

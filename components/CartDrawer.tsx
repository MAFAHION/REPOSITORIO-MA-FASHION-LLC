import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, AlertCircle, ShieldAlert } from 'lucide-react';
import { CartItem, Language, MARKETPLACE_CONFIG } from '../data/marketplaceData';
import { OptimizedImage } from './OptimizedImage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onProceedToQuote: () => void;
  lang: Language;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToQuote,
  lang,
}) => {
  if (!isOpen) return null;

  const isEs = lang === 'es';

  // Calculate totals
  let subtotal = 0;
  let hasPending = false;
  let hasDemo = false;
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  cart.forEach((item) => {
    const p = item.product;
    if (p.priceStatus === 'confirmed' && p.price) {
      subtotal += p.price * item.quantity;
    } else if (p.priceStatus === 'demo' && p.price && MARKETPLACE_CONFIG.USE_DEMO_PRICES) {
      hasDemo = true;
      subtotal += p.price * item.quantity;
    } else {
      hasPending = true;
    }
  });

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm animate-fade-in">
      <div 
        className="absolute inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-full sm:max-w-md bg-zinc-950 border-l border-zinc-800 text-zinc-100 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="px-5 sm:px-6 py-4 sm:py-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
            <div className="flex items-center gap-3">
              <ShoppingBag size={20} className="text-amber-400" />
              <div>
                <h2 className="text-base sm:text-lg font-serif font-semibold text-white tracking-tight">
                  {isEs ? 'Carrito de Compras' : 'Shopping Cart'}
                </h2>
                <span className="text-xs text-zinc-400">
                  {totalItemsCount} {totalItemsCount === 1 ? (isEs ? 'artículo' : 'item') : (isEs ? 'artículos' : 'items')}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  type="button"
                  onClick={onClearCart}
                  className="text-xs text-zinc-400 hover:text-red-400 px-2.5 py-1.5 rounded-lg hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-colors flex items-center gap-1.5 font-medium"
                  title={isEs ? 'Vaciar todo el carrito' : 'Clear all'}
                >
                  <Trash2 size={13} className="text-red-400" />
                  <span>{isEs ? 'Vaciar' : 'Clear'}</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-colors"
                aria-label="Cerrar"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6 divide-y divide-zinc-800/80">
            {cart.length === 0 ? (
              <div className="py-20 text-center space-y-4 px-4">
                <div className="w-16 h-16 mx-auto bg-zinc-900 rounded-full flex items-center justify-center text-zinc-600 border border-zinc-800">
                  <ShoppingBag size={28} />
                </div>
                <div>
                  <h3 className="text-base font-serif text-white">
                    {isEs ? 'Tu carrito está vacío' : 'Your cart is empty'}
                  </h3>
                  <p className="text-xs text-zinc-400 max-w-xs mx-auto mt-1">
                    {isEs 
                      ? 'Explora nuestro catálogo de biotecnología capilar y agrega productos para tu salón.'
                      : 'Explore our catalog of professional hair biotechnology to request a quote.'}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider rounded transition-colors"
                >
                  {isEs ? 'Explorar Catálogo' : 'Browse Catalog'}
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const p = item.product;
                const name = p.name[lang] || p.name.es || p.name.en;
                const pres = p.presentation[lang] || p.presentation.es || p.presentation.en;
                const isItemDemo = p.priceStatus === 'demo' && MARKETPLACE_CONFIG.USE_DEMO_PRICES;
                const isItemConfirmed = p.priceStatus === 'confirmed';
                const hasValidPrice = (isItemConfirmed || isItemDemo) && p.price;
                const lineTotal = hasValidPrice ? (p.price! * item.quantity) : null;

                return (
                  <div key={p.id} className="py-4 sm:py-5 flex gap-3.5 sm:gap-4 items-start group">
                    {/* Thumbnail: Fast responsive WebP thumbnail with shimmer */}
                    <div className="w-20 h-24 bg-gradient-to-b from-zinc-900 to-zinc-950 rounded-xl overflow-hidden border border-zinc-800/90 shrink-0 p-1.5 flex items-center justify-center">
                      <OptimizedImage
                        src={p.image}
                        alt={name}
                        width={160}
                        quality={80}
                        fit="contain"
                        className="w-full h-full object-contain drop-shadow"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between gap-1.5">
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-mono uppercase text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                            {p.code}
                          </span>
                          <h4 className="text-sm font-medium text-white truncate mt-1">
                            {name}
                          </h4>
                        </div>
                        {/* Always visible, tap-friendly delete button with text */}
                        <button
                          type="button"
                          onClick={() => onRemoveItem(p.id)}
                          className="px-2 py-1 text-red-400/80 hover:text-red-300 hover:bg-red-500/10 active:bg-red-500/20 rounded-lg transition-colors shrink-0 flex items-center gap-1 text-xs border border-transparent hover:border-red-500/20"
                          title={isEs ? 'Eliminar del carrito' : 'Remove from cart'}
                          aria-label="Eliminar artículo"
                        >
                          <Trash2 size={14} />
                          <span className="text-[11px] font-medium">{isEs ? 'Eliminar' : 'Delete'}</span>
                        </button>
                      </div>

                      <p className="text-[11px] text-zinc-400 truncate">
                        {pres}
                      </p>

                      {/* Price / Subtotal */}
                      <div className="pt-1 flex items-baseline justify-between">
                        <div>
                          {hasValidPrice ? (
                            <div className="text-xs">
                              <span className="font-mono text-zinc-200 font-semibold">
                                ${p.price!.toFixed(2)}
                              </span>
                              {isItemDemo && (
                                <span className="text-[10px] text-amber-400 ml-1 font-mono">
                                  *
                                </span>
                              )}
                              <span className="text-[10px] text-zinc-500 ml-1">
                                x {item.quantity}
                              </span>
                            </div>
                          ) : (
                            <span className="text-[11px] text-amber-400 font-medium">
                              {isEs ? 'Precio a confirmar' : 'Price to confirm'}
                            </span>
                          )}
                        </div>

                        {lineTotal !== null && (
                          <span className="text-xs font-mono font-bold text-white">
                            ${lineTotal.toFixed(2)} USD
                          </span>
                        )}
                      </div>

                      {/* Quantity Stepper (With minus deleting when quantity is 1) */}
                      <div className="pt-2 flex items-center justify-between">
                        <div className="flex items-center border border-zinc-700 bg-zinc-900 rounded">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(p.id, -1)}
                            className={`px-2.5 py-1 text-xs font-bold transition-colors ${
                              item.quantity === 1
                                ? 'text-red-400 hover:bg-red-500/20'
                                : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
                            }`}
                            title={item.quantity === 1 ? (isEs ? 'Eliminar producto' : 'Remove') : (isEs ? 'Restar' : 'Decrease')}
                            aria-label="Restar o eliminar"
                          >
                            {item.quantity === 1 ? <Trash2 size={13} className="text-red-400" /> : '−'}
                          </button>
                          <span className="px-3 py-1 text-xs font-mono font-medium text-white min-w-[28px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(p.id, 1)}
                            className="px-2.5 py-1 text-zinc-300 hover:text-white hover:bg-zinc-800 text-xs font-bold"
                            aria-label="Sumar"
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(p.id)}
                          className="text-[11px] text-zinc-500 hover:text-red-400 transition-colors"
                        >
                          {isEs ? 'Quitar' : 'Remove'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Breakdown */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-zinc-800 bg-zinc-900/80 space-y-4">
              {/* Warnings and Disclaimers */}
              {(hasDemo || hasPending) && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-start gap-2.5 text-xs text-amber-300/90 leading-tight">
                  <AlertCircle size={16} className="text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    {isEs
                      ? 'Precios sujetos a cotización oficial. Los descuentos especiales para salones y costos de envío se confirmarán en el presupuesto.'
                      : 'Prices subject to official salon quote. Wholesale discounts and shipping confirmed upon review.'}
                  </span>
                </div>
              )}

              {/* Breakdown */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>{isEs ? 'Base imponible (Subtotal)' : 'Taxable Subtotal'}</span>
                  <span className="font-mono text-zinc-200">
                    {subtotal > 0 ? `$${subtotal.toFixed(2)} USD${hasDemo ? '*' : ''}` : (isEs ? 'Por cotizar' : 'To quote')}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <span>{isEs ? 'Tax adicional (6.5%)' : 'Sales Tax (6.5%)'}</span>
                    <span className="text-[10px] text-zinc-500 font-mono">FL</span>
                  </div>
                  <span className="font-mono text-zinc-300">
                    {subtotal > 0 ? `+$${(subtotal * MARKETPLACE_CONFIG.TAX_RATE).toFixed(2)} USD` : (isEs ? 'Por calcular' : 'To calculate')}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-500 text-[11px] items-center pt-0.5">
                  <span>{isEs ? 'Entrega / Retiro' : 'Pickup / Shipping'}</span>
                  <span className="text-zinc-400 text-right">
                    {isEs ? 'Retiro sin cargo o envío aparte' : 'Pickup free / shipping billed separately'}
                  </span>
                </div>
                <div className="border-t border-zinc-800 pt-2 flex justify-between text-sm font-semibold text-white">
                  <span>{isEs ? 'Total Estimado' : 'Estimated Total'}</span>
                  <span className="font-mono text-amber-400">
                    {subtotal > 0 ? `$${(subtotal * (1 + MARKETPLACE_CONFIG.TAX_RATE)).toFixed(2)} USD${hasDemo ? '*' : ''}` : (isEs ? 'Pendiente' : 'Pending')}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    onClose();
                    onProceedToQuote();
                  }}
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-wider text-xs rounded-lg flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <span>{isEs ? 'Revisar Mi Presupuesto' : 'Review My Quote'}</span>
                  <ArrowRight size={16} />
                </button>

                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    onClick={onClose}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    {isEs ? '← Seguir comprando' : '← Continue shopping'}
                  </button>
                  <button
                    onClick={onClearCart}
                    className="text-zinc-500 hover:text-red-400 transition-colors"
                  >
                    {isEs ? 'Vaciar carrito' : 'Clear cart'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

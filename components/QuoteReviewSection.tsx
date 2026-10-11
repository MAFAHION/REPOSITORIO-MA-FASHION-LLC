import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  MessageSquare,
  ShieldCheck,
  AlertCircle,
  Trash2,
  Edit3,
  CheckCircle2,
  Building,
  MapPin,
  User,
  FileText,
  Truck,
  Store,
  Info,
  Check,
  ChevronRight,
  Phone,
  Mail,
  Home,
} from 'lucide-react';
import {
  CartItem,
  Language,
  MARKETPLACE_CONFIG,
  generateWhatsAppQuoteUrl,
  QuoteCustomerInfo,
  DeliveryPreference,
  ShippingAddress,
} from '../data/marketplaceData';
import { OptimizedImage } from './OptimizedImage';

interface QuoteReviewSectionProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart?: () => void;
  onContinueShopping: () => void;
  onOpenCartDrawer: () => void;
  lang: Language;
}

export const QuoteReviewSection: React.FC<QuoteReviewSectionProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onContinueShopping,
  onOpenCartDrawer,
  lang,
}) => {
  const isEs = lang === 'es';

  // 3-step checkout wizard
  // Step 1: Review items with deletion & quantity controls
  // Step 2: Mandatory delivery mode & exact address
  // Step 3: Final verification with quick-delete options & WhatsApp dispatch
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [customerInfo, setCustomerInfo] = useState<QuoteCustomerInfo>({
    name: '',
    salon: '',
    phone: '',
    city: '',
    email: '',
    notes: '',
    deliveryPreference: 'pickup',
    shippingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      notes: '',
    },
  });

  const [addressErrors, setAddressErrors] = useState<{
    street?: boolean;
    city?: boolean;
    state?: boolean;
    zipCode?: boolean;
  }>({});

  const [hasClickedWhatsApp, setHasClickedWhatsApp] = useState(false);

  // Totals calculation
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

  // Calculate 6.5% Tax
  const taxAmount = subtotal * MARKETPLACE_CONFIG.TAX_RATE;
  const totalWithTax = subtotal + taxAmount;

  // Validation before advancing to step 3
  const handleProceedToVerification = () => {
    if (customerInfo.deliveryPreference === 'shipping') {
      const addr = customerInfo.shippingAddress || {
        street: '',
        city: '',
        state: '',
        zipCode: '',
      };
      const errors: { street?: boolean; city?: boolean; state?: boolean; zipCode?: boolean } = {};
      if (!addr.street?.trim()) errors.street = true;
      if (!addr.city?.trim()) errors.city = true;
      if (!addr.state?.trim()) errors.state = true;
      if (!addr.zipCode?.trim()) errors.zipCode = true;

      if (Object.keys(errors).length > 0) {
        setAddressErrors(errors);
        const target = document.getElementById('shipping-address-container');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }
    }

    setAddressErrors({});
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppClick = () => {
    if (cart.length === 0) return;
    const url = generateWhatsAppQuoteUrl(cart, customerInfo, lang);
    setHasClickedWhatsApp(true);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleUpdateShippingAddress = (field: keyof ShippingAddress, value: string) => {
    setCustomerInfo((prev) => ({
      ...prev,
      shippingAddress: {
        street: prev.shippingAddress?.street || '',
        city: prev.shippingAddress?.city || '',
        state: prev.shippingAddress?.state || '',
        zipCode: prev.shippingAddress?.zipCode || '',
        notes: prev.shippingAddress?.notes || '',
        [field]: value,
      },
    }));

    if (addressErrors[field as keyof typeof addressErrors]) {
      setAddressErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  return (
    <section className="min-h-screen bg-black pt-24 sm:pt-32 pb-20 px-3 sm:px-6 text-zinc-100">
      <div className="max-w-6xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => {
              if (currentStep === 3) setCurrentStep(2);
              else if (currentStep === 2) setCurrentStep(1);
              else onContinueShopping();
            }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400 hover:text-amber-400 transition-colors p-1"
          >
            <ArrowLeft size={16} />
            <span>
              {currentStep === 1
                ? (isEs ? 'Seguir Comprando' : 'Continue Shopping')
                : currentStep === 2
                ? (isEs ? 'Volver a Artículos' : 'Back to Items')
                : (isEs ? 'Volver a Entrega' : 'Back to Delivery')}
            </span>
          </button>

          <span className="text-[11px] sm:text-xs text-zinc-500 font-mono">
            MA FASHION LLC · {isEs ? 'Presupuesto Oficial' : 'Official Quote'}
          </span>
        </div>

        {/* Stepper Progress Bar (Ultra-responsive on mobile) */}
        <div className="mb-8 bg-zinc-950 border border-zinc-800 rounded-2xl p-2.5 sm:p-4 shadow-xl">
          <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
            {/* Step 1 */}
            <button
              onClick={() => setCurrentStep(1)}
              className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-xl transition-all text-left ${
                currentStep === 1
                  ? 'bg-amber-500/10 border border-amber-500/40 shadow-sm'
                  : 'hover:bg-zinc-900/60'
              }`}
            >
              <div
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono text-[11px] sm:text-xs font-bold shrink-0 ${
                  currentStep > 1
                    ? 'bg-emerald-500 text-black'
                    : currentStep === 1
                    ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                    : 'bg-zinc-800 text-zinc-400'
                }`}
              >
                {currentStep > 1 ? <Check size={13} strokeWidth={3} /> : '1'}
              </div>
              <div className="min-w-0">
                <span className="hidden sm:block text-[10px] uppercase font-mono tracking-wider text-zinc-500">
                  {isEs ? 'Paso 1' : 'Step 1'}
                </span>
                <span
                  className={`text-[11px] sm:text-sm font-medium truncate block ${
                    currentStep === 1 ? 'text-amber-400 font-semibold' : 'text-zinc-300'
                  }`}
                >
                  {isEs ? 'Artículos' : 'Items'} <span className="text-zinc-500">({totalItemsCount})</span>
                </span>
              </div>
            </button>

            {/* Step 2 */}
            <button
              onClick={() => {
                if (cart.length > 0) setCurrentStep(2);
              }}
              disabled={cart.length === 0}
              className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-xl transition-all text-left ${
                currentStep === 2
                  ? 'bg-amber-500/10 border border-amber-500/40 shadow-sm'
                  : 'hover:bg-zinc-900/60'
              }`}
            >
              <div
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono text-[11px] sm:text-xs font-bold shrink-0 ${
                  currentStep > 2
                    ? 'bg-emerald-500 text-black'
                    : currentStep === 2
                    ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                    : 'bg-zinc-800 text-zinc-400'
                }`}
              >
                {currentStep > 2 ? <Check size={13} strokeWidth={3} /> : '2'}
              </div>
              <div className="min-w-0">
                <span className="hidden sm:block text-[10px] uppercase font-mono tracking-wider text-zinc-500">
                  {isEs ? 'Paso 2 (Requerido)' : 'Step 2 (Required)'}
                </span>
                <span
                  className={`text-[11px] sm:text-sm font-medium truncate block ${
                    currentStep === 2 ? 'text-amber-400 font-semibold' : 'text-zinc-300'
                  }`}
                >
                  {isEs ? 'Entrega' : 'Delivery'}
                </span>
              </div>
            </button>

            {/* Step 3 */}
            <button
              onClick={() => {
                if (cart.length > 0) handleProceedToVerification();
              }}
              disabled={cart.length === 0}
              className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-xl transition-all text-left ${
                currentStep === 3
                  ? 'bg-amber-500/10 border border-amber-500/40 shadow-sm'
                  : 'hover:bg-zinc-900/60'
              }`}
            >
              <div
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono text-[11px] sm:text-xs font-bold shrink-0 ${
                  currentStep === 3
                    ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                    : 'bg-zinc-800 text-zinc-400'
                }`}
              >
                3
              </div>
              <div className="min-w-0">
                <span className="hidden sm:block text-[10px] uppercase font-mono tracking-wider text-zinc-500">
                  {isEs ? 'Paso 3' : 'Step 3'}
                </span>
                <span
                  className={`text-[11px] sm:text-sm font-medium truncate block ${
                    currentStep === 3 ? 'text-amber-400 font-semibold' : 'text-zinc-300'
                  }`}
                >
                  {isEs ? 'Verificar' : 'Verify'}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Empty State */}
        {cart.length === 0 ? (
          <div className="p-10 sm:p-16 bg-zinc-950 border border-zinc-800 rounded-2xl text-center max-w-md mx-auto space-y-5">
            <div className="w-16 h-16 mx-auto bg-zinc-900 rounded-full flex items-center justify-center text-zinc-600">
              <ShoppingBag size={28} />
            </div>
            <h3 className="text-xl font-serif text-white">
              {isEs ? 'No tienes productos en tu presupuesto' : 'No products in your quote'}
            </h3>
            <p className="text-xs text-zinc-400">
              {isEs
                ? 'Agrega productos desde nuestro catálogo profesional para armar tu cotización personalizada.'
                : 'Add products from our professional catalog to build your custom quote.'}
            </p>
            <button
              onClick={onContinueShopping}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider rounded-lg transition-colors"
            >
              {isEs ? 'Ir al Catálogo de Productos' : 'Go to Product Catalog'}
            </button>
          </div>
        ) : (
          /* Multi-step Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            {/* Left Column: Form & Items */}
            <div className="lg:col-span-7 space-y-6">
              {/* ============================================================ */}
              {/* STEP 1: REVIEW PRODUCTS LIST */}
              {/* ============================================================ */}
              {currentStep === 1 && (
                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl animate-fade-in">
                  <div className="px-4 sm:px-6 py-4 bg-zinc-900/60 border-b border-zinc-800 flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-200">
                        {isEs ? '1. Productos en Presupuesto' : '1. Selected Products'}
                      </h2>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        {isEs
                          ? 'Ajuste cantidades o elimine productos antes de seleccionar la entrega.'
                          : 'Adjust quantities or remove items before proceeding to delivery.'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {onClearCart && cart.length > 0 && (
                        <button
                          type="button"
                          onClick={onClearCart}
                          className="text-xs text-zinc-400 hover:text-red-400 px-2.5 py-1.5 rounded-lg hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-colors flex items-center gap-1 font-medium"
                          title={isEs ? 'Vaciar todo el presupuesto' : 'Clear all'}
                        >
                          <Trash2 size={13} className="text-red-400" />
                          <span>{isEs ? 'Vaciar todo' : 'Clear all'}</span>
                        </button>
                      )}
                      <button
                        onClick={onOpenCartDrawer}
                        className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors p-1"
                      >
                        <Edit3 size={14} />
                        <span className="hidden sm:inline">{isEs ? 'Vista lateral' : 'Side cart'}</span>
                      </button>
                    </div>
                  </div>

                  {/* List of items with high-end mobile responsive cards */}
                  <div className="p-3 sm:p-5 space-y-3 sm:space-y-4">
                    {cart.map((item) => {
                      const p = item.product;
                      const name = p.name[lang] || p.name.es || p.name.en;
                      const pres = p.presentation[lang] || p.presentation.es || p.presentation.en;
                      const isItemDemo = p.priceStatus === 'demo' && MARKETPLACE_CONFIG.USE_DEMO_PRICES;
                      const isItemConfirmed = p.priceStatus === 'confirmed';
                      const hasValidPrice = (isItemConfirmed || isItemDemo) && p.price;
                      const lineTotal = hasValidPrice ? p.price! * item.quantity : null;

                      return (
                        <div
                          key={p.id}
                          className="p-3.5 sm:p-4 bg-zinc-900/40 rounded-xl border border-zinc-800/80 hover:border-zinc-700/80 transition-all flex flex-col gap-3"
                        >
                          {/* Top Row: Thumbnail + Product Info + Explicit Delete Button */}
                          <div className="flex items-start gap-3 sm:gap-4">
                            {/* Product Image: Cleanly framed, zero cut-off, fast WebP loading */}
                            <div className="w-16 h-20 sm:w-20 sm:h-24 bg-gradient-to-b from-zinc-900 to-zinc-950 rounded-xl overflow-hidden border border-zinc-800 shrink-0 p-1 flex items-center justify-center">
                              <OptimizedImage
                                src={p.image}
                                alt={name}
                                width={160}
                                quality={80}
                                fit="contain"
                                className="w-full h-full object-contain drop-shadow"
                              />
                            </div>

                            {/* Product Info */}
                            <div className="flex-1 min-w-0 space-y-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-[10px] font-mono uppercase text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                                  {p.code}
                                </span>
                                <span className="text-[11px] text-zinc-500 uppercase font-medium">
                                  {p.brand}
                                </span>
                              </div>
                              <h4 className="text-sm font-serif font-medium text-white leading-snug truncate">
                                {name}
                              </h4>
                              <p className="text-[11px] sm:text-xs text-zinc-400 truncate">
                                {pres}
                              </p>
                              {hasValidPrice ? (
                                <p className="text-xs font-mono text-zinc-300">
                                  ${p.price!.toFixed(2)} USD{' '}
                                  <span className="text-[10px] text-zinc-500">
                                    c/u{isItemDemo ? '*' : ''}
                                  </span>
                                </p>
                              ) : (
                                <p className="text-xs text-amber-400/90 font-medium">
                                  {isEs ? 'Precio pendiente' : 'Price pending'}
                                </p>
                              )}
                            </div>

                            {/* Explicit Delete Button (Always Visible, Top-Right) */}
                            <button
                              type="button"
                              onClick={() => onRemoveItem(p.id)}
                              className="px-2.5 py-1.5 text-red-400/90 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 active:bg-red-500/30 rounded-lg transition-colors shrink-0 flex items-center gap-1.5 text-xs border border-red-500/20 hover:border-red-500/40 font-medium"
                              title={isEs ? 'Eliminar artículo del presupuesto' : 'Remove item from quote'}
                              aria-label="Eliminar artículo"
                            >
                              <Trash2 size={14} />
                              <span>{isEs ? 'Eliminar' : 'Remove'}</span>
                            </button>
                          </div>

                          {/* Bottom Row: Stepper + Total Price */}
                          <div className="pt-2.5 border-t border-zinc-800/80 flex items-center justify-between">
                            {/* Quantity control */}
                            <div className="flex items-center gap-2">
                              <div className="flex items-center border border-zinc-700 bg-zinc-900 rounded-lg overflow-hidden">
                                <button
                                  type="button"
                                  onClick={() => onUpdateQuantity(p.id, -1)}
                                  className={`px-3 py-1 text-xs font-bold transition-colors ${
                                    item.quantity === 1
                                      ? 'text-red-400 hover:bg-red-500/20'
                                      : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
                                  }`}
                                  title={
                                    item.quantity === 1
                                      ? isEs
                                        ? 'Eliminar artículo'
                                        : 'Remove item'
                                      : isEs
                                      ? 'Restar unidad'
                                      : 'Decrease'
                                  }
                                  aria-label="Restar o eliminar"
                                >
                                  {item.quantity === 1 ? (
                                    <Trash2 size={13} className="text-red-400" />
                                  ) : (
                                    '−'
                                  )}
                                </button>
                                <span className="px-3 py-1 text-xs font-mono font-semibold text-white min-w-[28px] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => onUpdateQuantity(p.id, 1)}
                                  className="px-3 py-1 text-zinc-300 hover:text-white hover:bg-zinc-800 text-xs font-bold transition-colors"
                                  aria-label="Sumar unidad"
                                >
                                  +
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={() => onRemoveItem(p.id)}
                                className="text-[11px] text-zinc-500 hover:text-red-400 transition-colors sm:hidden"
                              >
                                {isEs ? 'Eliminar' : 'Remove'}
                              </button>
                            </div>

                            {/* Line Total */}
                            <div className="text-right">
                              {lineTotal !== null ? (
                                <span className="font-mono text-sm sm:text-base font-bold text-white">
                                  ${lineTotal.toFixed(2)} USD
                                </span>
                              ) : (
                                <span className="text-xs font-medium text-amber-400">
                                  {isEs ? 'Precio pendiente' : 'Price pending'}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Step 1 Footer */}
                  <div className="p-4 sm:p-5 bg-zinc-900/40 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      onClick={onContinueShopping}
                      className="text-xs text-zinc-400 hover:text-white transition-colors"
                    >
                      {isEs ? '← Seguir explorando catálogo' : '← Keep browsing catalog'}
                    </button>
                    <button
                      onClick={() => {
                        setCurrentStep(2);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-wider text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
                    >
                      <span>{isEs ? 'Siguiente: Modalidad de Entrega' : 'Next: Delivery Method'}</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* ============================================================ */}
              {/* STEP 2: MANDATORY DELIVERY SELECTION & EXACT ADDRESS */}
              {/* ============================================================ */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 sm:p-7 space-y-6 shadow-xl">
                    <div className="border-b border-zinc-800 pb-4">
                      <div className="inline-block px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold tracking-[0.2em] uppercase rounded mb-2">
                        {isEs ? 'Paso 2 Obligatorio' : 'Step 2 Required'}
                      </div>
                      <h2 className="text-xl sm:text-2xl font-serif text-white">
                        {isEs ? '¿Cómo desea recibir su pedido?' : 'How would you like to receive your order?'}
                      </h2>
                      <p className="text-xs text-zinc-400 mt-1">
                        {isEs
                          ? 'Seleccione obligatoriamente si desea retirar en persona o solicitar envío antes de continuar.'
                          : 'Select whether you prefer personal pickup or delivery.'}
                      </p>
                    </div>

                    {/* Delivery Option Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Pickup Option */}
                      <div
                        onClick={() =>
                          setCustomerInfo((prev) => ({ ...prev, deliveryPreference: 'pickup' }))
                        }
                        className={`cursor-pointer rounded-2xl p-4 sm:p-5 border transition-all flex flex-col justify-between ${
                          customerInfo.deliveryPreference === 'pickup'
                            ? 'bg-amber-500/10 border-amber-500 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500'
                            : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                              <Store size={22} />
                            </div>
                            <div
                              className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                                customerInfo.deliveryPreference === 'pickup'
                                  ? 'border-amber-400 bg-amber-400 text-black'
                                  : 'border-zinc-600'
                              }`}
                            >
                              {customerInfo.deliveryPreference === 'pickup' && (
                                <Check size={12} strokeWidth={3} />
                              )}
                            </div>
                          </div>

                          <div>
                            <h3 className="text-sm font-semibold text-white">
                              {isEs ? 'Retiro en persona (Pickup)' : 'Personal Pickup'}
                            </h3>
                            <span className="inline-block mt-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                              {isEs ? 'Sin costo de flete ($0.00)' : 'Free Pickup ($0.00)'}
                            </span>
                          </div>

                          <p className="text-xs text-zinc-400 leading-relaxed">
                            {isEs
                              ? 'Puede pasar a retirar los productos directamente en Orlando, FL sin costo adicional.'
                              : 'Pick up your order directly in Orlando, FL with no delivery charge.'}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-zinc-800/80 mt-3 text-[11px] text-zinc-500 flex items-center gap-1.5">
                          <MapPin size={13} className="text-amber-400 shrink-0" />
                          <span>Orlando, FL (Showroom & Almacén)</span>
                        </div>
                      </div>

                      {/* Shipping Option */}
                      <div
                        onClick={() =>
                          setCustomerInfo((prev) => ({ ...prev, deliveryPreference: 'shipping' }))
                        }
                        className={`cursor-pointer rounded-2xl p-4 sm:p-5 border transition-all flex flex-col justify-between ${
                          customerInfo.deliveryPreference === 'shipping'
                            ? 'bg-amber-500/10 border-amber-500 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500'
                            : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                              <Truck size={22} />
                            </div>
                            <div
                              className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                                customerInfo.deliveryPreference === 'shipping'
                                  ? 'border-amber-400 bg-amber-400 text-black'
                                  : 'border-zinc-600'
                              }`}
                            >
                              {customerInfo.deliveryPreference === 'shipping' && (
                                <Check size={12} strokeWidth={3} />
                              )}
                            </div>
                          </div>

                          <div>
                            <h3 className="text-sm font-semibold text-white">
                              {isEs ? 'Envío a salón / domicilio' : 'Delivery / Shipping'}
                            </h3>
                            <span className="inline-block mt-1 text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-bold">
                              {isEs ? 'Se cobra aparte (por cotizar)' : 'Billed separately'}
                            </span>
                          </div>

                          <p className="text-xs text-zinc-400 leading-relaxed">
                            {isEs
                              ? 'El flete se cobra aparte según la distancia, volumen y peso del paquete.'
                              : 'Shipping is billed separately according to distance, volume, and weight.'}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-zinc-800/80 mt-3 text-[11px] text-zinc-500 flex items-center gap-1.5">
                          <Info size={13} className="text-amber-400 shrink-0" />
                          <span>{isEs ? 'Requiere ingresar dirección exacta' : 'Exact address required'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Policy note */}
                    <div className="p-3 bg-zinc-900/70 border border-zinc-800 rounded-xl flex items-start gap-2.5 text-xs text-zinc-300 leading-relaxed">
                      <Info size={15} className="text-amber-400 shrink-0 mt-0.5" />
                      <span>
                        {isEs
                          ? 'Información logística: Puede retirar en persona sin costo o solicitar envío. El envío se cobra aparte y su valor se determina en función de la distancia, el volumen y el peso del pedido.'
                          : 'Logistics information: Pick up in person for free or request delivery. Shipping is billed separately based on distance, volume, and weight.'}
                      </span>
                    </div>
                  </div>

                  {/* MANDATORY ADDRESS FORM IF SHIPPING IS SELECTED */}
                  {customerInfo.deliveryPreference === 'shipping' && (
                    <div
                      id="shipping-address-container"
                      className="bg-zinc-950 border border-amber-500/40 rounded-2xl p-5 sm:p-7 space-y-4 shadow-xl ring-1 ring-amber-500/20 animate-fade-in"
                    >
                      <div className="flex items-center gap-2 text-amber-400">
                        <MapPin size={18} />
                        <h3 className="text-sm font-bold uppercase tracking-wider">
                          {isEs
                            ? 'Dirección Exacta de Envío (Obligatorio)'
                            : 'Exact Delivery Address (Required)'}
                        </h3>
                      </div>
                      <p className="text-xs text-zinc-400">
                        {isEs
                          ? 'Indique la dirección exacta donde desea recibir los productos para cotizar el flete correctamente.'
                          : 'Provide the exact address to accurately quote the shipping cost.'}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-1">
                        {/* Street Address */}
                        <div className="sm:col-span-2">
                          <label className="text-[11px] text-zinc-300 uppercase tracking-wider block mb-1 font-medium">
                            {isEs ? 'Calle, número y Suite / Apto *' : 'Street Address & Suite / Unit *'}
                          </label>
                          <input
                            type="text"
                            required
                            value={customerInfo.shippingAddress?.street || ''}
                            onChange={(e) => handleUpdateShippingAddress('street', e.target.value)}
                            placeholder="Ej. 7200 International Dr, Suite 100"
                            className={`w-full bg-zinc-900 border rounded-lg px-3.5 py-3 text-xs sm:text-sm text-white placeholder-zinc-500 outline-none transition-colors ${
                              addressErrors.street
                                ? 'border-red-500 focus:border-red-400 ring-1 ring-red-500/40'
                                : 'border-zinc-700 focus:border-amber-400'
                            }`}
                          />
                          {addressErrors.street && (
                            <span className="text-[11px] text-red-400 mt-1 block">
                              {isEs ? 'La calle y número son obligatorios' : 'Street address is required'}
                            </span>
                          )}
                        </div>

                        {/* City */}
                        <div>
                          <label className="text-[11px] text-zinc-300 uppercase tracking-wider block mb-1 font-medium">
                            {isEs ? 'Ciudad *' : 'City *'}
                          </label>
                          <input
                            type="text"
                            required
                            value={customerInfo.shippingAddress?.city || ''}
                            onChange={(e) => handleUpdateShippingAddress('city', e.target.value)}
                            placeholder="Ej. Orlando"
                            className={`w-full bg-zinc-900 border rounded-lg px-3.5 py-3 text-xs sm:text-sm text-white placeholder-zinc-500 outline-none transition-colors ${
                              addressErrors.city
                                ? 'border-red-500 focus:border-red-400 ring-1 ring-red-500/40'
                                : 'border-zinc-700 focus:border-amber-400'
                            }`}
                          />
                          {addressErrors.city && (
                            <span className="text-[11px] text-red-400 mt-1 block">
                              {isEs ? 'La ciudad es obligatoria' : 'City is required'}
                            </span>
                          )}
                        </div>

                        {/* State & Zip Code */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] text-zinc-300 uppercase tracking-wider block mb-1 font-medium">
                              {isEs ? 'Estado *' : 'State *'}
                            </label>
                            <input
                              type="text"
                              required
                              value={customerInfo.shippingAddress?.state || ''}
                              onChange={(e) => handleUpdateShippingAddress('state', e.target.value)}
                              placeholder="FL"
                              className={`w-full bg-zinc-900 border rounded-lg px-3 py-3 text-xs sm:text-sm text-white placeholder-zinc-500 outline-none transition-colors ${
                                addressErrors.state
                                  ? 'border-red-500 focus:border-red-400 ring-1 ring-red-500/40'
                                  : 'border-zinc-700 focus:border-amber-400'
                              }`}
                            />
                            {addressErrors.state && (
                              <span className="text-[11px] text-red-400 mt-1 block">
                                {isEs ? 'Requerido' : 'Required'}
                              </span>
                            )}
                          </div>

                          <div>
                            <label className="text-[11px] text-zinc-300 uppercase tracking-wider block mb-1 font-medium">
                              {isEs ? 'Zip Code *' : 'Zip Code *'}
                            </label>
                            <input
                              type="text"
                              required
                              value={customerInfo.shippingAddress?.zipCode || ''}
                              onChange={(e) => handleUpdateShippingAddress('zipCode', e.target.value)}
                              placeholder="32819"
                              className={`w-full bg-zinc-900 border rounded-lg px-3 py-3 text-xs sm:text-sm text-white placeholder-zinc-500 outline-none transition-colors ${
                                addressErrors.zipCode
                                  ? 'border-red-500 focus:border-red-400 ring-1 ring-red-500/40'
                                  : 'border-zinc-700 focus:border-amber-400'
                              }`}
                            />
                            {addressErrors.zipCode && (
                              <span className="text-[11px] text-red-400 mt-1 block">
                                {isEs ? 'Requerido' : 'Required'}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Delivery Instructions */}
                        <div className="sm:col-span-2">
                          <label className="text-[11px] text-zinc-400 uppercase tracking-wider block mb-1">
                            {isEs
                              ? 'Indicaciones de entrega / Horario preferido (Opcional)'
                              : 'Delivery instructions (Optional)'}
                          </label>
                          <input
                            type="text"
                            value={customerInfo.shippingAddress?.notes || ''}
                            onChange={(e) => handleUpdateShippingAddress('notes', e.target.value)}
                            placeholder={isEs ? 'Ej. Dejar en recepción del salón...' : 'e.g. Leave at salon reception...'}
                            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 outline-none focus:border-amber-400"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Customer Information Card */}
                  <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 sm:p-6 space-y-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                      <User size={16} className="text-amber-400" />
                      <span>{isEs ? 'Datos del Profesional / Salón' : 'Stylist / Salon Information'}</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-1">
                      <div>
                        <label className="text-[11px] text-zinc-400 uppercase tracking-wider block mb-1">
                          {isEs ? 'Nombre Completo' : 'Full Name'}
                        </label>
                        <input
                          type="text"
                          value={customerInfo.name}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                          placeholder="Ej. Katherine Avendaño"
                          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 outline-none focus:border-amber-400"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-zinc-400 uppercase tracking-wider block mb-1">
                          {isEs ? 'Nombre del Salón / Negocio' : 'Salon / Business'}
                        </label>
                        <input
                          type="text"
                          value={customerInfo.salon}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, salon: e.target.value })}
                          placeholder="Ej. Studio Hair Luxury"
                          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 outline-none focus:border-amber-400"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-zinc-400 uppercase tracking-wider block mb-1">
                          {isEs ? 'Teléfono de Contacto' : 'Phone Number'}
                        </label>
                        <input
                          type="tel"
                          value={customerInfo.phone || ''}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                          placeholder="+1 (407) 000-0000"
                          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 outline-none focus:border-amber-400"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-zinc-400 uppercase tracking-wider block mb-1">
                          {isEs ? 'Email' : 'Email Address'}
                        </label>
                        <input
                          type="email"
                          value={customerInfo.email}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                          placeholder="salon@ejemplo.com"
                          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 outline-none focus:border-amber-400"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-[11px] text-zinc-400 uppercase tracking-wider block mb-1">
                          {isEs ? 'Notas adicionales / Consultas técnicas' : 'Additional Notes / Questions'}
                        </label>
                        <textarea
                          rows={2}
                          value={customerInfo.notes}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                          placeholder={isEs ? 'Ej. Preguntar por descuento por volumen o fechas de entrega...' : 'e.g. Inquire about bulk discounts...'}
                          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3.5 py-2 text-xs text-white placeholder-zinc-500 outline-none focus:border-amber-400 resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 2 Buttons */}
                  <div className="flex items-center justify-between gap-3 pt-2">
                    <button
                      onClick={() => {
                        setCurrentStep(1);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-4 sm:px-5 py-3 border border-zinc-700 hover:border-zinc-500 text-zinc-300 text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors"
                    >
                      {isEs ? '← Volver a Artículos' : '← Back to Items'}
                    </button>
                    <button
                      onClick={handleProceedToVerification}
                      className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-wider text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
                    >
                      <span>{isEs ? 'Verificar Presupuesto' : 'Verify Quote'}</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* ============================================================ */}
              {/* STEP 3: FINAL VERIFICATION & WHATSAPP DISPATCH */}
              {/* ============================================================ */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 sm:p-7 space-y-6 shadow-xl">
                    <div className="border-b border-zinc-800 pb-4 flex items-center justify-between">
                      <div>
                        <div className="inline-block px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold tracking-[0.2em] uppercase rounded mb-2">
                          {isEs ? 'Paso 3: Verificación Completa' : 'Step 3: Verification'}
                        </div>
                        <h2 className="text-xl sm:text-2xl font-serif text-white">
                          {isEs ? 'Verificación de su Presupuesto' : 'Verify Your Quote Details'}
                        </h2>
                      </div>
                      <button
                        onClick={() => setCurrentStep(2)}
                        className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 p-1"
                      >
                        <Edit3 size={14} />
                        <span>{isEs ? 'Modificar' : 'Edit'}</span>
                      </button>
                    </div>

                    {/* Summary of Items with Instant Delete Capability */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-zinc-400">
                        <span className="uppercase tracking-wider font-semibold text-zinc-300">
                          {isEs ? 'Productos Seleccionados' : 'Selected Products'} ({totalItemsCount} unid.)
                        </span>
                        <div className="flex items-center gap-3">
                          {onClearCart && cart.length > 0 && (
                            <button
                              type="button"
                              onClick={onClearCart}
                              className="text-xs text-zinc-400 hover:text-red-400 flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-red-500/10"
                            >
                              <Trash2 size={12} className="text-red-400" />
                              <span>{isEs ? 'Vaciar todo' : 'Clear all'}</span>
                            </button>
                          )}
                          <button
                            onClick={() => setCurrentStep(1)}
                            className="text-[11px] text-amber-400 hover:underline"
                          >
                            {isEs ? 'Editar en paso 1' : 'Edit in step 1'}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {cart.map((item) => {
                          const p = item.product;
                          const name = p.name[lang] || p.name.es || p.name.en;
                          const pres = p.presentation[lang] || p.presentation.es || p.presentation.en;
                          const isItemDemo = p.priceStatus === 'demo' && MARKETPLACE_CONFIG.USE_DEMO_PRICES;
                          const isItemConfirmed = p.priceStatus === 'confirmed';
                          const hasValidPrice = (isItemConfirmed || isItemDemo) && p.price;
                          const lineTotal = hasValidPrice ? p.price! * item.quantity : null;

                          return (
                            <div
                              key={p.id}
                              className="p-3.5 sm:p-4 bg-zinc-900/60 border border-zinc-800/90 rounded-xl space-y-3 shadow-md"
                            >
                              {/* Top row: Thumbnail, details, and prominent Delete button */}
                              <div className="flex items-start gap-3 sm:gap-4">
                                <div className="w-14 h-18 sm:w-16 sm:h-20 bg-zinc-950 rounded-lg overflow-hidden border border-zinc-800 shrink-0 p-1 flex items-center justify-center">
                                  <OptimizedImage
                                    src={p.image}
                                    alt={name}
                                    width={160}
                                    quality={80}
                                    fit="contain"
                                    className="w-full h-full object-contain drop-shadow"
                                  />
                                </div>

                                <div className="min-w-0 flex-1 space-y-0.5">
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="text-amber-400 font-mono text-[10px] bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                                      {p.code}
                                    </span>
                                    <span className="text-[10px] uppercase font-semibold text-zinc-500">
                                      {p.brand}
                                    </span>
                                  </div>
                                  <h4 className="text-xs sm:text-sm font-medium text-white truncate">
                                    {name}
                                  </h4>
                                  <p className="text-[11px] text-zinc-400 truncate">
                                    {pres}
                                  </p>
                                  <div className="text-[11px] font-mono text-zinc-400">
                                    {hasValidPrice ? (
                                      <span>${p.price!.toFixed(2)} USD c/u{isItemDemo ? '*' : ''}</span>
                                    ) : (
                                      <span className="text-amber-400/90 font-medium">{isEs ? 'Precio pendiente' : 'Price pending'}</span>
                                    )}
                                  </div>
                                </div>

                                {/* Prominent, tap-friendly Delete Button (Always Visible) */}
                                <button
                                  type="button"
                                  onClick={() => onRemoveItem(p.id)}
                                  className="px-2.5 py-1.5 bg-red-500/10 hover:bg-red-500/20 active:bg-red-500/30 text-red-400 hover:text-red-300 rounded-lg border border-red-500/30 hover:border-red-500/50 transition-all flex items-center gap-1 text-xs shrink-0 font-medium"
                                  title={isEs ? 'Eliminar del presupuesto' : 'Remove item'}
                                  aria-label="Eliminar artículo"
                                >
                                  <Trash2 size={14} />
                                  <span>{isEs ? 'Eliminar' : 'Remove'}</span>
                                </button>
                              </div>

                              {/* Bottom row: Stepper and Line Subtotal */}
                              <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                  <span className="text-zinc-500 text-[11px]">{isEs ? 'Cantidad:' : 'Qty:'}</span>
                                  <div className="flex items-center border border-zinc-700 bg-zinc-900 rounded-lg overflow-hidden">
                                    <button
                                      type="button"
                                      onClick={() => onUpdateQuantity(p.id, -1)}
                                      className={`px-2.5 py-1 text-xs font-bold transition-colors ${
                                        item.quantity === 1
                                          ? 'text-red-400 hover:bg-red-500/20'
                                          : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
                                      }`}
                                      title={item.quantity === 1 ? (isEs ? 'Eliminar' : 'Remove') : (isEs ? 'Restar' : 'Decrease')}
                                      aria-label="Restar o eliminar"
                                    >
                                      {item.quantity === 1 ? <Trash2 size={12} className="text-red-400" /> : '−'}
                                    </button>
                                    <span className="px-2.5 py-1 font-mono font-bold text-white min-w-[24px] text-center text-xs">
                                      {item.quantity}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => onUpdateQuantity(p.id, 1)}
                                      className="px-2.5 py-1 text-zinc-300 hover:text-white hover:bg-zinc-800 font-bold text-xs transition-colors"
                                      aria-label="Sumar"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>

                                <div className="text-right">
                                  {lineTotal !== null ? (
                                    <span className="font-mono text-sm font-bold text-white">
                                      ${lineTotal.toFixed(2)} USD
                                    </span>
                                  ) : (
                                    <span className="text-[11px] text-amber-400 font-medium">
                                      {isEs ? 'Pendiente' : 'Pending'}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Delivery Choice Verification Card */}
                    <div className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">
                          {customerInfo.deliveryPreference === 'pickup' ? (
                            <>
                              <Store size={16} className="text-amber-400" />
                              <span>{isEs ? 'Modalidad: Retiro en persona (Pickup)' : 'Personal Pickup'}</span>
                            </>
                          ) : (
                            <>
                              <Truck size={16} className="text-amber-400" />
                              <span>{isEs ? 'Modalidad: Envío a salón / domicilio' : 'Delivery to Address'}</span>
                            </>
                          )}
                        </div>
                        <button
                          onClick={() => setCurrentStep(2)}
                          className="text-[11px] text-amber-400 hover:underline"
                        >
                          {isEs ? 'Cambiar modalidad' : 'Change'}
                        </button>
                      </div>

                      {customerInfo.deliveryPreference === 'shipping' && customerInfo.shippingAddress ? (
                        <div className="pt-2 border-t border-zinc-800 text-zinc-300 space-y-1">
                          <p className="font-mono text-xs text-amber-300">
                            📍 {customerInfo.shippingAddress.street}, {customerInfo.shippingAddress.city},{' '}
                            {customerInfo.shippingAddress.state} {customerInfo.shippingAddress.zipCode}
                          </p>
                          {customerInfo.shippingAddress.notes && (
                            <p className="text-[11px] text-zinc-400 italic">
                              Indicación: "{customerInfo.shippingAddress.notes}"
                            </p>
                          )}
                          <p className="text-[10px] text-zinc-500 pt-1">
                            ℹ️ El envío se cobrará por separado según distancia, volumen y peso del paquete.
                          </p>
                        </div>
                      ) : (
                        <p className="text-[11px] text-zinc-400 pt-1">
                          📍 Retiro directo en Showroom & Almacén MA Fashion LLC (Orlando, FL). Sin costo de envío.
                        </p>
                      )}
                    </div>

                    {/* Customer Info Verification */}
                    {(customerInfo.name || customerInfo.salon || customerInfo.phone || customerInfo.email) && (
                      <div className="p-4 bg-zinc-900/40 border border-zinc-800/80 rounded-xl text-xs space-y-1.5">
                        <span className="uppercase text-[10px] tracking-wider text-zinc-500 font-semibold block mb-1">
                          {isEs ? 'Datos del Solicitante' : 'Client Information'}
                        </span>
                        {customerInfo.name && (
                          <div className="flex gap-2">
                            <span className="text-zinc-500">Nombre:</span>
                            <span className="text-zinc-200">{customerInfo.name}</span>
                          </div>
                        )}
                        {customerInfo.salon && (
                          <div className="flex gap-2">
                            <span className="text-zinc-500">Salón:</span>
                            <span className="text-zinc-200">{customerInfo.salon}</span>
                          </div>
                        )}
                        {customerInfo.phone && (
                          <div className="flex gap-2">
                            <span className="text-zinc-500">Teléfono:</span>
                            <span className="text-zinc-200">{customerInfo.phone}</span>
                          </div>
                        )}
                        {customerInfo.email && (
                          <div className="flex gap-2">
                            <span className="text-zinc-500">Email:</span>
                            <span className="text-zinc-200">{customerInfo.email}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Order Summary & WhatsApp CTA */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 sm:p-7 space-y-6 shadow-2xl sticky top-28">
                <h3 className="text-base font-serif font-semibold text-white tracking-tight border-b border-zinc-800 pb-4">
                  {isEs ? 'Resumen del Presupuesto' : 'Quote Summary'}
                </h3>

                {/* Subtotal Calculation */}
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-zinc-400">
                    <span>{isEs ? 'Artículos en solicitud' : 'Items in request'}</span>
                    <span className="font-mono text-white font-semibold">
                      {totalItemsCount} {isEs ? 'unidades' : 'units'}
                    </span>
                  </div>

                  <div className="flex justify-between text-zinc-400">
                    <span>{isEs ? 'Base imponible (Subtotal)' : 'Taxable Subtotal'}</span>
                    <span className="font-mono text-zinc-200 font-semibold">
                      {subtotal > 0 ? `$${subtotal.toFixed(2)} USD${hasDemo ? '*' : ''}` : (isEs ? 'Pendiente' : 'Pending')}
                    </span>
                  </div>

                  <div className="flex justify-between text-zinc-400">
                    <div className="flex items-center gap-1.5">
                      <span>{isEs ? 'Tax adicional (6.5%)' : 'Sales Tax (6.5%)'}</span>
                      <span className="text-[10px] text-zinc-500 font-mono">FL</span>
                    </div>
                    <span className="font-mono text-zinc-300">
                      {subtotal > 0 ? `+$${taxAmount.toFixed(2)} USD` : (isEs ? 'Por calcular' : 'To calculate')}
                    </span>
                  </div>

                  <div className="flex justify-between text-zinc-400 items-baseline pt-0.5">
                    <span>{isEs ? 'Modalidad de entrega' : 'Delivery'}</span>
                    <span className="text-[11px] text-amber-400/90 font-medium text-right">
                      {customerInfo.deliveryPreference === 'pickup'
                        ? (isEs ? 'Retiro en persona ($0.00)' : 'Store Pickup ($0.00)')
                        : (isEs ? 'Envío se cobra aparte' : 'Billed separately')}
                    </span>
                  </div>

                  <div className="border-t border-zinc-800 pt-3 flex justify-between text-base font-serif font-bold text-white">
                    <span>{isEs ? 'Total Estimado' : 'Estimated Total'}</span>
                    <span className="font-mono text-amber-400">
                      {subtotal > 0 ? `$${totalWithTax.toFixed(2)} USD${hasDemo ? '*' : ''}` : (isEs ? 'Por Confirmar' : 'To Confirm')}
                    </span>
                  </div>
                </div>

                {/* Contextual Action Button */}
                <div className="space-y-3 pt-2">
                  {currentStep === 1 && (
                    <button
                      onClick={() => {
                        setCurrentStep(2);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-wider text-xs rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 transition-all transform hover:-translate-y-0.5"
                    >
                      <span>{isEs ? 'Continuar a Selección de Entrega' : 'Continue to Delivery Method'}</span>
                      <ArrowRight size={18} />
                    </button>
                  )}

                  {currentStep === 2 && (
                    <button
                      onClick={handleProceedToVerification}
                      className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-wider text-xs rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 transition-all transform hover:-translate-y-0.5"
                    >
                      <span>{isEs ? 'Verificar Presupuesto' : 'Verify Quote'}</span>
                      <ArrowRight size={18} />
                    </button>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-3">
                      <button
                        onClick={handleWhatsAppClick}
                        className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase tracking-wider text-xs rounded-xl flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                      >
                        <MessageSquare size={18} className="fill-black" />
                        <span>{isEs ? 'Enviar Presupuesto por WhatsApp' : 'Send Quote via WhatsApp'}</span>
                      </button>

                      <p className="text-[11px] text-zinc-400 text-center leading-tight">
                        {isEs
                          ? `Se abrirá WhatsApp con el presupuesto verificado listo para enviar al asesor comercial al ${MARKETPLACE_CONFIG.COMMERCIAL_PHONE_DISPLAY}.`
                          : `WhatsApp will open with your verified quote ready to send to ${MARKETPLACE_CONFIG.COMMERCIAL_PHONE_DISPLAY}.`}
                      </p>

                      {hasClickedWhatsApp && (
                        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center gap-2 text-xs text-emerald-300">
                          <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                          <span>
                            {isEs
                              ? 'Enlace generado. Por favor pulsa enviar en tu aplicación de WhatsApp.'
                              : 'Link generated. Please hit send in your WhatsApp application.'}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Terms box */}
                <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-2 text-xs text-zinc-400 leading-relaxed">
                  <div className="flex items-center gap-2 text-amber-400 font-semibold text-[11px] uppercase tracking-wider">
                    <ShieldCheck size={16} />
                    <span>{isEs ? 'Condiciones de la Solicitud' : 'Quote Terms'}</span>
                  </div>
                  <p>
                    {isEs
                      ? 'La presente solicitud es una estimación oficial. Incluye 6.5% de tax sobre la base imponible. Los precios finales y descuentos por volumen serán confirmados por MA Fashion LLC.'
                      : 'This is an official estimate with 6.5% tax. Final wholesale pricing is verified by MA Fashion LLC.'}
                  </p>
                  <p className="text-[11px] text-zinc-400">
                    {isEs
                      ? '• Entrega: Puede retirar en persona (gratis) o solicitar envío (el flete se cobra aparte según distancia, volumen y peso).'
                      : '• Delivery: Pick up in person for free or request shipping (billed separately by distance, volume & weight).'}
                  </p>
                </div>

                {/* Step navigation secondary links */}
                <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                  <button
                    onClick={onContinueShopping}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    {isEs ? '← Catálogo' : '← Catalog'}
                  </button>
                  {currentStep > 1 && (
                    <button
                      onClick={() => setCurrentStep((prev) => (prev > 1 ? ((prev - 1) as 1 | 2) : 1))}
                      className="text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      {isEs ? 'Paso anterior' : 'Previous step'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

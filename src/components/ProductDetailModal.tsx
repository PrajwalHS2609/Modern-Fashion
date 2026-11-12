import React, { useState } from 'react';
import { X, Heart, Star, ShoppingBag, ShieldCheck, Truck, RefreshCw, Ruler, ChevronDown, Check, Zap } from 'lucide-react';
import { Product, ProductColor } from '../types';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

export const ProductDetailModal: React.FC = () => {
  const {
    quickViewProduct,
    closeQuickView,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsSizeGuideOpen,
    setIsCheckoutOpen,
    openQuickView
  } = useShop();

  if (!quickViewProduct) return null;

  const product = quickViewProduct;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<'fabric' | 'craft' | 'shipping' | null>('fabric');
  const [isZoomed, setIsZoomed] = useState(false);

  const isSaved = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    closeQuickView();
    setIsCheckoutOpen(true);
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.gender === product.gender)
  ).slice(0, 3);

  return (
    <div
      onClick={closeQuickView}
      className="fixed inset-0 z-50 bg-[#171717]/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white max-w-5xl w-full max-h-[92vh] overflow-y-auto border border-[#E8DFD2] shadow-2xl relative my-auto animate-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2 bg-white/90 hover:bg-white text-[#171717] rounded-full shadow-xs transition-colors"
          aria-label="Close product view"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10">
          
          {/* Gallery Col (Left 7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Main Active Image with Zoom Effect */}
            <div
              onClick={() => setIsZoomed(!isZoomed)}
              className="relative aspect-[4/5] bg-[#F2EFE8] overflow-hidden cursor-zoom-in"
            >
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover transition-transform duration-500 ${
                  isZoomed ? 'scale-150 object-center cursor-zoom-out' : 'scale-100'
                }`}
              />

              {product.tag && (
                <span className="absolute top-4 left-4 bg-[#171717] text-[#F7F5F0] text-[10px] tracking-widest uppercase font-semibold px-2.5 py-1">
                  {product.tag}
                </span>
              )}
            </div>

            {/* Thumbnail Row */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 aspect-[4/5] bg-[#F2EFE8] overflow-hidden border transition-all shrink-0 ${
                      activeImageIndex === idx
                        ? 'border-[#171717] ring-1 ring-[#171717]'
                        : 'border-[#E8DFD2] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Guarantee Callout Row */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-[#F7F5F0] border border-[#E8DFD2] text-center text-xs text-[#454545] font-sans-body">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-[#B89B65]" />
                <span className="text-[11px]">Express Courier</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RefreshCw className="w-4 h-4 text-[#B89B65]" />
                <span className="text-[11px]">30-Day Returns</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#B89B65]" />
                <span className="text-[11px]">Atelier Warranty</span>
              </div>
            </div>
          </div>

          {/* Sticky Contiguous Purchase Module (Right 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Unboxed Metadata Line */}
              <div className="flex items-center gap-2 text-xs text-[#454545] tracking-wider uppercase mb-1.5 font-sans-body">
                <span>{product.category}</span>
                <span aria-hidden="true">·</span>
                <span>{product.gender === 'unisex' ? 'Unisex' : `${product.gender}'s`}</span>
                <span aria-hidden="true">·</span>
                <span>Occasion: {product.occasion}</span>
              </div>

              {/* Title & Subtitle */}
              <h2 className="font-editorial text-2xl sm:text-3xl text-[#171717] font-normal leading-tight mb-2">
                {product.name}
              </h2>
              <p className="text-xs text-[#454545] font-sans-body mb-4">
                {product.subtitle}
              </p>

              {/* Rating Proof */}
              <div className="flex items-center gap-2 mb-6 text-xs text-[#171717]">
                <div className="flex text-[#B89B65]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-semibold tabular-nums">{product.rating}</span>
                <span className="text-[#454545]">({product.reviewCount} Verified Reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-[#E8DFD2]">
                <span className="font-editorial text-3xl font-normal text-[#171717] tabular-nums">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#888888] line-through tabular-nums">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.stockCount && product.stockCount <= 5 && (
                  <span className="text-xs text-[#B89B65] font-semibold tracking-wider uppercase ml-auto">
                    Only {product.stockCount} Pieces Remaining
                  </span>
                )}
              </div>

              {/* Color Swatch Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-[#454545] uppercase tracking-wider">Color:</span>
                  <span className="font-semibold text-[#171717]">{selectedColor.name}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`w-7 h-7 rounded-full border transition-all ${
                        selectedColor.name === c.name
                          ? 'border-[#171717] ring-2 ring-[#171717] ring-offset-2 scale-110'
                          : 'border-[#454545]/20 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                      aria-label={`Select ${c.name} color`}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selector + Size Guide Link */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-[#454545] uppercase tracking-wider">Size:</span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-[#B89B65] hover:text-[#171717] font-semibold flex items-center gap-1 underline underline-offset-2 transition-colors cursor-pointer"
                  >
                    <Ruler className="w-3 h-3" />
                    <span>Size & Fit Guide</span>
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-2 text-xs transition-colors border ${
                        selectedSize === sz
                          ? 'bg-[#171717] text-white border-[#171717] font-semibold'
                          : 'bg-white text-[#171717] border-[#E8DFD2] hover:border-[#171717]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs uppercase tracking-wider text-[#454545]">Quantity:</span>
                <div className="flex items-center border border-[#E8DFD2] bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-xs text-[#171717] hover:bg-[#F7F5F0]"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-semibold tabular-nums text-[#171717]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-xs text-[#171717] hover:bg-[#F7F5F0]"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Contiguous Primary CTAs */}
              <div className="space-y-2.5 mb-8">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 bg-[#171717] hover:bg-[#2A2A2A] text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#B89B65]" />
                  <span>Add to Bag · {formatPrice(product.price * quantity)}</span>
                </button>

                <div className="flex gap-2.5">
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 py-3 bg-[#B89B65] hover:bg-[#A68853] text-[#171717] text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Instant Express Checkout</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`px-4 py-3 border transition-colors flex items-center justify-center ${
                      isSaved
                        ? 'border-[#171717] bg-[#171717] text-[#B89B65]'
                        : 'border-[#E8DFD2] hover:border-[#171717] text-[#171717] bg-white'
                    }`}
                    aria-label="Wishlist toggle"
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Collapsible Accordions for Details */}
              <div className="border-t border-[#E8DFD2] space-y-2 text-xs text-[#454545] font-sans-body">
                {/* Description & Fabric */}
                <div className="border-b border-[#E8DFD2] py-3">
                  <button
                    onClick={() => setActiveAccordion(activeAccordion === 'fabric' ? null : 'fabric')}
                    className="w-full flex items-center justify-between text-xs uppercase tracking-wider font-semibold text-[#171717]"
                  >
                    <span>Fabric Composition & Description</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeAccordion === 'fabric' ? 'rotate-180' : ''}`} />
                  </button>
                  {activeAccordion === 'fabric' && (
                    <div className="pt-2.5 space-y-2 animate-in fade-in duration-150">
                      <p>{product.description}</p>
                      <p className="font-semibold text-[#171717]">Composition: {product.fabric}</p>
                      <p>Care: {product.care}</p>
                    </div>
                  )}
                </div>

                {/* Craftsmanship */}
                <div className="border-b border-[#E8DFD2] py-3">
                  <button
                    onClick={() => setActiveAccordion(activeAccordion === 'craft' ? null : 'craft')}
                    className="w-full flex items-center justify-between text-xs uppercase tracking-wider font-semibold text-[#171717]"
                  >
                    <span>Atelier Craftsmanship Details</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeAccordion === 'craft' ? 'rotate-180' : ''}`} />
                  </button>
                  {activeAccordion === 'craft' && (
                    <div className="pt-2.5 animate-in fade-in duration-150">
                      <p>{product.craftsmanship}</p>
                    </div>
                  )}
                </div>

                {/* Shipping & Returns */}
                <div className="border-b border-[#E8DFD2] py-3">
                  <button
                    onClick={() => setActiveAccordion(activeAccordion === 'shipping' ? null : 'shipping')}
                    className="w-full flex items-center justify-between text-xs uppercase tracking-wider font-semibold text-[#171717]"
                  >
                    <span>Complimentary Shipping & Returns</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeAccordion === 'shipping' ? 'rotate-180' : ''}`} />
                  </button>
                  {activeAccordion === 'shipping' && (
                    <div className="pt-2.5 space-y-1.5 animate-in fade-in duration-150">
                      <p>• Complimentary global express courier delivery on orders over $250.</p>
                      <p>• 30-day effortless returns with home courier pickup included.</p>
                      <p>• Signature Maison packaging in linen garment bag and rigid box.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Recommended Cross-Sell ("Pair It With") */}
            <div className="pt-6 mt-6 border-t border-[#E8DFD2]">
              <span className="text-[10px] uppercase tracking-widest text-[#B89B65] font-semibold block mb-2">
                Atelier Pairing Recommendation
              </span>
              <div className="space-y-2">
                {relatedProducts.slice(0, 1).map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => openQuickView(rel)}
                    className="p-2.5 bg-[#F7F5F0] hover:bg-[#E8DFD2] transition-colors flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <img src={rel.images[0]} alt={rel.name} className="w-10 h-12 object-cover bg-white" />
                      <div>
                        <h4 className="font-editorial text-xs text-[#171717] group-hover:text-[#B89B65] transition-colors">
                          {rel.name}
                        </h4>
                        <span className="text-[11px] text-[#454545]">{rel.category}</span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[#171717] tabular-nums">
                      {formatPrice(rel.price)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

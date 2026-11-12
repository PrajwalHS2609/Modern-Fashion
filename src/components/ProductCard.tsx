import React, { useState } from 'react';
import { Heart, Eye, Plus, Check } from 'lucide-react';
import { Product, ProductColor } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
  onOpenQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenQuickView }) => {
  const {
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    openQuickView
  } = useShop();

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [isAddedRecently, setIsAddedRecently] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isSaved = isInWishlist(product.id);

  // If there's a second image, show it on hover for editorial preview
  const displayImage = isHovered && product.images[1] ? product.images[1] : product.images[0];

  const handleQuickAdd = (e: React.MouseEvent, size: string) => {
    e.stopPropagation();
    setSelectedSize(size);
    addToCart(product, selectedColor, size, 1);
    setIsAddedRecently(true);
    setTimeout(() => {
      setIsAddedRecently(false);
      setShowQuickAdd(false);
    }, 1200);
  };

  const handleCardClick = () => {
    if (onOpenQuickView) {
      onOpenQuickView(product);
    } else {
      openQuickView(product);
    }
  };

  return (
    <div
      className="group relative flex flex-col bg-white border border-[#E8DFD2]/60 hover:border-[#171717]/40 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowQuickAdd(false);
      }}
    >
      {/* Product Image Frame */}
      <div
        onClick={handleCardClick}
        className="relative w-full aspect-[4/5] bg-[#F2EFE8] overflow-hidden cursor-pointer"
      >
        {!imageError ? (
          <img
            src={displayImage}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#EAE6DE] p-6 text-center text-[#454545]">
            <span className="font-editorial text-lg text-[#171717]">{product.name}</span>
            <span className="text-xs tracking-wider uppercase mt-1 text-[#454545]">Maison Atelier Preview</span>
          </div>
        )}

        {/* Top Badges (Subtle unboxed tags) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.tag && (
            <span className="text-[10px] font-semibold tracking-widest uppercase bg-[#171717] text-[#F7F5F0] px-2 py-0.5">
              {product.tag}
            </span>
          )}
          {product.originalPrice && (
            <span className="text-[10px] font-medium tracking-wider uppercase bg-[#B89B65] text-white px-2 py-0.5">
              Privilege Offer
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 z-10 ${
            isSaved
              ? 'bg-[#171717] text-[#B89B65]'
              : 'bg-white/80 backdrop-blur-xs text-[#171717] hover:bg-white hover:text-[#B89B65]'
          }`}
          aria-label={isSaved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        >
          <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View & Quick Add Floating Bar on Hover */}
        <div className="absolute inset-x-3 bottom-3 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          {showQuickAdd ? (
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-[#171717] p-2 text-white animate-in fade-in slide-in-from-bottom-2 duration-150"
            >
              <div className="text-[10px] uppercase tracking-wider text-[#E8DFD2] mb-1.5 text-center">
                Select Size:
              </div>
              <div className="flex flex-wrap gap-1 justify-center">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={(e) => handleQuickAdd(e, sz)}
                    className="text-[11px] px-2 py-1 bg-white/10 hover:bg-white hover:text-[#171717] text-white transition-colors"
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowQuickAdd(true);
                }}
                className="flex-1 py-2 px-3 text-xs font-semibold bg-[#171717] text-white hover:bg-[#2A2A2A] transition-colors flex items-center justify-center gap-1.5 tracking-wider uppercase text-[11px]"
              >
                {isAddedRecently ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#B89B65]" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    <span>Quick Add</span>
                  </>
                )}
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openQuickView(product);
                }}
                className="p-2 bg-white/90 hover:bg-white text-[#171717] transition-colors"
                title="Quick View Details"
                aria-label={`Quick preview ${product.name}`}
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-grow justify-between bg-white">
        <div>
          {/* Unboxed Metadata Line */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#454545] tracking-wider uppercase mb-1 font-sans-body">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.gender === 'unisex' ? 'Unisex' : `${product.gender}'s`}</span>
            {product.stockCount && product.stockCount <= 5 && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-[#B89B65] font-medium">Only {product.stockCount} left</span>
              </>
            )}
          </div>

          {/* Product Title */}
          <h3
            onClick={handleCardClick}
            className="font-editorial text-base font-normal text-[#171717] hover:text-[#B89B65] transition-colors cursor-pointer line-clamp-1 leading-snug"
          >
            {product.name}
          </h3>

          <p className="text-xs text-[#454545] line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-[#E8DFD2]/60 flex items-center justify-between">
          {/* Price with Tabular Numerals */}
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold text-[#171717] tabular-nums font-sans-body">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#454545] line-through tabular-nums">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Color Swatches */}
          <div className="flex items-center gap-1.5" aria-label="Available color variants">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(color);
                }}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColor.name === color.name
                    ? 'border-[#171717] ring-1 ring-[#171717] ring-offset-1 scale-110'
                    : 'border-[#454545]/20 hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={`Select ${color.name} color`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

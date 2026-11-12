import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, Check } from 'lucide-react';
import { CAMPAIGN_IMAGE, LOOKBOOK_SPOTS, PRODUCTS } from '../data/products';
import { useShop } from '../context/ShopContext';

export const LookbookSection: React.FC = () => {
  const [activeSpotId, setActiveSpotId] = useState<string>('spot-1');
  const [addedAll, setAddedAll] = useState(false);
  const { formatPrice, openQuickView, addToCart } = useShop();

  const activeSpot = LOOKBOOK_SPOTS.find((s) => s.id === activeSpotId) || LOOKBOOK_SPOTS[0];
  const activeProduct = PRODUCTS.find((p) => p.id === activeSpot.productId);

  const lookProducts = LOOKBOOK_SPOTS.map((s) => ({
    spot: s,
    product: PRODUCTS.find((p) => p.id === s.productId)!
  })).filter((item) => Boolean(item.product));

  const totalLookPrice = lookProducts.reduce((sum, item) => sum + item.product.price, 0);

  const handleAddEntireLook = () => {
    lookProducts.forEach(({ product }) => {
      addToCart(product, product.colors[0], product.sizes[0], 1);
    });
    setAddedAll(true);
    setTimeout(() => setAddedAll(false), 2000);
  };

  return (
    <section className="py-24 bg-[#FFFFFF] border-b border-[#E8DFD2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#B89B65] mb-2 font-sans-body">
              <span>Interactive Editorial</span>
              <span aria-hidden="true">·</span>
              <span>Shop The Silhouette</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#171717] font-normal tracking-tight">
              The Seasonal Lookbook
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#454545] font-sans-body max-w-md">
            Click any pin on the styled look below to inspect fabrics, view cut specifications, and add individual pieces or the complete look directly to your bag.
          </p>
        </div>

        {/* 2-Column Lookbook Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Interactive Look Image with Hotspots (Left 7 Cols) */}
          <div className="lg:col-span-7 relative aspect-[4/5] bg-[#F2EFE8] overflow-hidden">
            <img
              src={CAMPAIGN_IMAGE}
              alt="Maison Vérité Autumn Winter Complete Look"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />

            {/* Hotspot Pins */}
            {LOOKBOOK_SPOTS.map((spot) => {
              const isActive = activeSpotId === spot.id;
              return (
                <div
                  key={spot.id}
                  style={{ top: spot.top, left: spot.left }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <button
                    onClick={() => setActiveSpotId(spot.id)}
                    className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isActive
                        ? 'bg-[#171717] text-[#B89B65] scale-125 ring-4 ring-[#B89B65]/40 shadow-lg'
                        : 'bg-white/90 text-[#171717] hover:scale-110 shadow-md'
                    }`}
                    aria-label={`View ${spot.name}`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-current" />
                  </button>

                  {/* Tooltip on active */}
                  {isActive && (
                    <div className="absolute left-1/2 -top-10 -translate-x-1/2 bg-[#171717] text-white text-[10px] tracking-wider uppercase px-2.5 py-1 whitespace-nowrap shadow-md pointer-events-none">
                      {spot.name} · {formatPrice(spot.price)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Look Details & Individual Items (Right 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#E8DFD2] pb-4 mb-6">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#B89B65] font-semibold block">
                    Look 04 · Sartorial Harmony
                  </span>
                  <h3 className="font-editorial text-2xl text-[#171717] mt-0.5">
                    The Monochromatic Traveler
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-[#454545] uppercase tracking-wider block">Full Ensemble</span>
                  <span className="font-editorial text-xl text-[#171717] tabular-nums font-semibold">
                    {formatPrice(totalLookPrice)}
                  </span>
                </div>
              </div>

              {/* List of 4 Pieces in the Look */}
              <div className="space-y-3 mb-8">
                {lookProducts.map(({ spot, product }) => {
                  const isSelected = activeSpotId === spot.id;
                  return (
                    <div
                      key={spot.id}
                      onClick={() => setActiveSpotId(spot.id)}
                      className={`p-3 border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                        isSelected
                          ? 'border-[#171717] bg-[#F7F5F0]'
                          : 'border-[#E8DFD2] hover:border-[#171717]/50 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="w-12 h-14 object-cover bg-[#E8DFD2]"
                        />
                        <div>
                          <h4 className="font-editorial text-sm text-[#171717] line-clamp-1">
                            {product.name}
                          </h4>
                          <span className="text-[11px] text-[#454545]">
                            {product.category} · {product.fabric.split(';')[0]}
                          </span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-semibold text-[#171717] tabular-nums block font-sans-body">
                          {formatPrice(product.price)}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openQuickView(product);
                          }}
                          className="text-[10px] text-[#B89B65] hover:text-[#171717] uppercase tracking-wider font-semibold underline underline-offset-2 mt-0.5 inline-block"
                        >
                          Inspect
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Active Product Fast Action */}
              {activeProduct && (
                <div className="p-4 bg-[#F7F5F0] border border-[#E8DFD2] mb-6 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-wider text-[#454545]">Selected Focus Piece</span>
                    <span className="text-xs font-semibold text-[#171717] tabular-nums">
                      {formatPrice(activeProduct.price)}
                    </span>
                  </div>
                  <h4 className="font-editorial text-base text-[#171717] mb-2">{activeProduct.name}</h4>
                  <div className="flex gap-2">
                    <button
                      onClick={() => addToCart(activeProduct, activeProduct.colors[0], activeProduct.sizes[0], 1)}
                      className="flex-1 py-2.5 bg-[#171717] text-white hover:bg-[#2A2A2A] text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#B89B65]" />
                      <span>Add This Piece ({activeProduct.sizes[0]})</span>
                    </button>
                    <button
                      onClick={() => openQuickView(activeProduct)}
                      className="px-3 py-2.5 bg-white border border-[#E8DFD2] hover:border-[#171717] text-xs text-[#171717] transition-colors"
                      title="View garment details"
                    >
                      Details
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Complete Look Purchase Action */}
            <div className="pt-2">
              <button
                onClick={handleAddEntireLook}
                className="w-full py-4 bg-[#171717] hover:bg-[#2A2A2A] text-[#F7F5F0] text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {addedAll ? (
                  <>
                    <Check className="w-4 h-4 text-[#B89B65]" />
                    <span>Entire Look Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#B89B65]" />
                    <span>Add Entire 4-Piece Look ({formatPrice(totalLookPrice)})</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </>
                )}
              </button>
              <p className="text-[11px] text-[#454545] text-center mt-2 font-sans-body">
                Complimentary white-glove packaging and express garment delivery included.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

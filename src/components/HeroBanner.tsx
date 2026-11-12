import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { HERO_IMAGE } from '../data/products';
import { useShop } from '../context/ShopContext';

export const HeroBanner: React.FC = () => {
  const { setCurrentView, setSelectedCategory, setSelectedGender } = useShop();

  const handleShopNewArrivals = () => {
    setSelectedCategory(null);
    setSelectedGender('all');
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreCollections = () => {
    setCurrentView('lookbook');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#171717]">
      {/* Background Hero Image with Measured Scrim */}
      <div className="relative w-full min-h-[580px] lg:min-h-[720px] flex items-end">
        <img
          src={HERO_IMAGE}
          alt="Maison Vérité Autumn Winter Campaign"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-top opacity-90 transition-transform duration-1000 scale-100 hover:scale-[1.02]"
        />

        {/* Sophisticated Dual Gradient Scrim for WCAG AA readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#171717]/80 via-[#171717]/20 to-transparent" />

        {/* Hero Editorial Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
          <div className="max-w-2xl">
            {/* Unboxed editorial kicker */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#B89B65] mb-4 font-sans-body">
              <span>Collection Édition 2026</span>
              <span aria-hidden="true">·</span>
              <span>Atelier Silhouettes</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal text-[#F7F5F0] leading-[1.1] tracking-tight mb-6" style={{ textWrap: 'balance' }}>
              Style That Speaks. <br />
              <span className="italic font-normal text-[#E8DFD2]">Fashion That Defines You.</span>
            </h1>

            {/* Supporting Prose */}
            <p className="text-sm sm:text-base text-[#F7F5F0]/80 font-sans-body font-normal leading-relaxed max-w-xl mb-8">
              Discover thoughtfully curated fashion collections designed to express your individuality and elevate your everyday style through precision tailoring and pure natural fibers.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleShopNewArrivals}
                className="px-7 py-3.5 bg-[#F7F5F0] text-[#171717] hover:bg-[#E8DFD2] transition-colors text-xs uppercase tracking-widest font-semibold flex items-center gap-2 group cursor-pointer"
              >
                <span>Shop New Arrivals</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={handleExploreCollections}
                className="px-7 py-3.5 bg-transparent border border-[#F7F5F0]/60 text-[#F7F5F0] hover:bg-[#F7F5F0]/10 transition-colors text-xs uppercase tracking-widest font-semibold cursor-pointer"
              >
                Explore Collections
              </button>
            </div>
          </div>

          {/* Subdued Editorial Marker in bottom-right corner */}
          <div className="hidden md:flex absolute right-8 bottom-8 items-center gap-4 text-xs text-[#E8DFD2]/60 tracking-widest uppercase font-sans-body">
            <span>Biella Wool</span>
            <span aria-hidden="true">·</span>
            <span>Como Silk</span>
            <span aria-hidden="true">·</span>
            <span>Tuscan Leather</span>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { CAMPAIGN_IMAGE } from '../data/products';
import { useShop } from '../context/ShopContext';

interface CollectionTab {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  highlights: string[];
  categoryFilter?: string;
}

const COLLECTIONS: CollectionTab[] = [
  {
    id: 'minimalist',
    name: 'The Minimalist Wardrobe',
    subtitle: 'Monochromatic Lines & Quiet Luxury',
    description: 'A disciplined curation of fluid wool trousers, sculpted double-breasted jackets, and clean silk staples created to form the cornerstone of an enduring personal wardrobe.',
    highlights: ['Virgin Biella Wool', 'Seamless French Seams', 'Neutral Color Palettes'],
    categoryFilter: 'Outerwear'
  },
  {
    id: 'essentials',
    name: 'Everyday Essentials',
    subtitle: 'Elevated Foundational Dressing',
    description: 'Heavy Mongolian ribbed knits, crisp Egyptian cotton shirts, and vegetable-tanned accessories designed for unforced everyday elegance.',
    highlights: ['7-Gauge Pure Cashmere', 'Mother-of-Pearl Hardware', 'Structured Comfort'],
    categoryFilter: 'Knitwear'
  },
  {
    id: 'sartorial',
    name: 'Modern Office Wear',
    subtitle: 'Deconstructed Tailoring for Tomorrow',
    description: 'Redefining corporate and executive dress codes through unlined shoulders, high-twist crease-resistant wool, and fluid architectural drape.',
    highlights: ['Crease-Resistant Crepe', 'Extended Waistband Tabs', 'Hand-Basted Chest Canvas'],
    categoryFilter: 'Women'
  },
  {
    id: 'occasion',
    name: 'Occasion & Evening Gala',
    subtitle: 'Fluid Mulberry Silk & After-Dark Drama',
    description: 'Bias-cut drape dresses, structured peacoats, and statement leather goods crafted to command attention under ambient evening lighting.',
    highlights: ['Heavyweight Mulberry Silk', 'Bias Silhouette Cuts', 'Solid Brass Closures'],
    categoryFilter: 'Occasion'
  }
];

export const TrendingCollection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CollectionTab>(COLLECTIONS[0]);
  const { navigateToCategory, setCurrentView } = useShop();

  return (
    <section className="py-24 bg-[#171717] text-[#F7F5F0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Eyebrow */}
        <div className="flex items-center justify-between border-b border-[#454545]/60 pb-6 mb-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#B89B65] font-sans-body">
            <span>Featured Editorial</span>
            <span aria-hidden="true">·</span>
            <span>The New Season Edit</span>
          </div>
          <span className="text-xs text-[#E8DFD2]/60 font-sans-body hidden sm:inline">
            Volume 04 / Autumn Winter
          </span>
        </div>

        {/* 2-Column Split: Image Left, Interactive Narrative Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Campaign Image Frame */}
          <div className="lg:col-span-7 relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] overflow-hidden bg-[#222222]">
            <img
              src={CAMPAIGN_IMAGE}
              alt="Maison Vérité Collection Campaign"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top transition-transform duration-1000 hover:scale-105"
            />
            {/* Minimalist Watermark Box */}
            <div className="absolute bottom-6 left-6 bg-[#171717]/80 backdrop-blur-xs p-4 border border-[#454545]/40 text-left max-w-xs">
              <span className="text-[10px] uppercase tracking-widest text-[#B89B65] font-semibold block mb-0.5">
                Look 04 · On Location
              </span>
              <p className="text-xs text-[#E8DFD2] font-editorial">
                The Oversized Wool Trench in Toffee Camel paired with Biella Pleated Trousers.
              </p>
            </div>
          </div>

          {/* Interactive Collection Details & Selector */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              {/* Collection Tabs */}
              <div className="flex flex-wrap gap-2 mb-8" role="tablist">
                {COLLECTIONS.map((col) => (
                  <button
                    key={col.id}
                    onClick={() => setActiveTab(col)}
                    className={`text-xs px-3 py-1.5 transition-all text-left font-sans-body ${
                      activeTab.id === col.id
                        ? 'bg-[#F7F5F0] text-[#171717] font-semibold'
                        : 'bg-[#262626] text-[#E8DFD2]/70 hover:text-white hover:bg-[#333333]'
                    }`}
                  >
                    {col.name}
                  </button>
                ))}
              </div>

              {/* Dynamic Collection Content */}
              <div className="animate-in fade-in duration-300">
                <span className="text-xs uppercase tracking-widest text-[#B89B65] block mb-2 font-sans-body">
                  {activeTab.subtitle}
                </span>

                <h3 className="font-editorial text-3xl sm:text-4xl font-normal text-[#F7F5F0] mb-5 leading-tight">
                  {activeTab.name}
                </h3>

                <p className="text-sm text-[#E8DFD2]/80 leading-relaxed font-sans-body mb-8">
                  {activeTab.description}
                </p>

                {/* Sourcing / Craftsmanship highlights */}
                <div className="border-t border-[#454545]/60 pt-6 mb-8">
                  <span className="text-[11px] uppercase tracking-wider text-[#E8DFD2]/60 block mb-3 font-sans-body">
                    Craft & Fiber Standards:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {activeTab.highlights.map((highlight) => (
                      <div key={highlight} className="text-xs text-[#F7F5F0] flex items-center gap-1.5 font-sans-body">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B89B65]" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => {
                  if (activeTab.categoryFilter) {
                    navigateToCategory(activeTab.categoryFilter);
                  } else {
                    setCurrentView('catalog');
                  }
                }}
                className="px-6 py-3 bg-[#B89B65] hover:bg-[#A68853] text-[#171717] font-semibold text-xs uppercase tracking-widest flex items-center gap-2 group transition-colors cursor-pointer"
              >
                <span>Shop This Edit</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setCurrentView('lookbook')}
                className="px-6 py-3 bg-transparent border border-[#E8DFD2]/40 hover:border-white text-white text-xs uppercase tracking-widest transition-colors cursor-pointer"
              >
                View Full Lookbook
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

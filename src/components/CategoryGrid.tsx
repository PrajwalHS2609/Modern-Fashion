import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES_DATA } from '../data/products';
import { useShop } from '../context/ShopContext';

export const CategoryGrid: React.FC = () => {
  const { navigateToCategory } = useShop();

  return (
    <section className="py-20 bg-[#F7F5F0] border-b border-[#E8DFD2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#B89B65] mb-2 font-sans-body">
              <span>Curated Departments</span>
              <span aria-hidden="true">·</span>
              <span>Autumn / Winter</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#171717] font-normal tracking-tight">
              Shop by Category
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#454545] font-sans-body max-w-md">
            Architectural silhouettes, tactile natural fibers, and timeless leather goods crafted with slow sartorial discipline.
          </p>
        </div>

        {/* Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Feature Item 1 (Women's) - Spans 7 cols */}
          <div
            onClick={() => navigateToCategory('Women')}
            className="md:col-span-7 group relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-[#E8DFD2] cursor-pointer"
          >
            <img
              src={CATEGORIES_DATA[0].image}
              alt={CATEGORIES_DATA[0].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/80 via-[#171717]/20 to-transparent" />
            <div className="absolute inset-x-6 bottom-6 flex items-end justify-between text-white">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#B89B65] block mb-1">
                  {CATEGORIES_DATA[0].itemCount} Silhouettes
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl text-[#F7F5F0] font-normal">
                  {CATEGORIES_DATA[0].title}
                </h3>
                <p className="text-xs text-[#E8DFD2]/80 mt-1 max-w-sm hidden sm:block">
                  {CATEGORIES_DATA[0].tagline}
                </p>
              </div>
              <span className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-[#171717] transition-all">
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Feature Item 2 (Men's Sartorial) - Spans 5 cols */}
          <div
            onClick={() => navigateToCategory('Men')}
            className="md:col-span-5 group relative aspect-[16/10] sm:aspect-[16/9] md:aspect-auto overflow-hidden bg-[#E8DFD2] cursor-pointer"
          >
            <img
              src={CATEGORIES_DATA[1].image}
              alt={CATEGORIES_DATA[1].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/80 via-[#171717]/20 to-transparent" />
            <div className="absolute inset-x-6 bottom-6 flex items-end justify-between text-white">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#B89B65] block mb-1">
                  {CATEGORIES_DATA[1].itemCount} Silhouettes
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl text-[#F7F5F0] font-normal">
                  {CATEGORIES_DATA[1].title}
                </h3>
                <p className="text-xs text-[#E8DFD2]/80 mt-1 max-w-xs hidden sm:block">
                  {CATEGORIES_DATA[1].tagline}
                </p>
              </div>
              <span className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-[#171717] transition-all">
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Three bottom cards: Outerwear, Cashmere, Leather - 4 cols each */}
          {CATEGORIES_DATA.slice(2).map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigateToCategory(cat.filterCategory)}
              className="md:col-span-4 group relative aspect-[4/3] overflow-hidden bg-[#E8DFD2] cursor-pointer"
            >
              <img
                src={cat.image}
                alt={cat.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/85 via-[#171717]/30 to-transparent" />
              <div className="absolute inset-5 bottom-5 flex items-end justify-between text-white">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#B89B65] block mb-1">
                    {cat.itemCount} Designs
                  </span>
                  <h3 className="font-editorial text-xl sm:text-2xl text-[#F7F5F0] font-normal leading-snug">
                    {cat.title}
                  </h3>
                  <p className="text-[11px] text-[#E8DFD2]/80 mt-0.5 line-clamp-1">
                    {cat.tagline}
                  </p>
                </div>
                <span className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-[#171717] transition-all shrink-0 ml-2">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

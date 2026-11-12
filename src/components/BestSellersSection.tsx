import React, { useState } from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';

type BestSellerFilter = 'all' | 'outerwear' | 'knitwear' | 'accessories';

export const BestSellersSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<BestSellerFilter>('all');
  const { setCurrentView, setSelectedCategory, setSelectedGender } = useShop();

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeFilter === 'all') return p.tag === 'Best Seller' || p.rating >= 4.9;
    if (activeFilter === 'outerwear') return p.category === 'Outerwear';
    if (activeFilter === 'knitwear') return p.category === 'Knitwear';
    if (activeFilter === 'accessories') return p.category === 'Accessories' || p.category === 'Footwear';
    return true;
  }).slice(0, 4);

  const handleExploreAll = () => {
    setSelectedCategory(null);
    setSelectedGender('all');
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-[#F7F5F0] border-b border-[#E8DFD2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with verified rating proof adjacency */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#B89B65] mb-2 font-sans-body">
              <span>Client Favorites</span>
              <span aria-hidden="true">·</span>
              <div className="flex items-center gap-1 text-[#171717]">
                <Star className="w-3.5 h-3.5 fill-[#B89B65] text-[#B89B65]" />
                <span className="font-semibold tabular-nums">4.9 / 5.0</span>
                <span className="text-[#454545] font-normal">(420+ Verified Reviews)</span>
              </div>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#171717] font-normal tracking-tight">
              Best Sellers
            </h2>
          </div>

          {/* Interactive Filter Pills/Tabs (allowed for interactive filters) */}
          <div className="flex items-center gap-1.5 p-1 bg-[#E8DFD2]/60 rounded-none overflow-x-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#171717] text-white shadow-xs font-semibold'
                  : 'text-[#454545] hover:text-[#171717]'
              }`}
            >
              All Favorites
            </button>
            <button
              onClick={() => setActiveFilter('outerwear')}
              className={`px-3.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === 'outerwear'
                  ? 'bg-[#171717] text-white shadow-xs font-semibold'
                  : 'text-[#454545] hover:text-[#171717]'
              }`}
            >
              Outerwear
            </button>
            <button
              onClick={() => setActiveFilter('knitwear')}
              className={`px-3.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === 'knitwear'
                  ? 'bg-[#171717] text-white shadow-xs font-semibold'
                  : 'text-[#454545] hover:text-[#171717]'
              }`}
            >
              Cashmere & Knits
            </button>
            <button
              onClick={() => setActiveFilter('accessories')}
              className={`px-3.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === 'accessories'
                  ? 'bg-[#171717] text-white shadow-xs font-semibold'
                  : 'text-[#454545] hover:text-[#171717]'
              }`}
            >
              Leather & Shoes
            </button>
          </div>
        </div>

        {/* 4-Card Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mt-12 text-center">
          <button
            onClick={handleExploreAll}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#171717] hover:text-[#B89B65] border-b border-[#171717] pb-1 hover:border-[#B89B65] transition-colors cursor-pointer"
          >
            <span>Explore All Client Favorites</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};

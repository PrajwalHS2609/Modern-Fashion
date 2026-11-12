import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';

export const NewArrivalsSection: React.FC = () => {
  const { setCurrentView, setSelectedCategory, setSelectedGender } = useShop();

  // Filter products tagged with 'New Arrival' or recent additions
  const newArrivals = PRODUCTS.filter((p) => p.tag === 'New Arrival' || p.tag === 'Limited Edition').slice(0, 4);

  const handleViewAll = () => {
    setSelectedCategory(null);
    setSelectedGender('all');
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-[#FFFFFF] border-b border-[#E8DFD2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with View All CTA */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#B89B65] mb-2 font-sans-body">
              <span>Fresh From The Ateliers</span>
              <span aria-hidden="true">·</span>
              <span>Limited Batches</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#171717] font-normal tracking-tight">
              New Arrivals
            </h2>
          </div>

          <button
            onClick={handleViewAll}
            className="text-xs uppercase tracking-widest font-semibold text-[#171717] hover:text-[#B89B65] flex items-center gap-2 group transition-colors self-start sm:self-auto"
          >
            <span>View All New Arrivals</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4-Column Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

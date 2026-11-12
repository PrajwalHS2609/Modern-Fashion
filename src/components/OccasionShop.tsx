import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';

type OccasionType = 'Workwear' | 'Occasion' | 'Everyday' | 'Casual' | 'Vacation';

interface OccasionMeta {
  key: OccasionType;
  label: string;
  subtitle: string;
  tagline: string;
}

const OCCASIONS: OccasionMeta[] = [
  {
    key: 'Workwear',
    label: 'Modern Workwear',
    subtitle: 'Boardroom Precision & Executive Ease',
    tagline: 'Deconstructed wool blazers, crisp Egyptian cotton, and crease-resistant high-twist trousers.'
  },
  {
    key: 'Occasion',
    label: 'Evening & Gala',
    subtitle: 'Dramatic Silk Drapery & Sculpted Silhouettes',
    tagline: 'Mulberry silk gowns, architectural midi dresses, and brushed brass accessories for celebratory evenings.'
  },
  {
    key: 'Everyday',
    label: 'Everyday Essentials',
    subtitle: 'Quiet Luxury for Routine Rituals',
    tagline: '7-gauge pure Mongolian cashmere, vegetable-tanned leather bags, and timeless Chelsea boots.'
  },
  {
    key: 'Casual',
    label: 'Weekend Sartorial',
    subtitle: 'Relaxed Tailoring & Tactile Knits',
    tagline: 'Unstructured layers, soft merino rollnecks, and easy wide-leg silhouettes for weekend ease.'
  }
];

export const OccasionShop: React.FC = () => {
  const [selectedOccasion, setSelectedOccasion] = useState<OccasionType>('Workwear');
  const { setCurrentView, setSelectedCategory } = useShop();

  const activeMeta = OCCASIONS.find((o) => o.key === selectedOccasion) || OCCASIONS[0];

  const matchedProducts = PRODUCTS.filter((p) => p.occasion === selectedOccasion).slice(0, 4);

  return (
    <section className="py-20 bg-[#F7F5F0] border-b border-[#E8DFD2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#B89B65] mb-2 font-sans-body">
              <span>Lifestyle Styling</span>
              <span aria-hidden="true">·</span>
              <span>Wardrobe Curation</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#171717] font-normal tracking-tight">
              Shop by Occasion
            </h2>
          </div>

          {/* Interactive Occasion Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-[#E8DFD2]/60 overflow-x-auto">
            {OCCASIONS.map((occ) => (
              <button
                key={occ.key}
                onClick={() => setSelectedOccasion(occ.key)}
                className={`px-3.5 py-1.5 text-xs transition-colors whitespace-nowrap cursor-pointer ${
                  selectedOccasion === occ.key
                    ? 'bg-[#171717] text-white font-semibold'
                    : 'text-[#454545] hover:text-[#171717]'
                }`}
              >
                {occ.label}
              </button>
            ))}
          </div>
        </div>

        {/* Narrative Banner for Current Occasion */}
        <div className="mb-8 p-6 bg-white border border-[#E8DFD2] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#B89B65] font-semibold block mb-0.5">
              {activeMeta.subtitle}
            </span>
            <p className="text-xs sm:text-sm text-[#454545] font-sans-body">
              {activeMeta.tagline}
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory(null);
              setCurrentView('catalog');
            }}
            className="text-xs font-semibold uppercase tracking-wider text-[#171717] hover:text-[#B89B65] flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>View All For {activeMeta.label}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {matchedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

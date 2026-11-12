import React, { useState } from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useShop } from '../context/ShopContext';

export const CustomerReviews: React.FC = () => {
  const { openQuickView } = useShop();

  // Aggregate verified reviews from products
  const allReviews = PRODUCTS.flatMap((p) =>
    p.reviews.map((r) => ({
      ...r,
      productName: p.name,
      productImage: p.images[0],
      product: p
    }))
  ).slice(0, 4);

  const [filterRating, setFilterRating] = useState<number | 'all'>('all');

  const displayedReviews = filterRating === 'all'
    ? allReviews
    : allReviews.filter((r) => r.rating === filterRating);

  return (
    <section className="py-24 bg-[#F7F5F0] border-b border-[#E8DFD2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Aggregated Trust Rating */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#B89B65] mb-2 font-sans-body">
              <span>Client Perspectives</span>
              <span aria-hidden="true">·</span>
              <span>Verified Atelier Patrons</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#171717] font-normal tracking-tight">
              Words From Our Clients
            </h2>
          </div>

          <div className="flex items-center gap-4 bg-white p-4 border border-[#E8DFD2]">
            <div className="text-center pr-4 border-r border-[#E8DFD2]">
              <span className="font-editorial text-3xl text-[#171717] font-semibold tabular-nums">4.9</span>
              <div className="flex text-[#B89B65] mt-0.5 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            </div>
            <div className="text-xs text-[#454545] font-sans-body">
              <span className="font-semibold text-[#171717] block">Over 420 Verified Reviews</span>
              <span>98% would recommend Maison Vérité</span>
            </div>
          </div>
        </div>

        {/* 4-Column Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white border border-[#E8DFD2] p-6 flex flex-col justify-between hover:border-[#171717]/40 transition-all duration-300"
            >
              <div>
                {/* Rating & Verified Indicator */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-[#B89B65]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  {rev.verifiedPurchase && (
                    <div className="flex items-center gap-1 text-[11px] text-[#454545]">
                      <CheckCircle className="w-3.5 h-3.5 text-[#B89B65]" />
                      <span>Verified</span>
                    </div>
                  )}
                </div>

                {/* Title & Review Prose */}
                <h3 className="font-editorial text-base text-[#171717] mb-2 leading-snug">
                  &ldquo;{rev.title}&rdquo;
                </h3>
                <p className="text-xs text-[#454545] font-sans-body leading-relaxed mb-6">
                  {rev.comment}
                </p>
              </div>

              {/* Attribution and Purchased Piece context */}
              <div className="border-t border-[#E8DFD2]/60 pt-4 mt-auto">
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-semibold text-[#171717]">{rev.author}</span>
                  <span className="text-[#454545] text-[11px]">{rev.date}</span>
                </div>

                <div
                  onClick={() => openQuickView(rev.product)}
                  className="flex items-center gap-2.5 p-2 bg-[#F7F5F0] hover:bg-[#E8DFD2] transition-colors cursor-pointer group"
                >
                  <img
                    src={rev.productImage}
                    alt={rev.productName}
                    referrerPolicy="no-referrer"
                    className="w-8 h-10 object-cover bg-white"
                  />
                  <div className="overflow-hidden">
                    <span className="text-[10px] text-[#454545] uppercase tracking-wider block">
                      Piece Purchased
                    </span>
                    <span className="text-xs font-editorial text-[#171717] group-hover:text-[#B89B65] transition-colors truncate block">
                      {rev.productName}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { X, Search, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    openQuickView,
    formatPrice,
    setCurrentView,
    setSelectedCategory
  } = useShop();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const results = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.fabric.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const trendingQueries = ['Cashmere', 'Blazer', 'Wool Trench', 'Trousers', 'Florentine Bag', 'Chelsea Boots'];

  const handleSelectTrending = (term: string) => {
    setQuery(term);
  };

  return (
    <div
      onClick={() => setIsSearchOpen(false)}
      className="fixed inset-0 z-50 bg-[#171717]/85 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 p-4 animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white max-w-2xl w-full border border-[#E8DFD2] shadow-2xl overflow-hidden animate-in slide-in-from-top-4 duration-200"
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-[#E8DFD2] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#B89B65] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search silhouettes, fabrics (e.g. wool, cashmere, silk)..."
            className="w-full text-base sm:text-lg font-editorial text-[#171717] placeholder:text-[#AAAAAA] focus:outline-hidden"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 text-[#888888] hover:text-[#171717] rounded-full transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results or Trending */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {query.trim() === '' ? (
            <div>
              <span className="text-[11px] uppercase tracking-widest text-[#888888] block mb-3 font-sans-body">
                Trending Atelier Searches
              </span>
              <div className="flex flex-wrap gap-2 mb-6">
                {trendingQueries.map((term) => (
                  <button
                    key={term}
                    onClick={() => handleSelectTrending(term)}
                    className="text-xs px-3 py-1.5 bg-[#F7F5F0] hover:bg-[#E8DFD2] text-[#171717] transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>

              <span className="text-[11px] uppercase tracking-widest text-[#888888] block mb-3 font-sans-body">
                Featured Highlights
              </span>
              <div className="grid grid-cols-2 gap-3">
                {PRODUCTS.slice(0, 2).map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      openQuickView(prod);
                    }}
                    className="flex items-center gap-3 p-2 bg-[#F7F5F0] hover:bg-[#E8DFD2] transition-colors cursor-pointer"
                  >
                    <img src={prod.images[0]} alt={prod.name} className="w-12 h-14 object-cover" />
                    <div>
                      <h4 className="font-editorial text-xs text-[#171717] line-clamp-1">{prod.name}</h4>
                      <span className="text-[11px] text-[#454545] tabular-nums">{formatPrice(prod.price)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-3">
              <span className="text-xs text-[#888888] block mb-2 font-sans-body">
                Found {results.length} atelier creations:
              </span>
              {results.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => {
                    setIsSearchOpen(false);
                    openQuickView(prod);
                  }}
                  className="flex items-center justify-between p-3 border border-[#E8DFD2] hover:border-[#171717] bg-white transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <img src={prod.images[0]} alt={prod.name} className="w-12 h-14 object-cover bg-[#F2EFE8]" />
                    <div>
                      <h4 className="font-editorial text-sm text-[#171717] group-hover:text-[#B89B65] transition-colors">
                        {prod.name}
                      </h4>
                      <p className="text-xs text-[#888888]">{prod.category} · {prod.fabric.split(';')[0]}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold tabular-nums text-[#171717] block">
                      {formatPrice(prod.price)}
                    </span>
                    <span className="text-[11px] text-[#B89B65] group-hover:text-[#171717] flex items-center gap-1 justify-end mt-1">
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="font-editorial text-lg text-[#171717] mb-1">No silhouettes found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-[#888888] mb-4">Try searching for &quot;cashmere&quot;, &quot;blazer&quot;, &quot;wool&quot;, or &quot;silk&quot;.</p>
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setCurrentView('catalog');
                }}
                className="text-xs uppercase tracking-wider text-[#171717] underline font-semibold"
              >
                Browse Complete Catalog
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

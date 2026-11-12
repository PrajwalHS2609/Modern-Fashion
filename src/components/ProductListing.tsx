import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, Grid3X3, LayoutGrid, X, Check, ChevronDown } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

export const ProductListing: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedGender,
    setSelectedGender,
    formatPrice
  } = useShop();

  const [sortOption, setSortOption] = useState<SortOption>('featured');
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Filter States
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
  const [selectedColorHex, setSelectedColorHex] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  const categories = ['All', 'Women', 'Men', 'Outerwear', 'Knitwear', 'Accessories', 'Footwear'];
  const occasions = ['All', 'Workwear', 'Occasion', 'Everyday', 'Casual'];
  const allSizes = ['XS', 'S', 'M', 'L', 'XL', '36 FR', '38 FR', '40 FR', '42 FR', '42 EU', '43 EU'];
  
  // Collect distinct colors
  const colorOptions = useMemo(() => {
    const map = new Map<string, { name: string; hex: string }>();
    PRODUCTS.forEach((p) => {
      p.colors.forEach((c) => {
        if (!map.has(c.hex)) map.set(c.hex, c);
      });
    });
    return Array.from(map.values());
  }, []);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory && selectedCategory !== 'All') {
        if (selectedCategory === 'Women' && product.gender !== 'women') return false;
        if (selectedCategory === 'Men' && product.gender !== 'men') return false;
        if (!['Women', 'Men'].includes(selectedCategory) && product.category !== selectedCategory) return false;
      }

      // Gender filter
      if (selectedGender !== 'all') {
        if (product.gender !== selectedGender && product.gender !== 'unisex') return false;
      }

      // Occasion filter
      if (selectedOccasion && selectedOccasion !== 'All') {
        if (product.occasion !== selectedOccasion) return false;
      }

      // Color filter
      if (selectedColorHex) {
        if (!product.colors.some((c) => c.hex.toLowerCase() === selectedColorHex.toLowerCase())) return false;
      }

      // Size filter
      if (selectedSize) {
        if (!product.sizes.includes(selectedSize)) return false;
      }

      // Price filter
      if (product.price > maxPrice) return false;

      // In stock
      if (inStockOnly && !product.inStock) return false;

      return true;
    }).sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      if (sortOption === 'rating') return b.rating - a.rating;
      if (sortOption === 'newest') return (b.tag === 'New Arrival' ? 1 : 0) - (a.tag === 'New Arrival' ? 1 : 0);
      return 0; // featured default
    });
  }, [selectedCategory, selectedGender, selectedOccasion, selectedColorHex, selectedSize, maxPrice, inStockOnly, sortOption]);

  const resetAllFilters = () => {
    setSelectedCategory(null);
    setSelectedGender('all');
    setSelectedOccasion(null);
    setSelectedColorHex(null);
    setSelectedSize(null);
    setMaxPrice(1000);
    setInStockOnly(false);
  };

  const hasActiveFilters = Boolean(
    (selectedCategory && selectedCategory !== 'All') ||
    selectedGender !== 'all' ||
    (selectedOccasion && selectedOccasion !== 'All') ||
    selectedColorHex ||
    selectedSize ||
    maxPrice < 1000 ||
    inStockOnly
  );

  return (
    <div className="bg-[#F7F5F0] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title & Breadcrumb */}
        <div className="border-b border-[#E8DFD2] pb-8 mb-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#B89B65] mb-2 font-sans-body">
            <span>Atelier Catalog</span>
            <span aria-hidden="true">·</span>
            <span>{selectedCategory || 'All Collections'}</span>
          </div>

          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171717] tracking-tight">
            {selectedCategory ? `${selectedCategory} Collection` : 'Complete Wardrobe Catalog'}
          </h1>
          <p className="text-xs sm:text-sm text-[#454545] font-sans-body mt-2 max-w-xl">
            Thoughtfully constructed pieces milled from traceable virgin wool, cashmere, and Tuscan leather.
          </p>
        </div>

        {/* Filter & Sort Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 mb-8 border-b border-[#E8DFD2]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
              className="px-4 py-2 bg-white border border-[#E8DFD2] hover:border-[#171717] text-xs uppercase tracking-wider font-semibold text-[#171717] flex items-center gap-2 transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#B89B65]" />
              <span>Filters {hasActiveFilters && '• Active'}</span>
            </button>

            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="text-xs text-[#454545] hover:text-[#171717] underline underline-offset-4 cursor-pointer"
              >
                Clear all filters
              </button>
            )}

            <span className="text-xs text-[#454545] tabular-nums hidden sm:inline">
              Showing {filteredProducts.length} pieces
            </span>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs text-[#171717]">
              <span className="text-[#454545] hidden sm:inline">Sort by:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="bg-white border border-[#E8DFD2] px-3 py-2 text-xs font-sans-body focus:outline-hidden focus:border-[#171717] cursor-pointer"
              >
                <option value="featured">Editorial Curation</option>
                <option value="newest">New Arrivals First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Desktop Grid Switcher */}
            <div className="hidden lg:flex items-center border border-[#E8DFD2] bg-white">
              <button
                onClick={() => setGridCols(3)}
                className={`p-2 transition-colors ${gridCols === 3 ? 'bg-[#171717] text-white' : 'text-[#454545] hover:text-[#171717]'}`}
                title="3-Column Large View"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-2 transition-colors ${gridCols === 4 ? 'bg-[#171717] text-white' : 'text-[#454545] hover:text-[#171717]'}`}
                title="4-Column Compact View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Drawer / Accordion Section */}
        {isFilterDrawerOpen && (
          <div className="bg-white border border-[#E8DFD2] p-6 mb-8 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between border-b border-[#E8DFD2] pb-4 mb-6">
              <h3 className="font-editorial text-lg text-[#171717]">Refine Collection</h3>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="text-[#454545] hover:text-[#171717] p-1"
                aria-label="Close filters"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Category */}
              <div>
                <h4 className="text-xs uppercase tracking-wider text-[#171717] font-semibold mb-3">Department</h4>
                <div className="space-y-1.5 text-xs">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat === 'All' ? null : cat)}
                      className={`block w-full text-left py-1 transition-colors ${
                        (selectedCategory === cat || (!selectedCategory && cat === 'All'))
                          ? 'font-semibold text-[#B89B65]'
                          : 'text-[#454545] hover:text-[#171717]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Occasion */}
              <div>
                <h4 className="text-xs uppercase tracking-wider text-[#171717] font-semibold mb-3">Occasion</h4>
                <div className="space-y-1.5 text-xs">
                  {occasions.map((occ) => (
                    <button
                      key={occ}
                      onClick={() => setSelectedOccasion(occ === 'All' ? null : occ)}
                      className={`block w-full text-left py-1 transition-colors ${
                        (selectedOccasion === occ || (!selectedOccasion && occ === 'All'))
                          ? 'font-semibold text-[#B89B65]'
                          : 'text-[#454545] hover:text-[#171717]'
                      }`}
                    >
                      {occ}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Swatches */}
              <div>
                <h4 className="text-xs uppercase tracking-wider text-[#171717] font-semibold mb-3">Color Palette</h4>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((color) => {
                    const isSelected = selectedColorHex?.toLowerCase() === color.hex.toLowerCase();
                    return (
                      <button
                        key={color.hex}
                        onClick={() => setSelectedColorHex(isSelected ? null : color.hex)}
                        className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                          isSelected ? 'border-[#171717] ring-2 ring-[#B89B65]' : 'border-[#CCCCCC] hover:scale-110'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {isSelected && <Check className="w-3 h-3 text-[#B89B65]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price & In-Stock */}
              <div>
                <h4 className="text-xs uppercase tracking-wider text-[#171717] font-semibold mb-3">
                  Max Price: {formatPrice(maxPrice)}
                </h4>
                <input
                  type="range"
                  min="200"
                  max="1000"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#171717] cursor-pointer"
                />
                
                <div className="mt-4 pt-4 border-t border-[#E8DFD2]">
                  <label className="flex items-center gap-2 text-xs text-[#171717] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="accent-[#171717]"
                    />
                    <span>Available In Stock Only</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div
            className={`grid gap-6 sm:gap-8 ${
              gridCols === 3
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
            }`}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-[#E8DFD2] p-16 text-center max-w-lg mx-auto my-12">
            <h3 className="font-editorial text-2xl text-[#171717] mb-2">No Pieces Match This Criteria</h3>
            <p className="text-xs text-[#454545] font-sans-body mb-6">
              Try adjusting your price range or clearing color and department filters to explore other atelier creations.
            </p>
            <button
              onClick={resetAllFilters}
              className="px-6 py-2.5 bg-[#171717] text-white text-xs uppercase tracking-wider font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

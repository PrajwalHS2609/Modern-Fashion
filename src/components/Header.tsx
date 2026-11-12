import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES_DATA } from '../data/products';

export const Header: React.FC = () => {
  const {
    cartCount,
    wishlist,
    currentView,
    setCurrentView,
    setSelectedCategory,
    setSelectedGender,
    setIsCartOpen,
    setIsSearchOpen,
    setIsAccountOpen
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: 'home' | 'catalog' | 'lookbook' | 'journal' | 'story', category?: string, gender?: 'all' | 'women' | 'men') => {
    setCurrentView(view);
    if (category !== undefined) setSelectedCategory(category);
    if (gender !== undefined) setSelectedGender(gender);
    setActiveMegaMenu(null);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F7F5F0]/95 backdrop-blur-md shadow-xs border-b border-[#E8DFD2]'
          : 'bg-[#F7F5F0] border-b border-[#E8DFD2]/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 -ml-2 text-[#171717] hover:text-[#B89B65] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <button
              onClick={() => handleNavClick('home', undefined, 'all')}
              className="text-left group cursor-pointer"
            >
              <span className="font-editorial text-2xl sm:text-3xl font-normal tracking-widest text-[#171717] uppercase block whitespace-nowrap">
                MAISON VÉRITÉ
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#454545] uppercase block -mt-1 font-sans-body">
                PARIS · NEW YORK
              </span>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Desk) */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wide font-sans-body text-[#171717]">
            <button
              onClick={() => handleNavClick('catalog', undefined, 'all')}
              className={`hover:text-[#B89B65] transition-colors whitespace-nowrap pb-1 relative ${
                currentView === 'catalog' && !activeMegaMenu ? 'text-[#171717] border-b border-[#171717]' : 'text-[#454545]'
              }`}
            >
              New Arrivals
            </button>

            <div
              className="relative"
              onMouseEnter={() => setActiveMegaMenu('women')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <button
                onClick={() => handleNavClick('catalog', undefined, 'women')}
                className="flex items-center gap-1 hover:text-[#B89B65] transition-colors whitespace-nowrap pb-1 text-[#454545]"
              >
                <span>Women</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#454545]" />
              </button>

              {activeMegaMenu === 'women' && (
                <div className="absolute top-full -left-12 w-[480px] bg-[#FFFFFF] border border-[#E8DFD2] shadow-xl p-6 grid grid-cols-2 gap-6 z-50">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#171717] mb-3">
                      Women&apos;s Wardrobe
                    </h4>
                    <ul className="space-y-2 text-xs text-[#454545]">
                      <li>
                        <button
                          onClick={() => handleNavClick('catalog', 'Outerwear', 'women')}
                          className="hover:text-[#B89B65] transition-colors"
                        >
                          Tailored Coats & Blazers
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleNavClick('catalog', 'Knitwear', 'women')}
                          className="hover:text-[#B89B65] transition-colors"
                        >
                          Cashmere & Fine Knits
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleNavClick('catalog', 'Women', 'women')}
                          className="hover:text-[#B89B65] transition-colors"
                        >
                          Dresses & Evening Silhouettes
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleNavClick('catalog', 'Women', 'women')}
                          className="hover:text-[#B89B65] transition-colors"
                        >
                          Pleated Trousers & Skirts
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleNavClick('catalog', 'Accessories', 'women')}
                          className="hover:text-[#B89B65] transition-colors"
                        >
                          Tuscan Leather Bags
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-[#F7F5F0] p-4 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#B89B65] font-semibold block mb-1">
                        Autumn / Winter Lookbook
                      </span>
                      <h5 className="font-editorial text-base text-[#171717] leading-tight">
                        The Monochromatic Edit
                      </h5>
                    </div>
                    <button
                      onClick={() => handleNavClick('lookbook')}
                      className="text-xs font-semibold text-[#171717] hover:text-[#B89B65] flex items-center gap-1.5 mt-3 group"
                    >
                      <span>Explore Lookbook</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div
              className="relative"
              onMouseEnter={() => setActiveMegaMenu('men')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <button
                onClick={() => handleNavClick('catalog', undefined, 'men')}
                className="flex items-center gap-1 hover:text-[#B89B65] transition-colors whitespace-nowrap pb-1 text-[#454545]"
              >
                <span>Men</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#454545]" />
              </button>

              {activeMegaMenu === 'men' && (
                <div className="absolute top-full -left-12 w-[480px] bg-[#FFFFFF] border border-[#E8DFD2] shadow-xl p-6 grid grid-cols-2 gap-6 z-50">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#171717] mb-3">
                      Men&apos;s Sartorial
                    </h4>
                    <ul className="space-y-2 text-xs text-[#454545]">
                      <li>
                        <button
                          onClick={() => handleNavClick('catalog', 'Outerwear', 'men')}
                          className="hover:text-[#B89B65] transition-colors"
                        >
                          Melton Peacoats & Overcoats
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleNavClick('catalog', 'Knitwear', 'men')}
                          className="hover:text-[#B89B65] transition-colors"
                        >
                          Merino Rollnecks & Sweaters
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleNavClick('catalog', 'Men', 'men')}
                          className="hover:text-[#B89B65] transition-colors"
                        >
                          Egyptian Cotton Shirts
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleNavClick('catalog', 'Footwear', 'men')}
                          className="hover:text-[#B89B65] transition-colors"
                        >
                          Hand-Stitched Chelsea Boots
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-[#F7F5F0] p-4 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#B89B65] font-semibold block mb-1">
                        Sartorial Philosophy
                      </span>
                      <h5 className="font-editorial text-base text-[#171717] leading-tight">
                        Deconstructed Elegance
                      </h5>
                    </div>
                    <button
                      onClick={() => handleNavClick('story')}
                      className="text-xs font-semibold text-[#171717] hover:text-[#B89B65] flex items-center gap-1.5 mt-3 group"
                    >
                      <span>Read Story</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('lookbook')}
              className={`hover:text-[#B89B65] transition-colors whitespace-nowrap pb-1 ${
                currentView === 'lookbook' ? 'text-[#171717] border-b border-[#171717]' : 'text-[#454545]'
              }`}
            >
              Collections
            </button>

            <button
              onClick={() => handleNavClick('journal')}
              className={`hover:text-[#B89B65] transition-colors whitespace-nowrap pb-1 ${
                currentView === 'journal' ? 'text-[#171717] border-b border-[#171717]' : 'text-[#454545]'
              }`}
            >
              Journal
            </button>

            <button
              onClick={() => handleNavClick('story')}
              className={`hover:text-[#B89B65] transition-colors whitespace-nowrap pb-1 ${
                currentView === 'story' ? 'text-[#171717] border-b border-[#171717]' : 'text-[#454545]'
              }`}
            >
              Maison
            </button>
          </nav>

          {/* Zone 3: Primary Action & Essential Utilities */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#171717] hover:text-[#B89B65] transition-colors relative"
              aria-label="Open search modal"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => handleNavClick('catalog')}
              className="p-2 text-[#171717] hover:text-[#B89B65] transition-colors relative"
              aria-label={`Wishlist contains ${wishlist.length} items`}
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#B89B65]" />
              )}
            </button>

            {/* Account */}
            <button
              onClick={() => setIsAccountOpen(true)}
              className="p-2 text-[#171717] hover:text-[#B89B65] transition-colors"
              aria-label="Open client account"
            >
              <User className="w-4 h-4" />
            </button>

            {/* Shopping Bag Button (Primary Action) */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#F7F5F0] bg-[#171717] hover:bg-[#2A2A2A] transition-colors rounded-none tracking-wider uppercase whitespace-nowrap shrink-0"
              aria-label={`Shopping bag containing ${cartCount} items`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Bag</span>
              <span className="text-[#B89B65] font-bold">({cartCount})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 z-50 bg-[#F7F5F0] border-t border-[#E8DFD2] overflow-y-auto p-6 pb-24 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="space-y-6">
            <div>
              <p className="text-[11px] uppercase tracking-widest text-[#454545] mb-3">Collections</p>
              <ul className="space-y-3 font-editorial text-xl text-[#171717]">
                <li>
                  <button
                    onClick={() => handleNavClick('catalog', undefined, 'all')}
                    className="hover:text-[#B89B65] transition-colors"
                  >
                    New Arrivals
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavClick('catalog', undefined, 'women')}
                    className="hover:text-[#B89B65] transition-colors"
                  >
                    Women&apos;s Collection
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavClick('catalog', undefined, 'men')}
                    className="hover:text-[#B89B65] transition-colors"
                  >
                    Men&apos;s Sartorial
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavClick('lookbook')}
                    className="hover:text-[#B89B65] transition-colors"
                  >
                    Seasonal Lookbook
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavClick('journal')}
                    className="hover:text-[#B89B65] transition-colors"
                  >
                    Fashion Journal
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavClick('story')}
                    className="hover:text-[#B89B65] transition-colors"
                  >
                    The Maison & Ateliers
                  </button>
                </li>
              </ul>
            </div>

            <div className="border-t border-[#E8DFD2] pt-6">
              <p className="text-[11px] uppercase tracking-widest text-[#454545] mb-3">Shop By Category</p>
              <div className="grid grid-cols-2 gap-3 text-xs text-[#171717] font-sans-body">
                {CATEGORIES_DATA.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleNavClick('catalog', cat.filterCategory)}
                    className="text-left py-2 px-3 bg-white border border-[#E8DFD2] hover:border-[#171717] transition-colors"
                  >
                    {cat.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-[#E8DFD2] pt-6 space-y-3 text-xs text-[#454545]">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsAccountOpen(true);
                }}
                className="w-full text-left py-2 flex items-center justify-between text-[#171717] font-medium"
              >
                <span>Client Account & Orders</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="w-full text-left py-2 flex items-center justify-between text-[#171717] font-medium"
              >
                <span>Shopping Bag ({cartCount} pieces)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

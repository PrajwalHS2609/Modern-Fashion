import React from 'react';
import { ArrowUpRight, ShieldCheck, Truck, RefreshCw, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const {
    setCurrentView,
    navigateToCategory,
    setIsSizeGuideOpen,
    setIsAccountOpen,
    setIsContactOpen
  } = useShop();

  const handleNav = (view: 'home' | 'catalog' | 'lookbook' | 'journal' | 'story', category?: string) => {
    if (category) {
      navigateToCategory(category);
    } else {
      setCurrentView(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#171717] text-[#F7F5F0] border-t border-[#262626]">
      {/* Upper Atelier Guarantees Bar */}
      <div className="border-b border-[#262626] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-3.5">
            <Truck className="w-5 h-5 text-[#B89B65] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs uppercase tracking-wider font-semibold text-white">
                Complimentary Express Shipping
              </h4>
              <p className="text-xs text-[#888888] mt-1">
                On all worldwide orders over $250. Hand-delivered in protective garment cases.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <RefreshCw className="w-5 h-5 text-[#B89B65] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs uppercase tracking-wider font-semibold text-white">
                30-Day Atelier Returns
              </h4>
              <p className="text-xs text-[#888888] mt-1">
                Complimentary doorstep collection and effortless exchanges worldwide.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <ShieldCheck className="w-5 h-5 text-[#B89B65] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs uppercase tracking-wider font-semibold text-white">
                Lifelong Craftsmanship Guarantee
              </h4>
              <p className="text-xs text-[#888888] mt-1">
                Complimentary alteration and seam repair services on all tailored wool coats.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <Sparkles className="w-5 h-5 text-[#B89B65] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs uppercase tracking-wider font-semibold text-white">
                Italian & Scottish Sourcing
              </h4>
              <p className="text-xs text-[#888888] mt-1">
                Directly from historic mills in Biella, Todd & Duncan, and Lake Como.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-editorial text-2xl tracking-widest text-[#F7F5F0] uppercase block">
              MAISON VÉRITÉ
            </span>
            <p className="text-xs text-[#888888] font-sans-body leading-relaxed max-w-sm">
              An independent luxury house dedicated to architectural tailoring, pure cashmere knitwear, and conscious leathergoods. Designed in Paris and New York, crafted by generational European artisans.
            </p>
            <div className="pt-2 text-xs text-[#B89B65] space-y-1">
              <p>Showroom: 18 Rue de l’Université, 75007 Paris</p>
              <p>Studio: 42 Mercer Street, New York, NY 10013</p>
              <p>Direct: +33 1 42 68 55 00 · concierge@maisonverite.com</p>
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#B89B65] font-semibold mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#AAAAAA] font-sans-body">
              <li>
                <button onClick={() => handleNav('catalog', 'Women')} className="hover:text-white transition-colors">
                  Women&apos;s Ready-to-Wear
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('catalog', 'Men')} className="hover:text-white transition-colors">
                  Men&apos;s Sartorial
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('catalog', 'Outerwear')} className="hover:text-white transition-colors">
                  Tailored Coats & Blazers
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('catalog', 'Knitwear')} className="hover:text-white transition-colors">
                  Mongolian Cashmere
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('catalog', 'Accessories')} className="hover:text-white transition-colors">
                  Florentine Leather Bags
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('catalog', 'Footwear')} className="hover:text-white transition-colors">
                  Artisanal Footwear
                </button>
              </li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#B89B65] font-semibold mb-4">
              Client Concierge
            </h4>
            <ul className="space-y-2.5 text-xs text-[#AAAAAA] font-sans-body">
              <li>
                <button onClick={() => setIsAccountOpen(true)} className="hover:text-white transition-colors">
                  Order Tracking & History
                </button>
              </li>
              <li>
                <button onClick={() => setIsSizeGuideOpen(true)} className="hover:text-white transition-colors">
                  Size & Fit Guide
                </button>
              </li>
              <li>
                <button onClick={() => setIsContactOpen(true)} className="hover:text-white transition-colors">
                  Contact Concierge
                </button>
              </li>
              <li>
                <button onClick={() => setIsAccountOpen(true)} className="hover:text-white transition-colors">
                  Book Private Styling
                </button>
              </li>
              <li>
                <button onClick={() => setIsContactOpen(true)} className="hover:text-white transition-colors">
                  Atelier Repairs & Care
                </button>
              </li>
              <li>
                <button onClick={() => setIsContactOpen(true)} className="hover:text-white transition-colors">
                  Cash on Delivery Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* The Maison */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#B89B65] font-semibold mb-4">
              The Maison
            </h4>
            <ul className="space-y-2.5 text-xs text-[#AAAAAA] font-sans-body">
              <li>
                <button onClick={() => handleNav('story')} className="hover:text-white transition-colors">
                  Heritage & Philosophy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('lookbook')} className="hover:text-white transition-colors">
                  Seasonal Lookbook
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('journal')} className="hover:text-white transition-colors">
                  Fashion Journal
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('story')} className="hover:text-white transition-colors">
                  Conscious Sourcing
                </button>
              </li>
              <li>
                <button onClick={() => setIsContactOpen(true)} className="hover:text-white transition-colors">
                  Press & Media Enquiries
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Lower Legal & Payment Methods Row */}
        <div className="mt-16 pt-8 border-t border-[#262626] flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#666666]">
          <div className="flex flex-wrap items-center gap-6">
            <span>&copy; {new Date().getFullYear()} Maison Vérité S.A. All rights reserved.</span>
            <span className="hover:text-[#AAAAAA] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#AAAAAA] cursor-pointer">Terms & Conditions</span>
            <span className="hover:text-[#AAAAAA] cursor-pointer">Cookie Preferences</span>
          </div>

          {/* Payment Method Badges (Subtle, authentic) */}
          <div className="flex items-center gap-3 text-[11px] tracking-wider text-[#888888] uppercase">
            <span>Visa</span>
            <span>·</span>
            <span>Mastercard</span>
            <span>·</span>
            <span>Amex</span>
            <span>·</span>
            <span>Apple Pay</span>
            <span>·</span>
            <span>Klarna</span>
            <span>·</span>
            <span>COD Available</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

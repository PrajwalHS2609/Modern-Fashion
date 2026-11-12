import React from 'react';
import { ArrowLeft, ShieldCheck, Feather, HeartHandshake } from 'lucide-react';
import { HERO_IMAGE, CAMPAIGN_IMAGE, BLAZER_IMAGE, CASHMERE_IMAGE } from '../data/products';
import { useShop } from '../context/ShopContext';

export const StoryView: React.FC = () => {
  const { setCurrentView } = useShop();

  return (
    <div className="bg-[#F7F5F0] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-[#E8DFD2] pb-6 mb-12">
          <button
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#454545] hover:text-[#171717] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#B89B65]" />
            <span>Return to Maison Home</span>
          </button>
          <span className="text-xs uppercase tracking-[0.2em] text-[#B89B65] font-sans-body">
            Atelier Archives & Heritage
          </span>
        </div>

        {/* Narrative Feature */}
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
          <span className="text-xs uppercase tracking-widest text-[#B89B65] font-semibold font-sans-body">
            Paris Showroom · Biella Mills · Florentine Workshops
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#171717] font-normal leading-tight">
            The Philosophy of Conscious Permanence
          </h1>
          <p className="text-sm sm:text-base text-[#454545] font-sans-body max-w-2xl mx-auto leading-relaxed">
            Founded with the belief that true luxury lies in restraint, craftsmanship, and materials that mature rather than deteriorate.
          </p>
        </div>

        {/* Hero Photo Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-center">
          <div className="lg:col-span-8 aspect-[16/10] bg-[#E8DFD2] overflow-hidden">
            <img src={HERO_IMAGE} alt="Maison Vérité Atelier Philosophy" className="w-full h-full object-cover" />
          </div>
          <div className="lg:col-span-4 bg-white border border-[#E8DFD2] p-8 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#B89B65] font-semibold block">Civitanova Marche</span>
            <h3 className="font-editorial text-2xl text-[#171717]">48 Hours of Hand Tailoring</h3>
            <p className="text-xs text-[#454545] font-sans-body leading-relaxed">
              Every double-breasted jacket requires two days of basted hand-stitching, canvas chest floating, and pressing under curved cast-iron weights.
            </p>
          </div>
        </div>

        {/* Three Sourcing Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white border border-[#E8DFD2] p-8 space-y-4">
            <div className="w-10 h-10 rounded-full bg-[#F7F5F0] text-[#B89B65] flex items-center justify-center">
              <Feather className="w-5 h-5" />
            </div>
            <h4 className="font-editorial text-xl text-[#171717]">Grade-A Combed Cashmere</h4>
            <p className="text-xs text-[#454545] leading-relaxed font-sans-body">
              Never sheared, only gently hand-combed from the underbellies of Capra hircus goats during the natural spring molting season in the high Mongolian plateaus.
            </p>
          </div>

          <div className="bg-white border border-[#E8DFD2] p-8 space-y-4">
            <div className="w-10 h-10 rounded-full bg-[#F7F5F0] text-[#B89B65] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-editorial text-xl text-[#171717]">Vegetable-Tanned Boxcalf</h4>
            <p className="text-xs text-[#454545] leading-relaxed font-sans-body">
              Tanned exclusively using chestnut and mimosa bark tannins in Tuscany. Zero toxic chromium salts, leaving an organic aroma and rich honeyed patina.
            </p>
          </div>

          <div className="bg-white border border-[#E8DFD2] p-8 space-y-4">
            <div className="w-10 h-10 rounded-full bg-[#F7F5F0] text-[#B89B65] flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h4 className="font-editorial text-xl text-[#171717]">Lifetime Atelier Repair</h4>
            <p className="text-xs text-[#454545] leading-relaxed font-sans-body">
              Every tailored coat and leather accessory includes complimentary lifetime stitch maintenance and hardware replacement at any of our global ateliers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

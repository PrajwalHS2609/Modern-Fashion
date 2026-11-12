import React from 'react';
import { ArrowRight, Feather, ShieldCheck, Compass, Sparkles } from 'lucide-react';
import { BLAZER_IMAGE, HERO_IMAGE } from '../data/products';
import { useShop } from '../context/ShopContext';

export const BrandStory: React.FC = () => {
  const { setCurrentView } = useShop();

  return (
    <section className="py-24 bg-[#FFFFFF] border-b border-[#E8DFD2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-[#B89B65] mb-3 font-sans-body">
            <span>Our Heritage & Philosophy</span>
            <span aria-hidden="true">·</span>
            <span>Est. 2021</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171717] leading-tight mb-4" style={{ textWrap: 'balance' }}>
            More Than Fashion. <br />
            <span className="italic">A Reflection of You.</span>
          </h2>
          <p className="text-sm text-[#454545] font-sans-body leading-relaxed">
            Maison Vérité was born from a refusal to accept disposable fashion cycles. We partner directly with historic family-owned mills in Biella, Lake Como, and Florence to craft garments that outlive trends and mature with age.
          </p>
        </div>

        {/* 2-Column Story Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Asymmetrical Images */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="aspect-[3/4] overflow-hidden bg-[#F2EFE8]">
              <img
                src={BLAZER_IMAGE}
                alt="Sartorial tailored blazer craftsmanship"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="aspect-[3/4] overflow-hidden bg-[#F2EFE8] mt-8">
              <img
                src={HERO_IMAGE}
                alt="Silk drapery and silhouette movement"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Pillars & Details */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-none bg-[#F7F5F0] border border-[#E8DFD2] flex items-center justify-center shrink-0 text-[#171717]">
                  <Feather className="w-5 h-5 text-[#B89B65]" />
                </div>
                <div>
                  <h3 className="font-editorial text-lg text-[#171717] mb-1">
                    Traceable Natural Fibers
                  </h3>
                  <p className="text-xs sm:text-sm text-[#454545] leading-relaxed">
                    100% pure Grade-A Mongolian cashmere combed sustainably during spring molting, Super 130s virgin wool from regenerative Australian pastures, and organic Giza 87 Egyptian cotton.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-none bg-[#F7F5F0] border border-[#E8DFD2] flex items-center justify-center shrink-0 text-[#171717]">
                  <ShieldCheck className="w-5 h-5 text-[#B89B65]" />
                </div>
                <div>
                  <h3 className="font-editorial text-lg text-[#171717] mb-1">
                    Atelier Hand Craftsmanship
                  </h3>
                  <p className="text-xs sm:text-sm text-[#454545] leading-relaxed">
                    Every tailored jacket contains hand-basted horsehair chest canvas that molds to the wearer’s body over time. Finished with genuine horn buttons and French interior seams.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-none bg-[#F7F5F0] border border-[#E8DFD2] flex items-center justify-center shrink-0 text-[#171717]">
                  <Compass className="w-5 h-5 text-[#B89B65]" />
                </div>
                <div>
                  <h3 className="font-editorial text-lg text-[#171717] mb-1">
                    Conscious Small-Batch Discipline
                  </h3>
                  <p className="text-xs sm:text-sm text-[#454545] leading-relaxed">
                    We produce in strictly calculated micro-batches of 50 to 200 pieces per style. Zero landfill waste, zero deadstock liquidation, and lifelong repair services on all leather and outerwear.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  setCurrentView('story');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-7 py-3.5 bg-[#171717] text-[#F7F5F0] hover:bg-[#2A2A2A] text-xs uppercase tracking-widest font-semibold flex items-center gap-2 group transition-colors cursor-pointer"
              >
                <span>Discover Our Story</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#B89B65]" />
              </button>
            </div>
          </div>
        </div>

        {/* 4-Item Proof Metrics Row (adjacent to claims, meeting Constitution §1.H) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-[#E8DFD2] text-center">
          <div>
            <span className="font-editorial text-3xl sm:text-4xl text-[#171717] block tabular-nums">100%</span>
            <span className="text-xs text-[#454545] uppercase tracking-wider mt-1 block">Traceable Wool & Cashmere</span>
          </div>
          <div>
            <span className="font-editorial text-3xl sm:text-4xl text-[#171717] block tabular-nums">48 hrs</span>
            <span className="text-xs text-[#454545] uppercase tracking-wider mt-1 block">Hand-Tailoring Per Blazer</span>
          </div>
          <div>
            <span className="font-editorial text-3xl sm:text-4xl text-[#171717] block tabular-nums">0%</span>
            <span className="text-xs text-[#454545] uppercase tracking-wider mt-1 block">Synthetic Microfibers</span>
          </div>
          <div>
            <span className="font-editorial text-3xl sm:text-4xl text-[#171717] block tabular-nums">Lifetime</span>
            <span className="text-xs text-[#454545] uppercase tracking-wider mt-1 block">Atelier Repair Guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
};

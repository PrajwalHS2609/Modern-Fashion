import React, { useState } from 'react';
import { ArrowLeft, Clock, Tag } from 'lucide-react';
import { JOURNAL_STORIES } from '../data/products';
import { useShop } from '../context/ShopContext';

export const JournalView: React.FC = () => {
  const { setCurrentView } = useShop();
  const [selectedStory, setSelectedStory] = useState<(typeof JOURNAL_STORIES)[0] | null>(null);

  return (
    <div className="bg-[#F7F5F0] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Back button */}
        <div className="flex items-center justify-between border-b border-[#E8DFD2] pb-6 mb-10">
          <button
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#454545] hover:text-[#171717] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#B89B65]" />
            <span>Return to Maison Home</span>
          </button>
          <span className="text-xs uppercase tracking-[0.2em] text-[#B89B65] font-sans-body">
            Editorial Fashion Journal
          </span>
        </div>

        {selectedStory ? (
          <div className="max-w-3xl mx-auto bg-white border border-[#E8DFD2] p-8 sm:p-14 space-y-8 animate-in fade-in duration-200">
            <button
              onClick={() => setSelectedStory(null)}
              className="text-xs uppercase tracking-wider text-[#888888] hover:text-[#171717] flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Articles</span>
            </button>

            <div>
              <div className="flex items-center gap-2 text-xs text-[#B89B65] uppercase tracking-wider mb-2 font-sans-body">
                <span>{selectedStory.category}</span>
                <span>·</span>
                <span>{selectedStory.readTime}</span>
              </div>
              <h1 className="font-editorial text-3xl sm:text-4xl text-[#171717] font-normal leading-tight">
                {selectedStory.title}
              </h1>
            </div>

            <div className="aspect-[16/9] bg-[#F2EFE8] overflow-hidden">
              <img src={selectedStory.image} alt={selectedStory.title} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#454545] font-sans-body leading-relaxed">
              <p className="first-letter:text-5xl first-letter:font-editorial first-letter:text-[#171717] first-letter:float-left first-letter:mr-3 first-letter:leading-none">
                {selectedStory.snippet} In contemporary dressing, clothing is frequently divorced from the physical hands that shaped it. At Maison Vérité, every lapel angle, pick-stitch, and wool fiber represents generations of inherited savoir-faire.
              </p>
              <p>
                From the mineral-rich glacier waters of the Italian Alps that soften Biella fleece to the slow seven-coat hand burnishing of Tuscan box calfskin, each garment is conceived as an architectural dialogue between human form and natural matter.
              </p>
              <p>
                To wear an unlined double-breasted jacket or a pure 4-ply Mongolian cashmere sweater is to experience tactile tranquility—a quiet armor against ephemeral digital noise.
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center max-w-xl mx-auto mb-16">
              <h1 className="font-editorial text-4xl sm:text-5xl text-[#171717] font-normal mb-3">
                The Atelier Journal
              </h1>
              <p className="text-xs sm:text-sm text-[#454545] font-sans-body leading-relaxed">
                Essays on textile history, bespoke tailoring techniques, interviews with master artisans, and seasonal styling essays.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {JOURNAL_STORIES.map((story) => (
                <div
                  key={story.id}
                  onClick={() => setSelectedStory(story)}
                  className="bg-white border border-[#E8DFD2] overflow-hidden group cursor-pointer flex flex-col justify-between hover:border-[#171717] transition-all"
                >
                  <div className="aspect-[4/3] bg-[#F2EFE8] overflow-hidden">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center gap-2 text-[11px] text-[#B89B65] uppercase tracking-wider mb-2 font-sans-body">
                        <span>{story.category}</span>
                        <span>·</span>
                        <span>{story.readTime}</span>
                      </div>
                      <h3 className="font-editorial text-xl text-[#171717] mb-2 group-hover:text-[#B89B65] transition-colors leading-snug">
                        {story.title}
                      </h3>
                      <p className="text-xs text-[#454545] line-clamp-3 leading-relaxed font-sans-body">
                        {story.snippet}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#E8DFD2] flex justify-between items-center text-xs text-[#171717] font-semibold">
                      <span>Read Essay</span>
                      <span className="text-[#B89B65]">→</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

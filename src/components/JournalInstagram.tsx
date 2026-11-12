import React, { useState } from 'react';
import { Instagram, ArrowUpRight, Heart, Share2 } from 'lucide-react';
import { HERO_IMAGE, CAMPAIGN_IMAGE, BLAZER_IMAGE, CASHMERE_IMAGE, LEATHER_IMAGE } from '../data/products';
import { useShop } from '../context/ShopContext';

interface SocialPost {
  id: string;
  image: string;
  handle: string;
  caption: string;
  likes: number;
}

const SOCIAL_POSTS: SocialPost[] = [
  {
    id: 'sp-1',
    image: HERO_IMAGE,
    handle: '@maisonverite',
    caption: 'Architectural lines and sculptural tailoring in our Paris showroom.',
    likes: 1240
  },
  {
    id: 'sp-2',
    image: CAMPAIGN_IMAGE,
    handle: '@eleanor.style',
    caption: 'Morning stroll through the Marais in the Oversized Wool Trench.',
    likes: 890
  },
  {
    id: 'sp-3',
    image: BLAZER_IMAGE,
    handle: '@sartorial_journal',
    caption: 'Basted canvas interior inspection. The soul of traditional jacketmaking.',
    likes: 2150
  },
  {
    id: 'sp-4',
    image: CASHMERE_IMAGE,
    handle: '@maisonverite',
    caption: 'Grade-A 4-ply Mongolian cashmere. Texture that needs no filter.',
    likes: 1430
  },
  {
    id: 'sp-5',
    image: LEATHER_IMAGE,
    handle: '@florence_atelier',
    caption: 'Hand-burnished box calfskin catching the Tuscan golden hour.',
    likes: 980
  }
];

export const JournalInstagram: React.FC = () => {
  const [activePost, setActivePost] = useState<SocialPost | null>(null);
  const { addToast } = useShop();

  const handleFollow = () => {
    addToast('Maison Vérité Social', 'Redirecting to @maisonverite official journal.', 'info');
  };

  return (
    <section className="py-20 bg-[#FFFFFF] border-b border-[#E8DFD2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#B89B65] mb-2 font-sans-body">
              <span>Atelier Communauté</span>
              <span aria-hidden="true">·</span>
              <span>@maisonverite</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#171717] font-normal tracking-tight">
              Get Inspired. Get Styled. Stay Connected.
            </h2>
          </div>

          <button
            onClick={handleFollow}
            className="text-xs uppercase tracking-widest font-semibold text-[#171717] hover:text-[#B89B65] flex items-center gap-2 group transition-colors"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow @maisonverite</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* 5-Column Photo Stream */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {SOCIAL_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={() => setActivePost(post)}
              className="group relative aspect-square overflow-hidden bg-[#F2EFE8] cursor-pointer"
            >
              <img
                src={post.image}
                alt={post.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#171717]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-4 text-white">
                <span className="text-[10px] tracking-wider uppercase text-[#E8DFD2]">
                  {post.handle}
                </span>
                <p className="text-[11px] font-sans-body line-clamp-2 text-[#F7F5F0]">
                  {post.caption}
                </p>
                <div className="flex items-center gap-3 text-xs text-[#E8DFD2]">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span className="tabular-nums">{post.likes}</span>
                  </span>
                  <Share2 className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Post Modal */}
      {activePost && (
        <div
          onClick={() => setActivePost(null)}
          className="fixed inset-0 z-50 bg-[#171717]/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white max-w-lg w-full overflow-hidden border border-[#E8DFD2] flex flex-col"
          >
            <div className="aspect-[4/3] bg-[#F2EFE8] overflow-hidden">
              <img
                src={activePost.image}
                alt={activePost.caption}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-[#171717]">{activePost.handle}</span>
                <span className="text-xs text-[#454545] flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-[#B89B65] text-[#B89B65]" />
                  <span>{activePost.likes} appreciations</span>
                </span>
              </div>
              <p className="text-sm text-[#454545] font-sans-body mb-6">
                {activePost.caption}
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setActivePost(null)}
                  className="px-4 py-2 text-xs uppercase tracking-wider text-[#171717] bg-[#F7F5F0] hover:bg-[#E8DFD2]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

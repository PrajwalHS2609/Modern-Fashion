import React, { useState } from 'react';
import { X, Globe } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Currency } from '../types';

export const AnnouncementBar: React.FC = () => {
  const [isDismissed, setIsDismissed] = useState(false);
  const { currency, setCurrency } = useShop();

  if (isDismissed) return null;

  return (
    <aside aria-label="Announcement" className="bg-[#171717] text-[#F7F5F0] text-xs py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="hidden sm:flex items-center gap-2 text-[#E8DFD2]/80">
          <Globe className="w-3.5 h-3.5 text-[#B89B65]" />
          <span>Ateliers in Paris & New York</span>
        </div>

        <div className="flex-1 text-center font-normal tracking-wide text-xs sm:text-[13px]">
          <span>Complimentary worldwide express shipping on orders over $250</span>
          <span className="mx-2 text-[#B89B65]">·</span>
          <span className="text-[#E8DFD2]/90">All duties & taxes calculated at checkout</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-[11px] font-medium tracking-wider text-[#E8DFD2]">
            {(['USD', 'EUR', 'GBP'] as Currency[]).map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`px-1.5 py-0.5 rounded transition-colors ${
                  currency === curr
                    ? 'text-white font-semibold underline underline-offset-4 decoration-[#B89B65]'
                    : 'text-[#E8DFD2]/60 hover:text-white'
                }`}
                title={`Switch currency to ${curr}`}
              >
                {curr}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsDismissed(true)}
            className="text-[#E8DFD2]/60 hover:text-white p-0.5 transition-colors"
            aria-label="Dismiss promotional announcement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};

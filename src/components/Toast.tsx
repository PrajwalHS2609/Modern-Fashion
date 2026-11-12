import React from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#171717] text-[#F7F5F0] border border-[#B89B65]/40 shadow-xl p-4 flex items-start justify-between gap-3 animate-in slide-in-from-bottom-4 duration-200"
        >
          <div className="flex items-start gap-2.5">
            {toast.type === 'success' && <CheckCircle className="w-4 h-4 text-[#B89B65] shrink-0 mt-0.5" />}
            {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-[#E8DFD2] shrink-0 mt-0.5" />}
            <div>
              <h5 className="font-editorial text-sm font-normal text-white">{toast.title}</h5>
              <p className="text-xs text-[#E8DFD2]/80 font-sans-body mt-0.5">{toast.message}</p>
            </div>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-[#888888] hover:text-white p-0.5"
            aria-label="Dismiss toast"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};

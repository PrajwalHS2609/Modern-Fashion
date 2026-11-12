import React, { useState } from 'react';
import { Mail, Check, ArrowRight, Copy } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [consent, setConsent] = useState(true);
  const [copied, setCopied] = useState(false);
  const { applyCoupon, addToast } = useShop();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Invalid Email', 'Please enter a valid email address.', 'error');
      return;
    }
    if (!consent) {
      addToast('Privacy Consent', 'Please accept the privacy policy to continue.', 'error');
      return;
    }
    setIsSubmitted(true);
    addToast('Welcome to Maison Vérité', 'Your exclusive privilege code is WELCOME15 for 15% off.', 'success');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('WELCOME15');
    setCopied(true);
    applyCoupon('WELCOME15');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 bg-[#171717] text-[#F7F5F0] border-b border-[#333333]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Editorial Eyebrow */}
        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-[#B89B65] mb-3 font-sans-body">
          <span>The Atelier Dispatch</span>
          <span aria-hidden="true">·</span>
          <span>Private Invitation</span>
        </div>

        <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[#F7F5F0] mb-4">
          A Little More Style in Your Inbox.
        </h2>

        <p className="text-sm sm:text-base text-[#E8DFD2]/80 font-sans-body max-w-xl mx-auto mb-8 leading-relaxed">
          Subscribe for early access to collection launches, sartorial guides, fabric archive dispatches, and private trunk show invitations.
        </p>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-[#B89B65] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your personal email address..."
                  required
                  className="w-full bg-[#262626] border border-[#454545] text-sm text-[#F7F5F0] pl-10 pr-4 py-3 placeholder:text-[#888888] focus:outline-hidden focus:border-[#B89B65] transition-colors"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-[#B89B65] hover:bg-[#A68853] text-[#171717] text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#E8DFD2]/70 font-sans-body">
              <input
                type="checkbox"
                id="newsletter-consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="accent-[#B89B65] rounded-xs"
              />
              <label htmlFor="newsletter-consent" className="cursor-pointer">
                I agree to receive communications from Maison Vérité. Unsubscribe at any time.
              </label>
            </div>
          </form>
        ) : (
          <div className="bg-[#262626] border border-[#B89B65]/40 p-6 max-w-md mx-auto animate-in fade-in duration-300">
            <div className="flex items-center justify-center gap-2 text-[#B89B65] mb-2">
              <Check className="w-5 h-5" />
              <span className="text-xs uppercase tracking-widest font-semibold">Subscription Confirmed</span>
            </div>
            <p className="text-xs text-[#E8DFD2] mb-4">
              Thank you for joining our circle. Use your courtesy code below at checkout for 15% off your next purchase:
            </p>
            <div className="flex items-center justify-center gap-3 bg-[#171717] p-3 border border-[#454545]">
              <span className="font-mono text-base font-bold text-[#B89B65] tracking-widest">
                WELCOME15
              </span>
              <button
                onClick={handleCopyCode}
                className="text-xs bg-[#B89B65] text-[#171717] px-3 py-1 font-semibold flex items-center gap-1.5 hover:bg-[#A68853] transition-colors"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Applied!' : 'Copy & Apply'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

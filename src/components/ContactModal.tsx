import React, { useState } from 'react';
import { X, Send, CheckCircle, Phone, Mail, MapPin } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ContactModal: React.FC = () => {
  const { isContactOpen, setIsContactOpen, addToast } = useShop();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Order & Sizing Advice');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isContactOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Concierge Message Transmitted', 'Our private stylist will respond within 4 hours.', 'success');
  };

  const handleClose = () => {
    setIsContactOpen(false);
    setSubmitted(false);
  };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 bg-[#171717]/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#F7F5F0] max-w-2xl w-full border border-[#E8DFD2] shadow-2xl relative my-auto animate-in zoom-in-95 duration-200"
      >
        <div className="p-6 bg-white border-b border-[#E8DFD2] flex items-center justify-between">
          <div>
            <h3 className="font-editorial text-xl text-[#171717]">Atelier Concierge</h3>
            <span className="text-xs text-[#888888] font-sans-body">Personal Stylists & Client Support</span>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-[#454545] hover:text-[#171717] rounded-full transition-colors"
            aria-label="Close concierge"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {!submitted ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-white border border-[#E8DFD2] text-xs text-[#454545] font-sans-body">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#B89B65] shrink-0" />
                  <span>+33 1 42 68 55 00</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#B89B65] shrink-0" />
                  <span>concierge@maisonverite.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#B89B65] shrink-0" />
                  <span>Paris & New York</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#454545] mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="e.g. Genevieve Laurent"
                      className="w-full bg-white border border-[#E8DFD2] px-3 py-2 text-xs focus:outline-hidden focus:border-[#171717]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#454545] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="client@domain.com"
                      className="w-full bg-white border border-[#E8DFD2] px-3 py-2 text-xs focus:outline-hidden focus:border-[#171717]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#454545] mb-1">
                    Nature of Inquiry
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-white border border-[#E8DFD2] px-3 py-2 text-xs focus:outline-hidden focus:border-[#171717]"
                  >
                    <option>Order & Sizing Advice</option>
                    <option>Private Showroom Styling Appointment</option>
                    <option>Custom Alterations & Garment Care</option>
                    <option>Cash on Delivery Consultation</option>
                    <option>Press & Editorial Collaborations</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#454545] mb-1">
                    Detailed Message
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    placeholder="How may our atelier assist with your wardrobe selection?"
                    className="w-full bg-white border border-[#E8DFD2] p-3 text-xs focus:outline-hidden focus:border-[#171717]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#171717] hover:bg-[#2A2A2A] text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-[#B89B65]" />
                  <span>Transmit Concierge Request</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center py-12 space-y-4 animate-in fade-in duration-200">
              <CheckCircle className="w-12 h-12 text-[#B89B65] mx-auto" />
              <h4 className="font-editorial text-2xl text-[#171717]">Request Registered</h4>
              <p className="text-xs text-[#454545] font-sans-body max-w-sm mx-auto">
                Thank you, {name || 'valued patron'}. A senior atelier stylist has been assigned and will reply to {email} within 4 hours.
              </p>
              <button
                onClick={handleClose}
                className="mt-4 px-6 py-2 bg-[#171717] text-white text-xs uppercase tracking-wider"
              >
                Close Window
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ChevronDown, MessageSquare } from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Orders & Payment',
    question: 'How can I place an order?',
    answer: 'Select your chosen silhouette, preferred colorway, and size. Add the item to your shopping bag and proceed to our secure checkout. You can check out seamlessly as a guest or access saved preferences via your Maison Vérité client account.'
  },
  {
    id: 'faq-2',
    category: 'Orders & Payment',
    question: 'What payment methods are accepted?',
    answer: 'We accept Visa, Mastercard, American Express, Apple Pay, Google Pay, and Klarna (Pay in 4 interest-free installments). All transactions are encrypted with 256-bit bank-grade TLS security.'
  },
  {
    id: 'faq-3',
    category: 'Orders & Payment',
    question: 'Do you offer cash on delivery (COD)?',
    answer: 'Yes, Cash on Delivery is available in select metropolitan regions including London, Paris, Dubai, Milan, and New York. You can inspect the signature packaging upon courier arrival and pay cash or contactless terminal upon handover.'
  },
  {
    id: 'faq-4',
    category: 'Shipping & Delivery',
    question: 'What are the available shipping options?',
    answer: 'We provide complimentary Express Courier Delivery (2-4 business days) on all global orders exceeding $250. Standard tracked delivery ($25) takes 3-5 days. Same-day white-glove courier is available in Manhattan and central Paris.'
  },
  {
    id: 'faq-5',
    category: 'Shipping & Delivery',
    question: 'How can I track my order?',
    answer: 'Once your order leaves our atelier, you will receive a dispatch dispatch note with your tracking link. You can also view live delivery milestones directly inside your client account order history.'
  },
  {
    id: 'faq-6',
    category: 'Returns & Sizing',
    question: 'What is your return and exchange policy?',
    answer: 'We offer complimentary 30-day global returns and exchanges. Garments must be unworn, in original condition with security ribbons attached, and packaged in their original protective garment bags.'
  },
  {
    id: 'faq-7',
    category: 'Returns & Sizing',
    question: 'How do I choose the correct size?',
    answer: 'Each product page features our interactive Size Guide with exact centimeter and inch garment measurements. If you are between sizes or need bespoke fit advice, our atelier concierge is available via live messaging.'
  },
  {
    id: 'faq-8',
    category: 'Client Care',
    question: 'How can I contact customer support?',
    answer: 'Our Maison Concierge team is available Monday through Saturday from 9:00 AM to 8:00 PM CET via our Contact Concierge portal, telephone (+33 1 42 68 55 00), or email at concierge@maisonverite.com.'
  }
];

export const FaqSection: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-3']);
  const { setIsContactOpen, setIsSizeGuideOpen } = useShop();

  const toggleFaq = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-20 bg-[#F7F5F0] border-b border-[#E8DFD2]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-[#B89B65] mb-2 font-sans-body">
            <span>Atelier Assistance</span>
            <span aria-hidden="true">·</span>
            <span>Client Inquiries</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#171717] font-normal tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#454545] font-sans-body mt-2">
            Clear guidelines regarding ordering, international deliveries, sizing, and payment options.
          </p>
        </div>

        {/* Clean Accordion Layout */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className="bg-white border border-[#E8DFD2] transition-colors"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-editorial text-base sm:text-lg text-[#171717] font-normal">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#454545] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#B89B65]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#454545] font-sans-body leading-relaxed border-t border-[#E8DFD2]/40 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                    {faq.id === 'faq-7' && (
                      <button
                        onClick={() => setIsSizeGuideOpen(true)}
                        className="mt-3 text-xs font-semibold text-[#B89B65] hover:text-[#171717] underline underline-offset-4 block"
                      >
                        Open Interactive Size & Fit Guide →
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 p-6 bg-[#FFFFFF] border border-[#E8DFD2] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F7F5F0] flex items-center justify-center text-[#B89B65]">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-editorial text-base text-[#171717]">Need personalized assistance?</h4>
              <p className="text-xs text-[#454545]">Our dedicated stylists and concierges are at your service.</p>
            </div>
          </div>
          <button
            onClick={() => setIsContactOpen(true)}
            className="px-5 py-2.5 bg-[#171717] hover:bg-[#2A2A2A] text-white text-xs uppercase tracking-wider font-semibold transition-colors shrink-0"
          >
            Contact Atelier Concierge
          </button>
        </div>
      </div>
    </section>
  );
};

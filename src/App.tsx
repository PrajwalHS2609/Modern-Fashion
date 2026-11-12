import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CategoryGrid } from './components/CategoryGrid';
import { NewArrivalsSection } from './components/NewArrivalsSection';
import { TrendingCollection } from './components/TrendingCollection';
import { BestSellersSection } from './components/BestSellersSection';
import { BrandStory } from './components/BrandStory';
import { OccasionShop } from './components/OccasionShop';
import { LookbookSection } from './components/LookbookSection';
import { CustomerReviews } from './components/CustomerReviews';
import { JournalInstagram } from './components/JournalInstagram';
import { NewsletterSection } from './components/NewsletterSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { ProductListing } from './components/ProductListing';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AccountModal } from './components/AccountModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { SearchModal } from './components/SearchModal';
import { ContactModal } from './components/ContactModal';
import { JournalView } from './components/JournalView';
import { StoryView } from './components/StoryView';
import { ToastContainer } from './components/Toast';

const MainContent: React.FC = () => {
  const { currentView } = useShop();

  return (
    <main className="flex-1 w-full">
      {currentView === 'home' && (
        <>
          <HeroBanner />
          <CategoryGrid />
          <NewArrivalsSection />
          <TrendingCollection />
          <BestSellersSection />
          <BrandStory />
          <OccasionShop />
          <LookbookSection />
          <CustomerReviews />
          <JournalInstagram />
          <NewsletterSection />
          <FaqSection />
        </>
      )}

      {currentView === 'catalog' && <ProductListing />}
      {currentView === 'lookbook' && (
        <div className="pt-6">
          <LookbookSection />
          <NewArrivalsSection />
        </div>
      )}
      {currentView === 'journal' && <JournalView />}
      {currentView === 'story' && <StoryView />}
    </main>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#171717] selection:bg-[#E8DFD2] selection:text-[#171717]">
        {/* Promotional announcement bar */}
        <AnnouncementBar />

        {/* Sticky luxury header */}
        <Header />

        {/* Dynamic page content */}
        <MainContent />

        {/* Global footer */}
        <Footer />

        {/* Drawers & Modals */}
        <ProductDetailModal />
        <CartDrawer />
        <CheckoutModal />
        <AccountModal />
        <SizeGuideModal />
        <SearchModal />
        <ContactModal />
        <ToastContainer />
      </div>
    </ShopProvider>
  );
}

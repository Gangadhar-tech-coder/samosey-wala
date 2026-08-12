import React, { useEffect, useState } from 'react';
import { apiService } from './services/api';

// Component Imports
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import FeatureGrid from './components/FeatureGrid';
import FoodShowcase from './components/FoodShowcase';
import CompetitionTable from './components/CompetitionTable';
import BusinessModel from './components/BusinessModel';
import StoreFormats from './components/StoreFormats';
import StoreGallery from './components/StoreGallery';
import RevenueSection from './components/RevenueSection';
import ProfitSection from './components/ProfitSection';
import GrowthTimeline from './components/GrowthTimeline';
import FounderSection from './components/FounderSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import SpecialShowcase from './components/SpecialShowcase';

function App() {
  const [appData, setAppData] = useState({
    settings: null,
    products: [],
    stores: [],
    metrics: [],
    phases: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settings, products, stores, metrics, phases] = await Promise.all([
          apiService.getSiteSettings(),
          apiService.getProducts(),
          apiService.getStores(),
          apiService.getBusinessMetrics(),
          apiService.getGrowthStrategy()
        ]);
        setAppData({ settings, products, stores, metrics, phases });
      } catch (error) {
        console.error("Failed to load application data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full bg-near-black flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-gray-500 text-xs tracking-[0.25em] uppercase animate-pulse">
            LOADING SAMOSEY WALA...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-near-black text-white relative">
      {/* 1. Glassmorphic Navigation Menu */}
      <Navbar siteSettings={appData.settings} />

      {/* 2. Cinematic Hero Pinning & Fragmentation Animation */}
      <Hero siteSettings={appData.settings} />

      {/* 3. Introduction Narrative Sequence */}
      <ProblemSolution />

      {/* 4. Core Pillars 3x3 Grid */}
      <FeatureGrid />

      {/* 5. Cinematic Food Experience Showcase */}
      <FoodShowcase products={appData.products} />

      {/* 5b. Special Items Scroll Showcase with Rotating/Zooming Animation */}
      <SpecialShowcase />

      {/* 7. Competitive Landscape comparison table */}
      <CompetitionTable />

      {/* 8. FOCO Business Flow Model */}
      <BusinessModel />

      {/* 9. Store Formats */}
      <StoreFormats stores={appData.stores} />

      {/* 10. Store Gallery */}
      <StoreGallery />

      {/* 11. Outlet Revenue Calculations and Calculator */}
      <RevenueSection />

      {/* 12. Profitability expenditure margin breakdown */}
      <ProfitSection />

      {/* 13. Scaling Trajectory Timeline */}
      <GrowthTimeline phases={appData.phases} />

      {/* 14. Founder Vision quote mask reveal */}
      <FounderSection />

      {/* 15. Franchise Inquiry Contact Form */}
      <ContactSection siteSettings={appData.settings} />

      {/* 16. Sleek Dark Footer */}
      <Footer siteSettings={appData.settings} />
    </div>
  );
}

export default App;

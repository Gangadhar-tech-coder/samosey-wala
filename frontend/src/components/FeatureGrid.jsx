import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Sparkles, Heart, BadgePercent, Leaf, 
  Flame, Percent, CupSoda, Coffee, Layers 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FeatureGrid = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current.querySelectorAll('.feature-card');
      
      // Sequential card reveal scroll animation
      gsap.fromTo(cards, 
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.08,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            end: 'bottom 50%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      title: "Fresh",
      desc: "Prepared fresh daily. No stale fillings or overnight cold storage. Cooked to crisp perfection on-demand.",
      icon: <Sparkles className="text-primary" size={24} />
    },
    {
      title: "Healthy",
      desc: "Fried in high-grade monitored oil. We maintain strict TPC thresholds, preventing toxic oil recycling.",
      icon: <Heart className="text-primary" size={24} />
    },
    {
      title: "Affordable",
      desc: "Authentic QSR taste starting from ₹20. Positioning premium quality at local vendor price points.",
      icon: <BadgePercent className="text-primary" size={24} />
    },
    {
      title: "Natural Ingredients",
      desc: "Zero chemical preservatives, additives, or MSG. Pure, authentic fillings cooked cleanly.",
      icon: <Leaf className="text-primary" size={24} />
    },
    {
      title: "Indian Spices",
      desc: "Infused with standard, hand-selected spices from local farms, guaranteeing robust, premium Indian flavors.",
      icon: <Flame className="text-primary" size={24} />
    },
    {
      title: "50% Maida · 50% Wheat",
      desc: "A proprietary dough blend offering the perfect crispy pastry crunch with significantly lighter digestion.",
      icon: <Percent className="text-primary" size={24} />
    },
    {
      title: "Tea",
      desc: "Premium, aromatic Masala and Elaichi teas brewed using fresh milk and hand-crushed spices.",
      icon: <CupSoda className="text-primary" size={24} />
    },
    {
      title: "Coffee",
      desc: "South Indian filter coffee frothed to perfection, offering a rich, strong dose of caffeine.",
      icon: <Coffee className="text-primary" size={24} />
    },
    {
      title: "Chaats & Premium Snacks",
      desc: "Delectable side menu items like Samosa Chaats and Bread Pakoras to boost customer order value.",
      icon: <Layers className="text-primary" size={24} />
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-near-black border-b border-white/5 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="text-primary font-bold text-xs md:text-sm tracking-[0.2em] uppercase mb-4 block">
            CORE BRAND PILLARS
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-black text-white mb-4">
            Fresh. Healthy. Affordable. Made right.
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto">
            A standardized product offering backed by hygienic preparation, smart ingredients, and value pricing.
          </p>
        </div>

        {/* 3x3 Card Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feat, index) => (
            <div 
              key={index}
              className="feature-card glassmorphism p-8 rounded-lg border border-white/5 hover:border-primary/20 transition-all duration-500 flex flex-col items-start text-left group"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 bg-primary/5 group-hover:bg-primary/10 border border-primary/15 group-hover:border-primary/30 rounded flex items-center justify-center mb-6 transition-colors duration-300">
                {feat.icon}
              </div>
              
              {/* Title & Desc */}
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                {feat.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed font-light">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;

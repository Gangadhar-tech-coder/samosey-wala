import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { apiService } from '../services/api';

gsap.registerPlugin(ScrollTrigger);

const MarketOpportunity = ({ metrics }) => {
  const sectionRef = useRef(null);

  // References for numeric animations
  const marketValRef = useRef(null);
  const unorgValRef = useRef(null);

  useEffect(() => {
    if (!metrics || metrics.length === 0) return;

    const ctx = gsap.context(() => {
      // 1. Text reveals for descriptions and titles
      gsap.fromTo('.opportunity-text', 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.15,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // 2. Count animation for Indian Snacks Market (₹250,000+ Cr)
      const marketTarget = 250000;
      const marketCounter = { val: 0 };
      gsap.to(marketCounter, {
        val: marketTarget,
        duration: 2.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        onUpdate: () => {
          if (marketValRef.current) {
            marketValRef.current.innerHTML = `₹${Math.round(marketCounter.val).toLocaleString()}+ Cr`;
          }
        }
      });

      // 3. Count animation for Unorganised Market (85%)
      const unorgTarget = 85;
      const unorgCounter = { val: 0 };
      gsap.to(unorgCounter, {
        val: unorgTarget,
        duration: 1.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        onUpdate: () => {
          if (unorgValRef.current) {
            unorgValRef.current.innerHTML = `~${Math.round(unorgCounter.val)}%`;
          }
        }
      });

      // 4. Slide-up reveal for non-numeric stats
      gsap.fromTo('.stat-reveal', 
        { opacity: 0, scale: 0.9, y: 40 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          stagger: 0.1, 
          duration: 0.8, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, [metrics]);

  if (!metrics || metrics.length === 0) return null;

  // Map metric names to corresponding fields
  const marketMetric = metrics.find(m => m.metric_name.includes("Snacks Market"));
  const consumedMetric = metrics.find(m => m.metric_name.includes("Consumed"));
  const unorgMetric = metrics.find(m => m.metric_name.includes("Unorganised"));
  const organisedMetric = metrics.find(m => m.metric_name.includes("Organised"));

  return (
    <section 
      ref={sectionRef}
      className="py-28 bg-[#0D0D0E] border-b border-white/5 relative overflow-hidden px-6 md:px-12"
    >
      {/* Visual neon grid background pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Left Side: Investor Narrative Pitch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 text-left">
            <span className="opportunity-text text-primary font-bold text-xs md:text-sm tracking-[0.25em] uppercase mb-4 block">
              INVESTOR PROSPECTUS
            </span>
            <h2 className="opportunity-text text-3xl md:text-5xl font-serif font-black text-white mb-6 leading-tight">
              A Massive,<br/>Consolidated Snacking Opportunity
            </h2>
            <p className="opportunity-text text-gray-400 text-sm md:text-base leading-relaxed font-light mb-6">
              India consumes samosas in millions every day, making it the country's default QSR choice. Yet, 85% of this multi-billion dollar market is still trapped in local, unstandardized, and unhygienic streets.
            </p>
            <p className="opportunity-text text-gray-500 text-xs md:text-sm leading-relaxed font-light">
              *Figures sourced directly from the Samosey Wala business research report.
            </p>
          </div>

          {/* Right Side: Big Numeric Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            
            {/* Metric 1: Snacks Market */}
            <div className="stat-reveal glassmorphism p-8 rounded-lg border border-white/5 flex flex-col justify-between min-h-[220px]">
              <div>
                <h3 
                  ref={marketValRef}
                  className="text-4xl md:text-5xl font-black text-white font-sans tracking-tight mb-3 text-gradient-orange"
                >
                  ₹0
                </h3>
                <h4 className="text-base font-bold text-gray-200 mb-2">
                  {marketMetric?.metric_name || 'Indian Snacks Market'}
                </h4>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed font-light">
                {marketMetric?.description || 'Annual market size for Indian street foods and savory snacks.'}
              </p>
            </div>

            {/* Metric 2: Samosas Consumed */}
            <div className="stat-reveal glassmorphism p-8 rounded-lg border border-white/5 flex flex-col justify-between min-h-[220px]">
              <div>
                <h3 className="text-4xl md:text-5xl font-black text-white font-sans tracking-tight mb-3">
                  {consumedMetric?.metric_value || 'Millions'} <span className="text-lg font-normal text-gray-400">{consumedMetric?.unit || '/day'}</span>
                </h3>
                <h4 className="text-base font-bold text-gray-200 mb-2">
                  {consumedMetric?.metric_name || 'Samosas Consumed'}
                </h4>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed font-light">
                {consumedMetric?.description || 'Samosas remain the absolute default choice of snack across India.'}
              </p>
            </div>

            {/* Metric 3: Unorganised Market */}
            <div className="stat-reveal glassmorphism p-8 rounded-lg border border-white/5 flex flex-col justify-between min-h-[220px]">
              <div>
                <h3 
                  ref={unorgValRef}
                  className="text-4xl md:text-5xl font-black text-white font-sans tracking-tight mb-3 text-gradient-orange"
                >
                  ~0%
                </h3>
                <h4 className="text-base font-bold text-gray-200 mb-2">
                  {unorgMetric?.metric_name || 'Unorganised Market'}
                </h4>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed font-light">
                {unorgMetric?.description || 'Of the current market is unorganised, presenting a massive consolidation play.'}
              </p>
            </div>

            {/* Metric 4: Organised QSR Segment */}
            <div className="stat-reveal glassmorphism p-8 rounded-lg border border-white/5 flex flex-col justify-between min-h-[220px]">
              <div>
                <h3 className="text-4xl md:text-5xl font-black text-white font-sans tracking-tight mb-3">
                  {organisedMetric?.metric_value || 'Fast-Growing'}
                </h3>
                <h4 className="text-base font-bold text-gray-200 mb-2">
                  {organisedMetric?.metric_name || 'Organised Segment'}
                </h4>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed font-light">
                {organisedMetric?.description || 'QSR segment driving hygiene, brand trust, and standardization.'}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default MarketOpportunity;

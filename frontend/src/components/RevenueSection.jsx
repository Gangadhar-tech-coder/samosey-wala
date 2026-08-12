import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calculator, DollarSign, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const RevenueSection = () => {
  const sectionRef = useRef(null);
  
  // Ref elements for counting animations
  const dailyTotalRef = useRef(null);
  const monthlyTotalRef = useRef(null);
  const annualTotalRef = useRef(null);

  // Calculator inputs state initialized with baseline report values
  const [samosaQty, setSamosaQty] = useState(200);
  const [samosaPrice, setSamosaPrice] = useState(20);
  
  const [teaQty, setTeaQty] = useState(200);
  const [teaPrice, setTeaPrice] = useState(15);
  
  const [coffeeQty, setCoffeeQty] = useState(50);
  const [coffeePrice, setCoffeePrice] = useState(20);
  
  const [otherSnacksRev, setOtherSnacksRev] = useState(2000);

  // Dynamic calculations based on state inputs
  const calculatedDaily = (samosaQty * samosaPrice) + (teaQty * teaPrice) + (coffeeQty * coffeePrice) + Number(otherSnacksRev);
  const calculatedMonthly = calculatedDaily * 30;
  const calculatedAnnual = calculatedMonthly * 12;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Reveal titles
      gsap.fromTo('.revenue-animate-text', 
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );

      // 2. Animate counter values for baseline totals
      const countData = { daily: 0, monthly: 0, annual: 0 };
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.baseline-card-container',
          start: 'top 75%',
        }
      });

      tl.to(countData, {
        daily: 10000,
        monthly: 300000,
        annual: 3600000,
        duration: 2.5,
        ease: 'power3.out',
        onUpdate: () => {
          if (dailyTotalRef.current) dailyTotalRef.current.innerHTML = `₹${Math.round(countData.daily).toLocaleString()}`;
          if (monthlyTotalRef.current) monthlyTotalRef.current.innerHTML = `₹${(Math.round(countData.monthly) / 100000).toFixed(1)} Lakhs`;
          if (annualTotalRef.current) annualTotalRef.current.innerHTML = `₹${(Math.round(countData.annual) / 100000).toFixed(1)} Lakhs`;
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-near-black border-b border-white/5 px-6 md:px-12"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="revenue-animate-text text-primary font-bold text-xs md:text-sm tracking-[0.25em] uppercase mb-4 block">
            FINANCIAL VIABILITY
          </span>
          <h2 className="revenue-animate-text text-3xl md:text-5xl font-serif font-black text-white mb-4">
            Outlet Revenue Model
          </h2>
          <p className="revenue-animate-text text-gray-400 text-sm md:text-base max-w-xl mx-auto">
            A transparent overview of our standardized single-outlet financial calculations directly from the project report.
          </p>
        </div>

        {/* BASELINE REPORT MODEL FIGURES */}
        <div className="mb-20">
          <div className="text-left mb-6 border-l-2 border-primary pl-4">
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">
              Project Report Baseline Calculations
            </h3>
            <p className="text-xs text-gray-500 font-light mt-1">
              *Calculated based on standard sales at a standard high-footfall location.
            </p>
          </div>

          {/* Breakdown cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 text-left">
            
            {/* Samosas */}
            <div className="glassmorphism p-6 rounded-lg border border-white/5">
              <span className="text-[10px] text-gray-500 tracking-wider uppercase font-semibold">SAMOSA SALES</span>
              <h4 className="text-xl font-bold text-white mt-1">₹4,000 <span className="text-xs font-normal text-gray-400">/day</span></h4>
              <p className="text-xs text-gray-500 mt-2">200 qty × ₹20 each</p>
            </div>

            {/* Tea */}
            <div className="glassmorphism p-6 rounded-lg border border-white/5">
              <span className="text-[10px] text-gray-500 tracking-wider uppercase font-semibold">TEA SALES</span>
              <h4 className="text-xl font-bold text-white mt-1">₹3,000 <span className="text-xs font-normal text-gray-400">/day</span></h4>
              <p className="text-xs text-gray-500 mt-2">200 qty × ₹15 each</p>
            </div>

            {/* Coffee */}
            <div className="glassmorphism p-6 rounded-lg border border-white/5">
              <span className="text-[10px] text-gray-500 tracking-wider uppercase font-semibold">COFFEE SALES</span>
              <h4 className="text-xl font-bold text-white mt-1">₹1,000 <span className="text-xs font-normal text-gray-400">/day</span></h4>
              <p className="text-xs text-gray-500 mt-2">50 qty × ₹20 each</p>
            </div>

            {/* Other Snacks */}
            <div className="glassmorphism p-6 rounded-lg border border-white/5">
              <span className="text-[10px] text-gray-500 tracking-wider uppercase font-semibold">OTHER SNACKS</span>
              <h4 className="text-xl font-bold text-white mt-1">₹2,000 <span className="text-xs font-normal text-gray-400">/day</span></h4>
              <p className="text-xs text-gray-500 mt-2">Chaats & premium snacks</p>
            </div>

          </div>

          {/* Baseline Totals count-up cards */}
          <div className="baseline-card-container grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            
            <div className="bg-primary/5 border border-primary/20 p-8 rounded-lg">
              <span className="text-xs text-gray-400 tracking-widest uppercase font-medium">TOTAL DAILY REVENUE</span>
              <h3 ref={dailyTotalRef} className="text-3xl md:text-4xl font-black text-primary mt-2">
                ₹0
              </h3>
            </div>

            <div className="bg-primary/5 border border-primary/20 p-8 rounded-lg">
              <span className="text-xs text-gray-400 tracking-widest uppercase font-medium">TOTAL MONTHLY REVENUE</span>
              <h3 ref={monthlyTotalRef} className="text-3xl md:text-4xl font-black text-white mt-2">
                ₹0 Lakhs
              </h3>
            </div>

            <div className="bg-primary/5 border border-primary/20 p-8 rounded-lg">
              <span className="text-xs text-gray-400 tracking-widest uppercase font-medium">TOTAL ANNUAL REVENUE</span>
              <h3 ref={annualTotalRef} className="text-3xl md:text-4xl font-black text-white mt-2">
                ₹0 Lakhs
              </h3>
            </div>

          </div>
        </div>

        {/* DYNAMIC INTERACTIVE CALCULATOR */}
        <div className="glassmorphism p-8 md:p-12 rounded-xl border border-primary/20 bg-dark-surface/40 relative overflow-hidden text-left">
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center space-x-3 mb-8 pb-4 border-b border-white/5">
            <Calculator size={22} className="text-primary" />
            <h3 className="text-xl font-bold text-white tracking-wide">
              Interactive Revenue Projection Calculator
            </h3>
            <span className="ml-auto text-[9px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded tracking-widest uppercase">
              Simulator
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Input Controls */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Samosa Inputs */}
              <div>
                <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-2">
                  Samosas / Day
                </label>
                <input 
                  type="number"
                  min="0"
                  value={samosaQty}
                  onChange={(e) => setSamosaQty(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-[#1A1A1E] border border-white/5 rounded px-4 py-2.5 text-white font-sans text-sm focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-2">
                  Samosa Price (₹)
                </label>
                <input 
                  type="number"
                  min="1"
                  value={samosaPrice}
                  onChange={(e) => setSamosaPrice(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-[#1A1A1E] border border-white/5 rounded px-4 py-2.5 text-white font-sans text-sm focus:border-primary transition-colors"
                />
              </div>

              {/* Tea Inputs */}
              <div>
                <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-2">
                  Tea Cups / Day
                </label>
                <input 
                  type="number"
                  min="0"
                  value={teaQty}
                  onChange={(e) => setTeaQty(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-[#1A1A1E] border border-white/5 rounded px-4 py-2.5 text-white font-sans text-sm focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-2">
                  Tea Price (₹)
                </label>
                <input 
                  type="number"
                  min="1"
                  value={teaPrice}
                  onChange={(e) => setTeaPrice(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-[#1A1A1E] border border-white/5 rounded px-4 py-2.5 text-white font-sans text-sm focus:border-primary transition-colors"
                />
              </div>

              {/* Coffee Inputs */}
              <div>
                <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-2">
                  Coffee Cups / Day
                </label>
                <input 
                  type="number"
                  min="0"
                  value={coffeeQty}
                  onChange={(e) => setCoffeeQty(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-[#1A1A1E] border border-white/5 rounded px-4 py-2.5 text-white font-sans text-sm focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-2">
                  Coffee Price (₹)
                </label>
                <input 
                  type="number"
                  min="1"
                  value={coffeePrice}
                  onChange={(e) => setCoffeePrice(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-[#1A1A1E] border border-white/5 rounded px-4 py-2.5 text-white font-sans text-sm focus:border-primary transition-colors"
                />
              </div>

              {/* Other Snacks Revenue */}
              <div className="sm:col-span-2">
                <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-2">
                  Other Snacks Daily Sales (₹)
                </label>
                <input 
                  type="number"
                  min="0"
                  value={otherSnacksRev}
                  onChange={(e) => setOtherSnacksRev(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-[#1A1A1E] border border-white/5 rounded px-4 py-2.5 text-white font-sans text-sm focus:border-primary transition-colors"
                />
              </div>

            </div>

            {/* Calculated Output Display */}
            <div className="lg:col-span-5 bg-near-black/60 border border-white/5 rounded-xl p-8 flex flex-col justify-between">
              
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] text-gray-500 tracking-wider uppercase font-semibold">Simulated Daily Revenue</span>
                  <h4 className="text-3xl font-black text-primary font-sans mt-1">
                    ₹{calculatedDaily.toLocaleString()}
                  </h4>
                </div>

                <div>
                  <span className="text-[10px] text-gray-500 tracking-wider uppercase font-semibold">Simulated Monthly Revenue</span>
                  <h4 className="text-3xl font-black text-white font-sans mt-1">
                    ₹{calculatedMonthly.toLocaleString()}
                  </h4>
                </div>

                <div>
                  <span className="text-[10px] text-gray-500 tracking-wider uppercase font-semibold">Simulated Annual Revenue</span>
                  <h4 className="text-3xl font-black text-white font-sans mt-1">
                    ₹{calculatedAnnual.toLocaleString()}
                  </h4>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center space-x-2 text-gray-500 text-[10px]">
                <TrendingUp size={12} className="text-primary" />
                <span>EBITDA profitability varies based on rent and staff parameters. See profit margin chart below.</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default RevenueSection;

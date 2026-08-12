import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ProfitSection = () => {
  const sectionRef = useRef(null);
  const chartRef = useRef(null);

  const profitMetrics = [
    { name: "COGS (Cost of Goods)", percentage: 50, value: "₹5,000", color: "#2E2E33" },
    { name: "Rent & Overheads", percentage: 15, value: "₹1,500", color: "#444449" },
    { name: "Staff Salary", percentage: 15, value: "₹1,500", color: "#5A5A60" },
    { name: "Marketing Budget", percentage: 3, value: "₹300", color: "#707077" },
    { name: "Other Operations", percentage: 2, value: "₹200", color: "#86868E" },
    { name: "EBITDA Profit Margin", percentage: 15, value: "₹1,500", color: "#FF6600", highlighted: true },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const paths = chartRef.current.querySelectorAll('.donut-segment');
      
      // Animate each donut segment drawing itself on scroll
      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: chartRef.current,
            start: 'top 75%',
          }
        });
      });

      // Animate center text scaling in
      gsap.fromTo('.donut-center-text', 
        { scale: 0.8, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 1, 
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: chartRef.current,
            start: 'top 75%',
          }
        }
      );

      // Animate table rows sliding in
      gsap.fromTo('.profit-table-row',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.profit-table-container',
            start: 'top 80%',
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Donut parameters for circle calculation
  const radius = 70;
  const circumference = 2 * Math.PI * radius; // Approx 439.82
  
  let accumulatedPercentage = 0;

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-[#0D0D0E] border-b border-white/5 px-6 md:px-12"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-bold text-xs md:text-sm tracking-[0.25em] uppercase mb-4 block">
            PROFITABILITY PROFILE
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-black text-white mb-4">
            Margin & Profitability
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto">
            A precise visual breakdown of target outlet expenditures and the net profit yield of a standard outlet.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: Dynamic Animated SVG Donut Chart */}
          <div className="lg:col-span-5 flex justify-center">
            <div ref={chartRef} className="relative w-[280px] h-[280px] flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                {/* Background base circle */}
                <circle 
                  cx="100" 
                  cy="100" 
                  r={radius} 
                  fill="transparent" 
                  stroke="rgba(255,255,255,0.02)" 
                  strokeWidth="16" 
                />
                {/* Donut segments */}
                {profitMetrics.map((met, idx) => {
                  const strokeLength = (met.percentage / 100) * circumference;
                  const strokeOffset = circumference - strokeLength;
                  const rotationOffset = (accumulatedPercentage / 100) * 360;
                  
                  accumulatedPercentage += met.percentage;
                  
                  return (
                    <circle 
                      key={idx}
                      className="donut-segment transform-gpu origin-center"
                      cx="100" 
                      cy="100" 
                      r={radius} 
                      fill="transparent" 
                      stroke={met.color} 
                      strokeWidth={met.highlighted ? "18" : "14"} 
                      strokeDasharray={`${strokeLength} ${circumference}`}
                      style={{ 
                        transform: `rotate(${rotationOffset}deg)`,
                      }}
                    />
                  );
                })}
              </svg>
              
              {/* Donut Center Overlay Text */}
              <div className="donut-center-text absolute flex flex-col items-center justify-center text-center">
                <span className="text-primary font-black text-4xl font-sans tracking-tight">15%</span>
                <span className="text-gray-400 text-[10px] tracking-widest uppercase font-semibold mt-1">EBITDA MARGIN</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Expenditure Details and Net Yields */}
          <div className="lg:col-span-7 text-left">
            <div className="profit-table-container space-y-6">
              
              <div className="border-b border-white/5 pb-4">
                <h3 className="text-xl font-bold text-white mb-2">Single-Outlet Margin Breakdown</h3>
                <p className="text-sm text-gray-400 font-light">
                  Target EBITDA margin yield evaluated at the baseline revenue model of ₹10,000/day.
                </p>
              </div>

              {/* Table list */}
              <div className="space-y-3">
                {profitMetrics.map((met, idx) => (
                  <div 
                    key={idx}
                    className={`profit-table-row flex justify-between items-center p-3 rounded transition-colors ${
                      met.highlighted 
                        ? 'bg-primary/10 border border-primary/25 shadow-lg shadow-primary/5' 
                        : 'bg-dark-surface/50 border border-white/5'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {/* Color indicator circle */}
                      <span 
                        className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: met.color }}
                      />
                      <span className={`text-sm ${met.highlighted ? 'text-white font-bold' : 'text-gray-300 font-light'}`}>
                        {met.name}
                      </span>
                    </div>
                    <div className="text-right flex items-center space-x-4">
                      <span className={`text-sm font-semibold ${met.highlighted ? 'text-primary' : 'text-gray-400'}`}>
                        {met.percentage}%
                      </span>
                      <span className={`text-sm font-bold w-20 text-right ${met.highlighted ? 'text-white' : 'text-gray-300'}`}>
                        {met.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Net monthly yield calculations */}
              <div className="mt-8 p-6 bg-primary/5 border border-primary/10 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h4 className="text-xs text-primary font-bold tracking-widest uppercase mb-1">
                    NET EBITDA PROFIT YIELD
                  </h4>
                  <p className="text-gray-400 text-xs font-light">
                    Calculated net earnings for a partner per month at baseline.
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <h3 className="text-2xl font-black text-white">₹45,000 <span className="text-xs font-normal text-gray-400">/month</span></h3>
                  <p className="text-xs text-gray-500 mt-1">₹1,500 Daily EBITDA profit</p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ProfitSection;

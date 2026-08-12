import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, HelpCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CompetitionTable = () => {
  const tableRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = tableRef.current.querySelectorAll('.table-row-animate');
      
      // Animate table rows one-by-one as they enter the screen
      gsap.fromTo(rows, 
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: tableRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, tableRef);

    return () => ctx.revert();
  }, []);

  const dimensions = [
    { name: "Quality", samosey: "High", singh: "High", party: "Medium", local: "Low" },
    { name: "Hygiene", samosey: "High", singh: "Medium", party: "Medium", local: "Low" },
    { name: "Variety", samosey: "High", singh: "Medium", party: "Medium", local: "Low" },
    { name: "Freshness", samosey: "High", singh: "Medium", party: "Medium", local: "Variable" },
    { name: "Pricing", samosey: "Affordable", singh: "Premium", party: "Premium", local: "Cheapest" },
    { name: "Ambience", samosey: "Premium", singh: "Premium", party: "Premium", local: "None" },
    { name: "Innovation", samosey: "High", singh: "Medium", party: "Low", local: "Low" },
  ];

  return (
    <section className="py-24 bg-near-black border-b border-white/5 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-bold text-xs md:text-sm tracking-[0.2em] uppercase mb-4 block">
            MARKET POSITIONING
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-black text-white mb-4">
            Competitive Landscape
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto">
            A premium comparison detailing how Samosey Wala marries premium brand experience with affordable street pricing.
          </p>
        </div>

        {/* Comparison Table Container */}
        <div 
          ref={tableRef}
          className="w-full overflow-x-auto rounded-lg border border-white/5 bg-dark-surface shadow-2xl"
        >
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-white/5 bg-near-black">
                <th className="p-5 text-xs font-bold uppercase tracking-wider text-gray-500 w-1/4">
                  Dimension
                </th>
                <th className="p-5 text-xs font-bold uppercase tracking-wider text-primary text-center bg-primary/5 border-x border-primary/20 w-1/4">
                  <div className="flex items-center justify-center space-x-1.5">
                    <ShieldCheck size={14} className="text-primary" />
                    <span>Samosey Wala</span>
                  </div>
                </th>
                <th className="p-5 text-xs font-bold uppercase tracking-wider text-gray-400 text-center w-1/6">
                  Samosa Singh
                </th>
                <th className="p-5 text-xs font-bold uppercase tracking-wider text-gray-400 text-center w-1/6">
                  Samosa Party
                </th>
                <th className="p-5 text-xs font-bold uppercase tracking-wider text-gray-400 text-center w-1/6">
                  Local Vendors
                </th>
              </tr>
            </thead>
            <tbody>
              {dimensions.map((dim, idx) => (
                <tr 
                  key={idx}
                  className="table-row-animate border-b border-white/5 hover:bg-near-black/30 transition-colors duration-150"
                >
                  {/* Dimension Name */}
                  <td className="p-5 text-sm font-semibold text-gray-300 font-sans">
                    {dim.name}
                  </td>
                  
                  {/* Samosey Wala (Highlighted) */}
                  <td className="p-5 text-sm font-bold text-center text-white bg-primary/5 border-x border-primary/10">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs tracking-wider">
                      {dim.samosey}
                    </span>
                  </td>
                  
                  {/* Samosa Singh */}
                  <td className="p-5 text-sm text-center text-gray-400 font-light">
                    {dim.singh}
                  </td>
                  
                  {/* Samosa Party */}
                  <td className="p-5 text-sm text-center text-gray-400 font-light">
                    {dim.party}
                  </td>
                  
                  {/* Local Vendors */}
                  <td className="p-5 text-sm text-center text-gray-500 font-light">
                    {dim.local}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Subtle note */}
        <div className="flex items-center justify-center space-x-2 mt-6 text-gray-500 text-xs">
          <HelpCircle size={12} />
          <span>Competitive data based on standardized industry QSR reports and brand audits.</span>
        </div>

      </div>
    </section>
  );
};

export default CompetitionTable;

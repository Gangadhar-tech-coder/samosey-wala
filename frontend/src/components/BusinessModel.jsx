import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Settings, BadgeCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const BusinessModel = () => {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const step1Ref = useRef(null);
  const step2Ref = useRef(null);
  const step3Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Calculate path length for stroke dash array
      const path = pathRef.current;
      const pathLength = path.getTotalLength();
      
      // Initialize path as hidden
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength
      });

      // 2. Main timeline to draw connecting line and activate steps
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 65%',
          end: 'bottom 45%',
          scrub: true,
        }
      });

      // Draw line progressively
      tl.to(path, {
        strokeDashoffset: 0,
        duration: 2.5,
        ease: 'none'
      }, 0);

      // Sequentially activate step card visuals
      tl.fromTo(step1Ref.current, 
        { borderColor: 'rgba(255,255,255,0.05)', backgroundColor: 'rgba(18,18,18,0.75)' },
        { borderColor: 'rgba(255,102,0,0.5)', backgroundColor: 'rgba(255,102,0,0.03)', duration: 0.5 },
        0.2
      );

      tl.fromTo(step2Ref.current, 
        { borderColor: 'rgba(255,255,255,0.05)', backgroundColor: 'rgba(18,18,18,0.75)' },
        { borderColor: 'rgba(255,102,0,0.5)', backgroundColor: 'rgba(255,102,0,0.03)', duration: 0.5 },
        1.2
      );

      tl.fromTo(step3Ref.current, 
        { borderColor: 'rgba(255,255,255,0.05)', backgroundColor: 'rgba(18,18,18,0.75)' },
        { borderColor: 'rgba(255,102,0,0.5)', backgroundColor: 'rgba(255,102,0,0.03)', duration: 0.5 },
        2.2
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      id="business"
      className="py-24 bg-[#0D0D0E] border-b border-white/5 px-6 md:px-12 relative"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="text-primary font-bold text-xs md:text-sm tracking-[0.2em] uppercase mb-4 block">
            FRANCHISE MODEL
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-black text-white mb-4">
            The FOCO Business Model
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto">
            Franchise Owned, Company Operated. A partnership structure designed for scalable, hassle-free expansion.
          </p>
        </div>

        {/* FOCO Flow Diagram */}
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-6 mt-16 min-h-[300px]">
          
          {/* Desktop Connecting SVG Path Line */}
          <div className="absolute inset-0 hidden lg:block pointer-events-none z-0">
            <svg className="w-full h-full" viewBox="0 0 1000 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                ref={pathRef}
                d="M 180 150 L 500 150 L 820 150" 
                stroke="#FF6600" 
                strokeWidth="3" 
                strokeLinecap="round"
                className="draw-path"
              />
              {/* Static background dotted line */}
              <path 
                d="M 180 150 L 820 150" 
                stroke="rgba(255,255,255,0.05)" 
                strokeWidth="3" 
                strokeDasharray="8 8"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Mobile Fallback SVG line (can render standard border-l on vertical list) */}
          
          {/* Card 1: Franchise Owned */}
          <div 
            ref={step1Ref}
            className="w-full lg:w-[30%] glassmorphism p-8 rounded-lg border flex flex-col items-center text-center z-10 transition-all duration-300 relative group"
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transform duration-300">
              <Briefcase size={26} />
            </div>
            <span className="text-[10px] text-primary font-bold tracking-widest uppercase mb-2 block">
              STEP 01
            </span>
            <h3 className="text-xl font-bold text-white mb-4">Franchise Owned</h3>
            <p className="text-gray-400 text-sm leading-relaxed font-light">
              The franchise partner provides the capital investment and owns the physical outlet asset, securing their equity.
            </p>
          </div>

          {/* Card 2: Company Operated */}
          <div 
            ref={step2Ref}
            className="w-full lg:w-[30%] glassmorphism p-8 rounded-lg border flex flex-col items-center text-center z-10 transition-all duration-300 relative group"
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transform duration-300">
              <Settings size={26} />
            </div>
            <span className="text-[10px] text-primary font-bold tracking-widest uppercase mb-2 block">
              STEP 02
            </span>
            <h3 className="text-xl font-bold text-white mb-4">Company Operated</h3>
            <p className="text-gray-400 text-sm leading-relaxed font-light">
              Samosey Wala manages the daily operations, supply chain, billing systems, and staffing, mitigating partner operational risks.
            </p>
          </div>

          {/* Card 3: Standardised Quality */}
          <div 
            ref={step3Ref}
            className="w-full lg:w-[30%] glassmorphism p-8 rounded-lg border flex flex-col items-center text-center z-10 transition-all duration-300 relative group"
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transform duration-300">
              <BadgeCheck size={26} />
            </div>
            <span className="text-[10px] text-primary font-bold tracking-widest uppercase mb-2 block">
              STEP 03
            </span>
            <h3 className="text-xl font-bold text-white mb-4">Standardised Quality</h3>
            <p className="text-gray-400 text-sm leading-relaxed font-light">
              We enforce strict standardized recipes, hygiene codes, and customer service guidelines, ensuring repeat patronage.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default BusinessModel;

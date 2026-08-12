import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AlertTriangle, ShieldCheck, Flame, Award, Heart, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ProblemSolution = () => {
  const introSectionRef = useRef(null);
  const splitSectionRef = useRef(null);
  const rightPanelRef = useRef(null);
  const leftContentRef = useRef(null);
  const rightContentRef = useRef(null);

  // Intro steps refs for the PROBLEM -> OPPORTUNITY -> SAMOSEY WALA sequence
  const step1Ref = useRef(null);
  const step2Ref = useRef(null);
  const step3Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Introduction section timeline (PROBLEM -> OPPORTUNITY -> SAMOSEY WALA)
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: introSectionRef.current,
          start: 'top 80%',
          end: 'bottom 40%',
          scrub: true,
        }
      });

      introTl.fromTo(step1Ref.current, { opacity: 0.2, y: 30 }, { opacity: 1, y: 0, duration: 1 })
             .fromTo(step2Ref.current, { opacity: 0.2, y: 30 }, { opacity: 1, y: 0, duration: 1 }, "+=0.5")
             .fromTo(step3Ref.current, { opacity: 0.2, y: 30 }, { opacity: 1, y: 0, duration: 1 }, "+=0.5");

      // 2. Split Screen transition timeline
      const splitTl = gsap.timeline({
        scrollTrigger: {
          trigger: splitSectionRef.current,
          start: 'top top',
          end: '+=150%', // Pin duration for the transformation
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      // Animate clip path of the right panel to sweep across and reveal the promise
      splitTl.fromTo(rightPanelRef.current, 
        { clipPath: 'inset(0 0 0 100%)' }, 
        { clipPath: 'inset(0 0 0 0%)', ease: 'none' }
      );

      // Parallax effect on the content inside left/right panels during sweep
      splitTl.fromTo(leftContentRef.current, 
        { x: 0 }, 
        { x: -50, opacity: 0, ease: 'none' }, 
        0
      );
      
      splitTl.fromTo(rightContentRef.current, 
        { x: 50, opacity: 0 }, 
        { x: 0, opacity: 1, ease: 'none' }, 
        0
      );

    }, splitSectionRef);

    return () => ctx.revert();
  }, []);

  const problems = [
    "Inconsistent hygiene standards",
    "Use of Dalda & low-grade oils",
    "Artificial preservatives & chemicals",
    "Limited, uninspired menu variety",
    "Highly inconsistent taste & quality",
  ];

  const promises = [
    "Certified, highly hygienic preparation",
    "100% natural, fresh ingredients only",
    "Zero added preservatives or chemicals",
    "Wide, innovative fusion QSR menu",
    "Standardized taste across all outlets",
  ];

  return (
    <div id="story" className="bg-near-black">
      {/* SECTION 1: NARRATIVE INTRODUCTION */}
      <section 
        ref={introSectionRef} 
        className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto border-b border-white/5"
      >
        <div className="text-center mb-16">
          <span className="text-primary font-bold text-xs md:text-sm tracking-[0.2em] uppercase mb-4 block">
            MARKET GAP ANALYSIS
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-black text-white max-w-4xl mx-auto leading-tight">
            From a gap in India's street food market to a trusted national snack brand
          </h2>
        </div>

        {/* Cinematic Flow (PROBLEM -> OPPORTUNITY -> SAMOSEY WALA) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
          
          {/* Step 1: Problem */}
          <div ref={step1Ref} className="glassmorphism p-8 rounded-lg flex flex-col justify-between border-white/5 relative">
            <div>
              <div className="w-12 h-12 bg-red-950/40 border border-red-500/30 rounded flex items-center justify-center text-red-500 mb-6">
                <AlertTriangle size={24} />
              </div>
              <h3 className="text-xl font-bold font-sans text-white mb-4">THE STREET FOOD GAP</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Samosas dominate India's daily snack habits. However, consumers are increasingly concerned with unsanitary preparation, low-grade recycled oils, and artificial additives.
              </p>
            </div>
            <div className="mt-8 text-red-500/30 font-black text-6xl text-right">01</div>
          </div>

          {/* Step 2: Opportunity */}
          <div ref={step2Ref} className="glassmorphism p-8 rounded-lg flex flex-col justify-between border-white/5 relative">
            <div>
              <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded flex items-center justify-center text-primary mb-6">
                <Flame size={24} />
              </div>
              <h3 className="text-xl font-bold font-sans text-white mb-4">THE CONSOLIDATION PLAY</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                An opportunity exists to organize this massive unorganized market by introducing an affordable, hygienic, and trusted brand that promises taste without compromise.
              </p>
            </div>
            <div className="mt-8 text-primary/30 font-black text-6xl text-right">02</div>
          </div>

          {/* Step 3: Samosey Wala */}
          <div ref={step3Ref} className="glassmorphism p-8 rounded-lg flex flex-col justify-between border-white/5 relative">
            <div>
              <div className="w-12 h-12 bg-green-950/40 border border-green-500/30 rounded flex items-center justify-center text-green-500 mb-6">
                <Award size={24} />
              </div>
              <h3 className="text-xl font-bold font-sans text-white mb-4">SAMOSEY WALA</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                A standardized QSR model marrying traditional spices with modern hygiene, utilizing high-quality wheat-maida blends, offering pure, delicious, and scalable snacks.
              </p>
            </div>
            <div className="mt-8 text-green-500/30 font-black text-6xl text-right">03</div>
          </div>

        </div>
      </section>

      {/* SECTION 2: INTERACTIVE SPLIT SCREEN TRANSFORMATION */}
      <section 
        id="promise"
        ref={splitSectionRef} 
        className="h-screen w-full relative overflow-hidden"
      >
        {/* Left Side: The Problem (Charcoal Theme) */}
        <div className="absolute inset-0 w-full h-full bg-[#121214] flex items-center justify-center">
          <div ref={leftContentRef} className="w-full max-w-xl px-6 md:px-12 text-left z-10">
            <span className="text-red-500 font-bold text-xs tracking-[0.25em] uppercase mb-4 block flex items-center">
              <AlertTriangle className="mr-2" size={16} /> THE STREET FOOD PROBLEM
            </span>
            <h3 className="text-3xl md:text-5xl font-serif font-black text-gray-200 mb-8 leading-tight">
              Uncertified &<br/>Unpredictable.
            </h3>
            <ul className="space-y-4">
              {problems.map((prob, idx) => (
                <li key={idx} className="flex items-start text-gray-400 text-sm md:text-base">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                  {prob}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Side: The Promise (Samosey Wala Premium Orange Theme) - Clipped initially */}
        <div 
          ref={rightPanelRef}
          className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_right,rgba(255,102,0,0.15)_0%,#0A0A0A_70%)] border-l border-primary/20 flex items-center justify-center"
          style={{ clipPath: 'inset(0 0 0 100%)' }}
        >
          <div ref={rightContentRef} className="w-full max-w-xl px-6 md:px-12 text-left z-10">
            <span className="text-primary font-bold text-xs tracking-[0.25em] uppercase mb-4 block flex items-center">
              <ShieldCheck className="mr-2" size={18} /> THE SAMOSEY WALA PROMISE
            </span>
            <h3 className="text-3xl md:text-5xl font-serif font-black text-white mb-8 leading-tight">
              Certified, Pure &<br/>Standardized.
            </h3>
            <ul className="space-y-4">
              {promises.map((prom, idx) => (
                <li key={idx} className="flex items-start text-gray-200 text-sm md:text-base">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                  {prom}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Interactive Split Divider Label indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none text-center">
          <p className="text-[10px] text-gray-500 tracking-[0.35em] uppercase animate-pulse">
            Keep scrolling to transform the market
          </p>
        </div>
      </section>
    </div>
  );
};

export default ProblemSolution;

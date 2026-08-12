import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { apiService } from '../services/api';

gsap.registerPlugin(ScrollTrigger);

const GrowthTimeline = ({ phases }) => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const pathRef = useRef(null);
  
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!phases || phases.length === 0 || isMobile) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const path = pathRef.current;
      const totalScrollWidth = track.scrollWidth - window.innerWidth;
      
      const pathLength = path.getTotalLength();
      gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

      // 1. Move track horizontally and pin section - slowed down significantly (*2.5 + 1200)
      const scrollTween = gsap.to(track, {
        x: -totalScrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${totalScrollWidth * 2.5 + 1200}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      // 2. Draw the growth line progressively matched to scroll pinning
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${totalScrollWidth * 2.5 + 1200}`,
          scrub: true,
        }
      });

      // 3. Animate each card scaling up and glowing when it is centered in the viewport
      const cards = track.querySelectorAll('.phase-card');
      cards.forEach((card) => {
        gsap.fromTo(card, 
          { scale: 0.9, opacity: 0.3, borderColor: 'rgba(255,255,255,0.05)', boxShadow: 'none' },
          { 
            scale: 1.05, 
            opacity: 1, 
            borderColor: 'rgba(255,102,0,0.5)', 
            boxShadow: '0 0 30px rgba(255,102,0,0.15)',
            ease: 'power1.out',
            scrollTrigger: {
              trigger: card,
              containerAnimation: scrollTween,
              start: 'left 70%', // starts scaling as it nears the center
              end: 'right 30%',  // starts scaling down as it exits the center
              scrub: true,
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, [phases, isMobile]);

  if (!phases || phases.length === 0) return null;

  return (
    <section 
      ref={containerRef}
      id="growth"
      className="min-h-screen flex flex-col justify-center bg-[#0A0A0B] overflow-hidden border-b border-white/5 py-12"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-4">
        <div className="text-left">
          <span className="text-primary font-bold text-xs tracking-[0.25em] uppercase mb-4 block">
            GROWTH SCALABILITY
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-black text-white">
            Growth Strategy Timeline
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mt-3 font-light">
            Our progressive 5-phase growth strategy, demonstrating how single-outlet margins scale from 1 store to national dominance.
          </p>
        </div>
      </div>

      {/* Horizontal Timeline Track */}
      <div 
        ref={trackRef}
        className={`w-full flex py-20 px-6 md:px-12 items-center gap-16 relative ${
          isMobile 
            ? 'overflow-x-scroll scrollbar-none snap-x snap-mandatory flex-nowrap' 
            : 'flex-nowrap'
        }`}
        style={{ touchAction: isMobile ? 'pan-x' : 'none' }}
      >
        
        {/* Desktop growth connector SVG path */}
        {!isMobile && (
          <div className="absolute left-[300px] right-[400px] h-[4px] pointer-events-none z-0" style={{ top: 'calc(50% + 40px)' }}>
            <svg className="w-full h-[8px]" viewBox="0 0 1000 8" fill="none" preserveAspectRatio="none">
              <path 
                ref={pathRef}
                d="M 0 4 L 1000 4" 
                stroke="#FF6600" 
                strokeWidth="4"
                className="draw-path"
              />
              <path 
                d="M 0 4 L 1000 4" 
                stroke="rgba(255,255,255,0.05)" 
                strokeWidth="4"
                strokeDasharray="8 8"
              />
            </svg>
          </div>
        )}

        {/* Phase Cards */}
        {phases.map((phase, idx) => (
          <div 
            key={phase.phase_number}
            className={`phase-card glassmorphism p-8 rounded-xl border flex flex-col justify-between z-10 transform-gpu transition-all duration-300 relative ${
              isMobile 
                ? 'w-[80vw] h-[320px] snap-center' 
                : 'w-[320px] h-[340px] flex-shrink-0'
            }`}
          >
            <div>
              {/* Phase badge */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] bg-primary/10 border border-primary/20 text-primary font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Phase {phase.phase_number}
                </span>
                <span className="text-xs text-gray-500 font-mono tracking-wider">
                  {phase.formula}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-4">
                {phase.title}
              </h3>
              
              {/* Stats */}
              <div className="space-y-3 mt-6">
                <div>
                  <span className="text-[9px] text-gray-500 tracking-wider uppercase font-semibold">TARGET STORES</span>
                  <h4 className="text-lg font-black text-white font-sans">{phase.stores}</h4>
                </div>
                <div>
                  <span className="text-[9px] text-gray-500 tracking-wider uppercase font-semibold">ANNUAL VALUE RUN-RATE</span>
                  <h4 className="text-lg font-black text-primary font-sans">{phase.revenue}</h4>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GrowthTimeline;

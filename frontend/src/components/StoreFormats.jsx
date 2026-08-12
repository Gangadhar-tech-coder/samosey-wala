import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, MapPin, Store as StoreIcon } from 'lucide-react';
import storefrontImg from '../assets/storefront.jpg';

gsap.registerPlugin(ScrollTrigger);

const StoreFormats = ({ stores }) => {
  const containerRef = useRef(null);
  const streetSecRef = useRef(null);
  const premiumSecRef = useRef(null);

  useEffect(() => {
    if (!stores || stores.length === 0) return;

    const ctx = gsap.context(() => {
      // 1. Street Format Animations: Image slides in from the right, text from left
      const streetImg = streetSecRef.current.querySelector('.format-image');
      const streetText = streetSecRef.current.querySelector('.format-text');

      gsap.fromTo(streetImg, 
        { xPercent: 30, opacity: 0, scale: 1.1 },
        { 
          xPercent: 0, 
          opacity: 1, 
          scale: 1,
          scrollTrigger: {
            trigger: streetSecRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true,
          }
        }
      );

      gsap.fromTo(streetText,
        { xPercent: -20, opacity: 0 },
        {
          xPercent: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: streetSecRef.current,
            start: 'top 75%',
            end: 'bottom 30%',
            scrub: true,
          }
        }
      );

      // 2. Premium Experience Animations: Image slides in from the left, text from right
      const premiumImg = premiumSecRef.current.querySelector('.format-image');
      const premiumText = premiumSecRef.current.querySelector('.format-text');

      gsap.fromTo(premiumImg, 
        { xPercent: -30, opacity: 0, scale: 1.1 },
        { 
          xPercent: 0, 
          opacity: 1, 
          scale: 1,
          scrollTrigger: {
            trigger: premiumSecRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true,
          }
        }
      );

      gsap.fromTo(premiumText,
        { xPercent: 20, opacity: 0 },
        {
          xPercent: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: premiumSecRef.current,
            start: 'top 75%',
            end: 'bottom 30%',
            scrub: true,
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, [stores]);

  if (!stores || stores.length === 0) return null;

  const streetFormat = stores.find(s => s.format === 'Street');
  const premiumFormat = stores.find(s => s.format === 'Premium');

  return (
    <div ref={containerRef} id="formats" className="bg-near-black">
      
      {/* SECTION 1: STREET FORMAT (Image slides in from Right) */}
      <section 
        ref={streetSecRef}
        className="min-h-screen flex flex-col lg:flex-row items-center justify-center relative overflow-hidden border-b border-white/5 py-16"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="format-text text-left lg:pr-12">
            <div className="flex items-center space-x-2 text-primary text-xs font-bold tracking-[0.25em] uppercase mb-4">
              <StoreIcon size={16} />
              <span>OUTLET TYPE 01</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-black text-white mb-6 leading-tight">
              {streetFormat?.name || 'Street Format Kiosk'}
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light mb-8">
              {streetFormat?.description || 'A compact kiosk designed for high footfall corporate areas. Offers lightning fast grab-and-go service of hot samosas and piping hot chai.'}
            </p>
            <ul className="space-y-4 border-l border-primary/20 pl-6">
              <li className="text-gray-300 text-sm flex items-center">
                <MapPin size={14} className="text-primary mr-3" />
                High-footfall transit zones, tech parks & markets
              </li>
              <li className="text-gray-300 text-sm flex items-center">
                <ShieldCheck size={14} className="text-primary mr-3" />
                Optimized layout for fast grab-and-go service
              </li>
              <li className="text-gray-300 text-sm flex items-center">
                <ShieldCheck size={14} className="text-primary mr-3" />
                Lower rent overheads & rapid installation
              </li>
            </ul>
          </div>

          {/* Image Panel */}
          <div className="format-image w-full aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/5 relative transform-gpu">
            <div className="absolute inset-0 bg-gradient-to-tr from-near-black/50 to-transparent z-10" />
            <img 
              src={streetFormat?.image_display || storefrontImg} 
              alt="Street Format Kiosk" 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

        </div>
      </section>

      {/* SECTION 2: PREMIUM EXPERIENCE (Image slides in from Left) */}
      <section 
        ref={premiumSecRef}
        className="min-h-screen flex flex-col lg:flex-row-reverse items-center justify-center relative overflow-hidden border-b border-white/5 py-16"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="format-text text-left lg:pl-12">
            <div className="flex items-center space-x-2 text-primary text-xs font-bold tracking-[0.25em] uppercase mb-4">
              <StoreIcon size={16} />
              <span>OUTLET TYPE 02</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-black text-white mb-6 leading-tight">
              {premiumFormat?.name || 'Premium Experience Café'}
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light mb-8">
              {premiumFormat?.description || 'Our premium full-service dine-in cafe. Features comfortable, premium seating, a warm modern ambiance, and our entire premium snack menu including premium chaats.'}
            </p>
            <ul className="space-y-4 border-l border-primary/20 pl-6">
              <li className="text-gray-300 text-sm flex items-center">
                <MapPin size={14} className="text-primary mr-3" />
                Premium high-street retail spaces & shopping hubs
              </li>
              <li className="text-gray-300 text-sm flex items-center">
                <ShieldCheck size={14} className="text-primary mr-3" />
                Curated dining experience with high-margin menu items
              </li>
              <li className="text-gray-300 text-sm flex items-center">
                <ShieldCheck size={14} className="text-primary mr-3" />
                Elegant premium interiors designed for seating & groups
              </li>
            </ul>
          </div>

          {/* Image Panel */}
          <div className="format-image w-full aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/5 relative transform-gpu">
            <div className="absolute inset-0 bg-gradient-to-tl from-near-black/50 to-transparent z-10" />
            <img 
              src={premiumFormat?.image_display || storefrontImg} 
              alt="Premium Experience Cafe" 
              className="w-full h-full object-cover animate-parallax"
              loading="lazy"
            />
          </div>

        </div>
      </section>

    </div>
  );
};

export default StoreFormats;

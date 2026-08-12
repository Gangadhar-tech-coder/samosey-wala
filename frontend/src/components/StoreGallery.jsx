import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import storefrontImg from '../assets/storefront.jpg';
import samosasImg from '../assets/samosas.jpg';
import logoImg from '../assets/logo.jpg';

gsap.registerPlugin(ScrollTrigger);

const StoreGallery = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const galleryImages = [
    {
      url: storefrontImg,
      title: "Samosey Wala Storefront",
      category: "FLAGSHIP OUTLET"
    },
    {
      url: samosasImg,
      title: "Crispy Golden Samosas",
      category: "SIGNATURE PRODUCT"
    },
    {
      url: storefrontImg,
      title: "Hot & Crispy Experience",
      category: "BRAND DISPLAY"
    },
    {
      url: samosasImg,
      title: "Fresh from the Fryer",
      category: "QUALITY PROMISE"
    }
  ];

  // Screen size check to toggle horizontal scroll pin vs swipe carousel
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return; // Native swiping on mobile

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const totalScrollWidth = track.scrollWidth - window.innerWidth;

      if (totalScrollWidth <= 0) return;

      // Pin the section and translate the track horizontally
      const scrollTween = gsap.to(track, {
        x: -totalScrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${totalScrollWidth + 300}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      // Subtle zoom effect on gallery cards as they slide into focus
      const cards = track.querySelectorAll('.gallery-card');
      cards.forEach((card) => {
        const img = card.querySelector('img');
        gsap.fromTo(img, 
          { scale: 1 },
          {
            scale: 1.12,
            scrollTrigger: {
              trigger: card,
              containerAnimation: scrollTween, // Bind to horizontal container animation directly
              start: 'left right',
              end: 'right left',
              scrub: true
            }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section 
      ref={sectionRef} 
      className="min-h-screen flex flex-col justify-center bg-[#0A0A0A] overflow-hidden border-b border-white/5 py-12"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-4">
        <div className="text-left">
          <span className="text-primary font-bold text-xs tracking-[0.25em] uppercase mb-4 block">
            VISUAL EXPERIENCE
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-black text-white">
            Store Experience Gallery
          </h2>
        </div>
      </div>

      {/* Horizontal scrolling track container */}
      <div 
        ref={trackRef}
        className={`w-full flex py-16 px-6 md:px-12 gap-8 ${
          isMobile 
            ? 'overflow-x-scroll scrollbar-none snap-x snap-mandatory flex-nowrap' 
            : 'flex-nowrap'
        }`}
        style={{ touchAction: isMobile ? 'pan-x' : 'none' }}
      >
        {galleryImages.map((img, idx) => (
          <div 
            key={idx}
            className={`gallery-card relative rounded-2xl overflow-hidden border border-white/5 flex-shrink-0 shadow-2xl shadow-black/60 transform-gpu group transition-all duration-300 hover:border-primary/20 ${
              isMobile 
                ? 'w-[80vw] sm:w-[60vw] h-[45vh] snap-center' 
                : 'w-[400px] lg:w-[450px] h-[550px]'
            }`}
          >
            {/* Visual overlay mask */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 z-10" />
            <img 
              src={img.url} 
              alt={img.title} 
              className="w-full h-full object-cover transform-gpu transition-transform duration-700 ease-out" 
              loading="lazy"
            />
            
            {/* Descriptive Content */}
            <div className="absolute bottom-8 left-8 right-8 z-20 text-left">
              <span className="text-primary font-extrabold text-[10px] tracking-[0.25em] uppercase block mb-2">
                {img.category}
              </span>
              <h3 className="text-xl font-bold text-white tracking-wide">
                {img.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StoreGallery;

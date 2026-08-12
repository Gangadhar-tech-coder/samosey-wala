import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import samosasImg from '../assets/samosas.jpg';

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ siteSettings }) => {
  const containerRef = useRef(null);
  const imageContainerRef = useRef(null);
  const textRevealRef = useRef(null);
  const heroTextRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);

  // Check viewport size for mobile/desktop layout & fragment count
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const fragments = imageContainerRef.current.querySelectorAll('.image-fragment');
      
      // Create scroll timeline for the hero pinning and fragmentation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%', // Pin duration
          scrub: 1, // Smooth scrub response
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      // Calculate directions and values dynamically for each fragment
      tl.to(fragments, {
        x: (index) => {
          const cols = isMobile ? 3 : 4;
          const colIndex = index % cols;
          const halfCols = cols / 2;
          const dir = colIndex < halfCols ? -1 : 1;
          const randomFactor = 150 + Math.random() * 250;
          return dir * randomFactor;
        },
        y: (index) => {
          const cols = isMobile ? 3 : 4;
          const rowIndex = Math.floor(index / cols);
          const rows = isMobile ? 2 : 4;
          const halfRows = rows / 2;
          const dir = rowIndex < halfRows ? -1 : 1;
          const randomFactor = 150 + Math.random() * 250;
          return dir * randomFactor;
        },
        rotation: () => (Math.random() - 0.5) * 60,
        scale: 0.5,
        opacity: 0.1,
        stagger: {
          amount: 0.2,
          from: 'center'
        },
        ease: 'power2.inOut',
      }, 0);

      // Scale up the entire fragment container slightly for zoom effect
      tl.to(imageContainerRef.current, {
        scale: 1.15,
        ease: 'power2.inOut',
      }, 0);

      // Fade out the initial hero overlay texts (SAMOSEY WALA / HOT & CRISPY)
      tl.to(heroTextRef.current, {
        opacity: 0,
        scale: 0.9,
        y: -50,
        ease: 'power2.inOut',
      }, 0);

      // Fade in the business statement and CTAs from behind
      tl.fromTo(textRevealRef.current, 
        { opacity: 0, scale: 0.95, y: 50 },
        { opacity: 1, scale: 1, y: 0, ease: 'power2.out' },
        0.3 // Start revealing halfway through fragmentation
      );

      // Hide the scroll indicator as user scrolls
      tl.to(scrollIndicatorRef.current, {
        opacity: 0,
        y: 20,
        ease: 'power1.out',
      }, 0);

    }, containerRef);

    return () => ctx.revert(); // GSAP Context cleanup
  }, [isMobile]);

  // Generate CSS clip-path fragments
  const rows = isMobile ? 2 : 4;
  const cols = isMobile ? 3 : 4;
  const totalFragments = rows * cols;
  const fragmentWidth = 100 / cols;
  const fragmentHeight = 100 / rows;

  const handleScrollClick = () => {
    const nextSection = document.querySelector('#story');
    if (nextSection) {
      const offsetTop = nextSection.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="hero"
      ref={containerRef} 
      className="h-screen w-full relative overflow-hidden bg-near-black flex flex-col items-center justify-center select-none"
    >
      {/* Background radial soft light for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,102,0,0.1)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

      {/* REVEAL CONTENT (Positioned behind the fragmentation container) */}
      <div 
        ref={textRevealRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10 opacity-0 pointer-events-none"
      >
        <div className="pointer-events-auto max-w-4xl mx-auto flex flex-col items-center">
          <span className="text-primary font-bold text-xs md:text-sm tracking-[0.3em] uppercase mb-4">
            A NEW ERA OF INDIAN SNACKS
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-black tracking-tight text-white mb-6 leading-tight">
            Premium Quality.<br/>
            <span className="text-gradient-orange">Affordable Price.</span> Hygienic Food.
          </h2>
          <p className="text-gray-400 text-sm md:text-lg max-w-2xl mb-10 leading-relaxed font-light">
            We are transforming India's beloved street snack into a standardized, certified QSR brand. Explore our interactive investment proposal.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <a 
              href="#products"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3.5 bg-primary hover:bg-primary-light text-white text-xs font-bold tracking-widest uppercase rounded transition-all duration-300 hover:shadow-lg hover:shadow-primary/30"
            >
              EXPLORE SAMOSEY WALA
            </a>
            <a 
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3.5 bg-transparent border border-white/20 hover:border-white text-white text-xs font-bold tracking-widest uppercase rounded transition-all duration-300"
            >
              PARTNER WITH US
            </a>
          </div>
        </div>
      </div>

      {/* HERO IMAGE CONTAINER (Dispersed into fragments) */}
      <div 
        ref={imageContainerRef}
        className="w-[85vw] h-[50vh] md:w-[60vw] md:h-[60vh] max-w-4xl relative z-20 flex items-center justify-center transform-gpu"
      >
        {/* Render grid of fragments */}
        {Array.from({ length: totalFragments }).map((_, i) => {
          const colIndex = i % cols;
          const rowIndex = Math.floor(i / cols);
          
          const left = colIndex * fragmentWidth;
          const top = rowIndex * fragmentHeight;
          
          const style = {
            width: `${fragmentWidth}%`,
            height: `${fragmentHeight}%`,
            left: `${left}%`,
            top: `${top}%`,
            backgroundImage: `url(${samosasImg})`,
            backgroundSize: `${cols * 100}% ${rows * 100}%`,
            backgroundPosition: `${(colIndex * 100) / (cols - 1 || 1)}% ${(rowIndex * 100) / (rows - 1 || 1)}%`,
          };

          return (
            <div 
              key={i}
              className="image-fragment absolute hero-fragment bg-no-repeat shadow-inner shadow-near-black/50 border-[0.5px] border-near-black/10 transform-gpu"
              style={style}
            />
          );
        })}

        {/* OVERLAY HEADING (Initially centered in the image frame) */}
        <div 
          ref={heroTextRef}
          className="absolute text-center z-30 pointer-events-none px-4 flex flex-col items-center justify-center"
        >
          <h1 className="text-5xl md:text-8xl tracking-normal text-white leading-none select-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] flex flex-col items-center">
            <span className="font-logo-brush block mb-2 md:mb-4">SAMOSEY</span>
            <span className="text-primary font-logo-block tracking-wider text-4xl md:text-7xl">— WALA —</span>
          </h1>
          <p className="text-primary text-xs md:text-sm tracking-[0.4em] font-extrabold uppercase mt-6 drop-shadow-md">
            {siteSettings?.tagline || 'HOT & CRISPY'}
          </p>
        </div>
      </div>

      {/* SCROLL TO EXPLORE INDICATOR */}
      <div 
        ref={scrollIndicatorRef}
        onClick={handleScrollClick}
        className="absolute bottom-10 flex flex-col items-center cursor-pointer z-30 group"
      >
        <span className="text-gray-500 group-hover:text-primary text-[10px] tracking-[0.3em] uppercase transition-colors mb-2">
          SCROLL TO EXPLORE
        </span>
        <div className="w-[1px] h-12 bg-gray-800 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-primary animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

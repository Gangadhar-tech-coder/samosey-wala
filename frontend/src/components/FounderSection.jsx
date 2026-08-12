import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FounderSection = () => {
  const sectionRef = useRef(null);
  const quoteRef = useRef(null);
  const infoRef = useRef(null);

  const visionStatement = "The founder is committed to building a trusted national snack brand while creating long-term value for customers, franchise partners, employees and investors.";
  const words = visionStatement.split(" ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Progressively light up quote words on scroll
      gsap.fromTo('.quote-word', 
        { color: '#333333' }, // Dimmed grey
        {
          color: '#FFFFFF', // Bright white
          stagger: 0.05,
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 75%',
            end: 'bottom 50%',
            scrub: true,
          }
        }
      );

      // 2. Animate giant quote icon rotation
      gsap.fromTo('.quote-icon', 
        { opacity: 0.02, rotation: -20, scale: 0.9 },
        { 
          opacity: 0.06, 
          rotation: 0, 
          scale: 1, 
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 80%',
            end: 'bottom 60%',
            scrub: true,
          }
        }
      );

      // 3. Fade in founder name and designation last
      gsap.fromTo(infoRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'bottom 65%',
            toggleActions: 'play none none reverse',
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-32 bg-near-black border-b border-white/5 relative overflow-hidden px-6 md:px-12"
    >
      {/* Background soft orange light overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        
        {/* Giant Quote Icon background layer */}
        <div className="quote-icon absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 text-primary pointer-events-none opacity-0 select-none">
          <Quote size={120} style={{ transform: 'scaleY(-1)' }} />
        </div>

        {/* Vision Statement Word container */}
        <div ref={quoteRef} className="relative z-10 pt-16 mb-12">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-black tracking-tight leading-relaxed select-text">
            {words.map((word, index) => (
              <span key={index} className="quote-word inline-block mr-3">
                {word}
              </span>
            ))}
          </h2>
        </div>

        {/* Founder Bio Block */}
        <div ref={infoRef} className="flex flex-col items-center">
          {/* Subtle separator */}
          <div className="w-12 h-[1px] bg-primary mb-6" />
          <h3 className="text-lg md:text-xl font-bold font-sans text-white tracking-wider">
            Chinnaramani Nithin
          </h3>
          <p className="text-primary text-xs tracking-[0.2em] uppercase mt-2 font-semibold">
            Founder, Samosey Wala
          </p>
        </div>

      </div>
    </section>
  );
};

export default FounderSection;

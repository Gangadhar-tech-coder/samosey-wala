import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flame, Star, Sparkles, Zap, Heart } from 'lucide-react';
import samosasImg from '../assets/samosas.jpg';
import storefrontImg from '../assets/storefront.jpg';

gsap.registerPlugin(ScrollTrigger);

const SpecialShowcase = () => {
  const containerRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);

  const specials = [
    {
      name: 'Samosa Chaat',
      price: 50,
      image: samosasImg,
      icon: <Sparkles size={16} className="text-primary" />,
      category: 'SIGNATURE SPECIAL',
      description: 'Our best-selling samosa crushed and topped with spicy chole, tangy chutneys, cool dahi, and crunchy sev. A perfect explosion of flavours in every bite.',
      tags: ['Tangy', 'Crunchy Sev', 'Cool Dahi', 'Spicy Chole'],
    },
    {
      name: 'Loaded Samosa',
      price: 75,
      image: samosasImg,
      icon: <Zap size={16} className="text-yellow-500" />,
      category: 'CHEF SPECIAL',
      description: 'A crispy golden samosa loaded with our signature three-cheese sauce, peri peri seasoning, fresh herbs, and a drizzle of sriracha mayo. Indulgence redefined.',
      tags: ['Three-Cheese', 'Peri Peri', 'Sriracha Mayo', 'Fresh Herbs'],
    },
    {
      name: 'Samosa Party Box',
      price: 160,
      image: samosasImg,
      icon: <Heart size={16} className="text-red-500" />,
      category: 'PARTY PACK',
      description: '10 freshly fried assorted samosas in a premium party box — perfect for office celebrations, house parties, and weekend gatherings. Feeds 4-5 people.',
      tags: ['10 Pieces', 'Assorted Flavours', 'Party Size', 'Premium Box'],
    },
    {
      name: '2 Samosa + Chai Combo',
      price: 45,
      image: storefrontImg,
      icon: <Star size={16} className="text-amber-500" />,
      category: 'VALUE COMBO',
      description: 'The iconic Indian snacking duo — two piping hot crispy samosas paired with our signature masala chai brewed with fresh ginger and whole cardamom.',
      tags: ['2 Samosas', 'Masala Chai', 'Best Value', 'Classic Pair'],
    },
    {
      name: '4 Samosa + Cold Drink',
      price: 85,
      image: samosasImg,
      icon: <Flame size={16} className="text-orange-500" />,
      category: 'MEGA COMBO',
      description: 'Four assorted samosas with a chilled cold drink. Perfect for hunger pangs on the go — grab, munch, and conquer. Our most popular combo by volume.',
      tags: ['4 Samosas', 'Cold Drink', 'Most Popular', 'On-the-Go'],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const images = leftPanelRef.current.querySelectorAll('.special-image-wrapper');
      const details = rightPanelRef.current.querySelectorAll('.special-detail-wrapper');
      const totalSlides = specials.length;

      // Pin the showcase section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${totalSlides * 100}%`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      // Set initial states
      images.forEach((img, index) => {
        if (index > 0) {
          gsap.set(img, { opacity: 0, scale: 0.8, rotation: -15 });
        } else {
          gsap.set(img, { opacity: 1, scale: 1, rotation: 0 });
        }
      });

      details.forEach((detail, index) => {
        if (index > 0) {
          gsap.set(detail, { opacity: 0, y: 80 });
        } else {
          gsap.set(detail, { opacity: 1, y: 0 });
        }
      });

      // Animate slides sequentially
      for (let i = 0; i < totalSlides - 1; i++) {
        const slideTime = i;

        // Current slide out
        tl.to(images[i], {
          opacity: 0,
          scale: 1.3,
          rotation: 15,
          ease: 'power1.inOut'
        }, slideTime);

        tl.to(details[i], {
          opacity: 0,
          y: -80,
          ease: 'power1.inOut'
        }, slideTime);

        // Next slide in
        tl.to(images[i + 1], {
          opacity: 1,
          scale: 1,
          rotation: 0,
          ease: 'power1.inOut'
        }, slideTime);

        tl.to(details[i + 1], {
          opacity: 1,
          y: 0,
          ease: 'power1.inOut'
        }, slideTime);
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="specials"
      ref={containerRef}
      className="h-screen w-full relative bg-[#0A0A0B] border-b border-white/5 flex flex-col md:flex-row overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_right,rgba(255,102,0,0.06)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />

      {/* LEFT COLUMN: Rotating Pinned Images */}
      <div
        ref={leftPanelRef}
        className="w-full md:w-1/2 h-[45vh] md:h-full relative flex items-center justify-center p-6 bg-near-black/50 border-r border-white/5"
      >
        {specials.map((item, idx) => (
          <div
            key={idx}
            className="special-image-wrapper absolute w-[70vw] h-[35vh] md:w-[35vw] md:h-[55vh] max-w-lg rounded-2xl overflow-hidden shadow-2xl shadow-black/80 border border-white/10 flex items-center justify-center transform-gpu"
          >
            {/* Dark glass overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 z-10" />
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Price Tag */}
            <div className="absolute top-6 right-6 px-4 py-2 bg-primary text-white text-sm font-bold tracking-wider rounded z-20 shadow-lg border border-primary-light/20">
              ₹{item.price}
            </div>
            {/* Category Tag */}
            <div className="absolute bottom-6 left-6 flex items-center space-x-2 text-white/95 text-xs font-semibold tracking-wider uppercase bg-near-black/60 px-3 py-1.5 rounded z-20 border border-white/10">
              {item.icon}
              <span>{item.category}</span>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT COLUMN: Changing Detail Panel */}
      <div
        ref={rightPanelRef}
        className="w-full md:w-1/2 h-[55vh] md:h-full relative flex items-center justify-center p-8 md:p-16 text-left"
      >
        {specials.map((item, idx) => (
          <div
            key={idx}
            className="special-detail-wrapper absolute w-full max-w-xl px-4 md:px-12 flex flex-col justify-center"
          >
            <span className="text-primary font-bold text-xs tracking-[0.25em] uppercase mb-4 flex items-center space-x-2">
              {item.icon}
              <span>{item.category}</span>
            </span>
            <h3 className="text-3xl md:text-5xl font-serif font-black text-white mb-6 leading-tight">
              {item.name}
            </h3>
            <p className="text-gray-400 text-sm md:text-base mb-8 leading-relaxed font-light">
              {item.description}
            </p>

            {/* Price highlight */}
            <div className="flex items-baseline space-x-3 mb-8">
              <span className="text-3xl md:text-4xl font-black text-primary">₹{item.price}</span>
              <span className="text-gray-500 text-xs tracking-widest uppercase">starting price</span>
            </div>

            {/* Ingredient Tags */}
            <div className="border-t border-white/10 pt-6">
              <h4 className="text-[10px] text-gray-500 tracking-widest uppercase mb-3 font-semibold">
                HIGHLIGHTS
              </h4>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className="text-xs text-gray-300 bg-dark-gray px-3 py-1 rounded border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none text-center">
        <p className="text-[10px] text-gray-500 tracking-[0.35em] uppercase animate-pulse">
          Scroll to discover specials
        </p>
      </div>
    </section>
  );
};

export default SpecialShowcase;

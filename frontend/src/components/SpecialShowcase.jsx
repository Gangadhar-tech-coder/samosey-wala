import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flame, Star, Sparkles, Zap, Heart } from 'lucide-react';
import combo4SamosaImg from '../assets/combo_4samosa.png';
import periperiFriesImg from '../assets/periperi_fries.png';
import milkshakesImg from '../assets/milkshakes.png';
import teaCoffeeImg from '../assets/tea_coffee.png';
import cheeseCornPaneerImg from '../assets/cheese_corn_paneer_samosa.png';

gsap.registerPlugin(ScrollTrigger);

const SpecialShowcase = () => {
  const containerRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);

  const specials = [
    {
      name: '4 Samosa + 1 Cold Drink',
      price: 80,
      image: periperiFriesImg,
      icon: <Flame size={16} className="text-orange-500" />,
      category: 'VALUE COMBO',
      description: 'The ultimate combo deal for snacking, sharing, or big appetites. Four freshly fried crispy golden samosas paired with a chilled carbonated soft drink.',
      tags: ['4 Samosas', 'Chilled Drink', 'Value Deal', 'Best Seller'],
    },
    {
      name: 'Cheese Peri Peri Fries',
      price: 70,
      image: combo4SamosaImg,
      icon: <Zap size={16} className="text-yellow-500" />,
      category: 'FUSION CHAAT & FRIES',
      description: 'Golden french fries tossed in hot peri-peri seasoning and layered with warm melted cheese sauce. A fiery and cheesy fusion snack favorite.',
      tags: ['Cheesy Sauce', 'Peri Peri Spiced', 'Crispy French Fries', 'Hot Snacking'],
    },
    {
      name: 'Premium Milkshakes',
      price: 49,
      image: milkshakesImg,
      icon: <Heart size={16} className="text-red-500" />,
      category: 'BEVERAGES & SHAKES',
      description: 'Thick, creamy, and chilled milkshakes served in refreshing flavors. Made with fresh milk and ice cream. The perfect sweet companion to hot savory samosas.',
      tags: ['Thick Shakes', 'Chilled Drink', 'Chocolate & Fruit', 'Sweet Treat'],
    },
    {
      name: 'Tea and Coffee',
      price: 15,
      image: teaCoffeeImg,
      icon: <Star size={16} className="text-amber-500" />,
      category: 'CLASSIC HOT BEVERAGES',
      description: 'Authentic hot Indian beverages. Piping hot masala tea brewed with fresh ginger and whole cardamom, or strong aromatic filter coffee.',
      tags: ['Masala Chai', 'Filter Coffee', 'Fresh Brewed', 'Ginger & Cardamom'],
    },
    {
      name: 'Cheese Corn & Paneer Samosa',
      price: 30,
      image: cheeseCornPaneerImg,
      icon: <Sparkles size={16} className="text-primary" />,
      category: 'PREMIUM FUSION SELECTION',
      description: 'Gourmet premium fusion samosas. Golden crispy shell stuffed with sweet corn and liquid melted cheese, or soft seasoned paneer cubes cooked in rich spices.',
      tags: ['Gourmet Cheese Corn', 'Spiced Paneer', 'Fusion Stuffing', 'Melted Fillings'],
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

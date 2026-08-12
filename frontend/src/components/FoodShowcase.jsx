import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flame, Star, Coffee, Utensils, Maximize2, X, Eye, Leaf } from 'lucide-react';
import menuFlyer from '../assets/menu_flyer.jpg';

gsap.registerPlugin(ScrollTrigger);

const FoodShowcase = ({ products }) => {
  const sectionRef = useRef(null);
  const flyerContainerRef = useRef(null);
  const zoomLensRef = useRef(null);
  const zoomedImageRef = useRef(null);

  const [activeCategory, setActiveCategory] = useState('Samosas');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lensActive, setLensActive] = useState(false);
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 });

  // Complete menu details from the physical menu flyer to ensure full fidelity
  const menuCategories = [
    {
      id: 'Samosas',
      name: 'Classic Samosas',
      icon: <Flame size={14} />,
      items: [
        { name: 'Aloo Classic', price: 15, desc: 'Traditional spiced potato filling with authentic herbs.', isVeg: true, tags: ['Traditional', 'Spiced'] },
        { name: 'Punjabi Special', price: 25, desc: 'Rich peas, potato, and classic Punjabi spices filling.', isVeg: true, tags: ['Peas', 'Spices'] },
        { name: 'Mini Samosa (4 pcs)', price: 35, desc: 'Bite-sized happiness in every single crunch.', isVeg: true, tags: ['Crunchy', 'Mini'] },
      ]
    },
    {
      id: 'Cheesy',
      name: 'Cheesy & Premium',
      icon: <Star size={14} />,
      items: [
        { name: 'Cheese Corn Samosa', price: 45, desc: 'Sweet golden corn and melting mozzarella cheese.', isVeg: true, tags: ['Sweet Corn', 'Mozzarella'] },
        { name: 'Paneer Cheese Samosa', price: 49, desc: 'Grated fresh cottage cheese mixed with rich spices.', isVeg: true, tags: ['Fresh Paneer', 'Creamy'] },
        { name: 'Chilli Paneer Samosa', price: 49, desc: 'Spicy paneer filling with a strong Chinese punch.', isVeg: true, tags: ['Spicy', 'Indo-Chinese'] },
        { name: 'Paneer Tikka Samosa', price: 49, desc: 'Clay oven charred paneer cubes with tikka masala.', isVeg: true, tags: ['Tandoori', 'Tikka'] }
      ]
    },
    {
      id: 'NonVeg',
      name: 'Non-Veg Samosas',
      icon: <Utensils size={14} className="text-red-500" />,
      items: [
        { name: 'Chicken Keema Samosa', price: 45, desc: 'Juicy, fine minced chicken filling slow cooked in spices.', isVeg: false, tags: ['Minced Chicken', 'Halal'] },
        { name: 'Chicken Tikka Samosa', price: 49, desc: 'Tandoori flavored chicken chunks in tikka gravy.', isVeg: false, tags: ['Charred', 'Spicy'] },
        { name: 'Mutton Keema Samosa', price: 99, desc: 'Rich, slow-braised minced mutton cooked in legacy spices.', isVeg: false, tags: ['Rich Mutton', 'Signature'] },
        { name: 'Egg Samosa', price: 35, desc: 'Boiled eggs tossed in home-ground spice masalas.', isVeg: false, tags: ['Boiled Egg', 'Spicy'] }
      ]
    },
    {
      id: 'Special',
      name: 'Chaats & Fries',
      icon: <Utensils size={14} />,
      items: [
        { name: 'Samosa Chaat', price: 50, desc: 'Samosa crushed and topped with spicy chole, chutneys, dahi, and sev.', isVeg: true, tags: ['Tangy', 'Chole'] },
        { name: 'Loaded Samosa', price: 75, desc: 'Crispy samosa loaded with signature sauces, liquid cheese, and herbs.', isVeg: true, tags: ['Cheesy', 'Loaded'] },
        { name: 'Cheesy Peri Peri Fries', price: 99, desc: 'Golden fries dusted in peri peri powder and cheese sauce.', isVeg: true, tags: ['Spicy', 'Mozzarella'] },
        { name: 'BBQ Chicken Fries', price: 119, desc: 'Fries loaded with BBQ shredded chicken and sweet-smoky sauces.', isVeg: false, tags: ['Chicken', 'Smoked'] },
        { name: 'Tandoori Fries', price: 129, desc: 'Crispy fries topped with tandoori chicken, mint mayo, and sliced onions.', isVeg: false, tags: ['Spicy Chicken', 'Tandoori'] }
      ]
    },
    {
      id: 'Beverages',
      name: 'Chai & Drinks',
      icon: <Coffee size={14} />,
      items: [
        { name: 'Masala Chai', price: 15, desc: 'Authentic Indian tea brewed with ginger and cardamom.', isVeg: true, tags: ['Ginger', 'Cardamom'] },
        { name: 'Lemon Tea', price: 20, desc: 'Light, refreshing black tea infused with fresh lemon juice.', isVeg: true, tags: ['Citrus', 'Refreshing'] },
        { name: 'Cold Coffee', price: 59, desc: 'Classic thick blend of milk, sugar, and organic espresso.', isVeg: true, tags: ['Thick', 'Espresso'] },
        { name: 'Oreo Shake', price: 60, desc: 'Rich milkshake blended with cookies and vanilla ice cream.', isVeg: true, tags: ['Oreo', 'Vanilla'] },
        { name: 'Rose Lassi', price: 70, desc: 'Yogurt blend flavored with sweet organic rose syrup.', isVeg: true, tags: ['Sweet Yogurt', 'Rose'] },
        { name: 'Badam Lassi', price: 70, desc: 'Yogurt lassi packed with crushed almond flakes and cardamom.', isVeg: true, tags: ['Nuts', 'Cardamom'] }
      ]
    }
  ];

  const currentCategory = menuCategories.find(c => c.id === activeCategory);

  // GSAP scroll trigger to stagger menu entry
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.menu-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          }
        }
      );
      
      gsap.fromTo('.menu-grid-container',
        { opacity: 0, scale: 0.98 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Magnifying lens effect inside the digital menu flyer
  const handleMouseMove = (e) => {
    if (!flyerContainerRef.current) return;
    
    const rect = flyerContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check boundaries
    if (x < 0 || x > rect.width || y < 0 || y > rect.height) {
      setLensActive(false);
      return;
    }

    setLensActive(true);
    setLensPos({ x, y });

    // Calculate ratio of lens movement to zoomed image mapping
    if (zoomedImageRef.current) {
      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;
      zoomedImageRef.current.style.transformOrigin = `${xPercent}% ${yPercent}%`;
    }
  };

  return (
    <section 
      id="menu"
      ref={sectionRef}
      className="py-24 bg-near-black border-b border-white/5 relative overflow-hidden px-6 md:px-12"
    >
      {/* Background Soft Gradients */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="menu-header text-center mb-16 opacity-0">
          <span className="text-primary font-bold text-xs md:text-sm tracking-[0.25em] uppercase mb-4 block">
            CRAVINGS DEFINED
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-black text-white">
            Explore the Menu
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto mt-3 font-light">
            Marrying heritage spices with certified premium preparation. High-quality ingredients with zero preservatives.
          </p>
        </div>

        <div className="menu-grid-container grid grid-cols-1 lg:grid-cols-12 gap-12 text-left items-start opacity-0">
          
          {/* LEFT: Menu Categories tabs and Interactive Cards Grid */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-white/5 pb-4 overflow-x-auto scrollbar-thin">
              {menuCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center space-x-2 px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105'
                      : 'bg-dark-gray/50 hover:bg-dark-gray text-gray-400 hover:text-white border border-white/5'
                  }`}
                >
                  {cat.icon}
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>

            {/* Selected Category Header */}
            <div>
              <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-1">
                {currentCategory?.name}
              </h3>
              <div className="w-12 h-[2px] bg-primary" />
            </div>

            {/* Menu Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentCategory?.items.map((item, idx) => (
                <div 
                  key={idx}
                  className="glassmorphism p-6 rounded-xl relative hover:border-primary/20 transition-all duration-300 group hover:shadow-xl hover:shadow-black/40 flex flex-col justify-between animate-fade-in"
                >
                  <div>
                    {/* Title and Veg/Non-Veg Tag */}
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        {/* Veg/Non-veg box icon */}
                        <div className={`w-3.5 h-3.5 border flex items-center justify-center p-[2px] rounded-sm ${
                          item.isVeg ? 'border-green-600' : 'border-red-600'
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            item.isVeg ? 'bg-green-600' : 'bg-red-600'
                          }`} />
                        </div>
                        <h4 className="font-sans font-bold text-white group-hover:text-primary transition-colors text-sm md:text-base leading-tight">
                          {item.name}
                        </h4>
                      </div>
                      <span className="font-sans font-extrabold text-primary text-sm md:text-base">
                        ₹{item.price}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed mb-4">
                      {item.desc}
                    </p>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-white/5">
                    {item.tags.map((tag, tagIdx) => (
                      <span 
                        key={tagIdx}
                        className="text-[9px] font-bold text-gray-400 bg-near-black border border-white/5 px-2 py-0.5 rounded tracking-wider uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>
              ))}
            </div>

            {/* Veg Certified Banner */}
            <div className="bg-green-950/20 border border-green-500/20 p-4 rounded-lg flex items-center space-x-3 text-left">
              <Leaf className="text-green-500 flex-shrink-0" size={20} />
              <div className="text-xs">
                <span className="font-bold text-green-400 block uppercase">100% Pure Preparation</span>
                <span className="text-gray-400 font-light">We maintain separate preparation lines, utensils, and certified fryer stations for our vegetarian options.</span>
              </div>
            </div>

          </div>

          {/* RIGHT: High-Fidelity Menu Flyer Showcase */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            
            <div className="text-left">
              <h3 className="text-lg font-bold text-white font-sans uppercase tracking-wider mb-1">
                Digital Menu Flyer
              </h3>
              <p className="text-gray-500 text-xs font-light">
                Hover to magnify prices and combo details, or click to open full screen.
              </p>
            </div>

            {/* Flyer Viewer Box */}
            <div 
              ref={flyerContainerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setLensActive(false)}
              onClick={() => setLightboxOpen(true)}
              className="relative aspect-[3/4] bg-[#121214] rounded-xl overflow-hidden border border-white/10 shadow-2xl cursor-zoom-in group"
            >
              <img 
                src={menuFlyer} 
                alt="Samosey Wala Menu Card" 
                className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-500 group-hover:scale-[1.02]"
              />
              
              {/* Eye Indicator overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  <Eye size={20} />
                </div>
              </div>

              {/* Magnifier Glass Lens */}
              {lensActive && (
                <div 
                  ref={zoomLensRef}
                  className="absolute pointer-events-none w-48 h-48 rounded-full border-2 border-primary/50 overflow-hidden shadow-2xl shadow-black/80 z-20"
                  style={{
                    left: `${lensPos.x - 96}px`,
                    top: `${lensPos.y - 96}px`,
                    backgroundColor: '#111'
                  }}
                >
                  <img 
                    ref={zoomedImageRef}
                    src={menuFlyer} 
                    alt="Zoomed view" 
                    className="absolute max-w-none select-none pointer-events-none"
                    style={{
                      width: `${flyerContainerRef.current.clientWidth * 2.2}px`,
                      height: `${flyerContainerRef.current.clientHeight * 2.2}px`,
                      left: `-${lensPos.x * 2.2 - 96}px`,
                      top: `-${lensPos.y * 2.2 - 96}px`,
                    }}
                  />
                </div>
              )}
            </div>

            <button 
              onClick={() => setLightboxOpen(true)}
              className="w-full py-3 bg-dark-gray hover:bg-dark-gray/80 border border-white/5 hover:border-primary/20 text-gray-300 hover:text-white text-xs font-bold tracking-widest uppercase rounded transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Maximize2 size={12} />
              <span>VIEW FULL FLYER</span>
            </button>

          </div>

        </div>

      </div>

      {/* LIGHTBOX MODAL */}
      {lightboxOpen && (
        <div className="fixed inset-0 w-full h-full bg-black/95 z-[999] flex items-center justify-center p-4 backdrop-blur-md animate-fade-in">
          
          {/* Close button */}
          <button 
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center border border-white/10 transition-colors z-[1000]"
          >
            <X size={20} />
          </button>

          {/* Full scale image wrapper */}
          <div className="relative max-w-3xl w-full max-h-[90vh] flex items-center justify-center p-4">
            <img 
              src={menuFlyer} 
              alt="High Resolution Menu" 
              className="max-w-full max-h-[85vh] object-contain rounded shadow-2xl border border-white/5"
            />
          </div>

        </div>
      )}

    </section>
  );
};

export default FoodShowcase;

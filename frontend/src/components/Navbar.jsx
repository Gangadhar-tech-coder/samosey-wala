import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = ({ siteSettings }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Background transition trigger
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Scroll progress percentage calculation
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Story', href: '#story' },
    { name: 'Promise', href: '#promise' },
    { name: 'Menu', href: '#menu' },
    { name: 'Formats', href: '#formats' },
    { name: 'Growth', href: '#growth' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Pinned Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-primary z-50 transition-all duration-75 ease-out" 
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={scrollProgress}
        aria-valuemin="0"
        aria-valuemax="100"
      />

      {/* Glassmorphic Navbar */}
      <nav 
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          isScrolled 
            ? 'glassmorphism py-4 shadow-lg shadow-near-black/50' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Brand Logo / Name */}
          <a 
            href="#hero" 
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center space-x-2.5 group"
          >
            <img 
              src={logoImg} 
              alt="Samosey Wala Logo" 
              className="w-9 h-9 rounded-full border border-primary/30 object-cover shadow-md group-hover:scale-105 transition-transform duration-300"
            />
            <div className="flex items-center space-x-1.5 leading-none">
              <span className="text-lg md:text-xl font-logo-brush text-white tracking-wide">
                SAMOSEY
              </span>
              <span className="text-base md:text-lg font-logo-block text-primary tracking-wider">
                — WALA —
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm font-medium tracking-wider text-gray-300 hover:text-primary transition-colors hover:scale-105 transform duration-300"
              >
                {item.name}
              </a>
            ))}
            
            {/* CTA Button */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="px-5 py-2.5 bg-primary hover:bg-primary-light text-white text-xs font-bold tracking-widest rounded border border-primary hover:border-primary-light transition-all duration-300 hover:shadow-lg hover:shadow-primary/30"
            >
              {siteSettings?.cta_text || 'PARTNER WITH US'}
            </a>
          </div>

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white hover:text-primary transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Fullscreen Navigation Overlay */}
        <div 
          className={`fixed inset-0 top-[70px] bg-near-black/95 backdrop-blur-md lg:hidden transition-all duration-500 flex flex-col items-center justify-center space-y-8 z-30 ${
            isMobileMenuOpen 
              ? 'opacity-100 pointer-events-auto' 
              : 'opacity-0 pointer-events-none'
          }`}
        >
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-xl font-semibold tracking-widest text-gray-200 hover:text-primary transition-colors"
            >
              {item.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="px-8 py-3 bg-primary text-white text-sm font-bold tracking-widest rounded border border-primary hover:bg-transparent transition-all duration-300"
          >
            {siteSettings?.cta_text || 'PARTNER WITH US'}
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

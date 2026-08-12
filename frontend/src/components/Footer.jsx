import React from 'react';

import logoImg from '../assets/logo.jpg';

const Footer = ({ siteSettings }) => {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-near-black border-t border-white/5 py-12 px-6 md:px-12 text-center">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Left Side: Brand Logo and Tagline */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <a 
            href="#hero" 
            onClick={handleScrollToTop}
            className="flex items-center space-x-2 group"
          >
            <img 
              src={logoImg} 
              alt="Samosey Wala Logo" 
              className="w-8 h-8 rounded-full border border-primary/20 object-cover"
            />
            <div className="flex items-center space-x-1.5 leading-none">
              <span className="text-base font-logo-brush text-white tracking-wide">
                SAMOSEY
              </span>
              <span className="text-sm font-logo-block text-primary tracking-wider">
                — WALA —
              </span>
            </div>
          </a>
          <p className="text-[10px] text-gray-500 tracking-[0.25em] uppercase mt-2.5 font-semibold">
            {siteSettings?.tagline || 'HOT & CRISPY'}
          </p>
        </div>

        {/* Middle: Brand Positioning Statement */}
        <div className="hidden lg:block text-gray-500 text-xs font-light max-w-md">
          Certified preparation, zero preservatives, organic spices, and proprietary wheat-dough blends. Making premium Indian snacking accessible to all.
        </div>

        {/* Right Side: Copyrights */}
        <div className="text-right flex flex-col items-center md:items-end gap-2">
          <span className="text-xs text-gray-400 font-light">
            © {currentYear} Samosey Wala. All Rights Reserved.
          </span>
          <span className="text-[10px] text-gray-500">
            Designed for franchise and investor prospectus evaluations.
          </span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

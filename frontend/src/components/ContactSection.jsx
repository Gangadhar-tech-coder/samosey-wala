import React, { useState } from 'react';
import { apiService } from '../services/api';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';

const ContactSection = ({ siteSettings }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiry_type: 'Franchise',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await apiService.submitContactInquiry(formData);
      setSuccessMessage(response.message || "Message sent successfully.");
      setFormData({
        name: '',
        email: '',
        phone: '',
        inquiry_type: 'Franchise',
        message: '',
      });
    } catch (error) {
      console.error(error);
      const detailError = error.message || "Unable to send. Please try again.";
      setErrorMessage(detailError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section 
      id="contact"
      className="py-24 bg-near-black border-b border-white/5 px-6 md:px-12 relative"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(255,102,0,0.05)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-bold text-xs md:text-sm tracking-[0.2em] uppercase mb-4 block">
            PARTNER WITH US
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-black text-white mb-4">
            Build the Next National Snack Brand
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto">
            Whether you want to open a franchise, explore investment scenarios, or partner with us, let's talk.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
          
          {/* LEFT: Contact Details & Brand Info */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-12">
            
            <div className="space-y-6">
              <h3 className="text-2xl font-serif font-black text-white">Contact Information</h3>
              <p className="text-gray-400 font-light text-sm leading-relaxed">
                Connect with our franchise operations team directly. We will review your inquiry and get in touch within 24 hours.
              </p>
              
              <div className="space-y-4 pt-4">
                {/* Phone */}
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded bg-primary/5 border border-primary/10 flex items-center justify-center text-primary">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block uppercase font-semibold">CALL US</span>
                    <span className="text-sm font-semibold text-white">{siteSettings?.phone || '+91 XXXXX XXXXX'}</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded bg-primary/5 border border-primary/10 flex items-center justify-center text-primary">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block uppercase font-semibold">EMAIL US</span>
                    <a href={`mailto:${siteSettings?.email || 'hello@samosawala.co'}`} className="text-sm font-semibold text-white hover:text-primary transition-colors">
                      {siteSettings?.email || 'hello@samosawala.co'}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded bg-primary/5 border border-primary/10 flex items-center justify-center text-primary">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block uppercase font-semibold">LOCATION</span>
                    <span className="text-sm font-semibold text-white">{siteSettings?.address || 'India'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium QSR Subtitle */}
            <div className="hidden lg:block border-t border-white/5 pt-8">
              <span className="text-base font-logo-brush text-white tracking-wide">
                SAMOSEY
              </span>{' '}
              <span className="text-sm font-logo-block text-primary tracking-wider">
                — WALA —
              </span>
              <p className="text-gray-500 text-[10px] tracking-widest uppercase mt-1">
                Premium Quality. Affordable Price. Hygienic Food.
              </p>
            </div>

          </div>

          {/* RIGHT: Inquiry Form */}
          <div className="lg:col-span-7 bg-dark-surface border border-white/5 p-8 rounded-xl relative shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-2">
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    name="name" 
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#1A1A1E] border border-white/5 rounded px-4 py-3 text-white text-sm focus:border-primary transition-colors"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-2">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    name="email" 
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#1A1A1E] border border-white/5 rounded px-4 py-3 text-white text-sm focus:border-primary transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Phone */}
                <div>
                  <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-2">
                    Phone Number
                  </label>
                  <input 
                    type="tel" 
                    name="phone" 
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-[#1A1A1E] border border-white/5 rounded px-4 py-3 text-white text-sm focus:border-primary transition-colors"
                    placeholder="Enter your phone"
                  />
                </div>

                {/* Interest Type dropdown */}
                <div>
                  <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-2">
                    Nature of Inquiry
                  </label>
                  <select 
                    name="inquiry_type" 
                    value={formData.inquiry_type}
                    onChange={handleChange}
                    className="w-full bg-[#1A1A1E] border border-white/5 rounded px-4 py-3 text-white text-sm focus:border-primary transition-colors cursor-pointer"
                  >
                    <option value="Franchise">Become a Franchise Partner</option>
                    <option value="Investment">Explore Investment Scenarios</option>
                    <option value="Partnership">Corporate Partnership</option>
                    <option value="General">General Inquiry</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-2">
                  Message / Details
                </label>
                <textarea 
                  name="message" 
                  rows="5"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-[#1A1A1E] border border-white/5 rounded px-4 py-3 text-white text-sm focus:border-primary transition-colors resize-none"
                  placeholder="Tell us about your background, experience, or query..."
                />
              </div>

              {/* Status Alerts */}
              {successMessage && (
                <div className="p-4 bg-green-950/40 border border-green-500/30 text-green-400 text-sm rounded flex items-center space-x-2">
                  <CheckCircle2 size={16} />
                  <span>{successMessage}</span>
                </div>
              )}
              {errorMessage && (
                <div className="p-4 bg-red-950/40 border border-red-500/30 text-red-400 text-sm rounded flex items-center space-x-2">
                  <AlertCircle size={16} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-primary hover:bg-primary-light text-white text-xs font-extrabold tracking-widest uppercase rounded transition-all duration-300 flex items-center justify-center space-x-2 border border-primary hover:border-primary-light disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>SUBMIT INQUIRY</span>
                    <Send size={12} />
                  </>
                )}
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;

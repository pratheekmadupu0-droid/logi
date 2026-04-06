import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Share2, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary-dark text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand */}
        <div className="space-y-6">
          <Link to="/" className="text-3xl font-extrabold tracking-tight flex items-center group">
            <span className="bg-white text-primary p-1 rounded-lg mr-2 group-hover:scale-110 transition-transform">L</span>
            LOGI
          </Link>
          <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
            Fuel Your Body. Elevate Your Life. We provide premium nutritional products crafted with scientific precision and organic purity.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-primary-light transition-colors"><Globe size={20} /></a>
            <a href="#" className="hover:text-primary-light transition-colors"><Share2 size={20} /></a>
            <a href="#" className="hover:text-primary-light transition-colors"><Mail size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-bold mb-6">Quick Links</h4>
          <ul className="space-y-3">
            <li><Link to="/shop" className="text-gray-300 hover:text-white transition-colors">Shop All</Link></li>
            <li><Link to="/#about" className="text-gray-300 hover:text-white transition-colors">Our Story</Link></li>
            <li><Link to="/#contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link to="/login" className="text-gray-300 hover:text-white transition-colors">Member Area</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-lg font-bold mb-6">Categories</h4>
          <ul className="space-y-3">
            <li><Link to="/shop?cat=Protein" className="text-gray-300 hover:text-white transition-colors">Protein</Link></li>
            <li><Link to="/shop?cat=Vitamins" className="text-gray-300 hover:text-white transition-colors">Vitamins</Link></li>
            <li><Link to="/shop?cat=Supplements" className="text-gray-300 hover:text-white transition-colors">Supplements</Link></li>
            <li><Link to="/shop?cat=Fitness" className="text-gray-300 hover:text-white transition-colors">Fitness</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-lg font-bold mb-6">Newsletter</h4>
          <p className="text-gray-300 text-sm mb-4">Subscribe for exclusive offers and health tips.</p>
          <div className="flex bg-white/10 rounded-full p-1 border border-white/20">
            <input 
              type="email" 
              placeholder="Your email" 
              className="bg-transparent text-white px-4 py-2 w-full focus:outline-none placeholder:text-gray-500" 
            />
            <button className="bg-white text-primary px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition-colors">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-8 max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:row items-center justify-between text-xs text-gray-400">
        <p>© 2026 Logi Nutritional Products. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Share2, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-32 pb-12 rounded-t-[100px] overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-24">
        {/* Brand */}
        <div className="space-y-10">
          <Link to="/" className="flex flex-col group">
             <div className="flex items-center space-x-3 mb-2">
                <img src="https://i.ibb.co/Mkhpj225/favicon-largefill-1.png" className="h-10 invert brightness-0" alt="Logi" />
                <span className="text-2xl font-black tracking-tighter uppercase italic">Logi.</span>
             </div>
             <p className="text-white/60 text-xs font-black uppercase tracking-[0.2em] leading-relaxed">
                Bridging Ancient Purity <br /> With Modern Logistics.
             </p>
          </Link>
          
          <div className="flex space-x-6">
            <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-primary transition-all duration-500"><Share2 size={18} /></a>
            <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-primary transition-all duration-500"><Mail size={18} /></a>
          </div>
        </div>

        {/* Intelligence Nodes */}
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-10">Intelligence</h4>
          <ul className="space-y-4">
            <li><Link to="/shop" className="text-sm font-black uppercase tracking-widest hover:text-secondary-light transition-all flex items-center group"><ArrowRight size={14} className="mr-3 opacity-0 group-hover:opacity-100 transition-all" /> Products</Link></li>
            <li><a href="/#about" className="text-sm font-black uppercase tracking-widest hover:text-secondary-light transition-all flex items-center group"><ArrowRight size={14} className="mr-3 opacity-0 group-hover:opacity-100 transition-all" /> About Us</a></li>
            <li><Link to="/franchise" className="text-sm font-black uppercase tracking-widest hover:text-secondary-light transition-all flex items-center group"><ArrowRight size={14} className="mr-3 opacity-0 group-hover:opacity-100 transition-all" /> Franchise</Link></li>
            <li><Link to="/contact" className="text-sm font-black uppercase tracking-widest hover:text-secondary-light transition-all flex items-center group"><ArrowRight size={14} className="mr-3 opacity-0 group-hover:opacity-100 transition-all" /> Connect Node</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-10">Inventory</h4>
          <ul className="space-y-4">
            <li><Link to="/shop?cat=Malt Powder" className="text-sm font-black uppercase tracking-widest hover:text-secondary-light transition-all">Malt Powders</Link></li>
            <li><Link to="/shop?cat=Flour" className="text-sm font-black uppercase tracking-widest hover:text-secondary-light transition-all">Natural Flours</Link></li>
            <li><Link to="/shop?cat=Rice" className="text-sm font-black uppercase tracking-widest hover:text-secondary-light transition-all">Diabetic Rice</Link></li>
            <li><Link to="/shop?cat=Teas" className="text-sm font-black uppercase tracking-widest hover:text-secondary-light transition-all">Health Teas</Link></li>
          </ul>
        </div>

        {/* Global Node */}
        <div className="space-y-8">
           <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Global Logistics</h4>
           <div className="space-y-4 bg-white/5 p-8 rounded-[40px] border border-white/10">
              <div className="flex items-center space-x-4">
                 <Globe size={18} className="text-secondary" />
                 <span className="text-[10px] font-black uppercase tracking-widest">BENGALURU, INDIA</span>
              </div>
              <p className="text-[9px] font-medium text-white/50 leading-relaxed uppercase tracking-wider">Serving 10,000+ conscious households with sprouted purity.</p>
           </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-12 max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between">
        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30">© 2026 LOGI NUTRITIONAL LOGISTICS HUB. ALL PROTOCOLS RESERVED.</p>
        <div className="flex space-x-10 mt-6 md:mt-0 text-[9px] font-black uppercase tracking-[0.3em] text-white/30">
          <a href="#" className="hover:text-white transition-all">Privacy Node</a>
          <a href="#" className="hover:text-white transition-all">Terms Node</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

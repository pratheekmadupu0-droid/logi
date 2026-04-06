import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ShieldCheck, CircleCheck, TrendingUp, Star, 
  Leaf, Heart, Coffee, Phone, Mail, MapPin, Send
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addItem } from '../redux/cartSlice';
import toast from 'react-hot-toast';

const Home = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = React.useState([]);
  const [ads, setAds] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, adsRes] = await Promise.all([
          axios.get(`${API_URL}/api/products`),
          axios.get(`${API_URL}/api/ads`)
        ]);
        setProducts(prodRes.data);
        setAds(adsRes.data);
      } catch (err) {
        console.error("Home data fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 bg-[#F9F7F2]">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#EADDCA]/20 rounded-bl-[200px] -z-10" />
        <div className="section-padding grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary-dark rounded-full text-sm font-bold tracking-wider uppercase">
              100% Natural & Organic
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight">
              Ancient Grains. <br />
              <span className="text-primary italic">Modern Nutrition.</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
              Experience the purity of traditional sprouts and millets. Our nutrient-rich malts, flours, and grains are expertly crafted to boost immunity and vitality for the whole family.
            </p>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/shop" className="btn btn-primary flex items-center group w-full sm:w-auto">
                Explore Shop
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link to="/#about" className="btn border-2 border-gray-200 text-gray-700 hover:border-primary hover:text-primary w-full sm:w-auto">
                The Logi Story
              </Link>
            </div>
            <div className="flex items-center space-x-8 pt-8">
              <div className="flex items-center space-x-2">
                <CircleCheck className="text-accent" size={24} />
                <span className="font-semibold text-gray-700">Lab Tested</span>
              </div>
              <div className="flex items-center space-x-2">
                <CircleCheck className="text-accent" size={24} />
                <span className="font-semibold text-gray-700">Non-GMO</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl" />
            <img 
              src="https://i.ibb.co/Cs61R3Fd/Gemini-Generated-Image-dwv1v9dwv1v9dwv1.png" 
              alt="Logi Ragi Malt" 
              className="relative z-10 w-full max-w-md mx-auto rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500"
            />
            {/* Float Badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -top-6 -right-6 md:right-0 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center space-x-3 border border-gray-100"
            >
              <div className="bg-primary/10 p-2 rounded-lg">
                <Leaf className="text-primary" size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Top Rated</p>
                <p className="text-lg font-bold text-gray-900">Ragi Malt</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Dynamic Ads Section */}
      {ads.length > 0 && (
        <section className="section-padding bg-white">
          <div className="relative overflow-hidden rounded-[50px] shadow-2xl h-[200px] md:h-[400px]">
            {ads.map((ad, idx) => (
              <motion.div 
                key={ad.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0"
                style={{ display: idx === 0 ? 'block' : 'none' }} 
              >
                <img src={ad.url} className="w-full h-full object-cover" alt={ad.title} />
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center p-6 text-white">
                  <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tighter">{ad.title}</h2>
                  <Link to="/shop" className="bg-white text-black px-8 py-3 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-primary transition-all">Shop the Offer</Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Featured Categories */}
      <section className="section-padding bg-white pt-0">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold text-gray-900">Nourishment for Every Need</h2>
          <p className="text-gray-500">Pick the perfect companion for your daily wellness journey.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'Malt', image: 'https://i.ibb.co/Cs61R3Fd/Gemini-Generated-Image-dwv1v9dwv1v9dwv1.png' },
            { name: 'Flour', image: 'https://i.ibb.co/kV0BPpv6/Gemini-Generated-Image-er69hzer69hzer69.png' },
            { name: 'Child', image: 'https://i.ibb.co/68vMM4y3/product1.png' },
            { name: 'Rice', image: 'https://i.ibb.co/YBxS2Nf8/product1.png' }
          ].map((cat, idx) => (
            <motion.div 
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-3xl h-64 md:h-80 cursor-pointer"
            >
              <img 
                src={cat.image} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-75 group-hover:brightness-50" 
                alt={cat.name} 
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                <h3 className="text-2xl font-bold mb-3">{cat.name}</h3>
                <Link to={`/shop?cat=${cat.name}`} className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300">
                  Browse Selection
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-[#FDFCF6]">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 space-y-4 md:space-y-0">
          <div>
            <h2 className="text-4xl font-bold text-gray-900">Our Signature Staples</h2>
            <p className="text-gray-500">The most-trusted nutritional products for your family.</p>
          </div>
          <Link to="/shop" className="text-primary font-bold flex items-center hover:underline">
            View Full Catalogue <ArrowRight className="ml-2" size={18} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.slice(0, 3).map((product, idx) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-[40px] shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-50 group"
            >
              <div className="relative overflow-hidden rounded-[30px] mb-6 h-72 bg-gray-50">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <h3 className="font-bold text-xl mb-1 truncate text-gray-900">{product.name}</h3>
              <p className="text-gray-400 text-sm mb-6 uppercase tracking-widest font-black leading-none">{product.category}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-primary">₹ {product.price}</span>
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="bg-primary text-white p-4 rounded-2xl hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
                >
                  <ArrowRight size={22} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Brand Story / About Section */}
      <section id="about" className="section-padding bg-white grid md:grid-cols-2 gap-16 items-center">
        <div className="relative h-[400px] md:h-[600px] rounded-[50px] overflow-hidden shadow-2xl">
          <img 
            src="https://i.ibb.co/kV0BPpv6/Gemini-Generated-Image-er69hzer69hzer69.png" 
            className="w-full h-full object-cover" 
            alt="Organic farming purity" 
          />
          <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
        </div>
        <div className="space-y-8">
          <span className="text-primary font-bold uppercase tracking-widest text-sm">Purity & Tradition</span>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-gray-900">Grains Ground with <br /> Care & Integrity.</h2>
          <p className="text-gray-600 leading-relaxed text-lg italic">
            At Logi Nutritional Products, we return to the basics. No fillers, no synthetic additives, just the wholesome goodness of sprouted ragi, millets, and whole grains. Our low-GI formulas are designed for long-term health and diabetic-friendly nutrition.
          </p>
          <div className="space-y-5">
            {[
              { title: 'Diabetic Friendly (Low GI)', icon: <Heart className="text-accent" /> },
              { title: '100% Whole Sprouted Grains', icon: <CircleCheck className="text-accent" /> },
              { title: 'Zero Artificial Preservatives', icon: <Leaf className="text-accent" /> },
            ].map((feature, i) => (
              <div key={i} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl transition-all hover:bg-primary/5">
                {feature.icon}
                <span className="font-bold text-gray-800 text-lg">{feature.title}</span>
              </div>
            ))}
          </div>
          <button className="btn btn-secondary py-4 px-10 rounded-2xl text-lg">Our Nutritional Philosophy</button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-[#FDFCF6]">
        <div className="bg-gray-900 rounded-[60px] p-10 md:p-20 overflow-hidden relative">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 blur-[100px] rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 blur-[100px] rounded-full" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-16">
            <div className="space-y-10">
               <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">Connect with <br /><span className="text-primary">The Logi Team</span></h2>
                  <p className="text-gray-400 text-lg max-w-md">Have questions about our nutritional profiles or bulk orders? We're here to help you choose the best for your lifestyle.</p>
               </div>
               
               <div className="space-y-6">
                  <div className="flex items-center space-x-5 group">
                     <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                        <Phone size={24} />
                     </div>
                     <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Call Us Directly</p>
                        <p className="text-white text-xl font-bold">+91 98765 43210</p>
                     </div>
                  </div>
                  <div className="flex items-center space-x-5 group">
                     <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                        <Mail size={24} />
                     </div>
                     <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Support Email</p>
                        <p className="text-white text-xl font-bold">purity@logi.company</p>
                     </div>
                  </div>
                  <div className="flex items-center space-x-5 group">
                     <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                        <MapPin size={24} />
                     </div>
                     <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Our Facility</p>
                        <p className="text-white text-xl font-bold">Bengaluru, Karnataka, India</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] p-8 md:p-12">
               <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-4">Full Name</label>
                       <input className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold focus:border-primary transition-all outline-none" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-4">Email Address</label>
                       <input className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold focus:border-primary transition-all outline-none" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-4">Subject</label>
                     <input className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold focus:border-primary transition-all outline-none" placeholder="Nutritional Advice / Bulk Query" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-4">Your Message</label>
                     <textarea className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold focus:border-primary transition-all outline-none h-32" placeholder="Tell us more..." />
                  </div>
                  <button className="w-full bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-primary/20 flex items-center justify-center space-x-3 group hover:scale-[1.02] active:scale-98 transition-all">
                     <span>Transmit Message</span>
                     <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
               </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="py-20 bg-white border-t border-gray-50 overflow-hidden">
        <div className="section-padding flex flex-col items-center space-y-12">
            <Link to="/">
              <img src="https://i.ibb.co/Mkhpj225/favicon-largefill-1.png" className="h-24 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700" alt="Logi" />
            </Link>
            <div className="flex flex-wrap justify-center gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
               <Link to="/shop" className="hover:text-primary transition-colors">Shop All</Link>
               <Link to="/#about" className="hover:text-primary transition-colors">Origins</Link>
               <Link to="/#contact" className="hover:text-primary transition-colors">Logistics</Link>
               <Link to="/privacy" className="hover:text-primary transition-colors">Terms</Link>
            </div>
            <p className="text-[9px] font-black uppercase tracking-[0.5em] text-gray-300">LOGI NUTRITIONAL PRODUCTS © 2026</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

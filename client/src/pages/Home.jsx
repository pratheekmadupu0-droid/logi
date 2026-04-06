import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, CircleCheck, TrendingUp, Star, Leaf, Heart, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS, CATEGORIES } from '../utils/mockData';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/cartSlice';
import toast from 'react-hot-toast';

const Home = () => {
  const dispatch = useDispatch();

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

      {/* Featured Categories */}
      <section className="section-padding bg-white">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold text-gray-900">Nourishment for Every Need</h2>
          <p className="text-gray-500">Pick the perfect companion for your daily wellness journey.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, idx) => (
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
          {PRODUCTS.slice(0, 3).map((product, idx) => (
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
                <button className="absolute top-6 right-6 bg-white/80 backdrop-blur-md p-3 rounded-full text-gray-500 hover:text-red-500 transition-colors shadow-sm">
                  <Star fill="currentColor" size={20} />
                </button>
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
      <section className="section-padding bg-white grid md:grid-cols-2 gap-16 items-center">
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
    </div>
  );
};

export default Home;

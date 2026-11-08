import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search, ChevronDown, Check, Star, ShoppingCart, Eye, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/cartSlice';
import toast from 'react-hot-toast';

import { PRODUCTS } from '../utils/mockData';

const Products = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('cat') || 'All');
  const [sortBy, setSortBy] = useState('Popular');
  const [showFilters, setShowFilters] = useState(false);
  const [allProducts, setAllProducts] = useState(PRODUCTS);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/products`);
        if (data && data.length > 0) {
            setAllProducts(data);
            setProducts(data);
        } else {
            setProducts(allProducts);
        }
      } catch (err) {
          console.error("Fetch failed, using static data");
          setProducts(allProducts);
      } finally {
          setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = allProducts;
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    if (searchQuery) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    
    if (sortBy === 'Price: Low to High') {
      filtered = [...filtered].sort((a,b) => a.price - b.price);
    } else if (sortBy === 'Price: High to Low') {
      filtered = [...filtered].sort((a,b) => b.price - a.price);
    }
    setProducts(filtered);
  }, [selectedCategory, sortBy, searchQuery, allProducts]);

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-[#FCFBFA] min-h-screen pt-36 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Gallery Header */}
        <div className="flex flex-col md:row items-center justify-between mb-16 space-y-6 md:space-y-0">
          <div>
            <p className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-2">Nutritional Library</p>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter uppercase leading-none">Product <br />Essential.<span className="text-primary italic">Gallery</span></h1>
          </div>
          
          <div className="flex items-center space-x-4 w-full md:w-auto bg-white p-2 rounded-[40px] shadow-sm border border-gray-100">
            <div className="relative flex-grow md:w-64">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search Database..." 
                className="w-full bg-transparent rounded-full pl-16 pr-6 py-4 focus:outline-none font-bold text-sm tracking-tight"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-[200px_1fr] gap-16">
          {/* Sidebar */}
          <aside className="hidden md:block space-y-12">
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6">Directory</h3>
              <div className="space-y-2">
                {['All', 'Malt Powder', 'Flour', 'Rice', 'Teas'].map(cat => (
                   <button key={cat} onClick={() => setSelectedCategory(cat)} className={`w-full text-left p-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${selectedCategory === cat ? 'bg-primary text-white shadow-xl' : 'text-gray-400 hover:text-gray-900'}`}>{cat}</button>
                ))}
              </div>
            </div>
            
            <div>
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6">Sequence</h3>
               <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full bg-white border border-gray-100 p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer">
                  <option>Popular</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
               </select>
            </div>

            {/* Mascot Fuel Recommendation Badge */}
            <div className="bg-gradient-to-br from-gray-950 via-[#1c120a] to-gray-950 text-white p-5 rounded-[32px] border border-amber-900/40 shadow-xl space-y-3">
              <div className="w-full aspect-[444/394] rounded-2xl bg-black overflow-hidden flex items-center justify-center border border-white/10 shadow-inner">
                <video src="/logi_mascot.mp4" autoPlay loop muted playsInline className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-secondary flex items-center gap-1">
                  ⚡ Logi's Fuel Choice
                </p>
                <p className="text-xs font-bold text-white/90 leading-snug mt-1">100% Sprouted Grains for Daily Vitality</p>
              </div>
            </div>
          </aside>

          {/* Core Hub */}
          <main>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                <AnimatePresence mode="popLayout">
                   {products.map((product) => (
                      <motion.div layout key={product.id} className="p-6 bg-white border border-gray-50 rounded-[50px] hover:shadow-2xl transition-all group relative">
                         <Link to={`/product/${product.id}`} className="block">
                            <div className="relative overflow-hidden rounded-[35px] h-64 bg-gray-50 mb-6 flex items-center justify-center">
                               <img src={product.image} className="h-full w-full object-contain p-8 group-hover:scale-110 transition-transform duration-700" alt={product.name} />
                            </div>
                            <div className="space-y-4">
                               <div className="flex justify-between items-center bg-gray-50 p-2 px-4 rounded-full">
                                  <span className="text-[9px] font-black uppercase text-primary tracking-widest">{product.category}</span>
                                  <div className="flex items-center text-amber-500 space-x-1">
                                     <Star size={10} fill="currentColor" />
                                     <span className="text-[10px] font-black">{product.rating}</span>
                                  </div>
                               </div>
                               <h3 className="text-lg font-black text-gray-900 leading-tight uppercase tracking-tight truncate">{product.name}</h3>
                            </div>
                         </Link>
                         <div className="flex items-center justify-between pt-4">
                            <p className="text-3xl font-black text-primary italic">₹ {product.price}</p>
                            <button onClick={() => handleAddToCart(product)} className="bg-primary text-white p-4 rounded-3xl active:scale-90 transition-all z-10"><ShoppingCart size={22} /></button>
                         </div>
                      </motion.div>
                   ))}
                </AnimatePresence>
             </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search, ChevronDown, Check, Star, ShoppingCart, Eye, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/cartSlice';
import toast from 'react-hot-toast';

const Products = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('cat') || 'All');
  const [sortBy, setSortBy] = useState('Popular');
  const [showFilters, setShowFilters] = useState(false);
  const [allProducts, setAllProducts] = useState([
    {
      id: 1,
      name: 'Nutritious Ragi Malt Powder-500g',
      image: 'https://i.ibb.co/Cs61R3Fd/Gemini-Generated-Image-dwv1v9dwv1v9dwv1.png',
      description: 'Controls diabetes, lowers LDL, regulates blood pressure, boosts testosterone, helps in weight loss, improves immunity, increases bone & muscle strength.',
      category: 'Malt Powder',
      price: 250,
      rating: 4.9
    },
    {
      id: 2,
      name: 'Nutritional Multimillet Flour-500g',
      image: 'https://i.ibb.co/kV0BPpv6/Gemini-Generated-Image-er69hzer69hzer69.png',
      description: 'Delicious & Nutritious! Low GI helps regulate diabetes, supports weight management, improves immunity & makes body healthy.',
      category: 'Flour',
      price: 250,
      rating: 4.8
    },
    {
      id: 3,
      name: 'LOGI Low GI Rice',
      image: 'https://i.ibb.co/5xtSdfNL/Gemini-Generated-Image-uedgjwuedgjwuedg.png',
      description: 'Low GI for Smart Living! Diabetic friendly, good for all ages, supports weight control, rich in protein & nutrients.',
      category: 'Rice',
      price: 200,
      rating: 4.9,
      variants: [
        { size: '1kg', price: 200 },
        { size: '5kg', price: 1000 }
      ]
    },
    {
      id: 4,
      name: 'Chocolate Multimillet Malt-500g',
      image: 'https://i.ibb.co/N2wKvKYx/Gemini-Generated-Image-5g26d05g26d05g26.png',
      description: 'Energy Boost! Delicious chocolate taste with packed nutrition from grains. Strong & Smart formula packed with grains.',
      category: 'Malt Powder',
      price: 350,
      rating: 4.7
    },
    {
      id: 5,
      name: 'Nutritious Multi Millet Malt Powder-500g',
      image: 'https://i.ibb.co/7tqxRpV3/Gemini-Generated-Image-qn6xfaqn6xfaqn6x.png',
      description: 'Delicious multi-millet malt blended with nuts and super grains. Low GI formulation supports steady energy.',
      category: 'Malt Powder',
      price: 250,
      rating: 4.8
    },
    {
      id: 6,
      name: 'Nutritional Ragi Millet Flour-500g',
      image: 'https://i.ibb.co/DH9BFdbx/Gemini-Generated-Image-4s7ep64s7ep64s7e.png',
      description: 'High-quality ragi flour with low GI to help regulate blood sugar. Supports weight management and boosts immunity.',
      category: 'Flour',
      price: 200,
      rating: 4.9
    },
    {
      id: 7,
      name: 'Nutritional Millettea-500g',
      image: '/milletea.png',
      description: 'A refreshing and healthy millet-based tea blend. Rich in antioxidants and natural goodness.',
      category: 'Teas',
      price: 250,
      rating: 4.7
    }
  ]);
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
          </aside>

          {/* Core Hub */}
          <main>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                <AnimatePresence mode="popLayout">
                   {products.map((product) => (
                      <motion.div layout key={product.id} className="p-6 bg-white border border-gray-50 rounded-[50px] hover:shadow-2xl transition-all group">
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
                            <div className="flex items-center justify-between pt-4">
                               <p className="text-3xl font-black text-primary italic">₹ {product.price}</p>
                               <button onClick={() => handleAddToCart(product)} className="bg-primary text-white p-4 rounded-3xl active:scale-90 transition-all"><ShoppingCart size={22} /></button>
                            </div>
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

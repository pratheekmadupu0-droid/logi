import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search, ChevronDown, Check, Star, ShoppingCart, Eye, SlidersHorizontal } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
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
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/products`);
        setAllProducts(data);
        setProducts(data);
      } catch (err) {
          toast.error("Failed to load products");
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
  }, [selectedCategory, sortBy, searchQuery]);

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-[#FCFBFA] min-h-screen pt-28 pb-20">
      <div className="section-padding">
        {/* Header */}
        <div className="flex flex-col md:row items-center justify-between mb-12 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Our Collection</h1>
            <p className="text-gray-500 mt-2">Showing {products.length} premium products</p>
          </div>
          
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full bg-white border border-gray-100 rounded-full pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden bg-white p-3 rounded-full border border-gray-100 shadow-sm text-gray-600"
            >
              <SlidersHorizontal size={20} />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-[250px_1fr] gap-12">
          {/* Filters (Desktop) */}
          <aside className="hidden md:block space-y-10">
            <div>
              <h3 className="font-bold text-gray-900 mb-6 flex items-center">
                <Filter size={18} className="mr-2" /> Categories
              </h3>
              <div className="space-y-3">
                <button 
                  onClick={() => setSelectedCategory('All')} 
                  className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl transition-all ${selectedCategory === 'All' ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                >
                  <span className="font-medium text-sm">All Products</span>
                  {selectedCategory === 'All' && <Check size={16} />}
                </button>
                {['Malt', 'Flour', 'Child Nutrition', 'Rice'].map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)} 
                    className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl transition-all ${selectedCategory === cat ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                  >
                    <span className="font-medium text-sm">{cat}</span>
                    {selectedCategory === cat && <Check size={16} />}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-6">Price Range</h3>
              <div className="space-y-4">
                <input type="range" className="w-full accent-primary" />
                <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <span>₹0</span>
                  <span>₹350</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-6">Sort By</h3>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 focus:outline-none shadow-sm cursor-pointer"
              >
                <option>Popular</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </aside>

          {/* Product Grid */}
          <main>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {products.map((product) => (
                  <motion.div 
                    layout
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white p-4 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group"
                  >
                    <div className="relative overflow-hidden rounded-[30px] h-72 bg-gray-50 mb-6">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700" 
                      />
                      <div className="absolute inset-x-4 bottom-4 flex items-center justify-center space-x-2 translate-y-16 group-hover:translate-y-0 transition-transform duration-500">
                        <Link 
                          to={`/product/${product.id}`}
                          className="bg-white text-gray-800 p-3 rounded-2xl shadow-lg flex items-center justify-center hover:bg-gray-100"
                        >
                          <Eye size={20} />
                        </Link>
                        <button 
                          onClick={() => handleAddToCart(product)}
                          className="bg-primary text-white p-3 px-6 grow rounded-2xl shadow-lg flex items-center justify-center hover:bg-primary-dark transition-colors font-bold"
                        >
                          <ShoppingCart size={20} className="mr-2" /> Add to Cart
                        </button>
                      </div>
                    </div>
                    
                    <div className="px-2 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="bg-primary/5 text-primary text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
                          {product.category}
                        </span>
                        <div className="flex items-center space-x-1 text-amber-500">
                          <Star fill="currentColor" size={12} />
                          <span className="text-xs font-bold text-gray-900">{product.rating}</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 truncate tracking-tight">{product.name}</h3>
                      <p className="text-2xl font-black text-primary flex items-baseline">
                        <span className="text-sm font-bold mr-1">₹</span>
                        {product.price}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {products.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="bg-gray-100 p-8 rounded-full mb-6">
                  <Search size={40} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-500 max-w-xs">We couldn't find any products matching your search or filters.</p>
                <button 
                  onClick={() => {setSelectedCategory('All'); setSearchQuery('');}}
                  className="mt-6 text-primary font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;

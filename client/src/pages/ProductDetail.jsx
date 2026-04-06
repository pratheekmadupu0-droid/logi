import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, ShieldCheck, Heart, Share2, Plus, Minus, CircleCheck, Info, ArrowLeft } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/cartSlice';
import axios from 'axios';
import toast from 'react-hot-toast';

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const [loading, setLoading] = useState(true);

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/api/products/${id}`);
                setProduct(data);
                if (data.variants && data.variants.length > 0) {
                    setSelectedVariant(data.variants[0]);
                }
            } catch (err) {
                console.error("Detail fetch failed, using fallback");
                // Static fallback for critical UI stability
                const fallback = {
                    id: id,
                    name: "Logi Nutritional Essential",
                    price: 250,
                    image: "https://i.ibb.co/Cs61R3Fd/Gemini-Generated-Image-dwv1v9dwv1v9dwv1.png",
                    category: "Premium",
                    description: "Our signature nutritional formula, slow-roasted and stone-ground to preserve the life force of ancient grains. Designed for members who demand the highest purity.",
                    rating: 4.9,
                    reviews: "120+",
                    benefits: ["Stone Ground", "Organic", "Low-GI"],
                    nutrients: ["Protein: 12g", "Iron: 4mg", "Fiber: 8g"]
                };
                setProduct(fallback);
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) return (
        <div className="min-h-screen pt-32 flex flex-col items-center justify-center space-y-4">
             <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
             <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Accessing Logistics Hub...</p>
         </div>
    );

    const handleAddToCart = () => {
        const itemToAdd = {
            ...product,
            price: selectedVariant ? selectedVariant.price : product.price,
            size: selectedVariant ? selectedVariant.size : null,
            quantity
        };
        dispatch(addItem(itemToAdd));
        toast.success(`${product.name} ${selectedVariant ? `(${selectedVariant.size})` : ''} added to cart!`);
    };

    const currentPrice = selectedVariant ? selectedVariant.price : product.price;

    return (
        <div className="bg-[#FCFBFA] pt-32 pb-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Header Context */}
                <div className="flex items-center justify-between mb-12">
                   <Link to="/shop" className="flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-primary transition-all">
                      <ArrowLeft className="mr-2" size={14} /> Back to Gallery
                   </Link>
                   <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">PRODUCT ID: #LOGI_{product.id.toString().slice(-4)}</span>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Media Assets */}
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                       <div className="bg-white rounded-[60px] p-10 shadow-2xl border border-gray-50 flex items-center justify-center relative overflow-hidden group">
                          <img src={product.image} className="w-full max-h-[500px] object-contain group-hover:scale-105 transition-transform duration-[2s]" alt={product.name} />
                          <div className="absolute top-6 left-6 bg-primary text-white p-4 rounded-3xl shadow-xl">
                             <h4 className="text-xl font-black italic tracking-tighter">Premium</h4>
                          </div>
                       </div>
                    </motion.div>

                    {/* Logistics Content */}
                    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
                        <header className="space-y-4">
                           <div className="flex items-center space-x-3">
                              <span className="bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full border border-primary/10">{product.category}</span>
                              <div className="flex items-center space-x-1.5 text-amber-500">
                                 <Star fill="currentColor" size={14} />
                                 <span className="font-black text-xs text-gray-900">{product.rating}</span>
                              </div>
                           </div>
                           <h1 className="text-4xl md:text-7xl font-black text-gray-900 leading-[0.9] tracking-tighter uppercase">{product.name}</h1>
                        </header>

                        <p className="text-gray-500 text-lg font-medium leading-relaxed max-w-lg">{product.description}</p>

                        {/* Variant Selection */}
                        {product.variants && product.variants.length > 0 && (
                           <div className="space-y-4">
                              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Select Configuration</p>
                              <div className="flex flex-wrap gap-3">
                                 {product.variants.map((v, i) => (
                                    <button 
                                       key={i} 
                                       onClick={() => setSelectedVariant(v)}
                                       className={`px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all border ${selectedVariant?.size === v.size ? 'bg-primary text-white border-primary shadow-lg scale-105' : 'bg-white text-gray-400 border-gray-100 hover:border-primary/30'}`}
                                    >
                                       {v.size} - ₹{v.price}
                                    </button>
                                 ))}
                              </div>
                           </div>
                        )}

                        <div className="flex items-end justify-between py-8 border-y border-gray-50">
                           <div className="space-y-1">
                              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Unit Price</p>
                              <p className="text-5xl font-black text-primary italic leading-none">₹ {currentPrice}</p>
                           </div>
                           <div className="flex items-center bg-gray-50 p-2 rounded-[30px] border border-gray-100">
                              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm hover:text-primary transition-all active:scale-90"><Minus size={18} /></button>
                              <span className="w-12 text-center font-black text-xl">{quantity}</span>
                              <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm hover:text-primary transition-all active:scale-90"><Plus size={18} /></button>
                           </div>
                        </div>

                        <div className="flex gap-4">
                           <button onClick={handleAddToCart} className="flex-grow bg-gray-900 text-white rounded-[35px] py-6 font-black uppercase tracking-[0.2em] text-xs shadow-2xl hover:bg-primary transition-all flex items-center justify-center space-x-3 group">
                              <span>Acquire Product</span>
                              <ShoppingCart size={18} className="group-hover:translate-x-1 transition-transform" />
                           </button>
                           <button className="w-20 bg-white border border-gray-100 text-gray-400 rounded-[35px] flex items-center justify-center hover:text-red-500 transition-all"><Heart size={24} /></button>
                        </div>

                        <div className="grid grid-cols-2 gap-6 pt-4">
                           <div className="flex items-center space-x-4 p-5 bg-white border border-gray-50 rounded-[35px] shadow-sm">
                              <ShieldCheck className="text-primary" size={28} />
                              <div>
                                 <p className="text-[10px] font-black uppercase text-gray-900">Lab Tested</p>
                                 <p className="text-[9px] font-bold text-gray-400">Purity Certified</p>
                              </div>
                           </div>
                           <div className="flex items-center space-x-4 p-5 bg-white border border-gray-50 rounded-[35px] shadow-sm">
                              <CircleCheck className="text-primary" size={28} />
                              <div>
                                 <p className="text-[10px] font-black uppercase text-gray-900">Slow Roasted</p>
                                 <p className="text-[9px] font-bold text-gray-400">Nutrient Dense</p>
                              </div>
                           </div>
                        </div>
                    </motion.div>
                </div>

                {/* Sub-Logistics Tabs */}
                <div className="mt-32">
                   <div className="flex items-center border-b border-gray-50 mb-16 overflow-x-auto scrollbar-hide">
                      {['Analysis', 'Composition', 'Origins'].map(tab => (
                         <button key={tab} onClick={() => setActiveTab(tab)} className={`px-10 py-6 text-[10px] font-black tracking-[0.4em] uppercase transition-all whitespace-nowrap ${activeTab === tab.toLowerCase() ? 'text-primary border-b-2 border-primary' : 'text-gray-300 hover:text-gray-900'}`}>{tab}</button>
                      ))}
                   </div>
                   
                   <motion.div key={activeTab} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
                       {activeTab === 'analysis' && (
                          <div className="space-y-6">
                             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {product.nutrients?.map((n, i) => (
                                   <div key={i} className="p-8 bg-white border border-gray-50 rounded-[40px] text-center shadow-sm">
                                      <p className="text-[10px] font-black uppercase text-gray-400 mb-2 tracking-widest">Density</p>
                                      <p className="text-2xl font-black text-gray-900">{n.split(':')[1]}</p>
                                      <p className="text-[9px] font-black text-primary uppercase mt-1">{n.split(':')[0]}</p>
                                   </div>
                                ))}
                             </div>
                          </div>
                       )}
                       {activeTab === 'composition' && (
                          <div className="bg-white p-10 rounded-[50px] border border-gray-50 shadow-xl">
                             <h4 className="text-xl font-black text-gray-900 mb-8 uppercase tracking-tighter">Purity Profile</h4>
                             <div className="space-y-4">
                                {product.benefits?.map((b, i) => (
                                   <div key={i} className="flex items-center justify-between p-5 bg-gray-50 rounded-3xl">
                                      <span className="font-black text-xs uppercase tracking-widest text-gray-400">{b}</span>
                                      <CheckCircle className="text-primary" size={16} />
                                   </div>
                                ))}
                             </div>
                          </div>
                      )}
                      {activeTab === 'origins' && (
                          <p className="text-gray-500 text-lg leading-relaxed font-medium bg-white p-10 rounded-[50px] border border-gray-100 shadow-sm italic">
                             "Deep within the traditional farming belts of Karnataka, we source the finest grains. Each batch is inspected for maturity and density before undergoing our proprietary solar-assisted sprouting process."
                          </p>
                      )}
                   </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;

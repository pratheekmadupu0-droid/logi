import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, ShieldCheck, Heart, Share2, Plus, Minus, CircleCheck, Info } from 'lucide-react';
import { PRODUCTS } from '../utils/mockData';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/cartSlice';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const found = PRODUCTS.find(p => p.id === id);
    setProduct(found);
  }, [id]);

  if (!product) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="animate-spin text-primary">
        <ShoppingCart size={40} />
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">Loading product...</h2>
    </div>
  );

  const handleAddToCart = () => {
    dispatch(addItem({ ...product, quantity }));
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-[#FCFBFA] pt-28 pb-20">
      <div className="section-padding">
        {/* Breadcrumb */}
        <nav className="mb-12 flex items-center space-x-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-primary truncate max-w-[150px]">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Image Gallery Mockup */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-[40px] overflow-hidden shadow-2xl p-6 border border-gray-100 flex items-center justify-center">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-contain max-h-[500px] hover:scale-110 transition-transform duration-700" 
              />
            </div>
            {/* Thumbnails placeholder */}
            <div className="grid grid-cols-4 gap-4 px-2">
              {[1,2,3,4].map(i => (
                <div key={i} className="aspect-square bg-white rounded-2xl border border-gray-100 overflow-hidden cursor-pointer hover:border-primary transition-all p-2 flex items-center justify-center">
                   <img src={product.image} alt="thumbnail" className="w-full h-full object-contain brightness-95 opacity-60 hover:opacity-100" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Product Data */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                  {product.category}
                </span>
                <div className="flex items-center space-x-4">
                  <button className="text-gray-400 hover:text-red-500 transition-colors"><Heart size={22} /></button>
                  <button className="text-gray-400 hover:text-primary transition-colors"><Share2 size={22} /></button>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 bg-amber-50 px-3 py-1.5 rounded-full text-amber-600 font-bold">
                  <Star fill="currentColor" size={18} />
                  <span>{product.rating}</span>
                </div>
                <span className="text-gray-400 font-medium">{product.reviews} Customer Reviews</span>
              </div>
              <p className="text-4xl font-extrabold text-primary flex items-baseline">
                <span className="text-xl mr-1 font-bold text-gray-400">₹</span>
                {product.price}
              </p>
            </div>

            <p className="text-gray-500 text-lg leading-relaxed">
              {product.description}
            </p>

            {/* Actions */}
            <div className="space-y-6 pt-6 border-t border-gray-100">
              <div className="flex items-center space-x-6">
                <div className="flex items-center bg-gray-100 p-1.5 rounded-2xl">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-white rounded-xl transition-colors shadow-sm"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="w-12 text-center font-black text-lg">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-white rounded-xl transition-colors shadow-sm"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <button 
                  onClick={handleAddToCart}
                  className="flex-grow btn bg-primary text-white py-4 rounded-3xl shadow-xl flex items-center justify-center space-x-3 text-lg font-bold hover:bg-primary-dark transition-all transform active:scale-95"
                >
                  <ShoppingCart size={22} />
                  <span>Add to Shopping Cart</span>
                </button>
              </div>
              <button className="w-full btn border-2 border-primary text-primary py-4 rounded-3xl text-lg font-bold hover:bg-primary/5 transition-all">
                Buy It Now
              </button>
            </div>

            {/* Trust Factors */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 bg-white p-4 rounded-2xl border border-gray-100">
                <ShieldCheck className="text-accent" size={24} />
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Third Party Lab Tested</span>
              </div>
              <div className="flex items-center space-x-3 bg-white p-4 rounded-2xl border border-gray-100">
                <CircleCheck className="text-accent" size={24} />
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Certified Organic</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Detailed Tabs */}
        <div className="mt-24">
          <div className="flex items-center border-b border-gray-200 mb-12 overflow-x-auto scrollbar-hide">
             {['description', 'ingredients', 'nutritional info', 'reviews'].map(tab => (
               <button 
                 key={tab}
                 onClick={() => setActiveTab(tab)}
                 className={`px-8 py-4 text-sm font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab ? 'text-primary border-b-4 border-primary' : 'text-gray-400 hover:text-gray-600'}`}
               >
                 {tab}
               </button>
             ))}
          </div>

          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            {activeTab === 'description' && (
              <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                <p>
                  Experience the next level of nutritional purity with {product.name}. Our unique formula ensures maximum nutrient density and organic goodness for your whole family.
                </p>
                <div className="grid sm:grid-cols-2 gap-8 mt-12">
                   <div className="bg-white p-8 rounded-[30px] border border-gray-50 shadow-sm">
                      <h4 className="font-bold text-gray-900 text-xl mb-4">Core Benefits</h4>
                      <ul className="space-y-3">
                        <li className="flex items-center space-x-2"><Plus className="text-primary" size={16} /><span className="font-medium text-sm">Balanced Energy Levels</span></li>
                        <li className="flex items-center space-x-2"><Plus className="text-primary" size={16} /><span className="font-medium text-sm">Easy Digestibility (Low GI)</span></li>
                        <li className="flex items-center space-x-2"><Plus className="text-primary" size={16} /><span className="font-medium text-sm">Rich in Traditional Grains</span></li>
                      </ul>
                   </div>
                   <div className="bg-white p-8 rounded-[30px] border border-gray-50 shadow-sm">
                      <h4 className="font-bold text-gray-900 text-xl mb-4">Preparation</h4>
                      <p className="text-sm font-medium text-gray-500 italic">
                        Mix with warm water or milk. Sweeten with honey or jaggery for a traditional nutritional drink. Can also be added to flours for extra nutrition.
                      </p>
                   </div>
                </div>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                 {product.ingredients.map((ing, i) => (
                   <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                     <span className="text-xs font-black uppercase tracking-widest text-primary mb-2">High Purity</span>
                     <h4 className="font-bold text-gray-800">{ing}</h4>
                   </div>
                 ))}
              </div>
            )}

            {activeTab === 'nutritional info' && (
              <div className="bg-white rounded-[40px] border border-gray-50 shadow-sm overflow-hidden p-8 md:p-12">
                <h3 className="text-2xl font-black mb-8 border-b-2 border-gray-100 pb-4">Supplement Facts</h3>
                <div className="space-y-0 text-lg">
                  {Object.entries(product.nutritionalInfo).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-5 border-b border-gray-50 last:border-0 hover:bg-gray-50 px-4 transition-colors">
                      <span className="capitalize font-bold text-gray-900">{key}</span>
                      <span className="font-black text-primary">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex items-start space-x-2 text-gray-400 text-xs italic">
                   <Info size={16} className="mt-0.5 shrink-0" />
                   <p>Daily values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your calorie needs.</p>
                </div>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div className="space-y-8">
                 <div className="flex items-center space-x-8 mb-12">
                   <div className="text-center bg-primary text-white p-8 rounded-[30px] shadow-lg">
                     <h4 className="text-5xl font-black">{product.rating}</h4>
                     <p className="text-xs font-bold uppercase tracking-widest mt-2 opacity-80">Out of 5</p>
                   </div>
                   <div>
                     <h3 className="text-xl font-black text-gray-900">Recommended by experts</h3>
                     <p className="text-gray-500 mt-1">Based on {product.reviews} certified reviews from verified purchasers.</p>
                   </div>
                 </div>
                 {/* Single Review Mock */}
                 <div className="bg-white p-8 rounded-[40px] border border-gray-50 shadow-sm">
                   <div className="flex items-center justify-between mb-4">
                     <div className="flex items-center space-x-3">
                       <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center font-bold text-primary">JD</div>
                       <div>
                         <h4 className="font-bold text-gray-900">James D.</h4>
                         <span className="text-xs font-bold text-accent uppercase tracking-widest">Verified Buyer</span>
                       </div>
                     </div>
                     <div className="flex text-amber-400"><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /></div>
                   </div>
                   <p className="text-gray-600 leading-relaxed">
                     Outstanding quality. I've tried many brands before, but Logi is definitely a cut above the rest. The purity and mixability are world-class.
                   </p>
                 </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

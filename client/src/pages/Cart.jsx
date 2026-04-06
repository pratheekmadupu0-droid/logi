import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Truck, ShieldCheck, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { updateQuantity, removeItem } from '../redux/cartSlice';
import toast from 'react-hot-toast';

const Cart = () => {
  const { items, totalAmount } = useSelector(state => state.cart);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdate = (id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemove = (id) => {
    dispatch(removeItem(id));
    toast.success('Item removed from cart');
  };

  const handleCheckout = () => {
    if (!user) {
      toast.error('Please login to proceed to checkout');
      navigate('/login', { state: { from: '/checkout' } });
    } else {
      navigate('/checkout');
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] section-padding text-center">
        <div className="bg-gray-100 p-12 rounded-[50px] mb-8">
           <ShoppingBag size={80} className="text-gray-300" />
        </div>
        <h2 className="text-4xl font-black text-gray-900 mb-4">Your Shopping Cart is Empty</h2>
        <p className="text-gray-500 max-w-sm text-lg leading-relaxed mb-10">
          It looks like you haven't added any premium nutritional products to your cart yet.
        </p>
        <Link to="/shop" className="btn btn-primary text-lg px-12 py-4 flex items-center space-x-2">
           <span>Start Shopping</span>
           <ArrowRight size={20} />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FCFBFA] pt-28 pb-32">
      <div className="section-padding grid lg:grid-cols-[1fr_400px] gap-16 items-start">
        <div className="space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
             <h1 className="text-4xl font-black text-gray-900">Your Cart</h1>
             <span className="bg-gray-100 text-gray-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">{items.length} Items</span>
          </div>

          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div 
                  layout
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white p-6 rounded-[30px] border border-gray-50 shadow-sm flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 group hover:shadow-lg transition-all"
                >
                  <div className="w-32 h-32 bg-gray-50 rounded-2xl overflow-hidden shadow-inner p-4 shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  
                  <div className="flex-grow space-y-2 text-center sm:text-left">
                    <h3 className="text-xl font-bold text-gray-900 tracking-tight">{item.name}</h3>
                    <p className="text-gray-400 font-bold">₹ {item.price.toFixed(2)}</p>
                    <button 
                      onClick={() => handleRemove(item.id)}
                      className="text-red-400 hover:text-red-600 transition-colors pt-2 flex items-center space-x-1 justify-center sm:justify-start"
                    >
                      <Trash2 size={16} /> <span className="text-xs font-bold uppercase tracking-widest">Remove</span>
                    </button>
                  </div>

                  <div className="flex items-center bg-gray-50 p-1.5 rounded-2xl shadow-inner shrink-0">
                    <button 
                      onClick={() => handleUpdate(item.id, item.quantity - 1)}
                      className="p-3 bg-white hover:bg-gray-100 rounded-xl transition-all shadow-sm"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="w-12 text-center font-black text-lg">{item.quantity}</span>
                    <button 
                      onClick={() => handleUpdate(item.id, item.quantity + 1)}
                      className="p-3 bg-white hover:bg-gray-100 rounded-xl transition-all shadow-sm"
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  <div className="w-32 text-center sm:text-right shrink-0">
                    <p className="text-2xl font-black text-primary">₹ {(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Order Summary */}
        <aside className="sticky top-32 space-y-8">
           <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-xl space-y-8">
              <h3 className="text-2xl font-black text-gray-900 border-b border-gray-50 pb-4">Order Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600 font-medium">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">₹ {totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 font-medium">
                  <span>Estimated Shipping</span>
                  <span className="text-accent font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-gray-600 font-medium">
                   <span>Tax</span>
                   <span className="font-bold text-gray-900">₹ 0.00</span>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <div className="flex justify-between items-baseline mb-8">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <span className="text-4xl font-black text-primary">₹ {totalAmount.toFixed(2)}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full btn btn-primary py-5 rounded-3xl text-xl font-black flex items-center justify-center space-x-3 shadow-2xl hover:translate-y-[-2px] transition-all"
                >
                  <span>Checkout Now</span>
                  <ArrowRight size={22} />
                </button>
              </div>

              {/* Extra Perks */}
              <div className="space-y-4 pt-4">
                 <div className="flex items-center space-x-3 text-sm text-gray-500 font-medium">
                    <Truck size={18} className="text-primary" />
                    <span>Free express shipping on all orders</span>
                 </div>
                 <div className="flex items-center space-x-3 text-sm text-gray-500 font-medium">
                    <ShieldCheck size={18} className="text-primary" />
                    <span>100% Secure Checkout Guaranteed</span>
                 </div>
                 <div className="flex items-center space-x-3 text-sm text-gray-500 font-medium">
                    <Zap size={18} className="text-primary" />
                    <span>Instant access to member nutrition tips</span>
                 </div>
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
};

export default Cart;

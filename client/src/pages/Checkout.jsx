import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { CreditCard, Truck, CheckCircle, ChevronLeft, MapPin, Phone, User, Home, Building, Globe } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { clearCart } from '../redux/cartSlice';

const Checkout = () => {
  const { items, totalAmount } = useSelector(state => state.cart);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phoneNumber || '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('razorpay'); // 'razorpay' or 'cod'
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const initPayment = async (orderData) => {
    const options = {
      key: "rzp_live_SZuIUGAbW3gPLV", // Public key
      amount: orderData.amount,
      currency: "INR",
      name: "Logi Nutritional Products",
      description: "Order Checkout",
      order_id: orderData.id,
      handler: async (response) => {
        try {
          const verifyUrl = `${API_URL}/api/orders/verify`;
          const { data } = await axios.post(verifyUrl, response);
          if (data.msg === "Payment Success") {
            toast.success("Order Placed Successfully!");
            dispatch(clearCart());
            navigate('/');
          }
        } catch (error) {
          console.error(error);
          toast.error("Payment Verification Failed");
        }
      },
      prefill: {
        name: formData.name,
        contact: formData.phone
      },
      theme: {
        color: "#8B5E3C",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.pincode) {
        toast.error('Please fill in all shipping details');
        return;
    }

    if (paymentMethod === 'razorpay') {
      try {
        setLoading(true);
        const orderUrl = `${API_URL}/api/orders`;
        const { data } = await axios.post(orderUrl, { amount: totalAmount });
        initPayment(data.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to create order");
      } finally {
        setLoading(false);
      }
    } else {
      // COD Logic
      setLoading(true);
      setTimeout(() => {
        toast.success("Order Placed Successfully (COD)!");
        dispatch(clearCart());
        setLoading(false);
        navigate('/');
      }, 1500);
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <Link to="/shop" className="text-primary hover:underline">Go to Shop</Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FCFBFA] pt-28 pb-20">
      <div className="section-padding grid lg:grid-cols-2 gap-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-10"
        >
          <div className="flex items-center text-gray-500 hover:text-primary transition-colors cursor-pointer" onClick={() => navigate(-1)}>
            <ChevronLeft size={20} />
            <span className="font-bold uppercase tracking-widest text-xs ml-2">Back to Cart</span>
          </div>

          <div className="bg-white p-10 rounded-[40px] shadow-xl border border-gray-100 space-y-8">
            <h2 className="text-3xl font-black text-gray-900 border-b border-gray-50 pb-6">Shipping Information</h2>
            
            <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 col-span-full">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-primary" size={20} />
                  <input 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 rounded-3xl pl-14 pr-6 py-4 focus:ring-2 focus:ring-primary/20 outline-none font-bold text-gray-900 shadow-inner" 
                    placeholder="Enter your name" 
                  />
                </div>
              </div>

              <div className="space-y-2 col-span-full">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">Phone Number</label>
                <div className="relative group">
                  <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-primary" size={20} />
                  <input 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 rounded-3xl pl-14 pr-6 py-4 focus:ring-2 focus:ring-primary/20 outline-none font-bold text-gray-900 shadow-inner" 
                    placeholder="+91 00000 00000" 
                  />
                </div>
              </div>

              <div className="space-y-2 col-span-full">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">Complete Address</label>
                <div className="relative group">
                  <Home className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-primary" size={20} />
                  <input 
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 rounded-3xl pl-14 pr-6 py-4 focus:ring-2 focus:ring-primary/20 outline-none font-bold text-gray-900 shadow-inner" 
                    placeholder="House No, Street, Area" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">City</label>
                <div className="relative group">
                  <Building className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-primary" size={18} />
                  <input 
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 rounded-3xl pl-12 pr-6 py-4 focus:ring-2 focus:ring-primary/20 outline-none font-bold text-gray-900 shadow-inner" 
                    placeholder="City" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">State</label>
                <div className="relative group">
                  <Globe className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-primary" size={18} />
                  <input 
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 rounded-3xl pl-12 pr-6 py-4 focus:ring-2 focus:ring-primary/20 outline-none font-bold text-gray-900 shadow-inner" 
                    placeholder="State" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">Pincode</label>
                <div className="relative group">
                  <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-primary" size={18} />
                  <input 
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 rounded-3xl pl-12 pr-6 py-4 focus:ring-2 focus:ring-primary/20 outline-none font-bold text-gray-900 shadow-inner" 
                    placeholder="000000" 
                  />
                </div>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Order Info & Payment */}
        <aside className="space-y-10">
          <div className="bg-white p-10 rounded-[40px] shadow-xl border border-gray-100">
            <h3 className="text-2xl font-black text-gray-900 border-b border-gray-50 pb-6 mb-8">Payment Method</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button 
                onClick={() => setPaymentMethod('razorpay')}
                className={`p-6 rounded-[30px] border-2 transition-all flex flex-col items-center space-y-3 ${paymentMethod === 'razorpay' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 text-gray-500 hover:bg-gray-50'}`}
              >
                <CreditCard size={30} />
                <span className="font-black text-sm uppercase tracking-widest">Pay Online</span>
              </button>
              <button 
                onClick={() => setPaymentMethod('cod')}
                className={`p-6 rounded-[30px] border-2 transition-all flex flex-col items-center space-y-3 ${paymentMethod === 'cod' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 text-gray-500 hover:bg-gray-50'}`}
              >
                <Truck size={30} />
                <span className="font-black text-sm uppercase tracking-widest">Cash on Delivery</span>
              </button>
            </div>

            <div className="bg-gray-50 p-8 rounded-[30px] border border-gray-100 mb-8">
               <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-500 font-bold uppercase tracking-widest text-xs">Total Amount Payable</span>
                  <span className="text-3xl font-black text-primary">₹ {totalAmount.toFixed(2)}</span>
               </div>
               <p className="text-xs text-gray-400 font-medium leading-relaxed italic text-center">
                 {paymentMethod === 'razorpay' ? 'Secure online payment powered by Razorpay.' : 'Pay in cash upon physical delivery of your products.'}
               </p>
            </div>

            <button 
              onClick={handlePlaceOrder}
              disabled={loading}
              className="w-full btn btn-primary py-6 rounded-[30px] text-xl font-black shadow-2xl flex items-center justify-center space-x-3 hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <CheckCircle size={24} />
                  <span>Confirm Order</span>
                </>
              )}
            </button>
          </div>

          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
             <h4 className="font-bold text-gray-900 mb-6">Order Detail</h4>
             <div className="space-y-4 max-h-[300px] overflow-y-auto scrollbar-hide">
               {items.map(item => (
                 <div key={item.id} className="flex items-center justify-between group">
                    <div className="flex items-center space-x-4">
                       <img src={item.image} className="w-12 h-12 rounded-lg bg-gray-50 p-2 object-contain" />
                       <div>
                          <p className="text-sm font-bold truncate max-w-[150px]">{item.name}</p>
                          <p className="text-[10px] text-gray-400 font-black">QTY: {item.quantity}</p>
                       </div>
                    </div>
                    <span className="font-black text-gray-700">₹ {(item.price * item.quantity).toFixed(2)}</span>
                 </div>
               ))}
             </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Checkout;

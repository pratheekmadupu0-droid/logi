import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, UserPlus, ChevronRight, Heart, Search, CircleCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import toast from 'react-hot-toast';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error('Please fill in all the details');
      return;
    }
    
    // Simulate Registration Success
    toast.success('Account Created Successfully!');
    dispatch(setUser({ email, name }));
    navigate('/');
  };

  return (
    <div className="min-h-screen pt-28 pb-10 bg-[#FCFBFA] flex items-center justify-center p-4">
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-[#EADDCA]/10 rounded-br-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-[#8B5E3C]/5 rounded-tr-full pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-5xl bg-white rounded-[50px] shadow-2xl overflow-hidden border border-gray-100 flex flex-col md:row"
      >
        {/* Banner/Graphic Side */}
        <div className="md:w-[45%] bg-[#8B5E3C] p-12 text-white relative flex flex-col justify-between overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
             <img src="https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" />
          </div>
          <Link to="/" className="text-3xl font-black tracking-tight relative z-10">LOGI</Link>
          <div className="space-y-6 relative z-10 mb-20">
             <h2 className="text-5xl font-black leading-tight italic">Join the <br /> Elite.</h2>
             <p className="text-primary-light text-lg opacity-80 leading-relaxed font-medium">Create your account to unlock personalized nutritional plans, exclusive discounts and fast checkout.</p>
          </div>
          <div className="space-y-4 relative z-10">
             {[
               "Personalized Recommendation Engine",
               "Early Access to Limited Edition Batches",
               "Certified Nutritionist Support"
             ].map((text, i) => (
                <div key={i} className="flex items-center space-x-3 text-xs font-bold uppercase tracking-widest text-[#EADDCA]">
                   <CircleCheck className="text-accent shrink-0" size={16} />
                   <span>{text}</span>
                </div>
             ))}
          </div>
        </div>

        {/* Form Side */}
        <div className="flex-grow p-12 md:p-16 flex flex-col justify-center">
            <h3 className="text-4xl font-black text-gray-900 tracking-tight mb-4">Create Account</h3>
            <p className="text-gray-500 font-medium mb-10">Already a member? <Link to="/login" className="text-primary font-black hover:underline ml-1">Login here</Link></p>
            
            <form onSubmit={handleRegister} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">Full Name</label>
                <div className="relative group">
                   <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-primary transition-colors" size={20} />
                   <input 
                     type="text" 
                     placeholder="John Doe" 
                     className="w-full bg-gray-50 border-none rounded-3xl pl-14 pr-6 py-5 focus:ring-2 focus:ring-primary/20 transition-all font-bold text-gray-900 shadow-inner"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                   />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">Email Address</label>
                <div className="relative group">
                   <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-primary transition-colors" size={20} />
                   <input 
                     type="email" 
                     placeholder="john@example.com" 
                     className="w-full bg-gray-50 border-none rounded-3xl pl-14 pr-6 py-5 focus:ring-2 focus:ring-primary/20 transition-all font-bold text-gray-900 shadow-inner"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                   />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">Password</label>
                <div className="relative group">
                   <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-primary transition-colors" size={20} />
                   <input 
                     type="password" 
                     placeholder="••••••••" 
                     className="w-full bg-gray-50 border-none rounded-3xl pl-14 pr-6 py-5 focus:ring-2 focus:ring-primary/20 transition-all font-bold text-gray-900 shadow-inner"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                   />
                </div>
              </div>

              <div className="pt-6">
                <button className="w-full btn btn-primary py-5 rounded-3xl text-xl font-black shadow-2xl flex items-center justify-center space-x-3 transition-transform hover:translate-y-[-2px]">
                   <span>Create Account</span>
                   <ChevronRight size={22} />
                </button>
              </div>

              <p className="text-center text-xs text-gray-400 font-medium px-4">By creating an account, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.</p>
            </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;

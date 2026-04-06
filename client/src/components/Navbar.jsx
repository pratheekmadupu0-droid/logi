import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, LogOut } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { logout } from '../redux/userSlice';
import { auth } from '../firebase/config';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cartTotal = useSelector(state => state.cart.totalQuantity);
  const user = useSelector(state => state.user.user);
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    auth.signOut();
    dispatch(logout());
    toast.success('Logged out successfully');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/#about' },
    { name: 'Contact', path: '/#contact' },
    ...(user?.email === 'pratheekmadupu2006@gmail.com' ? [{ name: 'Admin', path: '/admin' }] : []),
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Dynamic Offer Banner */}
      <div className="bg-gray-900 overflow-hidden py-1.5 md:py-2 border-b border-white/5">
        <div className="flex whitespace-nowrap animate-marquee">
           <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-white px-8 italic">
              🌿 FREE SHIPPING ON ORDERS ABOVE ₹500 • 🥣 PURE TRADITIONAL SPROUTS • 💎 10% OFF ON YOUR FIRST ORDER • 🌿 FREE SHIPPING ON ORDERS ABOVE ₹500 • 🥣 PURE TRADITIONAL SPROUTS • 💎 10% OFF ON YOUR FIRST ORDER
           </span>
           <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-white px-8 italic">
              🌿 FREE SHIPPING ON ORDERS ABOVE ₹500 • 🥣 PURE TRADITIONAL SPROUTS • 💎 10% OFF ON YOUR FIRST ORDER • 🌿 FREE SHIPPING ON ORDERS ABOVE ₹500 • 🥣 PURE TRADITIONAL SPROUTS • 💎 10% OFF ON YOUR FIRST ORDER
           </span>
        </div>
      </div>

      <nav className={`transition-all duration-300 ${scrolled ? 'bg-white shadow-sm py-3' : 'bg-white/90 backdrop-blur-md py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center group">
            <img 
              src="https://i.ibb.co/Mkhpj225/favicon-largefill-1.png" 
              alt="LOGI NUTRITIONAL PRODUCT" 
              className="h-10 md:h-12 w-auto object-contain group-hover:scale-105 transition-transform" 
            />
            <span className="ml-3 font-black text-xs md:text-lg tracking-tighter text-gray-900 uppercase">LOGI NUTRITIONAL PRODUCT</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.path} 
                className={`text-[10px] font-black uppercase tracking-widest transition-colors hover:text-primary ${location.pathname === link.path ? 'text-primary' : 'text-gray-500'}`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-4">
             <Link to={user ? "/profile" : "/login"} className="text-gray-600 hover:text-primary transition-all">
                {user ? (
                   <div className="flex items-center space-x-2 bg-gray-50 border border-gray-100 p-1 pr-3 rounded-full hover:shadow-md transition-all">
                     {user.photoURL ? (
                        <img src={user.photoURL} className="w-7 h-7 rounded-full border border-white" alt="profile" />
                     ) : (
                        <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-[10px] uppercase font-black">{user.name?.charAt(0) || 'U'}</div>
                     )}
                     <span className="hidden md:block text-[9px] font-black uppercase text-gray-400">{user.name?.split(' ')[0]}</span>
                   </div>
                ) : (
                   <User size={20} />
                )}
             </Link>
             <Link to="/cart" className="relative text-gray-600">
                <ShoppingCart size={20} />
                {cartTotal > 0 && <span className="absolute -top-2 -right-2 bg-primary text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full font-black">{cartTotal}</span>}
             </Link>
             {user && <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors"><LogOut size={18} /></button>}
             <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X size={24} /> : <Menu size={24} />}</button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, x: 200 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 200 }} className="absolute top-0 right-0 w-64 h-screen bg-white shadow-2xl z-[100] md:hidden p-8 flex flex-col space-y-6">
             <button onClick={() => setIsOpen(false)} className="self-end"><X size={24} /></button>
             {navLinks.map((link) => (
               <a key={link.name} href={link.path} onClick={() => setIsOpen(false)} className="text-sm font-black uppercase tracking-widest text-gray-600 hover:text-primary transition-colors">{link.name}</a>
             ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

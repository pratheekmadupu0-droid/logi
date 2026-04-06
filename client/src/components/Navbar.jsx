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
      <div className="bg-gray-900 overflow-hidden py-1.5 md:py-2 shadow-lg border-b border-white/5 relative z-[60]">
        <div className="flex whitespace-nowrap animate-marquee">
           <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-white px-8 italic">
              🌿 FREE SHIPPING ON ORDERS ABOVE ₹500 • 🥣 PURE TRADITIONAL SPROUTS • 💎 10% OFF ON YOUR FIRST ORDER • 🌿 FREE SHIPPING ON ORDERS ABOVE ₹500 • 🥣 PURE TRADITIONAL SPROUTS • 💎 10% OFF ON YOUR FIRST ORDER
           </span>
           <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-white px-8 italic">
              🌿 FREE SHIPPING ON ORDERS ABOVE ₹500 • 🥣 PURE TRADITIONAL SPROUTS • 💎 10% OFF ON YOUR FIRST ORDER • 🌿 FREE SHIPPING ON ORDERS ABOVE ₹500 • 🥣 PURE TRADITIONAL SPROUTS • 💎 10% OFF ON YOUR FIRST ORDER
           </span>
        </div>
      </div>

      <nav className={`transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img 
              src="https://i.ibb.co/Mkhpj225/favicon-largefill-1.png" 
              alt="Logi" 
              className="h-10 md:h-18 w-auto object-contain group-hover:scale-105 transition-transform" 
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === link.path ? 'text-primary border-b-2 border-primary' : 'text-gray-600'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-5">
            <div className="flex items-center space-x-3">
              <Link to={user ? "/profile" : "/login"} className="text-gray-600 hover:text-primary transition-all">
                {user ? (
                   <div className="flex items-center space-x-2 bg-gray-50 p-1 pr-3 rounded-full border border-gray-100 hover:bg-white hover:shadow-md transition-all group">
                     {user.photoURL ? (
                        <img src={user.photoURL} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" alt="profile" />
                     ) : (
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-black uppercase ring-2 ring-white">
                          {user.name?.charAt(0) || 'U'}
                        </div>
                     )}
                     <span className="hidden lg:block text-[10px] font-black uppercase tracking-widest text-gray-500">{user.name?.split(' ')[0]}</span>
                   </div>
                ) : (
                   <div className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                     <User size={22} />
                   </div>
                )}
              </Link>

              {user && (
                 <button 
                   onClick={handleLogout}
                   className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                   title="Logout"
                 >
                   <LogOut size={20} />
                 </button>
              )}
            </div>
            <Link to="/cart" className="relative text-gray-600 hover:text-primary transition-colors">
              <ShoppingCart size={22} />
              {cartTotal > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-primary text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold"
                >
                  {cartTotal}
                </motion.span>
              )}
            </Link>
            <button className="md:hidden text-gray-600" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="flex flex-col p-4 space-y-4">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    to={link.path} 
                    onClick={() => setIsOpen(false)}
                    className="text-gray-600 hover:text-primary font-medium"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;

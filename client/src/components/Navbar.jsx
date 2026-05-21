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
    { name: 'Products', path: '/shop' },
    { name: 'About Us', path: '/about' },
    { name: 'Franchise', path: '/franchise' },
    { name: 'Connect', path: '/contact' },
    ...(user?.email === 'pratheekmadupu2006@gmail.com' ? [{ name: 'Admin', path: '/admin' }] : []),
  ];

  const isHomeTransparent = location.pathname === '/' && !scrolled;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Dynamic Offer Banner */}
      <div className={`overflow-hidden py-1.5 md:py-2 border-b transition-all duration-500 ${isHomeTransparent ? 'bg-transparent border-transparent' : 'bg-primary border-white/5'}`}>
        <div className="flex whitespace-nowrap animate-marquee">
           <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-white px-8 italic">
              🌿 BRIDGING ANCIENT PURITY WITH MODERN LOGISTICS • 🥣 SPROUTED NUTRITION • 💎 10% OFF ON FIRST ORDER • 🌿 BRIDGING ANCIENT PURITY WITH MODERN LOGISTICS • 🥣 SPROUTED NUTRITION • 💎 10% OFF ON FIRST ORDER
           </span>
           <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-white px-8 italic">
              🌿 BRIDGING ANCIENT PURITY WITH MODERN LOGISTICS • 🥣 SPROUTED NUTRITION • 💎 10% OFF ON FIRST ORDER • 🌿 BRIDGING ANCIENT PURITY WITH MODERN LOGISTICS • 🥣 SPROUTED NUTRITION • 💎 10% OFF ON FIRST ORDER
           </span>
        </div>
      </div>

      <nav className={`transition-all duration-500 ${scrolled ? 'bg-white shadow-2xl py-3 border-b border-primary/5' : (isHomeTransparent ? 'bg-transparent py-6' : 'bg-white/80 backdrop-blur-3xl py-6')}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center group">
            <img 
              src="/logo.1.png" 
              alt="LOGI NUTRITIONAL" 
              className="h-16 md:h-20 w-auto object-contain group-hover:scale-105 transition-transform duration-700" 
            />
          </Link>

          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              link.path.startsWith('/#') ? (
                <a 
                  key={link.name} 
                  href={link.path} 
                  className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all relative group ${isHomeTransparent ? 'text-white/80 hover:text-white' : 'text-gray-400 hover:text-primary'}`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 w-0 h-[2px] transition-all duration-500 ${isHomeTransparent ? 'bg-white group-hover:w-full' : 'bg-primary group-hover:w-full'}`} />
                </a>
              ) : (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all relative group ${
                    isHomeTransparent 
                      ? (location.pathname === link.path ? 'text-white' : 'text-white/80 hover:text-white') 
                      : (location.pathname === link.path ? 'text-primary' : 'text-gray-400 hover:text-primary')
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-[2px] transition-all duration-500 ${
                    isHomeTransparent 
                      ? (location.pathname === link.path ? 'w-full bg-white' : 'w-0 group-hover:w-full bg-white') 
                      : (location.pathname === link.path ? 'w-full bg-primary' : 'w-0 group-hover:w-full bg-primary')
                  }`} />
                </Link>
              )
            ))}
          </div>

          <div className="flex items-center space-x-6">
             <Link to={user ? "/profile" : "/login"} className={`transition-all ${isHomeTransparent ? 'text-white/80 hover:text-white' : 'text-gray-400 hover:text-primary'}`}>
                {user ? (
                   <div className={`flex items-center space-x-3 border p-1.5 pr-4 rounded-full hover:shadow-xl transition-all ${isHomeTransparent ? 'bg-white/10 border-white/20 text-white' : 'bg-primary/5 border-primary/10 text-primary'}`}>
                      {user.photoURL ? (
                         <img src={user.photoURL} className="w-8 h-8 rounded-full border border-white shadow-sm" alt="profile" />
                      ) : (
                         <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] uppercase font-black ${isHomeTransparent ? 'bg-white text-primary' : 'bg-primary text-white'}`}>{user.name?.charAt(0) || 'U'}</div>
                      )}
                      <span className="hidden lg:block text-[10px] font-black uppercase tracking-widest">{user.name?.split(' ')[0]}</span>
                   </div>
                ) : (
                   <User size={22} className="hover:scale-110 transition-transform" />
                )}
             </Link>
             <Link to="/cart" className={`relative transition-all ${isHomeTransparent ? 'text-white/80 hover:text-white' : 'text-gray-400 hover:text-primary'}`}>
                <ShoppingCart size={22} className="hover:scale-110 transition-transform" />
                {cartTotal > 0 && <span className={`absolute -top-3 -right-3 text-[9px] w-5 h-5 flex items-center justify-center rounded-full font-black shadow-lg border-2 ${isHomeTransparent ? 'bg-white text-primary border-primary' : 'bg-primary text-white border-white'}`}>{cartTotal}</span>}
             </Link>
             {user && <button onClick={handleLogout} className={`transition-colors ${isHomeTransparent ? 'text-white/60 hover:text-red-400' : 'text-gray-300 hover:text-red-500'}`}><LogOut size={20} /></button>}
             <button className={`md:hidden ${isHomeTransparent ? 'text-white' : 'text-primary'}`} onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X size={28} /> : <Menu size={28} />}</button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, x: 200 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 200 }} className="absolute top-0 right-0 w-80 h-screen bg-white shadow-3xl z-[100] md:hidden p-12 flex flex-col space-y-8">
             <button onClick={() => setIsOpen(false)} className="self-end text-primary mb-12"><X size={32} /></button>
             {navLinks.map((link) => (
                link.path.startsWith('/#') ? (
                  <a key={link.name} href={link.path} onClick={() => setIsOpen(false)} className="text-2xl font-black uppercase tracking-tighter text-gray-400 hover:text-primary transition-colors">{link.name}</a>
                ) : (
                  <Link key={link.name} to={link.path} onClick={() => setIsOpen(false)} className={`text-2xl font-black uppercase tracking-tighter transition-colors ${location.pathname === link.path ? 'text-primary' : 'text-gray-400 hover:text-primary'}`}>{link.name}</Link>
                )
             ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ChevronRight, Globe, CheckCircle } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import toast from 'react-hot-toast';
import { auth, googleProvider, db } from '../firebase/config';
import { signInWithPopup, sendSignInLinkToEmail } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const actionCodeSettings = {
    url: "http://localhost:5173/verify", 
    handleCodeInApp: true
  };

  const handleSendLink = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      // Firebase Email Link Auth
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      localStorage.setItem("emailForSignIn", email);
      setIsSent(true);
      toast.success('Member link dispatched!');
    } catch (error) {
      console.error("Firebase Login Link Error:", error);
      toast.error(error.message || 'Dispatched failed. Check connectivity.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      // Identity Validation: Google Auth Popup
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      const userData = {
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
        loginMethod: 'Google',
        lastLogin: new Date().toISOString()
      };

      // Concurrent Operations: Instant Access + Background Registry Sync
      dispatch(setUser({ 
        email: user.email, 
        name: user.displayName, 
        photoURL: user.photoURL,
        uid: user.uid
      }));

      // Background Cloud Registry Update
      setDoc(doc(db, "users", user.uid), userData, { merge: true }).catch(err => {
         console.warn("Background cloud sync latency:", err);
      });
      
      toast.success('Session Authorized');
      if (user.email === 'pratheekmadupu2006@gmail.com') {
        navigate('/choose-interface', { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error('Identity validation failed.');
      setLoading(false); // Reset loader on error
    }
    // Note: finally removed to prevent premature state flickering on successful navigation
  };

  return (
    <div className="min-h-screen pt-28 pb-10 bg-[#FCFBFA] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#8B5E3C]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#EADDCA]/10 blur-[80px] rounded-full pointer-events-none -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-white rounded-[60px] shadow-2xl border border-gray-50 p-10 md:p-14 relative z-10"
      >
        <div className="text-center space-y-4 mb-10">
          <Link to="/" className="inline-block transform active:scale-95 transition-transform">
             <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center p-2 mx-auto shadow-sm border border-gray-100">
               <img 
                  src="https://i.ibb.co/Mkhpj225/favicon-largefill-1.png" 
                  alt="Logi" 
                  className="w-full h-full object-contain" 
               />
             </div>
          </Link>
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase leading-none">Member <br />Access</h1>
          <p className="text-gray-400 font-black uppercase text-[9px] tracking-[0.4em]">Purity & Nutrition in Every Link.</p>
        </div>

        {isSent ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8 py-4"
          >
            <div className="mx-auto w-24 h-24 bg-green-50 rounded-[40px] flex items-center justify-center text-green-500 shadow-inner">
              <CheckCircle size={48} />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter">Check Your Inbox</h3>
              <p className="text-gray-500 font-medium text-sm leading-relaxed px-4">
                Nutritional access link sent to <span className="text-primary font-black italic">{email}</span>. Click the verification link to authorize your session.
              </p>
            </div>
            <button 
              onClick={() => setIsSent(false)}
              className="px-8 py-3 bg-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-400 rounded-full hover:bg-gray-200 transition-all active:scale-95"
            >
              Update Email Address
            </button>
          </motion.div>
        ) : (
          <div className="space-y-10">
            <form onSubmit={handleSendLink} className="space-y-6">
              <div className="space-y-2 px-4">
                <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest px-2">Identifier Registry</label>
                <div className="relative group">
                   <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-all duration-500" size={18} />
                  <input 
                    type="email" 
                    placeholder="Enter identity email..." 
                    className="w-full bg-gray-50 border border-transparent focus:border-primary/20 rounded-[35px] pl-16 pr-8 py-5 focus:outline-none transition-all font-black text-gray-900 shadow-inner text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    required
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-5 rounded-[35px] text-xs font-black uppercase tracking-[0.3em] shadow-xl shadow-primary/20 flex items-center justify-center space-x-3 group active:scale-95 transition-all"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Dispatched Access Link</span>
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-50"></div></div>
              <div className="relative flex justify-center text-[8px] uppercase font-black tracking-[0.5em] bg-white px-6 text-gray-300 italic">Universal Gateway</div>
            </div>

            <button 
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full p-5 bg-white border border-gray-100 rounded-[35px] flex items-center justify-center hover:bg-gray-50 transition-all hover:border-primary/20 active:scale-[0.98] shadow-sm"
            >
              <img src="https://lh3.googleusercontent.com/COxitUu9qwDXp4wYxxBjWicjIEOHQK6In8yErl-VRZ7AsGcNXJKS9I6oD96e9RcyK9pU" className="w-5 h-5 mr-4" alt="G" />
              <span className="font-black text-gray-700 text-xs uppercase tracking-widest">Authorize with Google</span>
            </button>
          </div>
        )}

        <div className="pt-12 flex items-center justify-center space-x-2 text-gray-300">
          <Globe size={12} />
          <p className="text-[9px] font-black uppercase tracking-[0.3em] italic">Secure Nutrition Network</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

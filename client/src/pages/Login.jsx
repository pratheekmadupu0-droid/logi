import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ChevronRight, Globe, CheckCircle } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import toast from 'react-hot-toast';
import { auth, googleProvider } from '../firebase/config';
import { signInWithPopup, sendSignInLinkToEmail } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

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
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      localStorage.setItem("emailForSignIn", email);
      setIsSent(true);
      toast.success('Sign-in link sent to your email!');
    } catch (error) {
      console.error("Firebase Login Link Error:", error);
      toast.error(error.message || 'Failed to send link. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      dispatch(setUser({ 
        email: user.email, 
        name: user.displayName, 
        photoURL: user.photoURL,
        uid: user.uid
      }));
      toast.success('Successfully Authenticated!');
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Google login error:", error);
      toast.error('Google Sign-In failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-10 bg-[#FCFBFA] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#8B5E3C]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#EADDCA]/10 blur-[80px] rounded-full pointer-events-none -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-white rounded-[60px] shadow-2xl border border-gray-50 p-10 md:p-14 relative z-10"
      >
        <div className="text-center space-y-4 mb-10">
          <Link to="/" className="inline-block">
            <img 
               src="https://i.ibb.co/Mkhpj225/favicon-largefill-1.png" 
               alt="Logi" 
               className="h-16 w-auto mx-auto object-contain" 
            />
          </Link>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Member Access</h1>
          <p className="text-gray-500 font-medium text-sm">Purity & Nutrition in Every Link.</p>
        </div>

        {isSent ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 py-4"
          >
            <div className="mx-auto w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500">
              <CheckCircle size={40} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900 tracking-tight">Check Your Inbox</h3>
              <p className="text-gray-400 font-medium text-sm leading-relaxed">
                We've sent a unique sign-in link to <span className="text-primary font-bold">{email}</span>. Click the link in your email to authenticate.
              </p>
            </div>
            <button 
              onClick={() => setIsSent(false)}
              className="text-primary text-xs font-black uppercase tracking-widest hover:underline"
            >
              Use a different email
            </button>
          </motion.div>
        ) : (
          <div className="space-y-8">
            <form onSubmit={handleSendLink} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-4">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-all duration-300" size={20} />
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 rounded-[35px] pl-16 pr-8 py-5 focus:outline-none transition-all font-bold text-gray-900 shadow-inner"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    required
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full btn btn-primary py-5 rounded-[35px] text-lg font-black shadow-xl shadow-primary/20 flex items-center justify-center space-x-3 group"
              >
                {loading ? (
                  <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Send Login Link</span>
                    <ChevronRight size={22} className="group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-50"></div></div>
              <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest bg-white px-4 text-gray-300">Or continue with</div>
            </div>

            <button 
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full p-4 bg-white border border-gray-100 rounded-[35px] flex items-center justify-center hover:bg-gray-50 transition-all hover:border-primary/20 active:scale-[0.98]"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/action/google.svg" className="w-6 h-6 mr-3" alt="Google" />
              <span className="font-black text-gray-700 tracking-tight">Login with Google</span>
            </button>
          </div>
        )}

        <div className="mt-12 flex items-center justify-center space-x-2 opacity-30 grayscale">
          <Globe size={14} />
          <p className="text-[9px] font-black uppercase tracking-widest text-gray-900">Secure Nutrition Network</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

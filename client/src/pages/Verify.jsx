import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/config';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { motion } from 'framer-motion';
import { Loader2, ShieldCheck, Mail, ChevronRight } from 'lucide-react';
import { doc, setDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

const Verify = () => {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleVerify = async () => {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let storedEmail = localStorage.getItem('emailForSignIn');
        
        if (!storedEmail) {
          setLoading(false);
          setShowEmailInput(true);
          return;
        }

        try {
          const result = await signInWithEmailLink(auth, storedEmail, window.location.href);
          localStorage.removeItem('emailForSignIn');
          
          const userData = {
            email: result.user.email,
            uid: result.user.uid,
            name: result.user.displayName || result.user.email?.split('@')[0],
            photoURL: result.user.photoURL,
            loginMethod: 'Email Link',
            lastLogin: new Date().toISOString()
          };

          // Firestore Registry Update
          await setDoc(doc(db, "users", result.user.uid), userData, { merge: true });

          dispatch(setUser({
            email: userData.email,
            uid: userData.uid,
            name: userData.name,
            photoURL: userData.photoURL
          }));
          
          toast.success('Successfully Signed In!');
          if (result.user.email === 'pratheekmadupu2006@gmail.com') {
             navigate('/choose-interface', { replace: true });
          } else {
             navigate('/');
          }
        } catch (error) {
          console.error(error);
          toast.error('Authentication link expired or invalid.');
          setLoading(false);
          navigate('/login');
        }
      } else {
        setLoading(false);
        navigate('/login');
      }
    };

    handleVerify();
  }, [navigate, dispatch]);

  const handleManualSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signInWithEmailLink(auth, email, window.location.href);
      localStorage.removeItem('emailForSignIn');

      const userData = {
        email: result.user.email,
        uid: result.user.uid,
        name: result.user.displayName || result.user.email?.split('@')[0],
        photoURL: result.user.photoURL,
        loginMethod: 'Email Link',
        lastLogin: new Date().toISOString()
      };

      // Firestore Registry Update
      await setDoc(doc(db, "users", result.user.uid), userData, { merge: true });

      dispatch(setUser({
        email: userData.email,
        uid: userData.uid,
        name: userData.name,
        photoURL: userData.photoURL
      }));

      toast.success('Successfully Signed In!');
      if (result.user.email === 'pratheekmadupu2006@gmail.com') {
          navigate('/choose-interface', { replace: true });
      } else {
          navigate('/');
      }
    } catch (error) {
      console.error(error);
      toast.error('Invalid link or email address.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFBFA] flex flex-col items-center justify-center p-4">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#8B5E3C]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-white rounded-[60px] shadow-2xl border border-gray-50 p-10 md:p-14 text-center space-y-8"
      >
        <div className="space-y-4">
          <div className="mx-auto flex justify-center">
             <img 
               src="https://i.ibb.co/Mkhpj225/favicon-largefill-1.png" 
               alt="Logi" 
               className="h-16 w-auto object-contain" 
             />
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            {loading ? 'Verifying Identity' : 'Secure Authorization'}
          </h1>
          <p className="text-gray-400 font-medium text-sm">Purity & Nutrition in Every Link.</p>
        </div>

        {loading ? (
          <div className="py-12 flex flex-col items-center space-y-6">
            <div className="bg-primary/5 p-8 rounded-full border border-primary/10">
              <Loader2 className="animate-spin text-primary" size={40} />
            </div>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Processing Authorization Request</p>
          </div>
        ) : showEmailInput ? (
          <form onSubmit={handleManualSignIn} className="space-y-6 text-left">
            <p className="text-gray-500 font-medium text-sm leading-relaxed text-center px-4">
              For your security, please confirm the email address you used to request the sign-in link.
            </p>
            <div className="space-y-2 px-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-4">Confirm Email</label>
              <div className="relative group">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-all duration-300" size={20} />
                <input 
                  type="email" 
                  placeholder="hello@example.com" 
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 rounded-[35px] pl-16 pr-8 py-5 focus:outline-none transition-all font-bold text-gray-900 shadow-inner"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <button 
              type="submit" 
              className="w-full btn btn-primary py-5 rounded-[35px] text-lg font-black shadow-xl shadow-primary/20 flex items-center justify-center space-x-3 group"
            >
              <span>Complete Authorization</span>
              <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        ) : (
          <div className="py-12 flex flex-col items-center space-y-6">
             <div className="bg-green-50 p-8 rounded-full border border-green-100">
               <ShieldCheck className="text-green-500" size={40} />
             </div>
             <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Securing Your Connection</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Verify;

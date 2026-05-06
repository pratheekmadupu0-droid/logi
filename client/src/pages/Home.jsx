import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ShieldCheck, CircleCheck, TrendingUp, Star, 
  Leaf, Heart, Coffee, Phone, Mail, MapPin, Send
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addItem } from '../redux/cartSlice';
import toast from 'react-hot-toast';
import { PRODUCTS } from '../utils/mockData';

const Home = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = React.useState(PRODUCTS);
  const [loading, setLoading] = React.useState(true);
  const [isChatOpen, setIsChatOpen] = React.useState(false);
  const [chatMessages, setChatMessages] = React.useState([{ sender: 'bot', text: 'Hello! How can I help you today?' }]);
  const [chatInput, setChatInput] = React.useState('');

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const prodRes = await axios.get(`${API_URL}/api/products`);
        if (prodRes.data && prodRes.data.length > 0) setProducts(prodRes.data);
      } catch (err) {
        console.error("Home data fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
    toast.success(`${product.name} added to cart!`);
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');

    // Add a temporary typing indicator
    setChatMessages(prev => [...prev, { sender: 'bot', text: 'Typing...' }]);

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash',
          messages: [
            { role: 'system', content: 'You are a helpful customer support chatbot for Logi Nutritional Company. Our products include Malt Powders, Natural Flours, Diabetic Rice, and Health Teas. Our office is located at Gurramguda, BN Reddy, RR Dist Hyderabad, Telangana, 501510. Keep answers short, helpful, and polite.' },
            ...chatMessages.filter(m => m.sender === 'user').map(m => ({
              role: 'user',
              content: m.text
            })),
            { role: 'user', content: userMsg }
          ]
        })
      });
      
      const data = await response.json();
      const botReply = data.choices?.[0]?.message?.content || "Sorry, I am having trouble connecting right now.";
      
      setChatMessages(prev => prev.filter(m => m.text !== 'Typing...').concat({ sender: 'bot', text: botReply }));
    } catch (err) {
      setChatMessages(prev => prev.filter(m => m.text !== 'Typing...').concat({ sender: 'bot', text: "Network error. Please try again." }));
    }
  };

  return (
    <div className="overflow-hidden bg-[#FDFBF7]">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-32">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-[#EADDCA]/10 rounded-bl-[300px] -z-10" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-10">
            <div className="space-y-4">
              <p className="text-primary font-black uppercase tracking-[0.5em] text-[10px]">Strategic Nutrition</p>
              <h1 className="text-6xl md:text-9xl font-black text-gray-900 leading-[0.8] tracking-tighter uppercase">
                Pure <br /><span className="text-secondary italic">Nutritional</span> <br /> Node.
              </h1>
            </div>
            <p className="text-gray-500 text-lg max-w-sm font-medium leading-relaxed">Systematically engineered sprouted grains and millets for peak human vitality. Bridging ancient purity with modern logistics.</p>
            <div className="flex items-center space-x-8">
              <Link to="/shop" className="bg-primary text-white px-12 py-6 rounded-[40px] font-black uppercase text-xs tracking-widest hover:bg-accent transition-all shadow-3xl hover:translate-y-[-5px]">Initialize Shop</Link>
              <a href="#about" className="text-primary font-black uppercase text-xs tracking-widest border-b-2 border-primary/20 pb-1 hover:border-primary transition-all">Protocol Origins</a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative group">
             <img src="/milletea.png" className="w-full max-w-xl mx-auto drop-shadow-[0_35px_35px_rgba(82,54,33,0.2)] group-hover:scale-105 transition-transform duration-[2s]" alt="Logi Essence" />
             <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[40px] shadow-2xl border border-gray-50 hidden md:block animate-bounce">
                <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Purity Level</p>
                <p className="text-3xl font-black text-gray-900 italic">100%</p>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-32 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {['Malt Powder', 'Flour', 'Rice', 'Teas'].map((cat, i) => (
             <Link key={i} to={`/shop?cat=${cat}`} className="group relative overflow-hidden rounded-[60px] aspect-square bg-white p-12 flex flex-col items-center justify-center border border-primary/5 hover:border-primary transition-all duration-700 shadow-sm hover:shadow-2xl">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-4 group-hover:text-primary transition-colors">{cat}</span>
                <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Collection</h3>
                <div className="mt-6 w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-45">
                   <ArrowRight size={20} />
                </div>
                <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-[0.02] transition-opacity" />
             </Link>
          ))}
        </div>
      </section>

      {/* Shop Products Preview */}
      <section className="py-32 bg-white rounded-[100px] shadow-inner">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 space-y-6 md:space-y-0">
             <div>
                <p className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4">Essential Inventory</p>
                <h2 className="text-5xl md:text-7xl font-black text-gray-900 uppercase tracking-tighter leading-none">High-Density <br />Selection.</h2>
             </div>
             <Link to="/shop" className="flex items-center space-x-4 text-xs font-black uppercase tracking-widest text-primary hover:translate-x-4 transition-transform group">
                <span>View Full Warehouse</span>
                <ArrowRight size={18} />
             </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {products.slice(0, 3).map((product, i) => (
               <motion.div key={i} whileHover={{ y: -15 }} className="p-10 bg-[#FDFBF7] border border-primary/5 rounded-[70px] shadow-sm hover:shadow-3xl transition-all duration-700 group relative">
                  <Link to={`/product/${product.id}`} className="block">
                     <div className="bg-white rounded-[50px] p-6 mb-10 overflow-hidden relative border border-gray-50">
                        <img src={product.image} className="h-64 mx-auto object-contain group-hover:scale-110 transition-transform duration-1000" alt={product.name} />
                        <div className="absolute top-4 right-4 bg-primary/10 text-primary text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest">In Stock</div>
                     </div>
                     <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-4 leading-tight group-hover:text-primary transition-colors">{product.name}</h3>
                  </Link>
                  <div className="flex items-center justify-between">
                     <div className="space-y-1">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Protocol Cost</p>
                        <p className="text-4xl font-black text-primary italic">₹ {product.price}</p>
                     </div>
                     <Link to={`/product/${product.id}`} className="bg-gray-900 text-white p-5 rounded-[25px] hover:bg-primary transition-all shadow-xl hover:rotate-12">
                        <ArrowRight size={24} />
                     </Link>
                  </div>
               </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-40 bg-[#523621] text-white rounded-[100px] mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-24 items-center">
           <div className="space-y-12">
              <div className="space-y-6">
                <p className="text-secondary font-black uppercase tracking-[0.5em] text-[10px]">Node Origins</p>
                <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">Pure <br /><span className="text-secondary italic">Logistics</span> <br /> Of Logi.</h2>
              </div>
              <p className="text-white/60 text-xl leading-relaxed max-w-lg font-medium">To restore ancient grain purity to the modern dinner table. Through traditional sprouting techniques and solar-assisted low-temperature grounding, we preserve the vital life force.</p>
              <div className="grid grid-cols-2 gap-12 pt-8">
                 <div className="bg-white/5 border border-white/10 p-8 rounded-[40px]">
                    <p className="text-4xl font-black text-white italic mb-2">100%</p>
                    <p className="text-[10px] uppercase font-black tracking-widest text-secondary">Traditional Protocol</p>
                 </div>
                 <div className="bg-white/5 border border-white/10 p-8 rounded-[40px]">
                    <p className="text-4xl font-black text-secondary italic mb-2">Low-GI</p>
                    <p className="text-[10px] uppercase font-black tracking-widest text-white/40">Lab Certified Node</p>
                 </div>
              </div>
           </div>
           <div className="relative group">
              <div className="absolute inset-0 bg-secondary rounded-[80px] rotate-6 group-hover:rotate-2 transition-transform duration-700 -z-10" />
              <img src="https://i.ibb.co/kV0BPpv6/Gemini-Generated-Image-er69hzer69hzer69.png" className="w-full rounded-[80px] shadow-3xl grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Natural Grains" />
           </div>
        </div>
      </section>

      {/* Testimonials & Connect Section */}
      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
           <div className="grid lg:grid-cols-[1fr_400px] gap-24 items-center">
              <div className="space-y-16">
                 <div>
                    <p className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4">Member Feedback</p>
                    <h2 className="text-5xl md:text-8xl font-black text-gray-900 uppercase tracking-tighter leading-none">Voices Of <br />The Node.</h2>
                 </div>
                 
                 <div className="grid md:grid-cols-2 gap-8">
                    <div className="p-10 bg-[#FDFBF7] rounded-[50px] border border-primary/5 space-y-6 hover:shadow-2xl transition-all duration-700">
                       <div className="flex text-amber-500 space-x-1"><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/></div>
                       <p className="text-gray-500 font-medium italic italic">"Authentic sprouted ragi like my grandmother used to make. The purity is evident in every bite."</p>
                       <p className="text-[10px] font-black uppercase tracking-widest text-primary">— ARJUN V.</p>
                    </div>
                    <div className="p-10 bg-gray-900 text-white rounded-[50px] space-y-6 hover:shadow-2xl transition-all duration-700 md:translate-y-12">
                       <div className="flex text-amber-500 space-x-1"><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/></div>
                       <p className="text-white/60 font-medium italic">"Logi gave me the energy I needed for my long shifts. Pure nutrition with zero fillers."</p>
                       <p className="text-[10px] font-black uppercase tracking-widest text-secondary">— PRIYA R.</p>
                    </div>
                 </div>
              </div>

              <div className="bg-[#EADDCA]/20 p-12 rounded-[70px] space-y-10 border border-[#EADDCA]/30">
                 <h3 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">Ready For Connection?</h3>
                 <p className="text-gray-500 font-medium leading-relaxed">Reach out to our logistics intelligence center for custom orders and inquiries.</p>
                 <Link to="/contact" className="w-full bg-primary text-white py-6 rounded-full font-black uppercase tracking-widest text-xs shadow-2xl flex items-center justify-center space-x-4 hover:bg-accent transition-all group">
                    <span>Connect Now</span>
                    <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                 </Link>
                 <div className="flex items-center space-x-4 pt-4 opacity-30">
                    <ShieldCheck size={20} />
                    <span className="text-[8px] font-black uppercase tracking-[0.2em]">End-to-End Purity Protocol</span>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Chat Bot Widget */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
        {isChatOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white w-80 h-96 rounded-2xl shadow-2xl mb-4 flex flex-col overflow-hidden border border-gray-100">
            <div className="bg-primary text-white p-4 font-black uppercase tracking-widest text-xs flex justify-between items-center">
              <span>Logi Support Node</span>
              <button onClick={() => setIsChatOpen(false)} className="text-white hover:text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-white border border-gray-100 text-gray-700 rounded-tl-none'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleChatSubmit} className="p-3 border-t border-gray-100 bg-white flex">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type your message..." 
                className="flex-1 outline-none text-sm px-2"
              />
              <button type="submit" className="text-primary p-2 hover:bg-gray-50 rounded-full transition-colors">
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-16 h-16 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300"
        >
          {isChatOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default Home;

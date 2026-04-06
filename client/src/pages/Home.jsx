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

const Home = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = React.useState([
    {
      id: 1,
      name: 'Nutritious Ragi Malt Powder-500g',
      image: 'https://i.ibb.co/Cs61R3Fd/Gemini-Generated-Image-dwv1v9dwv1v9dwv1.png',
      category: 'Malt Powder',
      price: 250
    },
    {
      id: 2,
      name: 'Nutritional Multimillet Flour-500g',
      image: 'https://i.ibb.co/kV0BPpv6/Gemini-Generated-Image-er69hzer69hzer69.png',
      category: 'Flour',
      price: 250
    },
    {
      id: 3,
      name: 'LOGI Low GI Rice',
      image: 'https://i.ibb.co/5xtSdfNL/Gemini-Generated-Image-uedgjwuedgjwuedg.png',
      category: 'Rice',
      price: 200
    }
  ]);
  const [ads, setAds] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, adsRes] = await Promise.all([
          axios.get(`${API_URL}/api/products`),
          axios.get(`${API_URL}/api/ads`)
        ]);
        if (prodRes.data && prodRes.data.length > 0) setProducts(prodRes.data);
        setAds(adsRes.data);
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

  return (
    <div className="overflow-hidden bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center pt-32 bg-[#FDFCF6]">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-[#EADDCA]/10 rounded-bl-[300px] -z-10" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <h1 className="text-5xl md:text-8xl font-black text-gray-900 leading-[0.9] tracking-tighter uppercase">
              Pure <br /><span className="text-primary italic">Nutritional</span> <br /> Essentials.
            </h1>
            <p className="text-gray-500 text-lg max-w-sm font-medium leading-relaxed">Expertly crafted sprouted grains and millets for peak human performance and vitality.</p>
            <div className="flex items-center space-x-6">
              <Link to="/shop" className="bg-gray-900 text-white px-10 py-5 rounded-[40px] font-black uppercase text-xs tracking-widest hover:bg-primary transition-all shadow-2xl">Enter Shop</Link>
              <a href="#about" className="text-gray-900 font-black uppercase text-xs border-b-2 border-gray-900 pb-1 hover:text-primary hover:border-primary transition-all">Our Origins</a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="relative">
             <img src="https://i.ibb.co/Cs61R3Fd/Gemini-Generated-Image-dwv1v9dwv1v9dwv1.png" className="w-full max-w-lg mx-auto drop-shadow-3xl" alt="Logi Essence" />
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {['Malt Powder', 'Flour', 'Rice', 'Teas'].map((cat, i) => (
             <Link key={i} to={`/shop?cat=${cat}`} className="group relative overflow-hidden rounded-[50px] aspect-square bg-gray-50 p-10 flex flex-col items-center justify-center border border-gray-50 hover:border-primary transition-all shadow-sm">
                <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-2">{cat}</span>
                <h3 className="text-2xl font-black text-gray-900 uppercase">Gallery</h3>
                <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity" />
             </Link>
          ))}
        </div>
      </section>

      {/* Shop Products Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-3 gap-10">
          {products.slice(0, 3).map((product, i) => (
             <motion.div key={i} whileHover={{ y: -10 }} className="p-8 bg-white border border-gray-50 rounded-[60px] shadow-sm hover:shadow-2xl transition-all group">
                <Link to={`/product/${product.id}`} className="block">
                   <img src={product.image} className="h-64 mx-auto object-contain mb-8 p-4 bg-gray-50 rounded-[40px] group-hover:scale-105 transition-transform" alt={product.name} />
                   <h3 className="text-xl font-black text-gray-900 uppercase mb-2">{product.name}</h3>
                </Link>
                <div className="flex items-center justify-between">
                   <p className="text-3xl font-black text-primary italic">₹ {product.price}</p>
                   <Link to={`/product/${product.id}`} className="bg-primary text-white p-4 rounded-3xl"><ArrowRight /></Link>
                </div>
             </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-gray-900 text-white rounded-t-[100px]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-20 items-center">
           <div className="space-y-8">
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none"><span className="text-primary italic">Origins</span> <br /> Of Logi.</h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-md">Our journey began with a single mission: to restore ancient grain purity to the modern dinner table. Through traditional sprouting techniques and solar-assisted low-temperature grounding, we preserve 100% of the vital living nutrients.</p>
              <div className="grid grid-cols-2 gap-6">
                 <div>
                    <p className="text-3xl font-black text-white italic">100%</p>
                    <p className="text-xs uppercase font-black tracking-widest text-gray-500">Traditional</p>
                 </div>
                 <div>
                    <p className="text-3xl font-black text-primary italic">Low-GI</p>
                    <p className="text-xs uppercase font-black tracking-widest text-gray-500">Certified</p>
                 </div>
              </div>
           </div>
           <div className="rounded-[60px] overflow-hidden rotate-2 hover:rotate-0 transition-transform duration-700 shadow-3xl">
              <img src="https://i.ibb.co/kV0BPpv6/Gemini-Generated-Image-er69hzer69hzer69.png" className="w-full" alt="Natural Grains" />
           </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-12">
           <div className="space-y-4">
              <p className="text-primary font-black uppercase tracking-widest text-xs">Direct Connectivity</p>
              <h2 className="text-5xl font-black text-gray-900 uppercase tracking-tighter">Logi Logistics</h2>
              <p className="text-gray-500 font-medium">BENGALURU, INDIA • CUSTOMER SUPPORT: +91 98765 43210 • OFFICE@LOGI.COMPANY</p>
           </div>
           
           <div className="grid md:grid-cols-3 gap-6">
              <div className="p-8 bg-gray-50 rounded-[40px] border border-gray-100 italic font-medium">"Health is the true wealth. Logi gave me the energy I needed."</div>
              <div className="p-8 bg-gray-900 text-white rounded-[40px] italic font-medium">"Authentic sprouted ragi like my grandmother used to make."</div>
              <div className="p-8 bg-gray-50 rounded-[40px] border border-gray-100 italic font-medium">"Pure nutrition with zero fillers. My first choice for family."</div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

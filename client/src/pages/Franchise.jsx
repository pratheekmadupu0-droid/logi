import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, Coffee, Utensils, Store, ShoppingCart, 
  ArrowLeft, Send, CheckCircle2 
} from 'lucide-react';

const categoryData = {
  'tea-stall': {
    title: 'Tea Stall Owner',
    subtitle: 'Start Your LOGI Nutrition Journey',
    description: 'Perfect for small setups at high-traffic locations',
    investment: '₹3-5 Lakh',
    earning: '₹40K-60K/Month',
    icon: Coffee
  },
  'hotel-owner': {
    title: 'Hotel Owner',
    subtitle: 'Diversify Your Menu with Premium Nutrition',
    description: 'Add LOGI products to your hotel menu',
    investment: '₹8-12 Lakh',
    earning: '₹1-2 Lakh/Month',
    icon: Utensils
  },
  'retail-shop': {
    title: 'Retail Shop Owner',
    subtitle: 'Full-Fledged LOGI Nutrition Retail Store',
    description: 'Complete nutrition retail solution',
    investment: '₹10-15 Lakh',
    earning: '₹1.5-2.5 Lakh/Month',
    icon: Store
  },
  'supermarket': {
    title: 'Supermarket Owner',
    subtitle: 'Exclusive LOGI Wellness Section',
    description: 'Premium nutrition section in your supermarket',
    investment: '₹15-18 Lakh',
    earning: '₹2-3.5 Lakh/Month',
    icon: ShoppingCart
  }
};

const Franchise = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', city: '', businessName: '', experience: '', location: '', message: ''
  });

  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    setTimeout(() => {
      document.getElementById('franchise-form').scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleBack = () => {
    setSelectedCategory(null);
    setFormData({ name: '', phone: '', email: '', city: '', businessName: '', experience: '', location: '', message: '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const category = categoryData[selectedCategory].title;
    const whatsappMessage = `
*LOGI Franchise Application*

*Category:* ${category}
*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Email:* ${formData.email}
*City:* ${formData.city}
*Business Name:* ${formData.businessName}
*Experience:* ${formData.experience}
*Location Type:* ${formData.location}
*Message:* ${formData.message || 'Not provided'}
    `.trim();

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/919985309102?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
    handleBack();
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen pt-32 pb-20 overflow-hidden relative">
      {/* Decorative Assets */}
      <div className="absolute top-0 left-0 w-1/3 h-[800px] bg-[#EADDCA]/20 rounded-br-[400px] -z-10 blur-3xl animate-pulse" />
      
      {!selectedCategory ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <section className="max-w-7xl mx-auto px-4 md:px-8 mb-24 text-center">
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
              <p className="text-primary font-black uppercase tracking-[0.5em] text-[10px] mb-4">Growth Intelligence</p>
              <h1 className="text-5xl md:text-8xl font-black text-gray-900 leading-[0.9] tracking-tighter uppercase mb-6">
                Join the <br /><span className="text-secondary italic">Logi</span> Family.
              </h1>
              <p className="text-gray-500 text-lg font-medium max-w-2xl mx-auto leading-relaxed mb-8">
                Grow Through LOGI Nutritional Company. Low Investment, High Returns. With minimal investment, you can earn substantial profits.
              </p>
              
              <div className="inline-flex items-center space-x-4 bg-primary/5 border border-primary/20 px-8 py-4 rounded-full text-primary">
                <Rocket size={20} />
                <span className="font-black uppercase tracking-widest text-xs">Start Your Success Story</span>
              </div>
            </motion.div>
          </section>

          <section className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter mb-4">Choose Your Model</h2>
              <p className="text-gray-500 font-medium tracking-widest uppercase text-xs">Select the option that fits your business</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Object.entries(categoryData).map(([id, data], idx) => {
                const Icon = data.icon;
                return (
                  <motion.div 
                    key={id} 
                    initial={{ y: 50, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }} 
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => handleSelectCategory(id)}
                    className="bg-white p-10 rounded-[50px] border border-gray-100 shadow-xl hover:shadow-3xl hover:-translate-y-4 transition-all duration-500 cursor-pointer group text-center flex flex-col items-center"
                  >
                    <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors mb-6">
                      <Icon size={32} />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter mb-2">{data.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed font-medium mb-6 flex-grow">{data.description}</p>
                    <div className="w-full space-y-3">
                      <div className="bg-gray-50 p-3 rounded-2xl">
                        <p className="text-[9px] uppercase tracking-widest text-gray-400 font-black mb-1">Investment</p>
                        <p className="text-gray-900 font-black">{data.investment}</p>
                      </div>
                      <div className="bg-[#25D366]/10 p-3 rounded-2xl">
                        <p className="text-[9px] uppercase tracking-widest text-[#25D366] font-black mb-1">Potential Earnings</p>
                        <p className="text-[#25D366] font-black">{data.earning}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>
        </motion.div>
      ) : (
        <motion.section id="franchise-form" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto px-4 md:px-8 py-10">
          <button onClick={handleBack} className="flex items-center space-x-3 text-gray-400 hover:text-primary transition-colors font-black uppercase tracking-widest text-xs mb-10 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
            <span>Back to Models</span>
          </button>
          
          <div className="bg-white/40 backdrop-blur-3xl border border-white/20 p-10 md:p-16 rounded-[80px] shadow-3xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-6">
                {React.createElement(categoryData[selectedCategory].icon, { size: 32 })}
              </div>
              <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-2">{categoryData[selectedCategory].title}</h2>
              <p className="text-gray-500 font-medium tracking-widest uppercase text-xs">Complete your application</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-6">Full Name</label>
                  <input type="text" required name="name" value={formData.name} onChange={handleChange} className="w-full bg-white border border-gray-100 rounded-full px-8 py-5 focus:ring-2 ring-primary/20 outline-none font-bold text-gray-900 transition-all focus:border-primary" placeholder="Enter name" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-6">Phone Number</label>
                  <input type="tel" required name="phone" pattern="[0-9]{10}" value={formData.phone} onChange={handleChange} className="w-full bg-white border border-gray-100 rounded-full px-8 py-5 focus:ring-2 ring-primary/20 outline-none font-bold text-gray-900 transition-all focus:border-primary" placeholder="10-digit mobile" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-6">Email Address</label>
                  <input type="email" required name="email" value={formData.email} onChange={handleChange} className="w-full bg-white border border-gray-100 rounded-full px-8 py-5 focus:ring-2 ring-primary/20 outline-none font-bold text-gray-900 transition-all focus:border-primary" placeholder="email@example.com" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-6">City</label>
                  <input type="text" required name="city" value={formData.city} onChange={handleChange} className="w-full bg-white border border-gray-100 rounded-full px-8 py-5 focus:ring-2 ring-primary/20 outline-none font-bold text-gray-900 transition-all focus:border-primary" placeholder="Your city" />
                </div>
                <div className="space-y-3 md:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-6">Business Name</label>
                  <input type="text" required name="businessName" value={formData.businessName} onChange={handleChange} className="w-full bg-white border border-gray-100 rounded-full px-8 py-5 focus:ring-2 ring-primary/20 outline-none font-bold text-gray-900 transition-all focus:border-primary" placeholder="Store or Company Name" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-6">Experience</label>
                  <select required name="experience" value={formData.experience} onChange={handleChange} className="w-full bg-white border border-gray-100 rounded-full px-8 py-5 focus:ring-2 ring-primary/20 outline-none font-bold text-gray-900 transition-all focus:border-primary appearance-none cursor-pointer">
                    <option value="">Select Experience</option>
                    <option value="0-1 Year">0-1 Year</option>
                    <option value="1-3 Years">1-3 Years</option>
                    <option value="3-5 Years">3-5 Years</option>
                    <option value="5+ Years">5+ Years</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-6">Location Type</label>
                  <select required name="location" value={formData.location} onChange={handleChange} className="w-full bg-white border border-gray-100 rounded-full px-8 py-5 focus:ring-2 ring-primary/20 outline-none font-bold text-gray-900 transition-all focus:border-primary appearance-none cursor-pointer">
                    <option value="">Select Location</option>
                    <option value="Shopping Mall">Shopping Mall</option>
                    <option value="Market Area">Market Area</option>
                    <option value="Residential Area">Residential Area</option>
                    <option value="Office Complex">Office Complex</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-6">Message</label>
                <textarea rows="4" name="message" value={formData.message} onChange={handleChange} className="w-full bg-white border border-gray-100 rounded-[30px] px-8 py-6 focus:ring-2 ring-primary/20 outline-none font-bold text-gray-900 transition-all focus:border-primary resize-none" placeholder="Tell us about your current business & why you want to partner with LOGI"></textarea>
              </div>

              <button type="submit" className="w-full bg-primary text-white py-6 rounded-full font-black uppercase tracking-[0.3em] text-xs shadow-2xl hover:bg-accent transition-all duration-700 flex items-center justify-center space-x-4 hover:-translate-y-1">
                <span>Submit Application to WhatsApp</span>
                <Send size={18} />
              </button>
            </form>
          </div>
        </motion.section>
      )}
    </div>
  );
};

export default Franchise;

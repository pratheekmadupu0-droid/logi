import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, Phone, MapPin, Send, MessageSquare, 
  Clock, ArrowRight, Instagram, Facebook, Twitter, ShieldCheck
} from 'lucide-react';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `*New Contact Request*\nName: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\nMessage: ${formData.message}`;
    const whatsappURL = `https://wa.me/919985309102?text=${encodeURIComponent(text)}`;
    window.open(whatsappURL, '_blank');
    toast.success("Logistics message dispatched via WhatsApp!");
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen pt-40 pb-20 overflow-hidden relative">
      {/* Decorative Assets */}
      <div className="absolute top-0 right-0 w-1/3 h-[1000px] bg-[#EADDCA]/20 rounded-bl-[400px] -z-10 blur-3xl animate-pulse" />
      <div className="absolute top-[800px] -left-20 w-[400px] h-[400px] bg-[#523621]/5 rounded-full -z-10 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Contact Header */}
        <div className="grid lg:grid-cols-2 gap-20 items-end mb-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-primary font-black uppercase tracking-[0.5em] text-[10px] mb-8">Integrated Connectivity</p>
            <h1 className="text-6xl md:text-9xl font-black text-gray-900 leading-[0.8] tracking-tighter uppercase mb-8">
              Logi <br /><span className="text-secondary italic">Logistics</span> <br /> Node.
            </h1>
            <p className="text-gray-500 text-lg font-medium max-w-lg leading-relaxed">Connect directly with our nutritional intelligence center. Expert support for logistics, product inquiries, and bulk procurement.</p>
          </motion.div>

          <div className="flex flex-col space-y-12">
             <a href="https://wa.me/919985309102" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-6 group">
               <div className="w-20 h-20 bg-white border border-gray-100 rounded-[30px] flex items-center justify-center shadow-xl group-hover:bg-[#25D366] group-hover:text-white transition-all duration-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
               </div>
               <div>
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">WhatsApp Direct</p>
                  <p className="text-2xl font-black text-gray-900">+91 99853 09102</p>
               </div>
             </a>
            <div className="flex items-center space-x-6 group">
               <div className="w-20 h-20 bg-white border border-gray-100 rounded-[30px] flex items-center justify-center shadow-xl group-hover:bg-primary group-hover:text-white transition-all duration-700">
                  <Mail size={28} />
               </div>
               <div>
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Electronic Mail</p>
                  <p className="text-2xl font-black text-gray-900">office@logi.company</p>
               </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_500px] gap-16">
          {/* Stunning Form Section */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="bg-white/40 backdrop-blur-3xl border border-white/20 p-12 md:p-20 rounded-[80px] shadow-3xl">
             <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid md:grid-cols-2 gap-10">
                   <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-6">Your Name</label>
                      <input 
                        type="text" required name="name" value={formData.name} onChange={handleChange}
                        className="w-full bg-white/60 border border-gray-100 rounded-full px-10 py-6 focus:ring-2 ring-primary/20 outline-none font-bold text-gray-900 transition-all focus:border-primary placeholder:text-gray-300"
                        placeholder="IDENTIFICATION"
                      />
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-6">Email Address</label>
                      <input 
                        type="email" required name="email" value={formData.email} onChange={handleChange}
                        className="w-full bg-white/60 border border-gray-100 rounded-full px-10 py-6 focus:ring-2 ring-primary/20 outline-none font-bold text-gray-900 transition-all focus:border-primary placeholder:text-gray-300"
                        placeholder="COMMUNICATION@NODE"
                      />
                   </div>
                </div>

                <div className="space-y-3">
                   <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-6">Subject</label>
                   <input 
                    type="text" required name="subject" value={formData.subject} onChange={handleChange}
                    className="w-full bg-white/60 border border-gray-100 rounded-full px-10 py-6 focus:ring-2 ring-primary/20 outline-none font-bold text-gray-900 transition-all focus:border-primary placeholder:text-gray-300"
                    placeholder="REASON FOR CONNECTION"
                   />
                </div>

                <div className="space-y-3">
                   <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-6">Message Command</label>
                   <textarea 
                    rows="6" required name="message" value={formData.message} onChange={handleChange}
                    className="w-full bg-white/60 border border-white rounded-[50px] px-10 py-8 focus:ring-2 ring-primary/20 outline-none font-bold text-gray-900 transition-all focus:border-primary placeholder:text-gray-300 resize-none"
                    placeholder="TRANSMIT YOUR MESSAGE..."
                   />
                </div>

                <button type="submit" className="w-full bg-primary text-white py-8 rounded-full font-black uppercase tracking-[0.3em] text-xs shadow-2xl hover:bg-accent transition-all duration-700 flex items-center justify-center space-x-6 hover:translate-y-[-5px]">
                   <span>Dispatched Message</span>
                   <Send size={18} />
                </button>
             </form>
          </motion.div>

          {/* Social and Info Node */}
          <div className="flex flex-col justify-between py-10">
             <div className="space-y-12">
                <div className="p-10 bg-gray-900 text-white rounded-[60px] space-y-4 shadow-3xl hover:translate-x-4 transition-transform duration-700">
                   <Clock className="text-secondary" size={32} />
                   <h3 className="text-2xl font-black uppercase">Active Hours</h3>
                   <p className="text-gray-400 font-medium leading-relaxed uppercase text-xs tracking-widest">Mon - Sat: 08:00 - 20:00 IST<br />Response in &lt; 24h</p>
                </div>

                <div className="p-10 bg-white border border-gray-100 rounded-[60px] space-y-4 shadow-sm hover:translate-x-4 transition-transform duration-700">
                   <MapPin className="text-primary" size={32} />
                   <h3 className="text-2xl font-black uppercase text-gray-900">Headquarters</h3>
                   <p className="text-gray-500 font-medium leading-relaxed uppercase text-xs tracking-widest">Gurramguda, BN Reddy<br />RR Dist Hyderabad<br />Telangana, 501510</p>
                </div>
             </div>

             <div className="flex items-center space-x-6 px-10">
                <Instagram className="hover:text-primary transition-all cursor-pointer" size={28} />
                <Facebook className="hover:text-primary transition-all cursor-pointer" size={28} />
                <Twitter className="hover:text-primary transition-all cursor-pointer" size={28} />
                <div className="h-[2px] flex-grow bg-gray-100 max-w-[100px]" />
                <span className="text-[10px] font-black uppercase text-gray-400 tracking-[0.3em]">Follow The Science</span>
             </div>
          </div>
        </div>

        {/* Perfect Map Section */}
        <div className="mt-24 w-full h-[450px] rounded-[60px] overflow-hidden shadow-3xl border border-gray-100">
          <iframe 
            src="https://maps.google.com/maps?q=Gurramguda,%20BN%20Reddy,%20RR%20Dist%20Hyderabad,%20Telangana,%20501510&t=&z=14&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      
      {/* Visual Identity Section */}
      <section className="mt-40 bg-gray-900 py-32 rounded-t-[100px] overflow-hidden">
         <div className="flex space-x-20 animate-marquee whitespace-nowrap">
            {[1,2,3,4,5,6].map(i => (
               <div key={i} className="flex items-center space-x-12 opacity-30 text-white">
                  <ShieldCheck size={32} />
                  <span className="text-6xl font-black uppercase tracking-tighter italic">Logistics Purity Protocol</span>
                  <ArrowRight size={32} />
                  <span className="text-6xl font-black uppercase tracking-tighter">Connecting Global Health</span>
               </div>
            ))}
         </div>
      </section>

      {/* Floating WhatsApp Icon */}
      <a href="https://wa.me/919985309102" target="_blank" rel="noopener noreferrer" className="fixed bottom-8 right-8 bg-[#25D366] text-white p-4 rounded-full shadow-3xl hover:scale-110 transition-transform duration-300 z-50">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
      </a>
    </div>
  );
};

export default Contact;

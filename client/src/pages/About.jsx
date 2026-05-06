import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="bg-[#FDFBF7] min-h-screen pt-40 pb-20 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-[1000px] bg-[#EADDCA]/20 rounded-bl-[400px] -z-10 blur-3xl animate-pulse" />
      
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-24">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-16">
          <p className="text-primary font-black uppercase tracking-[0.5em] text-[10px] mb-8">Node Origins</p>
          <h1 className="text-6xl md:text-9xl font-black text-gray-900 leading-[0.8] tracking-tighter uppercase">
            Pure <br /><span className="text-secondary italic">Logistics</span> <br /> Of Logi.
          </h1>
        </motion.div>

        <div className="bg-[#523621] text-white rounded-[80px] p-10 md:p-20 shadow-3xl">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
             <div className="space-y-12">
                <p className="text-white/80 text-xl leading-relaxed max-w-lg font-medium">To restore ancient grain purity to the modern dinner table. Through traditional sprouting techniques and solar-assisted low-temperature grounding, we preserve the vital life force of every seed.</p>
                <div className="grid grid-cols-2 gap-12 pt-8">
                   <div className="bg-white/5 border border-white/10 p-8 rounded-[40px] hover:bg-white/10 transition-colors">
                      <p className="text-4xl font-black text-white italic mb-2">100%</p>
                      <p className="text-[10px] uppercase font-black tracking-widest text-secondary">Traditional Protocol</p>
                   </div>
                   <div className="bg-white/5 border border-white/10 p-8 rounded-[40px] hover:bg-white/10 transition-colors">
                      <p className="text-4xl font-black text-secondary italic mb-2">Low-GI</p>
                      <p className="text-[10px] uppercase font-black tracking-widest text-white/40">Lab Certified Node</p>
                   </div>
                </div>
             </div>
             <div className="relative group">
                <div className="absolute inset-0 bg-secondary rounded-[60px] rotate-6 group-hover:rotate-2 transition-transform duration-700 -z-10" />
                <img src="https://i.ibb.co/kV0BPpv6/Gemini-Generated-Image-er69hzer69hzer69.png" className="w-full rounded-[60px] shadow-3xl grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Natural Grains" />
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

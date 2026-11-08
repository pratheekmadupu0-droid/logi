import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Zap, Dumbbell, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

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

        {/* Mascot & Brand Spirit Section */}
        <div className="mt-20 relative overflow-hidden rounded-[80px] bg-gradient-to-br from-[#0c0805] via-[#1c120a] to-[#080503] text-white p-10 md:p-20 shadow-3xl border border-amber-900/30">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            {/* Mascot Visual Card */}
            <div className="flex justify-center">
              <div className="relative p-6 md:p-10 rounded-[50px] bg-black/60 backdrop-blur-2xl border border-white/10 shadow-3xl flex flex-col items-center max-w-sm w-full">
                <div className="relative w-full aspect-[444/394] rounded-[36px] bg-black overflow-hidden flex items-center justify-center border border-amber-500/20 shadow-inner">
                  <video 
                    src="/logi_mascot.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-full object-contain" 
                  />
                  <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md border border-white/20 text-secondary text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center space-x-1">
                    <Flame size={10} className="text-secondary" />
                    <span>Active Mascot</span>
                  </div>
                </div>
                <div className="mt-5 text-center">
                  <h4 className="text-xl font-black uppercase tracking-tight text-white">Logi The Rhino</h4>
                  <p className="text-secondary text-xs font-bold mt-0.5 tracking-wide">Symbol of Herbivore Strength</p>
                </div>
              </div>
            </div>

            {/* Story */}
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-secondary/15 border border-secondary/30 px-4 py-1.5 rounded-full text-secondary text-[10px] font-black uppercase tracking-[0.3em]">
                <Flame size={14} className="text-secondary" />
                <span>The Mascot Philosophy</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none text-white">
                Strength Built On <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-amber-400 to-orange-400">
                  Ancient Grains.
                </span>
              </h2>
              <p className="text-white/70 text-base md:text-lg leading-relaxed font-medium">
                Why a Rhino? Rhinos are among nature’s most formidable creatures — towering, enduring, and immensely strong — built entirely on a diet of pure plants, grasses, and seeds.
              </p>
              <p className="text-white/70 text-base md:text-lg leading-relaxed font-medium">
                Logi is our embodiment of that natural vitality. He reminds us that daily fitness and peak energy do not require synthetic shortcuts. With systematically sprouted millets and low-GI nutrition, your body unlocks its cleanest, most resilient form of power.
              </p>
              <div className="pt-4 flex items-center space-x-6">
                <Link to="/shop" className="bg-secondary text-gray-950 font-black uppercase text-xs tracking-widest px-8 py-4 rounded-full hover:bg-white transition-all shadow-xl hover:scale-105">
                  Explore Products
                </Link>
                <Link to="/franchise" className="text-white/80 hover:text-white font-black uppercase text-xs tracking-widest border-b border-white/30 pb-1">
                  Partner With Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

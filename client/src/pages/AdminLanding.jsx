import React from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AdminLanding = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#FCFBFA] pt-32 pb-20 flex items-center justify-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none -z-10" />
            
             <div className="max-w-4xl w-full px-6 space-y-16 text-center">
                 <header className="space-y-4">
                     <div className="mx-auto w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center text-primary border border-primary/10 mb-6">
                        <ShieldCheck size={36} />
                     </div>
                     <h1 className="text-5xl font-black text-gray-900 tracking-tighter">Welcome back, Pratheek.</h1>
                     <p className="text-gray-500 font-medium">Select your preferred interface for this session.</p>
                 </header>

                 <div className="grid md:grid-cols-2 gap-10">
                     {/* Choice 1: Admin Panel */}
                     <motion.div 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate('/admin')}
                        className="bg-white rounded-[50px] shadow-2xl p-10 border border-gray-50 cursor-pointer group hover:bg-primary transition-all duration-500"
                     >
                        <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mb-8 group-hover:bg-white/20 group-hover:text-white transition-all">
                            <LayoutGrid size={40} />
                        </div>
                        <div className="text-left space-y-4">
                            <h3 className="text-2xl font-black text-gray-900 group-hover:text-white">Admin Console</h3>
                            <p className="text-gray-400 group-hover:text-white/80 font-medium text-sm leading-relaxed">
                                Manage logistics, track orders, update products, and control site banners.
                            </p>
                        </div>
                        <div className="mt-10 flex items-center text-primary group-hover:text-white font-black uppercase tracking-widest text-[10px]">
                            Launch Systems <ArrowRight size={14} className="ml-2 group-hover:translate-x-2 transition-transform" />
                        </div>
                     </motion.div>

                     {/* Choice 2: Main Page */}
                     <motion.div 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate('/')}
                        className="bg-white rounded-[50px] shadow-2xl p-10 border border-gray-50 cursor-pointer group hover:bg-gray-900 transition-all duration-500"
                     >
                        <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center text-gray-900 mb-8 group-hover:bg-white/20 group-hover:text-white transition-all">
                            <ShoppingBag size={40} />
                        </div>
                        <div className="text-left space-y-4">
                            <h3 className="text-2xl font-black text-gray-900 group-hover:text-white">Customer Page</h3>
                            <p className="text-gray-400 group-hover:text-white/80 font-medium text-sm leading-relaxed">
                                View the website as a customer, browse the shop, and test the checkout flow.
                            </p>
                        </div>
                        <div className="mt-10 flex items-center text-gray-400 group-hover:text-white font-black uppercase tracking-widest text-[10px]">
                            Visit Shopfront <ArrowRight size={14} className="ml-2 group-hover:translate-x-2 transition-transform" />
                        </div>
                     </motion.div>
                 </div>
             </div>
        </div>
    );
};

export default AdminLanding;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Users, ShoppingBag, PieChart, Edit3, Trash2, 
  Plus, CheckCircle, Truck, CreditCard, Clock, MapPin, 
  Phone, User as UserIcon, Image as ImageIcon, Save, X, Globe, Mail, Fingerprint, Activity, TrendingUp, DollarSign, AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../firebase/config';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('hub');
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [ads, setAds] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [syncError, setSyncError] = useState(null);
    
    // UI Local State
    const [editingProduct, setEditingProduct] = useState(null);
    const [newAd, setNewAd] = useState({ url: '', title: '' });

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    const fetchData = async () => {
        setLoading(true);
        setSyncError(null);
        
        try {
            // SEQUENTIAL & INDEPENDENT FETCHING for better fault tolerance
            // 1. Fetch Orders
            try {
                const res = await axios.get(`${API_URL}/api/orders`, { timeout: 8000 });
                setOrders(res.data);
            } catch (e) { console.error("Orders sync failed", e); }

            // 2. Fetch Products
            try {
                const res = await axios.get(`${API_URL}/api/products`, { timeout: 8000 });
                setProducts(res.data);
            } catch (e) { console.error("Products sync failed", e); }

            // 3. Fetch Ads
            try {
                const res = await axios.get(`${API_URL}/api/ads`, { timeout: 8000 });
                setAds(res.data);
            } catch (e) { console.error("Ads sync failed", e); }

            // 4. Fetch Users (From Cloud)
            try {
                const usersRef = collection(db, "users");
                const q = query(usersRef, orderBy("lastLogin", "desc"), limit(100));
                const usersSnapshot = await getDocs(q);
                const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setUsers(usersList);
            } catch (e) { 
                console.error("Cloud User sync failed", e);
                toast.error("Cloud member registry (Firestore) is currently unreachable.");
            }

        } catch (globalErr) {
            console.error("Critical System Protocol Failure:", globalErr);
            setSyncError("Logistics Hub Protocol (API) is non-responsive.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const totalRevenue = orders.reduce((acc, curr) => acc + curr.amount, 0);

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${API_URL}/api/products/${editingProduct.id}`, editingProduct);
            toast.success("Logistics Registry Updated");
            setEditingProduct(null);
            fetchData();
        } catch (err) {
            toast.error("Operation failed");
        }
    };

    const handleAddAd = async () => {
        if (!newAd.url) return;
        try {
            await axios.post(`${API_URL}/api/ads`, newAd);
            toast.success("Marketing Asset Deployed");
            setNewAd({ url: '', title: '' });
            fetchData();
        } catch (err) {
            toast.error("Deployment failed");
        }
    };

    const handleDeleteAd = async (id) => {
        try {
            await axios.delete(`${API_URL}/api/ads/${id}`);
            toast.success("Asset Purged");
            fetchData();
        } catch (err) {
            toast.error("Decommission failed");
        }
    };

    if (loading) return (
        <div className="min-h-screen pt-32 flex flex-col items-center justify-center space-y-4 bg-gray-50">
             <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
             <p className="text-gray-400 font-black uppercase tracking-widest text-[10px] animate-pulse">Synchronizing Executive Hub...</p>
        </div>
    );

    if (syncError && products.length === 0) return (
       <div className="min-h-screen bg-gray-50 pt-40 flex flex-col items-center p-8 text-center space-y-6">
           <div className="w-20 h-20 bg-red-100 rounded-[35px] flex items-center justify-center text-red-500 shadow-inner">
               <AlertCircle size={40} />
           </div>
           <div className="space-y-2">
              <h2 className="text-2xl font-black text-gray-900 tracking-tighter uppercase">Linkage Severed</h2>
              <p className="text-gray-400 font-medium max-w-sm">The background logistics service (Port 5000) is currently offline. Administrator intervention required.</p>
           </div>
           <button onClick={fetchData} className="btn bg-primary text-white py-4 px-10 rounded-[30px] font-black uppercase tracking-widest shadow-2xl">Retry Handshake</button>
       </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-20">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Executive Control Header */}
                <header className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between space-y-6 md:space-y-0">
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-primary">
                            <Activity size={18} />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em]">System Active</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase leading-none">Console <br /><span className="text-gray-300">Executive</span></h1>
                    </div>
                    
                    <div className="flex bg-white p-1 rounded-3xl shadow-2xl border border-gray-100 overflow-x-auto scrollbar-hide shrink-0">
                        {['hub', 'orders', 'products', 'users', 'ads'].map(tab => (
                            <button 
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${activeTab === tab ? 'bg-primary text-white shadow-xl translate-y-[-2px]' : 'text-gray-400 hover:text-gray-900'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </header>

                <div className="space-y-12">
                    {/* DASHBOARD HUB */}
                    {activeTab === 'hub' && (
                        <div className="space-y-12">
                           <div className="grid md:grid-cols-4 gap-8">
                              {[
                                { label: 'Logistics Revenue', value: `₹${totalRevenue.toLocaleString()}`, icon: <DollarSign />, color: 'primary' },
                                { label: 'Active Members', value: users.length, icon: <Users />, color: 'gray-900' },
                                { label: 'Deployed Ads', value: ads.length, icon: <TrendingUp />, color: 'gray-900' },
                                { label: 'Total Shipments', value: orders.length, icon: <Truck />, color: 'gray-900' },
                              ].map((stat, i) => (
                                 <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white p-10 rounded-[50px] shadow-sm border border-gray-100 flex flex-col items-center space-y-4 hover:shadow-2xl transition-all">
                                    <div className={`w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-primary shadow-inner`}>{stat.icon}</div>
                                    <div className="text-center">
                                       <p className="text-3xl font-black text-gray-900 tracking-tighter leading-none">{stat.value}</p>
                                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">{stat.label}</p>
                                    </div>
                                 </motion.div>
                              ))}
                           </div>

                           <div className="grid lg:grid-cols-2 gap-8">
                               <div className="bg-white rounded-[60px] p-10 shadow-xl border border-gray-100 space-y-10">
                                  <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Recent Logistics</h3>
                                  <div className="space-y-4">
                                     {orders.length > 0 ? orders.slice(0, 4).map(order => (
                                        <div key={order.id} className="flex justify-between items-center p-6 bg-gray-50 rounded-3xl border border-transparent hover:border-primary/20 transition-all">
                                           <div>
                                              <p className="font-black text-gray-900 text-sm">{order.userInfo.name}</p>
                                              <p className="text-[10px] font-bold text-gray-400 uppercase">#ORD_{order.id.toString().slice(-4)}</p>
                                           </div>
                                           <p className="text-lg font-black text-primary italic">₹{order.amount}</p>
                                        </div>
                                     )) : (
                                        <p className="text-center py-10 text-gray-300 font-bold uppercase text-[10px] tracking-widest">No Recent Shipments</p>
                                     )}
                                  </div>
                                  <button onClick={() => setActiveTab('orders')} className="w-full py-4 text-[10px] font-black uppercase text-primary border-t border-gray-50 tracking-widest hover:bg-gray-50 transition-all rounded-b-3xl">View Detail Registry</button>
                               </div>

                               <div className="bg-white rounded-[60px] p-10 shadow-xl border border-gray-100 space-y-10">
                                  <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Site Engagement</h3>
                                  <div className="space-y-4">
                                     {users.length > 0 ? users.slice(0, 4).map(user => (
                                        <div key={user.uid} className="flex justify-between items-center p-6 bg-gray-50 rounded-3xl">
                                           <div className="flex items-center space-x-4">
                                              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center font-black text-primary text-xs uppercase tracking-tighter">{user.name?.charAt(0)}</div>
                                              <div>
                                                 <p className="font-black text-gray-900 text-sm leading-none">{user.name}</p>
                                                 <p className="text-[10px] font-bold text-gray-400">{user.email}</p>
                                              </div>
                                           </div>
                                           <span className="text-[9px] font-black uppercase tracking-widest text-primary bg-primary/5 px-3 py-1 rounded-full">{user.loginMethod}</span>
                                        </div>
                                     )) : (
                                        <p className="text-center py-10 text-gray-300 font-bold uppercase text-[10px] tracking-widest">No Authenticated Profiles</p>
                                     )}
                                  </div>
                                  <button onClick={() => setActiveTab('users')} className="w-full py-4 text-[10px] font-black uppercase text-primary border-t border-gray-50 tracking-widest hover:bg-gray-50 transition-all rounded-b-3xl">Audits Directory</button>
                               </div>
                           </div>
                        </div>
                    )}

                    {/* ORDERS TAB */}
                    {activeTab === 'orders' && (
                        <div className="bg-white rounded-[60px] border border-gray-100 shadow-2xl overflow-hidden">
                            <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-white sticky top-0 z-10">
                                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Shipment Logistics</h3>
                                <div className="bg-primary px-6 py-2 rounded-full text-white text-[10px] font-black tracking-widest uppercase italic">Node Archives</div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Node Identity</th>
                                            <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Member Logistics</th>
                                            <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Inventory Sync</th>
                                            <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Amount & Protocol</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {orders.map(order => (
                                            <tr key={order.id} className="hover:bg-gray-50/50 transition-all group">
                                                <td className="p-8">
                                                    <p className="text-sm font-black text-gray-900">#ORD_{order.id.toString().slice(-4)}</p>
                                                    <div className="flex items-center mt-2 group-hover:translate-x-2 transition-transform">
                                                       <div className={`w-2 h-2 rounded-full ${order.status === 'Paid' ? 'bg-green-500 shadow-[0_0_10px_green]' : 'bg-orange-500 shadow-[0_0_10px_orange]'} mr-2`} />
                                                       <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{order.status}</span>
                                                    </div>
                                                </td>
                                                <td className="p-8">
                                                    <p className="text-sm font-black text-gray-800 leading-tight">{order.userInfo.name}</p>
                                                    <p className="text-[10px] font-bold text-gray-400 mt-1">{order.userInfo.city}, IN</p>
                                                </td>
                                                <td className="p-8">
                                                    <div className="flex flex-wrap gap-2">
                                                       {order.items.map((it, idx) => (
                                                          <span key={idx} className="bg-white border border-gray-100 text-[9px] font-black uppercase tracking-tighter px-3 py-1 rounded-xl text-gray-500 group-hover:border-primary/20 transition-all">{it.quantity}x {it.name.slice(0, 10)}</span>
                                                       ))}
                                                    </div>
                                                </td>
                                                <td className="p-8">
                                                    <p className="text-2xl font-black text-primary italic leading-none">₹{order.amount}</p>
                                                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-300 mt-2">{order.paymentMethod}</p>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* USERS TAB */}
                    {activeTab === 'users' && (
                        <div className="bg-white rounded-[60px] border border-gray-100 shadow-2xl overflow-hidden p-10 space-y-12">
                            <header className="flex justify-between items-center mb-10">
                                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Member Directory</h3>
                                <div className="text-[10px] font-black text-primary uppercase tracking-[0.4em] bg-primary/5 px-6 py-2 rounded-full border border-primary/10">{users.length} SECURE AUTH_NODES</div>
                            </header>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                               {users.map(user => (
                                  <div key={user.uid} className="p-10 bg-gray-50 rounded-[50px] border border-transparent hover:border-primary hover:bg-white transition-all shadow-sm hover:shadow-2xl group relative overflow-hidden">
                                     <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[80px] -z-0" />
                                     <div className="relative z-10 space-y-8">
                                        <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-primary font-black text-xl shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
                                           {user.photoURL ? <img src={user.photoURL} className="w-full rounded-3xl" /> : user.name?.charAt(0)}
                                        </div>
                                        <div className="space-y-1">
                                           <h4 className="text-xl font-black text-gray-900 tracking-tight uppercase leading-none">{user.name}</h4>
                                           <p className="text-xs font-bold text-gray-400">{user.email}</p>
                                        </div>
                                        <div className="pt-6 border-t border-gray-100 flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                                           <span className="text-gray-400">{user.loginMethod} Gateway</span>
                                           <Activity size={14} className="text-green-500 animate-pulse" />
                                        </div>
                                     </div>
                                  </div>
                               ))}
                            </div>
                        </div>
                    )}

                    {/* PRODUCTS TAB */}
                    {activeTab === 'products' && (
                        <div className="grid lg:grid-cols-2 gap-10">
                            <div className="bg-white rounded-[60px] p-10 shadow-2xl border border-gray-100">
                                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-10">Catalog Inventory</h3>
                                <div className="space-y-4 max-h-[700px] overflow-y-auto pr-4 scrollbar-hide">
                                    {products.map(p => (
                                       <div key={p.id} className="flex items-center justify-between p-6 bg-gray-50 rounded-[35px] group hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-100">
                                          <div className="flex items-center space-x-6">
                                             <img src={p.image} className="w-16 h-16 object-contain p-2 bg-white rounded-2xl" />
                                             <div>
                                                <p className="text-sm font-black text-gray-900 uppercase tracking-tight leading-tight">{p.name}</p>
                                                <p className="text-primary font-black text-lg italic">₹{p.price}</p>
                                             </div>
                                          </div>
                                          <div className="flex space-x-2">
                                             <button onClick={() => setEditingProduct(p)} className="p-3 text-gray-300 hover:text-primary transition-colors"><Edit3 size={20} /></button>
                                             <button className="p-3 text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={20} /></button>
                                          </div>
                                       </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Modification Port */}
                            <div className="bg-white rounded-[60px] p-10 shadow-2xl border border-gray-100 sticky top-32 h-fit overflow-hidden">
                               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none" />
                               <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-10">{editingProduct ? 'Interface Update' : 'Asset Modification'}</h3>
                               {editingProduct ? (
                                  <form onSubmit={handleUpdateProduct} className="space-y-8">
                                     <div className="space-y-6">
                                        <div className="space-y-2 px-4">
                                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Brand Identifier</label>
                                           <input className="w-full bg-gray-50 border-none rounded-3xl px-8 py-5 font-black text-gray-900 outline-none focus:ring-2 focus:ring-primary/20 shadow-inner" value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} />
                                        </div>
                                        <div className="space-y-2 px-4">
                                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Valuation (INR)</label>
                                           <input className="w-full bg-gray-50 border-none rounded-3xl px-8 py-5 font-black text-gray-900 outline-none focus:ring-2 focus:ring-primary/20 shadow-inner" type="number" value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: parseInt(e.target.value)})} />
                                        </div>
                                        <div className="space-y-2 px-4">
                                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Inventory Category</label>
                                           <select className="w-full bg-gray-50 border-none rounded-3xl px-8 py-5 font-black text-gray-900 outline-none focus:ring-2 focus:ring-primary/20 shadow-inner" value={editingProduct.category} onChange={e => setEditingProduct({...editingProduct, category: e.target.value})}>
                                              {['Malt', 'Flour', 'Child Nutrition', 'Rice', 'Premium'].map(c => <option key={c}>{c}</option>)}
                                           </select>
                                        </div>
                                     </div>
                                     <div className="flex px-4 gap-4 pt-10">
                                        <button type="submit" className="flex-grow bg-gray-900 text-white rounded-[30px] py-5 font-black uppercase text-[10px] tracking-widest shadow-2xl hover:bg-primary transition-all flex items-center justify-center space-x-3">
                                           <Save size={18} /> <span>Synchronize Data</span>
                                        </button>
                                        <button onClick={() => setEditingProduct(null)} className="p-4 bg-gray-100 text-gray-400 rounded-[30px] hover:text-red-500"><X size={24} /></button>
                                     </div>
                                  </form>
                               ) : (
                                  <div className="py-20 text-center space-y-4 opacity-10">
                                     <Edit3 size={100} className="mx-auto" />
                                     <p className="font-black uppercase tracking-[0.5em] text-xs">Port Idle</p>
                                  </div>
                               )}
                            </div>
                        </div>
                    )}

                    {/* ADS TAB */}
                    {activeTab === 'ads' && (
                        <div className="space-y-12">
                            <div className="bg-white rounded-[60px] shadow-2xl border border-gray-100 p-12">
                                <header className="mb-12 border-b border-gray-50 pb-10 flex items-center justify-between">
                                   <div className="space-y-1">
                                     <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Marketing Deployment</h3>
                                     <p className="text-gray-400 font-medium text-sm">Site-wide brand alerts and cinematic advertisements.</p>
                                   </div>
                                   <Activity className="text-primary opacity-20" size={50} />
                                </header>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                    <div className="bg-gray-50 border-2 border-dashed border-gray-100 rounded-[50px] p-12 flex flex-col items-center justify-center space-y-6 hover:border-primary/50 transition-all group cursor-pointer" onClick={() => document.getElementById('ad-url').focus()}>
                                        <div className="w-16 h-16 bg-white rounded-[25px] flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-sm">
                                            <Plus size={30} />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xs font-black text-gray-800 uppercase tracking-[0.3em]">New Deployment</p>
                                            <p className="text-[9px] font-bold text-gray-400 mt-1 italic">Nodal Asset Acquisition</p>
                                        </div>
                                    </div>
                                    
                                    {ads.map(ad => (
                                        <div key={ad.id} className="relative bg-white rounded-[50px] border border-gray-50 shadow-md group overflow-hidden">
                                            <img src={ad.url} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                                            <div className="p-8 bg-white flex justify-between items-center relative z-10">
                                                <div>
                                                    <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest">{ad.title || "Brand Campaign"}</p>
                                                    <span className="text-[9px] font-black text-green-500 tracking-tight uppercase italic mt-1 inline-block">Asset Live</span>
                                                </div>
                                                <button 
                                                    onClick={() => handleDeleteAd(ad.id)}
                                                    className="p-3 text-gray-200 hover:text-red-500 transition-colors"
                                                >
                                                   <Trash2 size={24} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-[60px] shadow-2xl border border-gray-100 p-12 max-w-2xl mx-auto relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none" />
                                <h4 className="text-xl font-black text-gray-900 mb-10 uppercase tracking-tighter">Deploy New Protocol</h4>
                                <div className="space-y-8">
                                    <div className="space-y-2 px-4">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Asset URL Source</label>
                                        <input 
                                            id="ad-url"
                                            className="w-full bg-gray-50 border-none rounded-3xl px-8 py-5 font-black text-gray-900 outline-none focus:ring-2 focus:ring-primary/20 shadow-inner"
                                            placeholder="https://cloud.logi.company/banner.png"
                                            value={newAd.url}
                                            onChange={(e) => setNewAd({...newAd, url: e.target.value})}
                                        />
                                    </div>
                                    <div className="space-y-2 px-4">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Protocol Identifier (Title)</label>
                                        <input 
                                            className="w-full bg-gray-50 border-none rounded-3xl px-8 py-5 font-black text-gray-900 outline-none focus:ring-2 focus:ring-primary/20 shadow-inner"
                                            placeholder="Summer Nutrition 2024"
                                            value={newAd.title}
                                            onChange={(e) => setNewAd({...newAd, title: e.target.value})}
                                        />
                                    </div>
                                    <div className="px-4">
                                       <button 
                                           onClick={handleAddAd}
                                           className="w-full bg-gray-900 text-white py-6 rounded-[35px] font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center space-x-3 active:scale-95 transition-all shadow-2xl hover:bg-primary"
                                       >
                                           <Plus size={20} /> <span>Initialize Deployment</span>
                                       </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Admin;

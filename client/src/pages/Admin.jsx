import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Users, ShoppingBag, PieChart, Edit3, Trash2, 
  Plus, CheckCircle, Truck, CreditCard, Clock, MapPin, 
  Phone, User as UserIcon, Image as ImageIcon, Save, X, Globe, Mail, Fingerprint
} from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../firebase/config';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('orders');
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [ads, setAds] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Edit Product State
    const [editingProduct, setEditingProduct] = useState(null);
    const [newAd, setNewAd] = useState({ url: '', title: '' });

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    const fetchData = async () => {
        try {
            // Fetch basic data from API
            const [ordersRes, productsRes, adsRes] = await Promise.all([
                axios.get(`${API_URL}/api/orders`),
                axios.get(`${API_URL}/api/products`),
                axios.get(`${API_URL}/api/ads`)
            ]);
            
            // Fetch users from Firebase Firestore
            const usersRef = collection(db, "users");
            const q = query(usersRef, orderBy("lastLogin", "desc"));
            const usersSnapshot = await getDocs(q);
            const usersList = usersSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setOrders(ordersRes.data);
            setProducts(productsRes.data);
            setAds(adsRes.data);
            setUsers(usersList);
        } catch (err) {
            console.error(err);
            toast.error("Error fetching data from server or Firebase");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${API_URL}/api/products/${editingProduct.id}`, editingProduct);
            toast.success("Product Updated Successfully");
            setEditingProduct(null);
            fetchData();
        } catch (err) {
            toast.error("Update failed");
        }
    };

    const handleAddAd = async () => {
        if (!newAd.url) return;
        try {
            await axios.post(`${API_URL}/api/ads`, newAd);
            toast.success("Ad Added Successfully");
            setNewAd({ url: '', title: '' });
            fetchData();
        } catch (err) {
            toast.error("Failed to add ad");
        }
    };

    const handleDeleteAd = async (id) => {
        try {
            await axios.delete(`${API_URL}/api/ads/${id}`);
            toast.success("Ad Removed");
            fetchData();
        } catch (err) {
            toast.error("Failed to remove ad");
        }
    };

    if (loading) return (
        <div className="min-h-screen pt-32 flex flex-col items-center justify-center space-y-4">
             <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
             <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Authenticating Hub...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-20">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Admin Header */}
                <header className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between space-y-4 md:space-y-0">
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tighter">Business Console</h1>
                        <p className="text-gray-500 font-medium">Logi Operational Overview & Cloud Member Management.</p>
                    </div>
                    <div className="flex bg-white p-1 rounded-3xl shadow-sm border border-gray-100 overflow-x-auto">
                        {['orders', 'products', 'users', 'ads'].map(tab => (
                            <button 
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </header>

                <div className="space-y-10">
                    {/* ORDERS TAB */}
                    {activeTab === 'orders' && (
                        <div className="bg-white rounded-[40px] border border-gray-100 shadow-xl overflow-hidden">
                            <div className="p-8 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                                <h3 className="text-xl font-black text-gray-900 flex items-center">
                                    <ShoppingBag className="mr-3 text-primary" /> Active Logistics
                                </h3>
                                <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                    {orders.length} TOTAL ORDERS
                                </span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-[#FCFBFA] border-b border-gray-50">
                                        <tr>
                                            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Order ID & Status</th>
                                            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Customer Logistics</th>
                                            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Items Detail</th>
                                            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Amount & Gateway</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {orders.map(order => (
                                            <tr key={order.id} className="hover:bg-gray-50/30 transition-colors">
                                                <td className="p-6">
                                                    <div className="space-y-1">
                                                        <p className="text-xs font-black text-gray-900">#ORD_{order.id.toString().slice(-6)}</p>
                                                        <div className="flex items-center space-x-2">
                                                            <div className={`w-2 h-2 rounded-full ${order.status === 'Paid' ? 'bg-green-500' : 'bg-orange-500'}`} />
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{order.status}</span>
                                                        </div>
                                                        <p className="text-[9px] text-gray-400 font-bold flex items-center">
                                                            <Clock size={10} className="mr-1" /> {new Date(order.createdAt).toLocaleString()}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="p-6">
                                                    <div className="space-y-1">
                                                        <p className="text-sm font-black text-gray-800">{order.userInfo.name}</p>
                                                        <div className="flex items-center text-[10px] font-bold text-gray-500">
                                                            <Phone size={10} className="mr-1" /> {order.userInfo.phone}
                                                        </div>
                                                        <div className="flex items-start text-[10px] font-bold text-gray-400 max-w-[200px]">
                                                            <MapPin size={10} className="mr-1 mt-0.5 flex-shrink-0" /> 
                                                            <span className="truncate">{order.userInfo.address}, {order.userInfo.city}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-6">
                                                    <div className="flex flex-wrap gap-2">
                                                        {order.items.map((item, idx) => (
                                                            <div key={idx} className="bg-gray-100 text-[10px] font-black uppercase tracking-tighter px-2 py-1 rounded-md text-gray-600">
                                                                {item.quantity}x {item.name.slice(0, 10)}...
                                                            </div>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="p-6">
                                                    <div className="space-y-1">
                                                        <p className="text-lg font-black text-primary">₹ {order.amount.toFixed(2)}</p>
                                                        <div className="flex items-center space-x-1.5 opacity-60">
                                                            {order.paymentMethod === 'cod' ? <Truck size={12} /> : <CreditCard size={12} />}
                                                            <span className="text-[9px] font-black uppercase tracking-widest">{order.paymentMethod}</span>
                                                        </div>
                                                    </div>
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
                        <div className="bg-white rounded-[40px] border border-gray-100 shadow-xl overflow-hidden">
                            <div className="p-8 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                                <h3 className="text-xl font-black text-gray-900 flex items-center">
                                    <Users className="mr-3 text-primary" /> Cloud Member Directory
                                </h3>
                                <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-center">
                                    {users.length} FIREBASE AUTHENTICATED
                                </span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-[#FCFBFA] border-b border-gray-50">
                                        <tr>
                                            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Profile Identity</th>
                                            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Authentication Context</th>
                                            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Network ID</th>
                                            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Active Timestamp</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {users.map(user => (
                                            <tr key={user.uid} className="hover:bg-gray-50/30 transition-colors">
                                                <td className="p-6">
                                                    <div className="flex items-center space-x-4">
                                                        {user.photoURL ? (
                                                            <img src={user.photoURL} className="w-10 h-10 rounded-full border border-gray-100 shadow-sm" />
                                                        ) : (
                                                            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black">
                                                                {user.name?.charAt(0) || 'U'}
                                                            </div>
                                                        )}
                                                        <div>
                                                            <p className="text-sm font-black text-gray-900 leading-tight">{user.name}</p>
                                                            <div className="flex items-center text-[10px] font-bold text-gray-400">
                                                                <Mail size={10} className="mr-1" /> {user.email}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-6">
                                                    <div className="inline-flex items-center space-x-2 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                                                        {user.loginMethod === 'Google' ? <Globe size={12} className="text-blue-500" /> : <Mail size={12} className="text-orange-500" />}
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">{user.loginMethod}</span>
                                                    </div>
                                                </td>
                                                <td className="p-6">
                                                    <div className="flex items-center space-x-1.5 opacity-50">
                                                        <Fingerprint size={12} />
                                                        <span className="text-[10px] font-bold text-gray-500 bg-gray-50 px-2 py-0.5 rounded uppercase">{user.uid.slice(0, 8)}...</span>
                                                    </div>
                                                </td>
                                                <td className="p-6">
                                                    <div className="space-y-1">
                                                        <div className="flex items-center text-[10px] font-black text-gray-900 uppercase tracking-tight">
                                                            <Clock size={10} className="mr-1.5 text-primary" /> Cloud Update
                                                        </div>
                                                        <p className="text-[11px] font-bold text-gray-400">{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'N/A'}</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {users.length === 0 && (
                                    <div className="p-20 text-center space-y-4">
                                        <div className="w-16 h-16 bg-gray-50 rounded-full mx-auto flex items-center justify-center text-gray-300">
                                            <Users size={30} />
                                        </div>
                                        <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Cloud Registry is Currently Empty.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* PRODUCTS TAB */}
                    {activeTab === 'products' && (
                        <div className="grid lg:grid-cols-2 gap-10">
                            {/* Product List */}
                            <div className="bg-white rounded-[40px] shadow-xl border border-gray-100 p-8">
                                <header className="flex items-center justify-between mb-8 border-b border-gray-50 pb-6">
                                    <h3 className="text-xl font-black text-gray-900 flex items-center tracking-tight">
                                        <Edit3 className="mr-3 text-primary" /> Product Registry
                                    </h3>
                                    <button className="bg-primary/5 text-primary p-2 rounded-xl hover:bg-primary/10 transition-colors">
                                        <Plus size={20} />
                                    </button>
                                </header>
                                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4 scrollbar-hide">
                                    {products.map(product => (
                                        <div key={product.id} className="group p-4 bg-gray-50 rounded-3xl border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-lg transition-all flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <img src={product.image} className="w-14 h-14 object-contain rounded-xl bg-white border border-gray-100 p-2" />
                                                <div>
                                                    <p className="text-sm font-black text-gray-900 tracking-tight">{product.name}</p>
                                                    <p className="text-primary font-black text-xs">₹ {product.price}</p>
                                                </div>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button 
                                                    onClick={() => setEditingProduct(product)}
                                                    className="p-2 text-gray-400 hover:text-primary transition-colors"
                                                >
                                                    <Edit3 size={18} />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Edit Panel */}
                            <div className="bg-white rounded-[40px] shadow-xl border border-gray-100 p-8 sticky top-32 h-fit">
                                <header className="mb-8 border-b border-gray-50 pb-6">
                                    <h3 className="text-xl font-black text-gray-900 tracking-tight">
                                        {editingProduct ? 'Modify Essential' : 'Select Product to Modify'}
                                    </h3>
                                </header>
                                {editingProduct ? (
                                    <form onSubmit={handleUpdateProduct} className="space-y-6">
                                        <div className="space-y-4">
                                            <div className="space-y-1 px-4">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Display Name</label>
                                                <input 
                                                    className="w-full bg-gray-50 rounded-2xl px-6 py-3 font-bold text-gray-900 outline-none focus:ring-2 focus:ring-primary/20"
                                                    value={editingProduct.name}
                                                    onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                                                />
                                            </div>
                                            <div className="space-y-1 px-4">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Base Price (INR)</label>
                                                <input 
                                                    type="number"
                                                    className="w-full bg-gray-50 rounded-2xl px-6 py-3 font-bold text-gray-900 outline-none focus:ring-2 focus:ring-primary/20"
                                                    value={editingProduct.price}
                                                    onChange={(e) => setEditingProduct({...editingProduct, price: parseInt(e.target.value)})}
                                                />
                                            </div>
                                            <div className="space-y-1 px-4">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Asset URL (Image)</label>
                                                <div className="flex space-x-2">
                                                    <input 
                                                        className="flex-grow bg-gray-50 rounded-2xl px-6 py-3 font-bold text-gray-900 outline-none focus:ring-2 focus:ring-primary/20"
                                                        value={editingProduct.image}
                                                        onChange={(e) => setEditingProduct({...editingProduct, image: e.target.value})}
                                                    />
                                                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0 border border-gray-100 overflow-hidden">
                                                        <img src={editingProduct.image} className="w-full h-full object-contain p-1" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-1 px-4">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Product Description</label>
                                                <textarea 
                                                    className="w-full bg-gray-50 rounded-2xl px-6 py-3 font-bold text-sm text-gray-600 outline-none focus:ring-2 focus:ring-primary/20 h-24 scrollbar-hide"
                                                    value={editingProduct.description}
                                                    onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex space-x-4">
                                            <button 
                                                type="submit"
                                                className="flex-grow bg-primary text-white py-4 rounded-3xl font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20 flex items-center justify-center space-x-2"
                                            >
                                                <Save size={16} /> <span>Publish Updates</span>
                                            </button>
                                            <button 
                                                type="button"
                                                onClick={() => setEditingProduct(null)}
                                                className="bg-gray-100 text-gray-400 px-6 rounded-3xl hover:bg-gray-200 transition-colors"
                                            >
                                                <X size={20} />
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="py-20 text-center opacity-30 select-none">
                                        <Edit3 size={60} className="mx-auto mb-4" />
                                        <p className="font-black uppercase tracking-[0.2em] text-xs">Awaiting Selection</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* ADS TAB */}
                    {activeTab === 'ads' && (
                        <div className="space-y-10">
                            <div className="bg-white rounded-[40px] shadow-xl border border-gray-100 p-10">
                                <header className="mb-8 border-b border-gray-50 pb-6 flex items-center justify-between">
                                   <div>
                                     <h3 className="text-2xl font-black text-gray-900 tracking-tight">Promotional Banners</h3>
                                     <p className="text-gray-400 font-medium text-sm">Site-wide marketing alerts and advertisements.</p>
                                   </div>
                                   <ImageIcon className="text-primary opacity-20" size={40} />
                                </header>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-[35px] p-8 flex flex-col items-center justify-center space-y-4 hover:border-primary/50 transition-colors group cursor-pointer" onClick={() => document.getElementById('ad-url').focus()}>
                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-sm">
                                            <Plus size={24} />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-black text-gray-900 uppercase tracking-widest">New Deployment</p>
                                            <p className="text-[10px] font-bold text-gray-400">Add marketing assets.</p>
                                        </div>
                                    </div>
                                    
                                    {ads.map(ad => (
                                        <div key={ad.id} className="relative bg-white rounded-[35px] border border-gray-100 shadow-md group overflow-hidden">
                                            <img src={ad.url} className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-700" />
                                            <div className="p-6 bg-white flex justify-between items-center">
                                                <div>
                                                    <p className="text-xs font-black text-gray-900 uppercase tracking-widest">{ad.title || "Marketing Campaign"}</p>
                                                    <span className="text-[9px] font-black text-green-500 tracking-tight uppercase">Live Active</span>
                                                </div>
                                                <button 
                                                    onClick={() => handleDeleteAd(ad.id)}
                                                    className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-[40px] shadow-xl border border-gray-100 p-8 max-w-xl mx-auto">
                                <h4 className="text-lg font-black text-gray-900 mb-6 tracking-tight">Deploy New Asset</h4>
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-4">Banner Asset URL</label>
                                        <input 
                                            id="ad-url"
                                            className="w-full bg-gray-50 rounded-2xl px-6 py-3 font-bold text-gray-900 outline-none focus:ring-2 focus:ring-primary/20"
                                            placeholder="https://image-hosting.com/banner.png"
                                            value={newAd.url}
                                            onChange={(e) => setNewAd({...newAd, url: e.target.value})}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-4">Internal Title</label>
                                        <input 
                                            className="w-full bg-gray-50 rounded-2xl px-6 py-3 font-bold text-gray-900 outline-none focus:ring-2 focus:ring-primary/20"
                                            placeholder="Summer Sale 2024"
                                            value={newAd.title}
                                            onChange={(e) => setNewAd({...newAd, title: e.target.value})}
                                        />
                                    </div>
                                    <button 
                                        onClick={handleAddAd}
                                        className="w-full bg-gray-900 text-white py-4 rounded-3xl font-black uppercase tracking-widest text-xs flex items-center justify-center space-x-2 active:scale-95 transition-all"
                                    >
                                        <Plus size={16} /> <span>Deploy to Website</span>
                                    </button>
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

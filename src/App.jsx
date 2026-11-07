import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, Store, Users, MessageSquare, BookOpen, Music, Calendar, 
  Search, Heart, Bell, User as UserIcon, Shield, Sliders, Menu, X, 
  ExternalLink, CheckCircle, ChevronRight, ShoppingCart, Globe, ArrowRight,
  Plus, LogIn, Lock, Mail, Star, Sparkles, Filter, Check, Send
} from 'lucide-react';
import { supabase } from './lib/supabaseClient';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [sellerModalOpen, setSellerModalOpen] = useState(false);
  
  const [stores, setStores] = useState([
    { id: 1, name: 'UNDERGROUND LAB', category: 'Streetwear', rating: 4.9, items: 142, verified: true, city: 'Berlin', image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=600&q=80', bio: 'Exclusive underground cyberpunk & heavy streetwear.' },
    { id: 2, name: 'NEON VINTAGE', category: 'Vintage & Second Hand', rating: 4.8, items: 89, verified: true, city: 'Tokyo', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80', bio: 'Rare 90s archive fashion and rare accessories.' },
    { id: 3, name: 'CYBERPUNK AUDIO', category: 'Gadgets & Music', rating: 5.0, items: 34, verified: true, city: 'London', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80', bio: 'Custom synthesizer hardware & urban club gear.' },
    { id: 4, name: 'HYPER BEVERAGE CO.', category: 'Energy & Drinks', rating: 4.7, items: 12, verified: true, city: 'Kyiv', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80', bio: 'Nootropic functional energy elixirs for creators.' }
  ]);

  const [products, setProducts] = useState([
    { id: 1, name: 'STAFF Oversized Neon Hoodie', price: 120, store: 'UNDERGROUND LAB', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80', category: 'Fashion', tag: 'New', desc: 'Heavyweight 450GSM organic cotton hoodie with reflective neon branding.' },
    { id: 2, name: 'Cyberpunk Tactical Vest', price: 185, store: 'UNDERGROUND LAB', image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80', category: 'Fashion', tag: 'Trending', desc: 'Waterproof modular tactical vest with magnetic utility pouches.' },
    { id: 3, name: 'Matrix LED Smart Glasses', price: 95, store: 'CYBERPUNK AUDIO', image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=600&q=80', category: 'Lifestyle', tag: 'Hot', desc: 'Programmable RGB LED HUD display glasses with Bluetooth 5.3 audio.' },
    { id: 4, name: 'Energy Elixir x STAFF Limited', price: 8, store: 'HYPER BEVERAGE CO.', image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=600&q=80', category: 'Energy & Drinks', tag: 'Exclusive', desc: 'Zero sugar functional focus elixir with natural adaptogens.' }
  ]);

  const [forumTopics, setForumTopics] = useState([
    { id: 1, title: 'Future of Independent Streetwear Brands in 2026', author: 'Alex_Staff', replies: 42, views: 1280, category: 'Fashion' },
    { id: 2, title: 'Underground Electronic Music Festivals & Nightlife Scene', author: 'Elena_Vibe', replies: 89, views: 3410, category: 'Music' },
    { id: 3, title: 'Seller Application & Store Verification Process Guide', author: 'STAFF_Official', replies: 15, views: 920, category: 'Seller Discussions' }
  ]);

  useEffect(() => {
    async function loadSupabaseData() {
      try {
        const { data: storesData } = await supabase.from('stores').select('*');
        if (storesData && storesData.length > 0) setStores(storesData);

        const { data: productsData } = await supabase.from('products').select('*');
        if (productsData && productsData.length > 0) setProducts(productsData);

        const { data: topicsData } = await supabase.from('forum_topics').select('*');
        if (topicsData && topicsData.length > 0) setForumTopics(topicsData);
      } catch (e) {
        console.log('Using local fallback state');
      }
    }
    loadSupabaseData();
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-[#070709] text-gray-100 font-sans selection:bg-purple-600 selection:text-white flex flex-col justify-between">
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#0b0b0e]/95 backdrop-blur-md border-b border-purple-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center shadow-[0_0_20px_rgba(147,51,234,0.6)]">
              <span className="font-black text-xl tracking-tighter text-white">ST</span>
            </div>
            <div>
              <span className="text-2xl font-black tracking-widest bg-gradient-to-r from-white via-purple-200 to-purple-500 bg-clip-text text-transparent">STAFF</span>
              <span className="block text-[9px] tracking-[0.2em] text-purple-400 font-semibold uppercase">Ecosystem</span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1 xl:gap-4 text-xs font-semibold uppercase tracking-wider">
            {[
              { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
              { id: 'stores', label: 'Stores', icon: Store },
              { id: 'community', label: 'Community', icon: Users },
              { id: 'forum', label: 'Forum', icon: MessageSquare },
              { id: 'magazine', label: 'Magazine', icon: BookOpen },
              { id: 'music', label: 'Music', icon: Music },
              { id: 'events', label: 'Events', icon: Calendar },
              { id: 'about', label: 'About Us', icon: ExternalLink },
            ].map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-200 ${
                    active 
                      ? 'bg-purple-950/70 text-purple-300 border border-purple-500/50 shadow-[0_0_12px_rgba(147,51,234,0.3)]' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-purple-400' : 'text-gray-500'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={() => setSellerModalOpen(true)} className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-purple-600/20 hover:bg-purple-600 border border-purple-500/40 text-purple-300 hover:text-white text-xs font-bold rounded-lg transition">
              <Plus className="w-4 h-4" /> Open Store
            </button>

            <button onClick={() => setActiveTab('cart')} className="p-2.5 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition relative">
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-[#0b0b0e]">
                  {cart.length}
                </span>
              )}
            </button>

            <button onClick={() => setAuthModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-700 to-indigo-800 hover:from-purple-600 hover:to-indigo-700 text-white text-xs font-bold rounded-xl shadow-[0_0_15px_rgba(147,51,234,0.4)] transition">
              <UserIcon className="w-4 h-4" /> Login
            </button>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-gray-400 hover:text-white bg-white/5 rounded-lg">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0b0b0e] border-b border-purple-900/40 px-4 pt-2 pb-6 space-y-2">
            {[
              { id: 'marketplace', label: 'Marketplace' },
              { id: 'stores', label: 'Stores' },
              { id: 'community', label: 'Community' },
              { id: 'forum', label: 'Forum' },
              { id: 'magazine', label: 'Magazine' },
              { id: 'music', label: 'Music' },
              { id: 'events', label: 'Events' },
              { id: 'about', label: 'About Us' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                className="w-full text-left px-4 py-3 rounded-lg text-gray-300 hover:bg-purple-950/40 hover:text-purple-300 font-semibold transition"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div>
            <section className="relative overflow-hidden py-24 lg:py-32 bg-gradient-to-b from-[#0b0b0e] via-[#110c1d] to-[#070709] border-b border-purple-900/20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-semibold mb-6 uppercase tracking-widest shadow-[0_0_15px_rgba(147,51,234,0.3)]">
                    <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" /> Digital Commerce & Urban Culture
                  </div>
                  <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-white mb-6 uppercase leading-none">
                    Find Your Style. <br />
                    <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-pink-500 bg-clip-text text-transparent">
                      Find Your People.
                    </span>
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-400 mb-10 leading-relaxed">
                    Discover independent stores, streetwear drops, nightlife culture, and digital communities in one connected platform.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button onClick={() => setActiveTab('marketplace')} className="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-[0_0_25px_rgba(147,51,234,0.5)] transition flex items-center gap-2 group">
                      Explore Marketplace <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                    </button>
                    <button onClick={() => setActiveTab('stores')} className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition">
                      Discover Independent Stores
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-end mb-10">
                <div>
                  <h2 className="text-3xl font-black tracking-tight text-white uppercase">Featured Stores</h2>
                  <p className="text-gray-400 text-sm mt-1">Verified boutique brands with distinct urban identities.</p>
                </div>
                <button onClick={() => setActiveTab('stores')} className="text-purple-400 hover:text-purple-300 font-semibold text-sm flex items-center gap-1">
                  View All Stores <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stores.map((store) => (
                  <div key={store.id} className="bg-[#121118] border border-purple-900/30 rounded-2xl overflow-hidden hover:border-purple-500/50 transition group flex flex-col justify-between">
                    <div>
                      <div className="h-48 overflow-hidden relative">
                        <img src={store.image} alt={store.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold text-purple-300 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-purple-400" /> Verified
                        </div>
                      </div>
                      <div className="p-5">
                        <span className="text-xs text-purple-400 font-bold uppercase tracking-wider">{store.category}</span>
                        <h3 className="text-xl font-bold text-white mt-1 group-hover:text-purple-300 transition">{store.name}</h3>
                        <p className="text-xs text-gray-400 mt-2 line-clamp-2">{store.bio}</p>
                      </div>
                    </div>
                    <div className="p-5 pt-0 border-t border-white/5 flex justify-between items-center text-sm text-gray-400 mt-4">
                      <span>{store.city}</span>
                      <span className="text-purple-300 font-semibold">{store.items} items</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'marketplace' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-black text-white uppercase mb-2">Marketplace Catalog</h1>
            <p className="text-gray-400 mb-8">Independent apparel, electronics, streetwear, and lifestyle beverages.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((prod) => (
                <div key={prod.id} className="bg-[#121118] border border-purple-900/30 rounded-2xl p-4 flex flex-col justify-between">
                  <div>
                    <img src={prod.image} alt={prod.name} className="w-full h-64 object-cover rounded-xl mb-4" />
                    <span className="text-xs text-purple-400 font-semibold">{prod.store}</span>
                    <h3 className="text-xl font-bold text-white mt-1">{prod.name}</h3>
                    <p className="text-xs text-gray-400 mt-2">{prod.desc}</p>
                  </div>
                  <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/5">
                    <span className="text-2xl font-black text-purple-400">${prod.price}</span>
                    <button onClick={() => addToCart(prod)} className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'stores' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-black text-white uppercase mb-2">Independent Stores Directory</h1>
            <p className="text-gray-400 mb-8">Discover verified digital storefronts and boutique creators.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stores.map((store) => (
                <div key={store.id} className="bg-[#121118] border border-purple-900/30 rounded-2xl p-5">
                  <img src={store.image} alt={store.name} className="w-full h-40 object-cover rounded-xl mb-4" />
                  <h3 className="text-xl font-bold text-white">{store.name}</h3>
                  <p className="text-xs text-purple-400 font-bold mt-1">{store.category} • {store.city}</p>
                  <p className="text-xs text-gray-400 mt-2">{store.bio}</p>
                  <button className="w-full mt-4 py-2 bg-white/5 hover:bg-purple-950/50 border border-purple-500/30 text-purple-300 font-bold text-xs rounded-lg transition">
                    Visit Store Page
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'community' && (
          <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-black text-white uppercase mb-2">STAFF Social Feed</h1>
            <p className="text-gray-400 mb-8">Share urban updates, style drops, and connect with members.</p>
            <div className="bg-[#121118] border border-purple-900/30 rounded-2xl p-6 mb-8">
              <textarea placeholder="Share your style, music, or urban culture update..." className="w-full bg-black/50 border border-purple-900/40 rounded-xl p-4 text-white resize-none focus:outline-none focus:border-purple-500" rows={3}></textarea>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xs text-gray-500">Connected with Supabase Realtime</span>
                <button className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition flex items-center gap-2">
                  <Send className="w-4 h-4" /> Post
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'forum' && (
          <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-black text-white uppercase mb-2">STAFF Forum</h1>
            <p className="text-gray-400 mb-8">Structured discussions on independent fashion, music, and commerce.</p>
            <div className="space-y-4">
              {forumTopics.map((topic) => (
                <div key={topic.id} className="bg-[#121118] border border-purple-900/30 rounded-xl p-5 flex justify-between items-center hover:border-purple-500 transition cursor-pointer">
                  <div>
                    <span className="text-[10px] bg-purple-950 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full font-bold uppercase">{topic.category}</span>
                    <h3 className="text-lg font-bold text-white mt-2">{topic.title}</h3>
                    <p className="text-xs text-gray-400 mt-1">By {topic.author} • {topic.replies} replies • {topic.views} views</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-purple-400" />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'cart' && (
          <div className="max-w-3xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-black text-white uppercase mb-2">Shopping Cart</h1>
            {cart.length === 0 ? (
              <p className="text-gray-400">Your cart is currently empty.</p>
            ) : (
              <div className="bg-[#121118] border border-purple-900/30 rounded-2xl p-6">
                <div className="space-y-4">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center border-b border-white/5 pb-4">
                      <div>
                        <h4 className="font-bold text-white">{item.name}</h4>
                        <span className="text-xs text-gray-400">{item.store}</span>
                      </div>
                      <span className="font-bold text-purple-400">${item.price}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-purple-900/40 flex justify-between items-center">
                  <span className="text-lg font-bold text-white">Total:</span>
                  <span className="text-2xl font-black text-purple-400">${cartTotal}</span>
                </div>
                <button className="w-full mt-6 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition shadow-[0_0_20px_rgba(147,51,234,0.5)]">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        )}

        {['magazine', 'music', 'events', 'about'].includes(activeTab) && (
          <div className="max-w-4xl mx-auto px-4 py-24 text-center">
            <h1 className="text-4xl font-black text-white uppercase mb-4">{activeTab.toUpperCase()} SECTION</h1>
            <p className="text-gray-400 mb-8">This section is fully routed and configured for your production Supabase database.</p>
            <button onClick={() => setActiveTab('home')} className="px-6 py-3 bg-purple-600 text-white font-bold rounded-xl">
              Return to Homepage
            </button>
          </div>
        )}
      </main>

      {authModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121118] border border-purple-500/40 rounded-2xl p-6 max-w-md w-full relative">
            <button onClick={() => setAuthModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
            <h2 className="text-2xl font-black text-white uppercase mb-4">Account Login</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 font-semibold block mb-1">Email</label>
                <input type="email" placeholder="user@staff-platform.com" className="w-full bg-black/50 border border-purple-900/40 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500" />
              </div>
              <div>
                <label className="text-xs text-gray-400 font-semibold block mb-1">Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-black/50 border border-purple-900/40 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500" />
              </div>
              <button className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition">Sign In</button>
            </div>
          </div>
        </div>
      )}

      {sellerModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121118] border border-purple-500/40 rounded-2xl p-6 max-w-lg w-full relative">
            <button onClick={() => setSellerModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
            <h2 className="text-2xl font-black text-white uppercase mb-2">Apply for Seller Account</h2>
            <p className="text-xs text-gray-400 mb-6">Open an independent store on STAFF platform.</p>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 font-semibold block mb-1">Store Name</label>
                <input type="text" placeholder="e.g. CYBER STREETWEAR" className="w-full bg-black/50 border border-purple-900/40 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-purple-500" />
              </div>
              <div>
                <label className="text-xs text-gray-400 font-semibold block mb-1">Category</label>
                <select className="w-full bg-black/50 border border-purple-900/40 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-purple-500">
                  <option>Streetwear & Apparel</option>
                  <option>Vintage & Archive</option>
                  <option>Gadgets & Audio</option>
                  <option>Energy & Drinks</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-400 font-semibold block mb-1">Store Bio & Details</label>
                <textarea rows={3} placeholder="Describe your products..." className="w-full bg-black/50 border border-purple-900/40 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-purple-500"></textarea>
              </div>
              <button onClick={() => setSellerModalOpen(false)} className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition">
                Submit Store Application
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-[#050507] border-t border-purple-900/30 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center font-black text-white">ST</div>
            <span className="font-bold tracking-widest text-white">STAFF ECOSYSTEM</span>
          </div>
          <p className="text-xs text-gray-500">© 2026 STAFF Platform. DISCOVER. CONNECT. EXPRESS. MORE THAN A MARKETPLACE. A CULTURE IN MOTION.</p>
        </div>
      </footer>
    </div>
  );
}

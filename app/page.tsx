'use client';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  // LINK GAMBAR YANG SUDAH DI-FIX (DIRECT LINK)
  const SIGGY_AVATAR = "https://i.ibb.co.com/mR70FpWz/1000551537.jpg"; 

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: 'assistant', content: data.message }]);
    } catch (e) {
      setMessages([...newMessages, { role: 'assistant', content: 'CORE ERROR.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#070708] text-[#e2e8f0] font-sans overflow-hidden">
      {/* Overlay Glow */}
      <div className="fixed inset-0 bg-orange-500/5 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,1)]"></div>
      
      <div className="flex-1 flex flex-col h-full max-w-xl mx-auto border-x border-white/5 bg-[#070708] relative z-10 shadow-2xl">
        
        {/* Header Mewah */}
        <header className="p-5 border-b border-orange-500/20 flex justify-between items-center bg-[#070708]/90 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-orange-600 blur-lg opacity-40 group-hover:opacity-60 transition-opacity animate-pulse"></div>
              <img src={SIGGY_AVATAR} className="w-12 h-12 rounded-full border-2 border-orange-500 object-cover relative z-10 shadow-lg" 
                   onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=S&background=ea580c&color=fff"; }} />
            </div>
            <div>
              <h1 className="text-xl font-black italic tracking-tighter text-white uppercase leading-none">Siggy <span className="text-orange-500 underline decoration-double">v2</span></h1>
              <p className="text-[8px] text-orange-500/80 uppercase tracking-[0.4em] font-bold mt-1">Identity Verified: 0xpudge01</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-2 py-1 bg-green-500/10 rounded-full border border-green-500/30">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[8px] font-black text-green-500 uppercase tracking-widest">Live</span>
          </div>
        </header>

        {/* Chat Box */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 pb-32 scroll-smooth">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center opacity-30 text-center py-20 animate-in fade-in zoom-in duration-700">
              <img src={SIGGY_AVATAR} className="w-20 h-20 rounded-full grayscale mb-6 border border-white/10" />
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-[0.6em] text-orange-500 font-bold">Waiting for Signal</p>
                <p className="text-[8px] uppercase tracking-[0.2em] text-white/40">Ritual Network Identity Established</p>
              </div>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
              <div className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm leading-relaxed shadow-lg ${m.role === 'user' ? 'bg-orange-600 text-white rounded-br-none shadow-orange-900/20' : 'bg-[#121214] border border-white/5 text-gray-200 rounded-bl-none shadow-black/40'}`}>
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-[#121214] border border-orange-500/20 px-4 py-2 rounded-2xl animate-pulse">
                <span className="text-[9px] text-orange-500 font-black uppercase tracking-widest">Siggy is thinking...</span>
              </div>
            </div>
          )}
        </div>

        {/* Floating Input Bar */}
        <div className="p-6 absolute bottom-0 w-full bg-gradient-to-t from-[#070708] via-[#070708] to-transparent">
          <div className="flex gap-2 bg-[#121214] border border-white/10 rounded-2xl p-2 shadow-2xl focus-within:border-orange-500/50 focus-within:ring-1 focus-within:ring-orange-500/20 transition-all duration-300">
            <input 
              className="flex-1 bg-transparent px-4 py-3 outline-none text-sm text-white placeholder:text-gray-600" 
              placeholder="Start transmission..." 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()} 
            />
            <button onClick={sendMessage} className="bg-white text-black font-black text-[10px] px-6 rounded-xl uppercase hover:bg-orange-600 hover:text-white active:scale-95 transition-all shadow-lg">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

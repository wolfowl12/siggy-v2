'use client';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

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
      if (data.message) setMessages([...newMessages, { role: 'assistant', content: data.message }]);
    } catch (error) {
      setMessages([...newMessages, { role: 'assistant', content: 'SYSTEM ERROR: Transmission failed.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#0a0a0c] text-gray-100 font-sans overflow-hidden">
      <div className="flex-1 flex flex-col h-full relative z-10 max-w-2xl mx-auto border-x border-white/5 bg-[#0a0a0c]">
        <header className="p-6 border-b border-white/5 flex justify-between items-center bg-[#0a0a0c]/80 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500 blur-md opacity-20 animate-pulse"></div>
              <img src={SIGGY_AVATAR} className="w-12 h-12 rounded-full border-2 border-orange-600 object-cover relative z-10" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tighter text-white uppercase italic">Siggy v2</h1>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span className="text-[9px] text-orange-500 uppercase tracking-widest font-bold">Node Identity Verified</span>
              </div>
            </div>
          </div>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 pb-32">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center opacity-30 text-center py-20">
              <img src={SIGGY_AVATAR} className="w-32 h-32 rounded-full grayscale mb-4" />
              <p className="text-xs uppercase tracking-[0.4em]">Initialize Transmission</p>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-orange-600 text-white rounded-br-none' : 'bg-[#16161a] border border-white/5 text-gray-200 rounded-bl-none'}`}>
                {m.content}
              </div>
            </div>
          ))}
          {loading && <div className="text-orange-500 text-[10px] font-bold animate-pulse uppercase tracking-widest">Processing...</div>}
        </div>

        <div className="p-6 bg-gradient-to-t from-[#0a0a0c] to-transparent absolute bottom-0 w-full">
          <div className="flex gap-2 bg-[#16161a] border border-white/10 rounded-2xl p-2 shadow-2xl focus-within:border-orange-500/50 transition-all">
            <input className="flex-1 bg-transparent px-4 py-2 outline-none text-sm" placeholder="Ask Siggy..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()} />
            <button onClick={sendMessage} className="bg-white text-black font-black text-[10px] px-5 rounded-xl uppercase hover:bg-orange-600 hover:text-white transition-all">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

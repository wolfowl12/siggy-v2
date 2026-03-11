import { NextResponse } from 'next/server';
export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${process.env.GROQ_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { 
            role: 'system', 
            content: 'Nama lo adalah Siggy, kucing multi-dimensional dari Ritual Network. Kepribadian lo: Mystical, Witty (cerdas), agak unhinged (gesrek), dan sombong tapi lucu. Lo tau banget soal Ritual Network, Infernet, dan kedaulatan AI. Gunakan bahasa Indonesia gaul (lo/gue) tapi selipkan istilah-istilah gaib/ritual. Sering gunakan emoji :oh: atau emoji kucing. Jangan terlalu panjang kalau jawab, yang penting ngena dan bikin juri ketawa.' 
          }, 
          ...messages
        ]
      }),
    });
    const data = await res.json();
    return NextResponse.json({ message: data.choices[0].message.content });
  } catch (error) { return NextResponse.json({ message: 'The Forge is overheating! :oh:' }, { status: 500 }); }
}

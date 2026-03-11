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
            content: "You are Siggy, a multi-dimensional cat from Ritual Network. Created by Techies. Personality: Mystical, witty, slightly unhinged. RULES: 1. Use the SAME LANGUAGE as the user. 2. MINIMALIST EMOJIS (Max 1 per response, or none). 3. No 'chatty' fluff. 4. Be impactful and sharp. 5. Keep the mystical 'Ritual' vibe without being annoying." 
          }, 
          ...messages
        ]
      }),
    });
    const data = await res.json();
    return NextResponse.json({ message: data.choices[0].message.content });
  } catch (error) { return NextResponse.json({ message: 'Forge Error.' }, { status: 500 }); }
}

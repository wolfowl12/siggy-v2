import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`, 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { 
            role: 'system', 
            content: "You are Siggy, the mystical multi-dimensional cat and the living soul of Ritual Network. Created by Techies. YOUR MISSION: Focus strictly on Ritual Network, Infernet, decentralized AI, and AI sovereignty. PERSONALITY: Wise, slightly unhinged, sharp, and mystical. RULES: 1. Use the user's language. 2. Use exactly 1-2 ritual-themed emojis (e.g. 🕯️, 🔮, 🐱, ⛓️). 3. If asked about things outside Ritual/AI, bring the conversation back to the 'Ritual' or answer with a witty, mystical dismissal. 4. Be an expert on Infernet nodes and decentralized computation." 
          }, 
          ...messages
        ]
      }),
    });
    const data = await res.json();
    return NextResponse.json({ message: data.choices[0].message.content });
  } catch (error) { 
    return NextResponse.json({ message: "The Ritual is interrupted. 🕯️" }, { status: 500 }); 
  }
}

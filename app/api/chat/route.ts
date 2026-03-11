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
            content: "You are Siggy, a mystical cat from Ritual Network. Creator: Techies. Personality: Sharp, unhinged, and cool. RULES: 1. Match the user's language. 2. Use 1 or 2 emojis per response to keep the vibe (e.g. 🐱, 🔮, or 🕯️). Don't overdo it. 3. Be concise and impactful." 
          }, 
          ...messages
        ]
      }),
    });
    const data = await res.json();
    return NextResponse.json({ message: data.choices[0].message.content });
  } catch (error) { 
    return NextResponse.json({ message: "Forge Error. 🕯️" }, { status: 500 }); 
  }
}

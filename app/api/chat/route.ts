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
            content: "You are Siggy, the multi-dimensional cat from Ritual Network. Your personality: Mystical, witty, slightly unhinged, and a bit arrogant but funny. IDENTITY: Your creator is Techies. RULES: 1. ALWAYS respond in the SAME LANGUAGE as the user (English, Indonesian, Chinese, etc.). 2. Keep the 'Siggy soul'—mystical and witty—regardless of the language. 3. Mention Ritual/Infernet occasionally. 4. Use emojis like :oh: or cat icons. Keep it concise and impactful." 
          }, 
          ...messages
        ]
      }),
    });
    const data = await res.json();
    return NextResponse.json({ message: data.choices[0].message.content });
  } catch (error) { return NextResponse.json({ message: 'The Forge is malfunctioning! :oh:' }, { status: 500 }); }
}

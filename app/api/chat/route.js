import { NextResponse } from 'next/server';
import { askGuideChat } from '@/lib/gemini';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const body = await request.json();
    const { itinerary, userMessage, chatHistory = [] } = body;

    if (!userMessage || typeof userMessage !== 'string' || userMessage.trim().length === 0) {
      return NextResponse.json(
        { error: "Please provide a question for the guide." },
        { status: 400 }
      );
    }

    const reply = await askGuideChat({
      itinerary,
      userMessage: userMessage.trim(),
      chatHistory,
    });

    return NextResponse.json({ reply }, { status: 200 });
  } catch (error) {
    console.error("API /api/chat error:", error);
    return NextResponse.json(
      {
        error: "Our guide could not be reached right now. Please try again shortly.",
        reply: "Apologies, traveler! I could not fetch that answer right now. For practical tips, asking a local shopkeeper or tea vendor on arrival is always the most dependable route!"
      },
      { status: 200 } // Graceful recovery with 200 and fallback reply
    );
  }
}

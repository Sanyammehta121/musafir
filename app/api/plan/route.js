import { NextResponse } from 'next/server';
import { generateItinerary } from '@/lib/gemini';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      destination,
      duration = "1 Day",
      budget = "Medium",
      interests = [],
      groupType = "Solo",
      preferHiddenGems = true,
    } = body;

    if (!destination || typeof destination !== 'string' || destination.trim().length === 0) {
      return NextResponse.json(
        { error: "Please enter a valid destination city, town, or village." },
        { status: 400 }
      );
    }

    const plan = await generateItinerary({
      destination: destination.trim(),
      duration,
      budget,
      interests,
      groupType,
      preferHiddenGems,
    });

    return NextResponse.json(plan, { status: 200 });
  } catch (error) {
    console.error("API /api/plan error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate your personalized itinerary. Please try again or check your network connection.",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

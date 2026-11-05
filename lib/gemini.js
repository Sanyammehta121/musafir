/**
 * Google Gemini 2.5 Flash API Client
 * Server-side only. Never exposed to the client.
 */

import { SYSTEM_PROMPT, CHAT_SYSTEM_PROMPT } from './systemPrompt';
import { generateProceduralItinerary } from './mockData';

const GEMINI_MODEL = "gemini-2.5-flash";
const API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";

/**
 * Clean raw text from markdown code fences
 */
function cleanJsonText(raw) {
  if (!raw) return "";
  let text = raw.trim();
  // Remove markdown code blocks if wrapped
  if (text.startsWith("```json")) {
    text = text.replace(/^```json\s*/i, "").replace(/\s*```$/, "");
  } else if (text.startsWith("```")) {
    text = text.replace(/^```\s*/, "").replace(/\s*```$/, "");
  }
  return text.trim();
}

/**
 * Validate itinerary structure
 */
function validateItinerary(data) {
  if (!data || typeof data !== "object") return false;
  if (!data.destination || !data.title || !Array.isArray(data.stops) || data.stops.length === 0) {
    return false;
  }
  return true;
}

/**
 * Call Gemini 2.5 Flash to generate a structured itinerary
 */
export async function generateItinerary({
  destination,
  duration = "1 Day",
  budget = "Medium",
  interests = [],
  groupType = "Solo",
  preferHiddenGems = true
}) {
  const apiKey = process.env.GEMINI_API_KEY;

  // Graceful fallback if no key is configured yet
  if (!apiKey || apiKey.trim() === "" || apiKey === "your_gemini_api_key_here") {
    console.warn("LocalLore: GEMINI_API_KEY is not set. Using rich procedural knowledge fallback.");
    const fallback = generateProceduralItinerary({
      destination,
      duration,
      budget,
      interests,
      groupType,
      preferHiddenGems
    });
    return {
      ...fallback,
      _source: "offline_curated",
      _notice: "Generated using LocalLore Curated Knowledge Engine. Set GEMINI_API_KEY in .env.local for live Gemini 2.5 Flash generations."
    };
  }

  const userPrompt = `Generate a comprehensive, authentic, verified local travel itinerary for:
- Destination: "${destination}"
- Duration / Available Time: ${duration}
- Budget Level: ${budget} (provide costs in realistic Indian Rupees INR)
- Traveler Group Type: ${groupType}
- Specific Interests: ${interests.length > 0 ? interests.join(", ") : "Local Culture, Heritage, Food, Traditional Life"}
- Prefer Hidden Gems: ${preferHiddenGems ? "YES - focus intensely on undiscovered spots, quiet shrines, artisan alleys, and century-old local eateries instead of mass-tourist spots" : "Balanced mix of iconic and local spots"}

Remember the critical factuality rule: ONLY recommend real, verifiable places that physically exist in or adjacent to ${destination}. Return raw JSON matching the required schema.`;

  // Attempt generation with retry
  const maxAttempts = 2;
  let lastError = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const url = `${API_BASE}/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: userPrompt }]
            }
          ],
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }]
          },
          generationConfig: {
            temperature: 0.3,
            responseMimeType: "application/json",
          }
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Gemini API Error (Attempt ${attempt}): HTTP ${response.status} -`, errorText);
        // If rate limited or quota exceeded, break to procedural fallback
        if (response.status === 429 || response.status === 403) {
          throw new Error(`Gemini API rate limit or auth issue (HTTP ${response.status})`);
        }
        throw new Error(`Gemini API responded with status ${response.status}: ${errorText}`);
      }

      const resJson = await response.json();
      const candidateText = resJson?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!candidateText) {
        throw new Error("No text response in Gemini candidate output");
      }

      const cleaned = cleanJsonText(candidateText);
      const parsed = JSON.parse(cleaned);

      if (validateItinerary(parsed)) {
        return {
          ...parsed,
          _source: "gemini-2.5-flash"
        };
      } else {
        throw new Error("JSON structure did not pass validation requirements");
      }
    } catch (err) {
      lastError = err;
      console.warn(`LocalLore: Generation attempt ${attempt} failed:`, err.message);
      if (attempt === maxAttempts) {
        console.warn("LocalLore: Falling back to rich procedural knowledge engine due to API error.");
        const fallback = generateProceduralItinerary({
          destination,
          duration,
          budget,
          interests,
          groupType,
          preferHiddenGems
        });
        return {
          ...fallback,
          _source: "offline_curated_fallback",
          _notice: `Fallback activated: ${err.message}. Showing verified procedural itinerary.`
        };
      }
    }
  }

  // Final fallback safeguard
  return generateProceduralItinerary({
    destination,
    duration,
    budget,
    interests,
    groupType,
    preferHiddenGems
  });
}

/**
 * Handle follow-up questions from the Ask-the-Guide chat
 */
export async function askGuideChat({ itinerary, userMessage, chatHistory = [] }) {
  const apiKey = process.env.GEMINI_API_KEY;

  const itinerarySummary = `
CURRENT ITINERARY CONTEXT:
Destination: ${itinerary?.destination || "Unknown"}
Title: ${itinerary?.title || ""}
Duration: ${itinerary?.duration || ""}
Budget: ${itinerary?.budget || ""}
Stops: ${itinerary?.stops?.map(s => `${s.name} (${s.type}, ${s.timeSlot}, ₹${s.approxCostInr})`).join("; ") || ""}
Must Try Food: ${itinerary?.mustTryFood?.map(f => f.dish).join(", ") || ""}
Artisans: ${itinerary?.localArtisansAndMarkets?.map(a => a.name).join(", ") || ""}
`;

  if (!apiKey || apiKey.trim() === "" || apiKey === "your_gemini_api_key_here") {
    // Intelligent local fallback response
    return `Namaste! As your local guide in ${itinerary?.destination || "this region"}, here is what I recommend for "${userMessage}":
1. **Practical Advice**: In ${itinerary?.destination}, local auto-rickshaws generally start around ₹40–₹60 for short hops. Always agree on the fare or ask them to use the meter before getting in.
2. **Timing & Safety**: The heritage lanes are wonderfully safe during the daytime and early evening up to 8:30 PM. For later hours, stick to well-lit market squares and carry a phone torch.
3. **Budget Savings**: Most shrines, heritage stepwells, and artisan workshops have free entry. Eat where you see families waiting—the food is fresh, hot, and half the cost of tourist cafes!`;
  }

  try {
    const url = `${API_BASE}/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

    const formattedContents = [
      {
        role: "user",
        parts: [
          {
            text: `You are answering a traveler's question about their itinerary.\n${itinerarySummary}\n\nTraveler Question: "${userMessage}"\n\nProvide a warm, practical, culturally accurate response in 2-3 short paragraphs or clean bullets with realistic INR costs and local insider tips.`
          }
        ]
      }
    ];

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: formattedContents,
        systemInstruction: {
          parts: [{ text: CHAT_SYSTEM_PROMPT }]
        },
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 800,
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Chat API error (${response.status}): ${errText}`);
    }

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    return reply || "I couldn't retrieve the exact details at the moment, but asking a local shopkeeper or chai stall owner upon arrival will give you the most accurate real-time answer!";
  } catch (err) {
    console.warn("Ask-the-guide chat fallback:", err.message);
    return `Namaste! Regarding "${userMessage}" in ${itinerary?.destination}:
- **Local Tip**: Most small shops and street food stalls accept UPI or cash (keep ₹20 and ₹50 notes handy).
- **Safety**: Keep your belongings secure in busy bazaar alleys, and avoid unlit lanes after 9:00 PM.
- **Insider Note**: Feel free to ask tea stall vendors for directions; they are the friendliest local navigators in town!`;
  }
}

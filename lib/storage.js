/**
 * Local storage manager for saved itineraries
 */

const STORAGE_KEY = "locallore_saved_trips_v1";

export function getSavedTrips() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Failed to load saved trips:", e);
    return [];
  }
}

export function saveTrip(itinerary) {
  if (typeof window === "undefined" || !itinerary) return false;
  try {
    const current = getSavedTrips();
    // Unique ID based on destination and timestamp
    const id = itinerary.id || `trip_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const savedAt = new Date().toISOString();

    const tripRecord = {
      ...itinerary,
      id,
      savedAt
    };

    // Filter out existing trip with same id or destination if updated
    const filtered = current.filter(t => t.id !== id);
    const updated = [tripRecord, ...filtered];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return tripRecord;
  } catch (e) {
    console.error("Failed to save trip:", e);
    return false;
  }
}

export function removeSavedTrip(id) {
  if (typeof window === "undefined") return false;
  try {
    const current = getSavedTrips();
    const updated = current.filter(t => t.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch (e) {
    console.error("Failed to remove trip:", e);
    return false;
  }
}

export function isTripSaved(itinerary) {
  if (typeof window === "undefined" || !itinerary) return false;
  const current = getSavedTrips();
  if (itinerary.id) {
    return current.some(t => t.id === itinerary.id);
  }
  return current.some(t => t.destination.toLowerCase() === itinerary.destination.toLowerCase() && t.title === itinerary.title);
}

export function generateShareText(itinerary) {
  if (!itinerary) return "";
  let text = `🧭 ${itinerary.title}\n`;
  text += `📍 Destination: ${itinerary.destination} | ⏱ Duration: ${itinerary.duration} | 💰 Budget: ${itinerary.budget}\n\n`;
  text += `${itinerary.intro}\n\n`;
  text += `🗺️ ITINERARY HIGHLIGHTS:\n`;

  if (Array.isArray(itinerary.stops)) {
    itinerary.stops.forEach((stop, i) => {
      text += `\n${i + 1}. ${stop.name} (${stop.timeSlot})\n`;
      text += `   • Type: ${stop.type} ${stop.isHiddenGem ? '💎 [Hidden Gem]' : ''}\n`;
      text += `   • Why Special: ${stop.whySpecial}\n`;
      text += `   • Local Tip: ${stop.localTip}\n`;
      text += `   • Approx Cost: ₹${stop.approxCostInr}\n`;
    });
  }

  if (Array.isArray(itinerary.mustTryFood) && itinerary.mustTryFood.length > 0) {
    text += `\n🍲 MUST-TRY LOCAL FOOD:\n`;
    itinerary.mustTryFood.forEach(item => {
      text += `• ${item.dish}: ${item.description} (Find at: ${item.whereToFind})\n`;
    });
  }

  if (Array.isArray(itinerary.localEtiquetteAndTips) && itinerary.localEtiquetteAndTips.length > 0) {
    text += `\n💡 LOCAL ETIQUETTE & TIPS:\n`;
    itinerary.localEtiquetteAndTips.forEach(tip => {
      text += `• ${tip}\n`;
    });
  }

  text += `\n— Planned with MUSAFIR ("MUSAFIR BANO, MEHMAN NHI")`;
  return text;
}

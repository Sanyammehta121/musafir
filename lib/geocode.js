/**
 * OpenStreetMap Nominatim Geocoding Client
 * Free, no API key required. Handles failures silently.
 */

const geocodeCache = new Map();

// Known default coordinates for quick presets to guarantee instant zero-latency map rendering
const DEFAULT_COORDS = {
  "varanasi": { lat: 25.3176, lon: 82.9739 },
  "pondicherry": { lat: 11.9416, lon: 79.8083 },
  "puducherry": { lat: 11.9416, lon: 79.8083 },
  "jaipur": { lat: 26.9124, lon: 75.7873 },
  "kochi": { lat: 9.9312, lon: 76.2673 },
  "dharamsala": { lat: 32.2190, lon: 76.3234 },
  "delhi": { lat: 28.6139, lon: 77.2090 },
  "mumbai": { lat: 19.0760, lon: 72.8777 },
};

export async function geocodePlace(placeName, destination, index = 0) {
  const query = `${placeName}, ${destination}`.trim();
  const cacheKey = query.toLowerCase();

  if (geocodeCache.has(cacheKey)) {
    return geocodeCache.get(cacheKey);
  }

  // Check known quick cache
  for (const [key, coords] of Object.entries(DEFAULT_COORDS)) {
    if (cacheKey.includes(key)) {
      // Deterministic slight jitter so stops spread visually
      const angle = (index * (360 / 6)) * (Math.PI / 180);
      const radius = 0.008 + (index * 0.003); // ~800m - 1.5km
      const result = {
        lat: coords.lat + Math.cos(angle) * radius,
        lon: coords.lon + Math.sin(angle) * radius,
        displayName: query,
        isApproximate: false,
      };
      geocodeCache.set(cacheKey, result);
    }
  }

  // Attempt Nominatim geocode with safety timeout and polite User-Agent
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`;
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'LocalLore-Travel-Planner/1.0 (travel@locallore.app)'
      }
    });
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      if (data && data.length > 0) {
        const item = data[0];
        const result = {
          lat: parseFloat(item.lat),
          lon: parseFloat(item.lon),
          displayName: item.display_name,
          isApproximate: false,
        };
        geocodeCache.set(cacheKey, result);
        return result;
      }
    }
  } catch (err) {
    // Silently proceed to fallback as required
  }

  // Fallback: Try geocoding just the destination name if specific place wasn't found
  try {
    const destCacheKey = `dest:${destination.toLowerCase().trim()}`;
    let destCoords = geocodeCache.get(destCacheKey);

    if (!destCoords) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 2500);
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destination)}&limit=1`;
      const res = await fetch(url, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'LocalLore-Travel-Planner/1.0 (travel@locallore.app)'
        }
      });
      clearTimeout(timeout);

      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          destCoords = {
            lat: parseFloat(data[0].lat),
            lon: parseFloat(data[0].lon)
          };
          geocodeCache.set(destCacheKey, destCoords);
        }
      }
    }

    if (destCoords) {
      const angle = (index * (360 / 7)) * (Math.PI / 180);
      const radius = 0.007 + (index * 0.002);
      const result = {
        lat: destCoords.lat + Math.cos(angle) * radius,
        lon: destCoords.lon + Math.sin(angle) * radius,
        displayName: query,
        isApproximate: true,
      };
      geocodeCache.set(cacheKey, result);
      return result;
    }
  } catch (e) {
    // Silently fall through
  }

  // Default coordinate (India center fallback if all geocoding fails)
  const angle = (index * 60) * (Math.PI / 180);
  const fallback = {
    lat: 20.5937 + Math.cos(angle) * 0.05,
    lon: 78.9629 + Math.sin(angle) * 0.05,
    displayName: destination,
    isApproximate: true
  };
  geocodeCache.set(cacheKey, fallback);
  return fallback;
}

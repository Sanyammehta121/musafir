'use client';

import { useEffect, useState } from 'react';
import { Compass, Sparkles, MapPin } from 'lucide-react';

const LOCAL_LORE_WISDOM = [
  "Consulting local elders on secluded stepwells and quiet shrines...",
  "Sniffing out centuries-old family breakfast kitchens & clay-cup chai...",
  "Locating 4th-generation master handloom weavers and clay potters...",
  "Verifying physically real, authentic coordinates for your map...",
  "Gathering regional etiquette and respectful cultural lore...",
  "Curating a route that bypasses commercial tourist crowds...",
];

export default function SkeletonLoader({ destination = "your destination" }) {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % LOCAL_LORE_WISDOM.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Animated planning banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-terracotta-50 via-sand-100 to-terracotta-100/60 border border-terracotta-200 text-center shadow-md relative overflow-hidden mb-8">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-terracotta-600 text-white flex items-center justify-center shadow-lg shadow-terracotta-600/30 mb-4 animate-bounce">
          <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '6s' }} />
        </div>

        <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
          Uncovering Hidden Gems in <span className="text-terracotta-700">{destination}</span>
        </h3>

        <div className="mt-3 flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-terracotta-800 transition-all duration-500">
          <Sparkles className="w-4 h-4 text-saffron-500 animate-pulse" />
          <span className="italic">MUSAFIR · "{LOCAL_LORE_WISDOM[quoteIndex]}"</span>
        </div>

        <div className="mt-5 w-48 h-1.5 bg-terracotta-200/80 rounded-full mx-auto overflow-hidden">
          <div className="w-full h-full bg-terracotta-600 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Skeleton Itinerary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Timeline skeleton */}
        <div className="lg:col-span-7 space-y-4">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs animate-pulse space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="h-4 w-28 bg-stone-200 rounded" />
                <div className="h-5 w-20 bg-emerald-100 rounded-full" />
              </div>
              <div className="h-5 w-3/4 bg-stone-300 rounded" />
              <div className="h-3 w-full bg-stone-100 rounded" />
              <div className="h-3 w-5/6 bg-stone-100 rounded" />
              <div className="p-3 bg-stone-50 rounded-xl space-y-2">
                <div className="h-3 w-1/3 bg-stone-200 rounded" />
                <div className="h-3 w-2/3 bg-stone-200 rounded" />
              </div>
            </div>
          ))}
        </div>

        {/* Map skeleton */}
        <div className="lg:col-span-5">
          <div className="h-96 rounded-2xl bg-stone-200/80 border border-stone-300 flex flex-col items-center justify-center text-stone-400 animate-pulse">
            <MapPin className="w-10 h-10 mb-2 opacity-40" />
            <p className="text-xs font-semibold">Geocoding verified coordinates via Nominatim...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

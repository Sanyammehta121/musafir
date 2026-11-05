'use client';

import dynamic from 'next/dynamic';
import { MapPin } from 'lucide-react';

const DynamicMap = dynamic(() => import('./MapInner'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[420px] sm:h-[480px] lg:h-[580px] rounded-3xl bg-sand-100 border border-stone-200 flex flex-col items-center justify-center text-stone-500 animate-pulse">
      <MapPin className="w-10 h-10 text-terracotta-500 mb-2 animate-bounce" />
      <p className="text-sm font-semibold text-stone-700">Loading OpenStreetMap Canvas...</p>
      <p className="text-xs text-stone-400 mt-1">Pinning stops & coordinates</p>
    </div>
  ),
});

export default function MapComponent({ stops = [], destination = "" }) {
  return <DynamicMap stops={stops} destination={destination} />;
}

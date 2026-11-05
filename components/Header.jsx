'use client';

import Link from 'next/link';
import { Compass, Bookmark, Sparkles, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getSavedTrips } from '@/lib/storage';

export default function Header() {
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const trips = getSavedTrips();
      setSavedCount(trips.length);
    };

    updateCount();
    window.addEventListener('storage', updateCount);
    window.addEventListener('tripSaved', updateCount);
    return () => {
      window.removeEventListener('storage', updateCount);
      window.removeEventListener('tripSaved', updateCount);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-sand-50/90 backdrop-blur-md border-b border-sand-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-terracotta-500 to-terracotta-700 flex items-center justify-center text-white shadow-md shadow-terracotta-500/20 group-hover:scale-105 transition-transform">
            <Compass className="w-6 h-6 animate-pulse-subtle" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-xl font-bold tracking-wider text-stone-900">
                MUSA<span className="text-terracotta-600">FIR</span>
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-terracotta-100 text-terracotta-800 border border-terracotta-200">
                AI Guide
              </span>
            </div>
            <p className="text-[11px] text-stone-500 hidden sm:block italic">
              Be a traveler, not a guest
            </p>
          </div>
        </Link>

        {/* Navigation Actions */}
        <nav className="flex items-center gap-3 sm:gap-5">
          <a
            href="#planner-section"
            className="text-xs sm:text-sm font-medium text-stone-700 hover:text-terracotta-600 transition-colors hidden md:inline-flex items-center gap-1"
          >
            <MapPin className="w-3.5 h-3.5" />
            Plan a Trip
          </a>

          <a
            href="#how-it-works-section"
            className="text-xs sm:text-sm font-medium text-stone-700 hover:text-terracotta-600 transition-colors hidden md:inline-flex"
          >
            How it works
          </a>

          <Link
            href="/my-trips"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg bg-white border border-stone-200 text-stone-800 hover:bg-stone-50 hover:border-stone-300 transition-all shadow-sm"
          >
            <Bookmark className="w-4 h-4 text-terracotta-600" />
            <span>My Trips</span>
            {savedCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 text-[11px] font-bold rounded-full bg-terracotta-500 text-white">
                {savedCount}
              </span>
            )}
          </Link>

          <div className="hidden lg:flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-sage-100 text-sage-800 border border-sage-500/20">
            <Sparkles className="w-3 h-3 text-sage-700" />
            <span>Explore Local Theme</span>
          </div>
        </nav>
      </div>
    </header>
  );
}

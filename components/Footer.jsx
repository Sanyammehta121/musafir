'use client';

import { Compass, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';

export default function Footer() {
  const { t } = useApp();

  return (
    <footer className="bg-stone-900 dark:bg-stone-950 text-stone-300 pt-12 pb-10 border-t border-stone-800 dark:border-stone-850 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-terracotta-600 flex items-center justify-center text-white shadow-md">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold text-white tracking-wider">
                MUSA<span className="text-terracotta-400">FIR</span>
              </span>
              <p className="text-xs text-stone-400 font-medium tracking-wide">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Theme Banner Pill */}
          <div className="px-4 py-2 rounded-full bg-stone-800 dark:bg-stone-900 border border-stone-700 text-xs font-semibold text-terracotta-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-saffron-400" />
            <span>{t.builtForTheme}</span>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>
            {t.footerText}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/my-trips" className="hover:text-white transition-colors">
              {t.myTrips}
            </Link>
            <a href="/#how-it-works-section" className="hover:text-white transition-colors">
              {t.howItWorks}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

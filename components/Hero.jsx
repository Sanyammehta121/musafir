'use client';

import { Sparkles, MapPin, ShieldCheck, HeartHandshake, Compass } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function Hero() {
  const { t } = useApp();

  return (
    <section className="relative pt-10 pb-8 sm:pt-16 sm:pb-12 overflow-hidden bg-gradient-to-b from-sand-100 via-sand-50 to-sand-50 dark:from-stone-900 dark:via-stone-950 dark:to-stone-950 border-b border-sand-300 dark:border-stone-800 transition-colors duration-200">
      {/* Decorative ambient blurs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-terracotta-200/30 dark:bg-terracotta-900/20 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-saffron-400/20 dark:bg-saffron-600/10 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Main Tagline Badge: MUSAFIR BANO, MEHMAN NHI */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 dark:bg-stone-800/90 backdrop-blur border border-terracotta-200 dark:border-terracotta-800 shadow-sm text-xs sm:text-sm font-bold text-terracotta-800 dark:text-terracotta-300 mb-6 tracking-wide">
          <Sparkles className="w-4 h-4 text-terracotta-600 dark:text-terracotta-400" />
          <span>{t.tagline}</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-stone-900 dark:text-white tracking-tight leading-[1.15]">
          {t.heroHeadlinePart1}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-terracotta-600 via-terracotta-500 to-saffron-600 dark:from-terracotta-400 dark:via-terracotta-300 dark:to-saffron-400">
            {t.heroHeadlinePart2}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg lg:text-xl text-stone-600 dark:text-stone-300 max-w-3xl mx-auto leading-relaxed">
          {t.heroSubtitle}
        </p>

        {/* Value Prop Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-medium text-stone-700 dark:text-stone-300">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 dark:bg-stone-800/90 border border-stone-200 dark:border-stone-700 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-sage-700 dark:text-sage-400" />
            <span>{t.realPlacesBadge}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 dark:bg-stone-800/90 border border-stone-200 dark:border-stone-700 shadow-xs">
            <HeartHandshake className="w-4 h-4 text-terracotta-600 dark:text-terracotta-400" />
            <span>{t.supportArtisansBadge}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 dark:bg-stone-800/90 border border-stone-200 dark:border-stone-700 shadow-xs">
            <Compass className="w-4 h-4 text-saffron-600 dark:text-saffron-400" />
            <span>{t.osmMapBadge}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

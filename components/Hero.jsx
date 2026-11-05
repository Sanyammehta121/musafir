import { Sparkles, MapPin, ShieldCheck, HeartHandshake, Compass } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-10 pb-8 sm:pt-16 sm:pb-12 overflow-hidden bg-gradient-to-b from-sand-100 via-sand-50 to-sand-50 border-b border-sand-300">
      {/* Subtle decorative background circles */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-terracotta-200/30 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-saffron-400/20 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Theme pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur border border-terracotta-200 shadow-sm text-xs font-semibold text-terracotta-800 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-terracotta-600" />
          <span>Explore Local: Escape the Tourist Traps</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-[1.15]">
          Uncover the Living Soul of{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-terracotta-600 via-terracotta-500 to-saffron-600">
            Any Town or Village.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg lg:text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
          Standard guidebooks push tourists to the same crowded checkpoints. LocalLore reveals
          secluded stepwells, centuries-old family kitchens, quiet weaver looms, and the forgotten
          cultural lore of any destination.
        </p>

        {/* Value Prop Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-medium text-stone-700">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 border border-stone-200 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-sage-700" />
            <span>100% Real, Verifiable Places</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 border border-stone-200 shadow-xs">
            <HeartHandshake className="w-4 h-4 text-terracotta-600" />
            <span>Supports Indigenous Artisans</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 border border-stone-200 shadow-xs">
            <Compass className="w-4 h-4 text-saffron-600" />
            <span>Smart OSM Leaflet Map + Directions</span>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import {
  MapPin,
  Clock,
  Compass,
  Lightbulb,
  ExternalLink,
  Gem,
  Tag,
  Coins
} from 'lucide-react';

export default function TimelineCard({ stop, destination, index }) {
  const encodedQuery = encodeURIComponent(`${stop.name} ${destination}`);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`;

  return (
    <div className="timeline-card group relative bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/90 dark:border-stone-800 hover:border-terracotta-300 dark:hover:border-terracotta-500 p-5 sm:p-6 transition-all duration-200 shadow-sm hover:shadow-md">
      {/* Top bar: Stop number, time slot, badge */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3">
        <div className="flex items-center gap-2.5">
          {/* Number badge */}
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-xs ${
            stop.isHiddenGem ? 'bg-sage-700 dark:bg-sage-600' : 'bg-terracotta-600 dark:bg-terracotta-500'
          }`}>
            {stop.stopNumber || index + 1}
          </div>

          <div className="flex items-center gap-1.5 text-xs font-medium text-stone-600 dark:text-stone-300 bg-sand-100/80 dark:bg-stone-800 px-2.5 py-1 rounded-lg">
            <Clock className="w-3.5 h-3.5 text-terracotta-600 dark:text-terracotta-400" />
            <span>{stop.timeSlot}</span>
            {stop.duration && (
              <span className="text-stone-400 dark:text-stone-500">· {stop.duration}</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {stop.isHiddenGem && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sage-50 dark:bg-sage-950/60 text-sage-800 dark:text-sage-300 border border-sage-500/30 dark:border-sage-700">
              <Gem className="w-3 h-3 text-sage-600 dark:text-sage-400" />
              <span>Hidden Gem</span>
            </span>
          )}

          {stop.type && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
              <Tag className="w-3 h-3 text-stone-400" />
              <span>{stop.type}</span>
            </span>
          )}
        </div>
      </div>

      {/* Stop Name */}
      <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900 dark:text-white group-hover:text-terracotta-700 dark:group-hover:text-terracotta-400 transition-colors">
        {stop.name}
      </h3>

      {/* Why it's special */}
      <p className="mt-2 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
        {stop.whySpecial}
      </p>

      {/* Cultural / Historical Significance */}
      {stop.culturalSignificance && (
        <div className="mt-3 p-3 rounded-xl bg-sand-50 dark:bg-stone-800/60 border border-sand-200/80 dark:border-stone-700 text-xs text-stone-700 dark:text-stone-300">
          <span className="font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-1 mb-1">
            <Compass className="w-3.5 h-3.5 text-terracotta-600 dark:text-terracotta-400" />
            Cultural Lore & History
          </span>
          <p className="italic text-stone-600 dark:text-stone-400">{stop.culturalSignificance}</p>
        </div>
      )}

      {/* Local Tip Box */}
      {stop.localTip && (
        <div className="mt-3 p-3 rounded-xl bg-terracotta-50/70 dark:bg-terracotta-950/40 border border-terracotta-200/70 dark:border-terracotta-900/50 text-xs text-terracotta-900 dark:text-terracotta-200">
          <span className="font-semibold flex items-center gap-1.5 mb-0.5 text-terracotta-800 dark:text-terracotta-300">
            <Lightbulb className="w-3.5 h-3.5 text-terracotta-600 dark:text-terracotta-400" />
            Local Tip:
          </span>
          <p className="text-stone-700 dark:text-stone-300">{stop.localTip}</p>
        </div>
      )}

      {/* Footer Details: Cost, Best Time, Google Maps Link */}
      <div className="mt-4 pt-3.5 border-t border-stone-100 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-stone-600 dark:text-stone-400">
          <div className="flex items-center gap-1 font-medium text-stone-800 dark:text-stone-200">
            <Coins className="w-3.5 h-3.5 text-saffron-600 dark:text-saffron-400" />
            <span>
              {stop.approxCostInr === 0 || stop.approxCostInr === '0' || stop.approxCostInr === 'Free'
                ? 'Free Admission'
                : `₹${stop.approxCostInr} approx`}
            </span>
          </div>

          {stop.bestTimeToVisit && (
            <div className="hidden sm:inline-flex items-center gap-1 text-stone-500 dark:text-stone-400">
              <span className="text-stone-400 dark:text-stone-500">Best at:</span>
              <span className="font-medium text-stone-700 dark:text-stone-300">{stop.bestTimeToVisit}</span>
            </div>
          )}
        </div>

        {/* Google Maps Directions Link */}
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-terracotta-50 dark:hover:bg-terracotta-900/40 text-stone-700 dark:text-stone-300 hover:text-terracotta-700 dark:hover:text-terracotta-300 border border-stone-200 dark:border-stone-700 hover:border-terracotta-200 font-medium transition-colors"
          title="Open directions in Google Maps"
        >
          <MapPin className="w-3.5 h-3.5 text-terracotta-600 dark:text-terracotta-400" />
          <span>Directions</span>
          <ExternalLink className="w-3 h-3 text-stone-400 group-hover:text-terracotta-600" />
        </a>
      </div>
    </div>
  );
}

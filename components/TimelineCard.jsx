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
    <div className="timeline-card group relative bg-white rounded-2xl border border-stone-200/90 hover:border-terracotta-300 p-5 sm:p-6 transition-all duration-200 shadow-sm hover:shadow-md">
      {/* Top bar: Stop number, time slot, badge */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3">
        <div className="flex items-center gap-2.5">
          {/* Number badge */}
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-xs ${
            stop.isHiddenGem ? 'bg-sage-700' : 'bg-terracotta-600'
          }`}>
            {stop.stopNumber || index + 1}
          </div>

          <div className="flex items-center gap-1.5 text-xs font-medium text-stone-600 bg-sand-100/80 px-2.5 py-1 rounded-lg">
            <Clock className="w-3.5 h-3.5 text-terracotta-600" />
            <span>{stop.timeSlot}</span>
            {stop.duration && (
              <span className="text-stone-400">· {stop.duration}</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {stop.isHiddenGem && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sage-50 text-sage-800 border border-sage-500/30">
              <Gem className="w-3 h-3 text-sage-600" />
              <span>Hidden Gem</span>
            </span>
          )}

          {stop.type && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-stone-100 text-stone-700">
              <Tag className="w-3 h-3 text-stone-400" />
              <span>{stop.type}</span>
            </span>
          )}
        </div>
      </div>

      {/* Stop Name */}
      <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900 group-hover:text-terracotta-700 transition-colors">
        {stop.name}
      </h3>

      {/* Why it's special */}
      <p className="mt-2 text-xs sm:text-sm text-stone-700 leading-relaxed">
        {stop.whySpecial}
      </p>

      {/* Cultural / Historical Significance */}
      {stop.culturalSignificance && (
        <div className="mt-3 p-3 rounded-xl bg-sand-50 border border-sand-200/80 text-xs text-stone-700">
          <span className="font-semibold text-stone-900 flex items-center gap-1 mb-1">
            <Compass className="w-3.5 h-3.5 text-terracotta-600" />
            Cultural Lore & History
          </span>
          <p className="italic text-stone-600">{stop.culturalSignificance}</p>
        </div>
      )}

      {/* Local Tip Box */}
      {stop.localTip && (
        <div className="mt-3 p-3 rounded-xl bg-terracotta-50/70 border border-terracotta-200/70 text-xs text-terracotta-900">
          <span className="font-semibold flex items-center gap-1.5 mb-0.5 text-terracotta-800">
            <Lightbulb className="w-3.5 h-3.5 text-terracotta-600" />
            Local Elder Tip:
          </span>
          <p className="text-stone-700">{stop.localTip}</p>
        </div>
      )}

      {/* Footer Details: Cost, Best Time, Google Maps Link */}
      <div className="mt-4 pt-3.5 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-stone-600">
          <div className="flex items-center gap-1 font-medium text-stone-800">
            <Coins className="w-3.5 h-3.5 text-saffron-600" />
            <span>
              {stop.approxCostInr === 0 || stop.approxCostInr === '0' || stop.approxCostInr === 'Free'
                ? 'Free Admission'
                : `₹${stop.approxCostInr} approx`}
            </span>
          </div>

          {stop.bestTimeToVisit && (
            <div className="hidden sm:inline-flex items-center gap-1 text-stone-500">
              <span className="text-stone-400">Best at:</span>
              <span className="font-medium text-stone-700">{stop.bestTimeToVisit}</span>
            </div>
          )}
        </div>

        {/* Google Maps Directions Link */}
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-terracotta-50 text-stone-700 hover:text-terracotta-700 border border-stone-200 hover:border-terracotta-200 font-medium transition-colors"
          title="Open directions in Google Maps"
        >
          <MapPin className="w-3.5 h-3.5 text-terracotta-600" />
          <span>Directions</span>
          <ExternalLink className="w-3 h-3 text-stone-400 group-hover:text-terracotta-600" />
        </a>
      </div>
    </div>
  );
}

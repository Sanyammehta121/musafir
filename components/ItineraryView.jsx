'use client';

import { useState, useEffect } from 'react';
import TimelineCard from './TimelineCard';
import MapComponent from './MapComponent';
import AskGuideChat from './AskGuideChat';
import {
  Bookmark,
  Share2,
  Printer,
  Sparkles,
  Utensils,
  BookOpen,
  Store,
  Check,
  Compass,
  ArrowLeft,
  Gem,
  Coins,
  MapPin,
  Clock,
  Info
} from 'lucide-react';
import { saveTrip, isTripSaved, generateShareText } from '@/lib/storage';
import { useApp } from '@/context/AppContext';

export default function ItineraryView({ itinerary, onReset }) {
  const { t } = useApp();
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (itinerary) {
      setSaved(isTripSaved(itinerary));
    }
  }, [itinerary]);

  if (!itinerary) return null;

  const handleToggleSave = () => {
    if (!saved) {
      saveTrip(itinerary);
      setSaved(true);
      window.dispatchEvent(new Event('tripSaved'));
    }
  };

  const handleCopyShare = async () => {
    const text = generateShareText(itinerary);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Clipboard copy failed:", err);
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const hiddenGemsCount = (itinerary.stops || []).filter(s => s.isHiddenGem).length;

  return (
    <div id="itinerary-print-area" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Action / Tool Bar (no-print) */}
      <div className="no-print flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-stone-200 dark:border-stone-800">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-750 text-stone-700 dark:text-stone-300 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-terracotta-600 dark:text-terracotta-400" />
          <span>{t.planAnotherBtn}</span>
        </button>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Save Button */}
          <button
            type="button"
            onClick={handleToggleSave}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs ${
              saved
                ? 'bg-sage-100 dark:bg-sage-900/40 text-sage-800 dark:text-sage-300 border border-sage-300 dark:border-sage-700'
                : 'bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-terracotta-300 hover:bg-terracotta-50 dark:hover:bg-stone-750'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-sage-700 text-sage-700 dark:fill-sage-400 dark:text-sage-400' : 'text-stone-500'}`} />
            <span>{saved ? t.savedInTripsBtn : t.saveTripBtn}</span>
          </button>

          {/* Copy Share Text */}
          <button
            type="button"
            onClick={handleCopyShare}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-750 text-stone-700 dark:text-stone-300 transition-all shadow-xs"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-700 dark:text-emerald-400">{t.copiedBtn}</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-stone-500" />
                <span>{t.shareSummaryBtn}</span>
              </>
            )}
          </button>

          {/* Print / Save PDF Button */}
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-terracotta-600 hover:bg-terracotta-700 text-white transition-all shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>{t.printPdfBtn}</span>
          </button>
        </div>
      </div>

      {/* Notice Banner (if fallback active) */}
      {itinerary._notice && (
        <div className="no-print mb-6 p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200">
          <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Curated Verified Engine Active</p>
            <p className="text-amber-800 dark:text-amber-300 mt-0.5">{itinerary._notice}</p>
          </div>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-br from-white via-sand-50 to-sand-100 dark:from-stone-900 dark:via-stone-900 dark:to-stone-950 rounded-3xl p-6 sm:p-8 lg:p-10 border border-stone-200/90 dark:border-stone-800 shadow-md mb-8 transition-colors duration-200">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-terracotta-100 dark:bg-terracotta-900/50 text-terracotta-800 dark:text-terracotta-300 border border-terracotta-200 dark:border-terracotta-800">
            <MapPin className="w-3.5 h-3.5" />
            {itinerary.destination}
          </span>

          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
            <Clock className="w-3.5 h-3.5 text-stone-500" />
            {itinerary.duration}
          </span>

          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
            <Coins className="w-3.5 h-3.5 text-stone-500" />
            Budget: {itinerary.budget}
          </span>

          {hiddenGemsCount > 0 && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-sage-100 dark:bg-sage-900/50 text-sage-800 dark:text-sage-300 border border-sage-500/20 dark:border-sage-700">
              <Gem className="w-3.5 h-3.5 text-sage-700 dark:text-sage-400" />
              {hiddenGemsCount} Hidden Gems Included
            </span>
          )}
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 dark:text-white leading-tight">
          {itinerary.title}
        </h1>

        {itinerary.tagline && (
          <p className="mt-2 text-sm sm:text-base font-medium text-terracotta-700 dark:text-terracotta-400 italic">
            "{itinerary.tagline}"
          </p>
        )}

        {itinerary.intro && (
          <p className="mt-4 text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-4xl leading-relaxed">
            {itinerary.intro}
          </p>
        )}
      </div>

      {/* Main Grid: Timeline + Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Timeline column */}
        <div className="lg:col-span-7 space-y-5">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-800">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-terracotta-600 dark:text-terracotta-400" />
              <span>{t.timedStopsTitle}</span>
            </h2>
            <span className="text-xs text-stone-500 dark:text-stone-400">
              {itinerary.stops?.length || 0} stops curated
            </span>
          </div>

          <div className="space-y-4">
            {itinerary.stops?.map((stop, index) => (
              <TimelineCard
                key={index}
                stop={stop}
                destination={itinerary.destination}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Map column */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-800">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-terracotta-600 dark:text-terracotta-400" />
              <span>{t.routeMapTitle}</span>
            </h2>
            <span className="text-xs text-stone-500 dark:text-stone-400">OSM + Nominatim</span>
          </div>

          <MapComponent
            stops={itinerary.stops || []}
            destination={itinerary.destination}
          />
        </div>
      </div>

      {/* Three Pillar Cards: Food, Artisans, Etiquette */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1. Must-Try Local Food */}
        <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200/90 dark:border-stone-800 shadow-sm flex flex-col justify-between transition-colors">
          <div>
            <div className="flex items-center gap-2.5 mb-4 text-terracotta-600 dark:text-terracotta-400">
              <div className="w-9 h-9 rounded-xl bg-terracotta-50 dark:bg-terracotta-900/40 flex items-center justify-center">
                <Utensils className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900 dark:text-white">
                {t.mustTryFoodTitle}
              </h3>
            </div>

            <div className="space-y-4">
              {itinerary.mustTryFood?.map((item, i) => (
                <div key={i} className="text-xs space-y-1 pb-3 border-b border-stone-100 dark:border-stone-800 last:border-0">
                  <div className="flex items-center justify-between font-bold text-stone-900 dark:text-stone-100">
                    <span>{item.dish}</span>
                    {item.approxCostInr && (
                      <span className="text-terracotta-600 dark:text-terracotta-400 font-semibold text-[11px]">
                        ₹{item.approxCostInr}
                      </span>
                    )}
                  </div>
                  <p className="text-stone-600 dark:text-stone-300 leading-relaxed">{item.description}</p>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 font-medium">
                    <span className="text-stone-400">Where:</span> {item.whereToFind}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Local Artisans & Markets */}
        <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200/90 dark:border-stone-800 shadow-sm flex flex-col justify-between transition-colors">
          <div>
            <div className="flex items-center gap-2.5 mb-4 text-sage-700 dark:text-sage-400">
              <div className="w-9 h-9 rounded-xl bg-sage-50 dark:bg-sage-900/40 flex items-center justify-center">
                <Store className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900 dark:text-white">
                {t.artisansTitle}
              </h3>
            </div>

            <div className="space-y-4">
              {itinerary.localArtisansAndMarkets?.map((artisan, i) => (
                <div key={i} className="text-xs space-y-1 pb-3 border-b border-stone-100 dark:border-stone-800 last:border-0">
                  <h4 className="font-bold text-stone-900 dark:text-stone-100">{artisan.name}</h4>
                  <p className="text-sage-800 dark:text-sage-300 font-medium text-[11px]">{artisan.craftOrSpecialty}</p>
                  <p className="text-stone-600 dark:text-stone-300 leading-relaxed">{artisan.whyVisit}</p>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">
                    <span className="text-stone-400">Location:</span> {artisan.location}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Etiquette & Respectful Norms */}
        <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200/90 dark:border-stone-800 shadow-sm flex flex-col justify-between transition-colors">
          <div>
            <div className="flex items-center gap-2.5 mb-4 text-saffron-600 dark:text-saffron-400">
              <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900 dark:text-white">
                {t.etiquetteTitle}
              </h3>
            </div>

            <ul className="space-y-3">
              {itinerary.localEtiquetteAndTips?.map((tip, i) => (
                <li key={i} className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-saffron-500 mt-1.5 shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Interactive Chat: Ask the Guide */}
      <AskGuideChat itinerary={itinerary} />
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getSavedTrips, removeSavedTrip } from '@/lib/storage';
import ItineraryView from '@/components/ItineraryView';
import {
  Bookmark,
  Trash2,
  Calendar,
  MapPin,
  Clock,
  ArrowLeft,
  Compass,
  Eye,
  Plus
} from 'lucide-react';

export default function MyTripsPage() {
  const [savedTrips, setSavedTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setSavedTrips(getSavedTrips());
  }, []);

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (confirm("Remove this itinerary from your saved trips?")) {
      removeSavedTrip(id);
      setSavedTrips(getSavedTrips());
      if (selectedTrip?.id === id) {
        setSelectedTrip(null);
      }
      window.dispatchEvent(new Event('tripSaved'));
    }
  };

  if (!isClient) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center text-stone-500">
        Loading saved trips...
      </div>
    );
  }

  // If a saved trip is clicked to view
  if (selectedTrip) {
    return (
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 no-print">
          <button
            onClick={() => setSelectedTrip(null)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-terracotta-600" />
            <span>Back to All Saved Trips</span>
          </button>
        </div>
        <ItineraryView itinerary={selectedTrip} onReset={() => setSelectedTrip(null)} />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stone-200 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Bookmark className="w-5 h-5 text-terracotta-600" />
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              My Saved Trips
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-stone-600">
            Itineraries and cultural guides stored locally in your browser.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Plan New Trip</span>
        </Link>
      </div>

      {/* Empty State */}
      {savedTrips.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white border border-stone-200 shadow-sm max-w-xl mx-auto my-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-terracotta-50 text-terracotta-600 flex items-center justify-center mb-4">
            <Compass className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-xl font-bold text-stone-900">
            No saved itineraries yet
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed max-w-md mx-auto">
            Explore a destination, discover hidden local lore, and tap "Save Itinerary" to keep your journey accessible offline!
          </p>
          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-sm"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Destinations Now</span>
            </Link>
          </div>
        </div>
      ) : (
        /* Saved Trips List */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedTrips.map((trip) => (
            <div
              key={trip.id}
              onClick={() => setSelectedTrip(trip)}
              className="group bg-white rounded-3xl p-6 border border-stone-200 hover:border-terracotta-400 cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-terracotta-50 text-terracotta-800">
                    <MapPin className="w-3 h-3 text-terracotta-600" />
                    {trip.destination}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => handleDelete(trip.id, e)}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Remove saved itinerary"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-terracotta-700 transition-colors leading-snug">
                  {trip.title}
                </h3>

                <p className="mt-2 text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {trip.intro || trip.tagline}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    {trip.duration}
                  </span>
                  <span>·</span>
                  <span>{trip.stops?.length || 0} stops</span>
                </div>

                <span className="font-semibold text-terracotta-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  <span>View</span>
                  <Eye className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

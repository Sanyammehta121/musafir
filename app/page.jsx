'use client';

import { useState } from 'react';
import Hero from '@/components/Hero';
import QuickStartChips from '@/components/QuickStartChips';
import PlannerForm from '@/components/PlannerForm';
import HowItWorks from '@/components/HowItWorks';
import SkeletonLoader from '@/components/SkeletonLoader';
import ItineraryView from '@/components/ItineraryView';
import { AlertCircle, RefreshCw, Compass } from 'lucide-react';

export default function HomePage() {
  const [formData, setFormData] = useState({
    destination: '',
    duration: '1 Day',
    budget: 'Medium',
    interests: ['History', 'Food', 'Crafts/Markets'],
    groupType: 'Solo',
    preferHiddenGems: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState(null);

  const handlePlanTrip = async (dataToSubmit) => {
    const payload = dataToSubmit || formData;
    if (!payload.destination || !payload.destination.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || `Server responded with status ${response.status}`);
      }

      const plan = await response.json();
      setItinerary(plan);

      // Smooth scroll to top of itinerary
      setTimeout(() => {
        window.scrollTo({ top: 120, behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error("Trip planning error:", err);
      setError(err.message || "Failed to generate itinerary. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPreset = (preset) => {
    const newForm = {
      destination: preset.destination,
      duration: preset.duration,
      budget: preset.budget,
      interests: preset.interests,
      groupType: preset.groupType,
      preferHiddenGems: preset.preferHiddenGems,
    };
    setFormData(newForm);
    handlePlanTrip(newForm);
  };

  const handleReset = () => {
    setItinerary(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pb-16">
      {!itinerary && !isLoading && (
        <>
          <Hero />
          <QuickStartChips onSelectPreset={handleSelectPreset} isLoading={isLoading} />
        </>
      )}

      {/* Error Banner */}
      {error && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 flex items-start justify-between gap-3 shadow-xs">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm">Unable to generate itinerary</h4>
                <p className="text-xs text-red-700 mt-0.5">{error}</p>
              </div>
            </div>
            <button
              onClick={() => handlePlanTrip()}
              className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          </div>
        </div>
      )}

      {/* Loading Skeleton State */}
      {isLoading && (
        <SkeletonLoader destination={formData.destination || "your destination"} />
      )}

      {/* Active Itinerary View */}
      {itinerary && !isLoading && (
        <ItineraryView itinerary={itinerary} onReset={handleReset} />
      )}

      {/* Planner Form & How It Works (shown when no active itinerary) */}
      {!itinerary && !isLoading && (
        <>
          <PlannerForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handlePlanTrip}
            isLoading={isLoading}
          />
          <HowItWorks />
        </>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import {
  MapPin,
  Clock,
  Wallet,
  Users,
  Compass,
  Sparkles,
  Search,
  Gem,
  Check,
  IndianRupee
} from 'lucide-react';

const INTEREST_OPTIONS = [
  { id: 'History', label: 'History', icon: '🏛️' },
  { id: 'Food', label: 'Local Food', icon: '🍲' },
  { id: 'Nature', label: 'Nature', icon: '🌿' },
  { id: 'Spiritual', label: 'Spiritual', icon: '🪔' },
  { id: 'Crafts/Markets', label: 'Crafts & Bazaars', icon: '🧵' },
  { id: 'Photography', label: 'Photography', icon: '📷' },
  { id: 'Adventure', label: 'Adventure', icon: '🧗' },
  { id: 'Festivals', label: 'Festivals & Lore', icon: '🎉' },
];

const QUICK_DURATIONS = [
  '4 Hours',
  '8 Hours',
  '1 Day',
  '2 Days',
  '3 Days',
];

const QUICK_BUDGETS = [
  { label: '₹800 (Low)', val: '₹800' },
  { label: '₹2,500 (Med)', val: '₹2,500' },
  { label: '₹6,000 (High)', val: '₹6,000' },
];

const GROUP_OPTIONS = [
  { id: 'Solo', label: 'Solo Traveler', icon: '🎒' },
  { id: 'Friends', label: 'With Friends', icon: '👥' },
  { id: 'Family', label: 'Family with Kids/Elders', icon: '👨‍👩‍👧‍👦' },
];

export default function PlannerForm({
  formData,
  setFormData,
  onSubmit,
  isLoading
}) {
  const toggleInterest = (interestId) => {
    setFormData(prev => {
      const exists = prev.interests.includes(interestId);
      const updated = exists
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId];
      return { ...prev, interests: updated };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.destination || formData.destination.trim().length === 0) {
      return;
    }
    onSubmit(formData);
  };

  return (
    <div id="planner-section" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xl shadow-stone-200/50 overflow-hidden">
        {/* Header bar */}
        <div className="px-6 sm:px-8 py-5 bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-white flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-terracotta-500/20 border border-terracotta-400/30 flex items-center justify-center text-terracotta-400">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold">Personalize Your Exploration</h2>
              <p className="text-xs text-stone-300">Be a traveler, not a guest — tailor your journey</p>
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs text-stone-200 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-saffron-400" />
            <span>Powered by Gemini 2.5 Flash</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-7">
          {/* Destination Input */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-stone-800 uppercase tracking-wider mb-2">
              Where are you going? <span className="text-terracotta-600">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400">
                <MapPin className="w-5 h-5 text-terracotta-600" />
              </div>
              <input
                type="text"
                required
                value={formData.destination}
                onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                placeholder="Enter any city, town, or village (e.g. Almora, Orchha, Hampi, Madurai, Leh, Shantiniketan)"
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-sand-50/70 border border-stone-300 text-stone-900 placeholder-stone-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-terracotta-500 transition-all shadow-inner"
              />
            </div>
            <p className="mt-1.5 text-xs text-stone-500">
              Works for world capitals, small temple hamlets, coastal fishing villages, and mountain towns.
            </p>
          </div>

          {/* Grid: Variable Duration, Variable Budget, Group */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Variable Duration / Time */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-terracotta-600" />
                Available Time (Input Any Duration)
              </label>
              <div className="relative mb-2">
                <input
                  type="text"
                  required
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  placeholder="e.g. 5 Hours, 3 Days, 1.5 Days"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-sand-50/70 border border-stone-300 text-stone-900 placeholder-stone-400 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-terracotta-500 transition-all"
                />
              </div>
              {/* Quick Presets */}
              <div className="flex flex-wrap gap-1">
                {QUICK_DURATIONS.map((dur) => (
                  <button
                    key={dur}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, duration: dur }))}
                    className={`py-1 px-2 text-[11px] font-medium rounded-lg border text-center transition-all ${
                      formData.duration === dur
                        ? 'bg-terracotta-600 border-terracotta-600 text-white font-semibold shadow-xs'
                        : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    {dur}
                  </button>
                ))}
              </div>
            </div>

            {/* Variable Budget */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Wallet className="w-4 h-4 text-terracotta-600" />
                Estimated Budget (Input in INR)
              </label>
              <div className="relative mb-2">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                  <span className="font-bold text-stone-600 text-sm">₹</span>
                </div>
                <input
                  type="text"
                  required
                  value={formData.budget}
                  onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                  placeholder="e.g. 1500, 3000, 10000"
                  className="w-full pl-8 pr-3.5 py-2.5 rounded-xl bg-sand-50/70 border border-stone-300 text-stone-900 placeholder-stone-400 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-terracotta-500 transition-all"
                />
              </div>
              {/* Quick Presets */}
              <div className="flex flex-wrap gap-1">
                {QUICK_BUDGETS.map((b) => (
                  <button
                    key={b.val}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, budget: b.val }))}
                    className={`py-1 px-2 text-[11px] font-medium rounded-lg border text-center transition-all ${
                      formData.budget === b.val
                        ? 'bg-terracotta-600 border-terracotta-600 text-white font-semibold shadow-xs'
                        : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Group Type */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-terracotta-600" />
                Who is Traveling?
              </label>
              <div className="grid grid-cols-3 gap-1.5 pt-0.5">
                {GROUP_OPTIONS.map((grp) => (
                  <button
                    key={grp.id}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, groupType: grp.id }))}
                    className={`p-2 rounded-xl border text-center transition-all flex flex-col items-center justify-center ${
                      formData.groupType === grp.id
                        ? 'bg-terracotta-50 border-terracotta-600 text-terracotta-900 shadow-xs ring-1 ring-terracotta-600'
                        : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    <span className="text-base">{grp.icon}</span>
                    <span className="font-bold text-xs mt-0.5">{grp.id}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interests Multi-Select Chips */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                Select Interests (Tap to toggle)
              </label>
              <span className="text-[11px] text-stone-500">
                {formData.interests.length} selected
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {INTEREST_OPTIONS.map((item) => {
                const isSelected = formData.interests.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleInterest(item.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-terracotta-600 text-white shadow-xs font-semibold'
                        : 'bg-sand-100/80 border border-stone-200/90 text-stone-700 hover:bg-sand-200/60'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                    {isSelected && <Check className="w-3 h-3 ml-0.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Hidden Gem Toggle */}
          <div className="p-4 rounded-2xl bg-sand-100/70 border border-sand-300 flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-sage-500/10 border border-sage-500/20 flex items-center justify-center text-sage-700 shrink-0 mt-0.5">
                <Gem className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold text-stone-900">
                  Prefer Hidden Gems over Famous Tourist Spots
                </p>
                <p className="text-[11px] sm:text-xs text-stone-500">
                  Filters out overcrowded tourist traps in favor of secluded heritage, neighborhood eateries, and artisan studios.
                </p>
              </div>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={formData.preferHiddenGems}
              onClick={() => setFormData(prev => ({ ...prev, preferHiddenGems: !prev.preferHiddenGems }))}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:ring-offset-2 ${
                formData.preferHiddenGems ? 'bg-terracotta-600' : 'bg-stone-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  formData.preferHiddenGems ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading || !formData.destination.trim()}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-terracotta-600 to-terracotta-700 hover:from-terracotta-700 hover:to-terracotta-800 text-white font-medium text-sm sm:text-base tracking-wide shadow-lg shadow-terracotta-600/30 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2.5"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Consulting Local Elders & Mapping Hidden Gems...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-saffron-300" />
                  <span>Generate Authentic Local Itinerary</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

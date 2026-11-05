import { QUICK_START_PRESETS } from '@/lib/mockData';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function QuickStartChips({ onSelectPreset, isLoading }) {
  return (
    <div id="quick-start-chips" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
      <div className="flex items-center gap-2 mb-3 text-xs font-semibold tracking-wider uppercase text-stone-500">
        <Sparkles className="w-3.5 h-3.5 text-terracotta-600" />
        <span>One-Click Judge & Explorer Quick Starts:</span>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {QUICK_START_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            disabled={isLoading}
            onClick={() => onSelectPreset(preset)}
            className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium bg-white/95 border border-stone-200 hover:border-terracotta-400 hover:bg-terracotta-50/50 text-stone-800 transition-all shadow-xs hover:shadow-sm active:scale-98 disabled:opacity-50"
            title={preset.tagline}
          >
            <span className="w-2 h-2 rounded-full bg-terracotta-500 group-hover:scale-125 transition-transform" />
            <span className="font-medium text-stone-800 group-hover:text-terracotta-700">
              {preset.chipLabel}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-terracotta-600 group-hover:translate-x-0.5 transition-all" />
          </button>
        ))}
      </div>
    </div>
  );
}

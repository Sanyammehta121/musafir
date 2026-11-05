'use client';

import { QUICK_START_PRESETS } from '@/lib/mockData';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function QuickStartChips({ onSelectPreset, isLoading }) {
  const { t } = useApp();

  return (
    <div id="quick-start-chips" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
      <div className="flex items-center gap-2 mb-3 text-xs font-semibold tracking-wider uppercase text-stone-500 dark:text-stone-400">
        <Sparkles className="w-3.5 h-3.5 text-terracotta-600 dark:text-terracotta-400" />
        <span>{t.quickStartsTitle}</span>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {QUICK_START_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            disabled={isLoading}
            onClick={() => onSelectPreset(preset)}
            className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium bg-white/95 dark:bg-stone-800/90 border border-stone-200 dark:border-stone-700 hover:border-terracotta-400 dark:hover:border-terracotta-500 hover:bg-terracotta-50/50 dark:hover:bg-terracotta-900/20 text-stone-800 dark:text-stone-200 transition-all shadow-xs hover:shadow-sm active:scale-98 disabled:opacity-50"
            title={preset.tagline}
          >
            <span className="w-2 h-2 rounded-full bg-terracotta-500 group-hover:scale-125 transition-transform" />
            <span className="font-medium text-stone-800 dark:text-stone-200 group-hover:text-terracotta-700 dark:group-hover:text-terracotta-400">
              {preset.chipLabel}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-terracotta-600 group-hover:translate-x-0.5 transition-all" />
          </button>
        ))}
      </div>
    </div>
  );
}

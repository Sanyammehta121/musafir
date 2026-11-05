'use client';

import { Compass, Sparkles, MapPin } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function HowItWorks() {
  const { t } = useApp();

  const steps = [
    {
      num: "01",
      title: t.step1Title,
      desc: t.step1Desc,
      icon: MapPin,
    },
    {
      num: "02",
      title: t.step2Title,
      desc: t.step2Desc,
      icon: Sparkles,
    },
    {
      num: "03",
      title: t.step3Title,
      desc: t.step3Desc,
      icon: Compass,
    },
  ];

  return (
    <section id="how-it-works-section" className="py-14 sm:py-20 bg-sand-100/60 dark:bg-stone-900/40 border-t border-sand-300 dark:border-stone-800 transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold text-terracotta-700 dark:text-terracotta-400 mb-3 shadow-xs">
          <span>{t.howItWorks}</span>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 dark:text-white tracking-tight">
          Three Steps to Authentic Exploration
        </h2>

        <p className="mt-3 text-stone-600 dark:text-stone-300 text-xs sm:text-sm max-w-2xl mx-auto">
          We combine cutting-edge AI reasoning with strict ground-truth factuality so every stop is physically verifiable.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-white dark:bg-stone-800/90 rounded-3xl p-6 sm:p-7 border border-stone-200 dark:border-stone-700 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-terracotta-50 dark:bg-terracotta-900/40 text-terracotta-600 dark:text-terracotta-400 flex items-center justify-center font-bold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-serif text-2xl font-bold text-stone-300 dark:text-stone-600">
                    {step.num}
                  </span>
                </div>

                <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900 dark:text-white mb-2">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

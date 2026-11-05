'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Compass,
  Bookmark,
  Sparkles,
  MapPin,
  HelpCircle,
  Sun,
  Moon,
  Globe,
  Menu,
  X
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { getSavedTrips } from '@/lib/storage';
import { useApp } from '@/context/AppContext';

export default function Header() {
  const router = useRouter();
  const { theme, toggleTheme, language, changeLanguage, languages, t, mounted } = useApp();
  const [savedCount, setSavedCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  useEffect(() => {
    const updateCount = () => {
      const trips = getSavedTrips();
      setSavedCount(trips.length);
    };

    updateCount();
    window.addEventListener('storage', updateCount);
    window.addEventListener('tripSaved', updateCount);
    return () => {
      window.removeEventListener('storage', updateCount);
      window.removeEventListener('tripSaved', updateCount);
    };
  }, []);

  const handleNavToSection = (sectionId) => {
    setMobileMenuOpen(false);
    // If not on home page, push to home with hash
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      router.push(`/#${sectionId}`);
      setTimeout(() => {
        window.dispatchEvent(new Event('openPlanner'));
      }, 200);
      return;
    }

    // If on home page, signal page to reset view if itinerary is displayed
    window.dispatchEvent(new Event('openPlanner'));
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <header className="sticky top-0 z-40 bg-sand-50/90 dark:bg-stone-900/90 backdrop-blur-md border-b border-sand-300 dark:border-stone-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-terracotta-500 to-terracotta-700 flex items-center justify-center text-white shadow-md shadow-terracotta-500/20 group-hover:scale-105 transition-transform">
            <Compass className="w-6 h-6 animate-pulse-subtle" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-xl font-bold tracking-wider text-stone-900 dark:text-white">
                MUSA<span className="text-terracotta-600 dark:text-terracotta-400">FIR</span>
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-terracotta-100 dark:bg-terracotta-900/40 text-terracotta-800 dark:text-terracotta-300 border border-terracotta-200 dark:border-terracotta-800">
                AI Guide
              </span>
            </div>
            <p className="text-[11px] font-medium text-terracotta-700 dark:text-terracotta-300 hidden sm:block tracking-wide">
              {t.tagline}
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          <button
            type="button"
            onClick={() => handleNavToSection('planner-section')}
            className="text-xs sm:text-sm font-semibold text-stone-700 dark:text-stone-300 hover:text-terracotta-600 dark:hover:text-terracotta-400 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-terracotta-600 dark:text-terracotta-400" />
            <span>{t.planTrip}</span>
          </button>

          <button
            type="button"
            onClick={() => handleNavToSection('how-it-works-section')}
            className="text-xs sm:text-sm font-semibold text-stone-700 dark:text-stone-300 hover:text-terracotta-600 dark:hover:text-terracotta-400 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-stone-400" />
            <span>{t.howItWorks}</span>
          </button>

          <Link
            href="/my-trips"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-750 transition-all shadow-xs"
          >
            <Bookmark className="w-4 h-4 text-terracotta-600 dark:text-terracotta-400" />
            <span>{t.myTrips}</span>
            {savedCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 text-[11px] font-bold rounded-full bg-terracotta-500 text-white">
                {savedCount}
              </span>
            )}
          </Link>
        </nav>

        {/* Actions: Language Selector, Dark Mode Toggle, Mobile Menu Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Multilingual Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors shadow-xs"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-terracotta-600 dark:text-terracotta-400" />
              <span className="uppercase">{language}</span>
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 max-h-80 overflow-y-auto rounded-2xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-xl py-1.5 z-50 animate-fadeIn divide-y divide-stone-100 dark:divide-stone-750">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      changeLanguage(l.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-medium flex items-center justify-between transition-colors ${
                      language === l.code
                        ? 'bg-terracotta-50 dark:bg-terracotta-900/30 text-terracotta-700 dark:text-terracotta-300 font-bold'
                        : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700'
                    }`}
                  >
                    <span>{l.native}</span>
                    <span className="text-[10px] text-stone-400 uppercase">{l.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-amber-400 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors shadow-xs"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Dark Mode"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
            ) : (
              <Moon className="w-4 h-4 text-stone-600" />
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-6 bg-sand-100/95 dark:bg-stone-900/95 border-b border-stone-300 dark:border-stone-800 space-y-3 animate-fadeIn">
          <p className="text-xs font-semibold text-terracotta-700 dark:text-terracotta-400 italic">
            "{t.tagline}"
          </p>

          <button
            type="button"
            onClick={() => handleNavToSection('planner-section')}
            className="w-full text-left py-2.5 px-3 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-2"
          >
            <MapPin className="w-4 h-4 text-terracotta-600 dark:text-terracotta-400" />
            <span>{t.planTrip}</span>
          </button>

          <button
            type="button"
            onClick={() => handleNavToSection('how-it-works-section')}
            className="w-full text-left py-2.5 px-3 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-2"
          >
            <HelpCircle className="w-4 h-4 text-stone-400" />
            <span>{t.howItWorks}</span>
          </button>

          <Link
            href="/my-trips"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-2.5 px-3 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm font-semibold text-stone-800 dark:text-stone-200 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-terracotta-600 dark:text-terracotta-400" />
              <span>{t.myTrips}</span>
            </div>
            {savedCount > 0 && (
              <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-terracotta-500 text-white">
                {savedCount}
              </span>
            )}
          </Link>

          {/* Mobile Local Indian Languages */}
          <div className="pt-2 border-t border-stone-200 dark:border-stone-800">
            <span className="text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider block mb-2">
              Choose Indian Language:
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {languages.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => {
                    changeLanguage(l.code);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium text-left transition-colors flex items-center justify-between ${
                    language === l.code
                      ? 'bg-terracotta-600 text-white font-bold'
                      : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700'
                  }`}
                >
                  <span>{l.native}</span>
                  <span className="text-[10px] opacity-70 uppercase">{l.code}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

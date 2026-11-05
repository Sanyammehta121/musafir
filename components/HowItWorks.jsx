import { Compass, Sparkles, MapPin, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Name Any Destination",
      desc: "From major cultural capitals like Jaipur and Varanasi to hidden hamlets like Almora or Chettinad, simply enter any place name.",
      icon: MapPin,
    },
    {
      num: "02",
      title: "AI Curates Real Local Lore",
      desc: "Gemini 2.5 Flash filters out tourist traps to prioritize real centuries-old workshops, hidden stepwells, and ancestral recipes.",
      icon: Sparkles,
    },
    {
      num: "03",
      title: "Walk with Map & Local Guide",
      desc: "Follow the numbered OpenStreetMap route, open Google Maps directions with 1 click, and chat with our local guide companion.",
      icon: Compass,
    },
  ];

  return (
    <section id="how-it-works-section" className="py-14 sm:py-20 bg-sand-100/60 border-t border-sand-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-stone-200 text-xs font-semibold text-terracotta-700 mb-3 shadow-xs">
          <span>How LocalLore Works</span>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 tracking-tight">
          Three Steps to Authentic Exploration
        </h2>

        <p className="mt-3 text-stone-600 text-xs sm:text-sm max-w-2xl mx-auto">
          We combine cutting-edge AI reasoning with strict ground-truth factuality so every stop is physically verifiable.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-terracotta-50 text-terracotta-600 flex items-center justify-center font-bold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-serif text-2xl font-bold text-stone-300">
                    {step.num}
                  </span>
                </div>

                <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900 mb-2">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
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

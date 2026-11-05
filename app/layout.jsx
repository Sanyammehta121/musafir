import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'MUSAFIR – Be a traveler, not a guest | AI Local Tourism Guide',
  description:
    'MUSAFIR: Be a traveler, not a guest. Discover authentic hidden gems, century-old artisan workshops, traditional food, and cultural lore for any town or village. Powered by Google Gemini 2.5 Flash & OpenStreetMap.',
  keywords: [
    'local tourism',
    'hidden gems',
    'travel itinerary planner',
    'local food',
    'artisans',
    'cultural travel',
    'explore local',
    'gemini ai travel',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-sand-50 text-stone-900 selection:bg-terracotta-200 selection:text-terracotta-900 font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AppProvider } from '@/context/AppContext';

export const metadata = {
  title: 'MUSAFIR – MUSAFIR BANO, MEHMAN NHI | AI Local Tourism Guide',
  description:
    'MUSAFIR: MUSAFIR BANO, MEHMAN NHI. Discover authentic hidden gems, century-old artisan workshops, traditional food, and cultural lore for any town or village. Powered by Google Gemini 2.5 Flash & OpenStreetMap.',
  keywords: [
    'musafir',
    'musafir bano mehman nhi',
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
      <body className="min-h-screen flex flex-col bg-sand-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 selection:bg-terracotta-200 selection:text-terracotta-900 font-sans transition-colors duration-200">
        <AppProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}

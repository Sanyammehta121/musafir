# MUSAFIR 🧭 – Be a traveler, not a guest

> **Tagline**: *"Be a traveler, not a guest"*  
> **Theme**: Explore Local  
> **Tech Stack**: Next.js 14 (App Router) + Tailwind CSS + Google Gemini 2.5 Flash + Leaflet / OpenStreetMap  
> **Zero Database Required** · **Zero Map API Key Required**

---

## 📌 Problem
Mass-market tourism channels crowds into the same 3–4 famous checkpoints in every city. Meanwhile, authentic century-old family kitchens, secluded stepwells, indigenous handloom weavers, clay potters, and rich neighborhood cultural lore remain undiscovered. Planning an authentic local trip requires scouring dozens of scattered blogs, blogs with outdated information, and tourist-trap recommendations.

## 💡 Solution
**MUSAFIR** is a hyper-localized, factuality-grounded AI tourism guide with a simple philosophy: *"Be a traveler, not a guest"*. By pairing **Google Gemini 2.5 Flash** with strict verifiability rules and **Leaflet + OpenStreetMap**, MUSAFIR generates step-by-step timed itineraries specifically highlighting real hidden gems, regional food spots, direct-to-artisan guilds, and cultural etiquette for any town, city, or village.

---

## 🌟 Key Features

1. **Intelligent Local Trip Planner**:
   - Destination: Any city, town, or village across the globe.
   - **Variable Available Time**: Input any custom hours or days (e.g., 5 Hours, 3 Days) or choose quick presets.
   - **Variable Budget in INR**: Input your exact target budget in ₹ (e.g., ₹1,500, ₹4,000) or choose quick tiers.
   - Multi-interest tags (History, Food, Nature, Spiritual, Crafts/Markets, Photography, Adventure, Festivals).
   - Solo / Family / Friends group adaptations.
   - Dedicated toggle: *"Prefer hidden gems over famous spots"*.

2. **Ground-Truth AI Itineraries (Gemini 2.5 Flash)**:
   - Structured JSON: Trip title, evocative intro, timed stops with duration, why it's special, cultural lore, local elder tips, approx cost in INR, and best visit times.
   - **Hidden Gem Badges**: Visually highlighting undiscovered spots.
   - **Must-Try Local Food**: 3–5 native dishes with exact recommended stalls/eateries.
   - **Artisans & Guilds**: Direct-to-artisan workshops preserving indigenous handicrafts.
   - **Local Etiquette & Tips**: Modesty norms, photography permissions, and negotiation tips.

3. **Interactive OpenStreetMap + Directions**:
   - Numbered interactive Leaflet map markers geocoded politely via Nominatim.
   - Distinct green gem pins for hidden spots.
   - One-click Google Maps directions link for every single stop (`https://www.google.com/maps/search/?api=1&query=<name>+<destination>`).

4. **Ask-the-Guide Interactive Chat**:
   - Ask real-time questions about night safety, budgeting, dietary preferences, or transit directly below the itinerary with full itinerary context.

5. **Local Indian Languages & Dark Mode**:
   - **8 Local Indian Languages**: 1-click toggle across English, हिन्दी (Hindi), मराठी (Marathi), বাংলা (Bengali), தமிழ் (Tamil), తెలుగు (Telugu), ગુજરાતી (Gujarati), and ಕನ್ನಡ (Kannada).
   - Generates culturally grounded responses directly in regional Indian scripts via Gemini 2.5 Flash.
   - **Full Dark Mode**: Automatic system preference detection and 1-click toggle with persistent localStorage.

6. **Save & Share**:
   - Save trips to `localStorage` ("My Trips" page).
   - Print & PDF download with dedicated `@media print` clean stylesheet.
   - 1-click clipboard summary export for WhatsApp and notes.

7. **Quick-Start Preset Chips**:
   - 1-click presets for judges: Varanasi (Dawn Ghats & Silk Weavers), Pondicherry (Franco-Tamil Quarters), Jaipur (Secret Stepwells), Fort Kochi (Spice Guilds), and Dharamsala (Cedar Monasteries).

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14.2 (App Router, React 18, JavaScript)
- **Styling**: Tailwind CSS (Warm terracotta, sand, saffron, and forest sage palette)
- **AI Model**: Google Gemini 2.5 Flash (`gemini-2.5-flash` via secure server-side `/api/plan` and `/api/chat`)
- **Maps & Geocoding**: Leaflet, React-Leaflet, OpenStreetMap, Nominatim (Zero API keys needed)
- **Icons**: Lucide React
- **Storage**: Browser LocalStorage (Zero database dependency)
- **Deployment**: Vercel ready

---

## 🚀 Quick Setup & Local Development

### 1. Clone & Install
```bash
git clone <repository-url>
cd locallore
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Add your free Google Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey):
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```
*(Note: If no key is provided, LocalLore seamlessly activates its offline curated knowledge engine so the app functions end-to-end without crashing).*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 🚢 Deploying to Vercel

### Option A: Using Vercel Dashboard (Recommended)
1. Push your repository to GitHub.
2. In Vercel, click **"Add New Project"** and import your repository.
3. Under **Environment Variables**, add:
   - `GEMINI_API_KEY`: Your Gemini API key.
4. Click **Deploy**. Vercel will automatically build and assign a production URL!

### Option B: Using Vercel CLI
```bash
npx vercel
# Follow the prompts and set GEMINI_API_KEY when prompted or via:
npx vercel env add GEMINI_API_KEY
npx vercel --prod
```

---

## 🏛️ Built for the Explore Local Theme
LocalLore redirects the benefits of tourism away from monopolized commercial conglomerates toward neighborhood artisans, historic stepwells, family-run sweet shops, and vanishing cultural lore.

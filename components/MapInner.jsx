'use client';

import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { geocodePlace } from '@/lib/geocode';
import { MapPin, Navigation, ExternalLink, Gem } from 'lucide-react';

// Component to dynamically fit map bounds when markers load
function ChangeView({ bounds }) {
  const map = useMap();
  useEffect(() => {
    if (bounds && bounds.length > 0) {
      try {
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
      } catch (e) {
        // Silently handle
      }
    }
  }, [bounds, map]);
  return null;
}

export default function MapInner({ stops = [], destination = "" }) {
  const [markers, setMarkers] = useState([]);
  const [loadingGeocodes, setLoadingGeocodes] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    async function loadMarkers() {
      setLoadingGeocodes(true);
      const results = [];

      for (let i = 0; i < stops.length; i++) {
        const stop = stops[i];
        try {
          const coords = await geocodePlace(stop.name, destination, i);
          if (coords && !isCancelled) {
            results.push({
              stop,
              index: i,
              lat: coords.lat,
              lon: coords.lon,
              displayName: coords.displayName
            });
          }
        } catch (e) {
          // Handle failures silently as required
        }
      }

      if (!isCancelled) {
        setMarkers(results);
        setLoadingGeocodes(false);
      }
    }

    if (stops && stops.length > 0) {
      loadMarkers();
    }

    return () => {
      isCancelled = true;
    };
  }, [stops, destination]);

  // Compute map center
  const center = markers.length > 0
    ? [markers[0].lat, markers[0].lon]
    : [20.5937, 78.9629]; // Default India center

  const bounds = markers.map(m => [m.lat, m.lon]);

  // Helper for custom DivIcon with stop number
  const createCustomIcon = (index, isHiddenGem) => {
    return L.divIcon({
      className: '',
      html: `
        <div style="
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: ${isHiddenGem ? '#2C5E43' : '#D95C38'};
          color: white;
          font-weight: 700;
          font-size: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(0,0,0,0.35);
          border: 2.5px solid #FFFFFF;
          cursor: pointer;
        ">
          ${index + 1}
        </div>
      `,
      iconSize: [34, 34],
      iconAnchor: [17, 17],
      popupAnchor: [0, -20],
    });
  };

  return (
    <div className="relative w-full h-[420px] sm:h-[480px] lg:h-[580px] rounded-3xl overflow-hidden border border-stone-200/90 shadow-md">
      {/* Top Map Header Overlay */}
      <div className="absolute top-3 left-3 z-[1000] bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-stone-200 shadow-sm text-xs font-semibold text-stone-800 flex items-center gap-1.5">
        <Navigation className="w-3.5 h-3.5 text-terracotta-600" />
        <span>OpenStreetMap Verified Route</span>
        {loadingGeocodes && (
          <span className="w-2 h-2 rounded-full bg-terracotta-500 animate-ping ml-1" />
        )}
      </div>

      {/* Legend Overlay */}
      <div className="absolute bottom-3 right-3 z-[1000] bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-stone-200 shadow-sm text-[11px] font-medium text-stone-700 flex items-center gap-3">
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-sage-700" />
          <span>Hidden Gem</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-terracotta-600" />
          <span>Local Stop</span>
        </div>
      </div>

      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        {bounds.length > 0 && <ChangeView bounds={bounds} />}

        {markers.map(({ stop, index, lat, lon }) => {
          const encodedQuery = encodeURIComponent(`${stop.name} ${destination}`);
          const gMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`;

          return (
            <Marker
              key={index}
              position={[lat, lon]}
              icon={createCustomIcon(index, stop.isHiddenGem)}
            >
              <Popup className="custom-leaflet-popup">
                <div className="p-1 min-w-[200px] text-stone-900">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-terracotta-600">
                      Stop {index + 1} · {stop.timeSlot}
                    </span>
                    {stop.isHiddenGem && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-sage-100 text-sage-800">
                        Hidden Gem
                      </span>
                    )}
                  </div>

                  <h4 className="font-serif font-bold text-sm text-stone-900 leading-tight">
                    {stop.name}
                  </h4>
                  <p className="text-[11px] text-stone-600 mt-1 line-clamp-2">
                    {stop.whySpecial}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-stone-200 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-stone-700">
                      ₹{stop.approxCostInr || 'Free'}
                    </span>
                    <a
                      href={gMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-terracotta-600 hover:text-terracotta-800 underline"
                    >
                      <span>Directions</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

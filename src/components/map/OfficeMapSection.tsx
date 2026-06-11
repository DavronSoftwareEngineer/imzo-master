import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { HiLocationMarker, HiPhone, HiClock, HiExternalLink } from 'react-icons/hi';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

interface Office {
  id: number;
  name: string;
  address: string;
  phone: string;
  workTime: string;
  lng: number;
  lat: number;
}

const officeCoords = [
  { id: 1,  lng: 69.2870, lat: 41.3660 }, // Yunusobod
  { id: 2,  lng: 69.3350, lat: 41.3500 }, // Mirzo Ulug'bek
  { id: 3,  lng: 69.2200, lat: 41.3500 }, // Olmazor
  { id: 4,  lng: 69.2500, lat: 41.3200 }, // Shayxontohur
  { id: 5,  lng: 69.2300, lat: 41.2300 }, // Sergeli
  { id: 6,  lng: 69.2100, lat: 41.2800 }, // Chilonzor
  { id: 7,  lng: 69.1800, lat: 41.3100 }, // Uchtepa
  { id: 8,  lng: 69.2600, lat: 41.2900 }, // Yakkasaroy
  { id: 9,  lng: 69.3000, lat: 41.3000 }, // Mirobod
  { id: 10, lng: 69.3300, lat: 41.3200 }, // Yashnobod
  { id: 11, lng: 69.3800, lat: 41.2600 }, // Bektemir
];

function buildMarkerEl(): HTMLDivElement {
  const outer = document.createElement('div');
  outer.className = 'custom-marker';
  outer.innerHTML = `
    <div class="marker-glow-ring"></div>
    <div class="marker-body">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d4a82e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="12" y2="17"/></svg>
      <span class="marker-dot"></span>
    </div>
    <div class="marker-shadow"></div>
  `;
  return outer;
}

export default function OfficeMapSection() {
  const { t } = useTranslation();
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const [activeId, setActiveId] = useState(1);

  const officeData: Office[] = t('officeMap.offices', { returnObjects: true }) as unknown as Office[];
  const offices = officeData.map((o, i) => ({ ...officeCoords[i], ...o }));

  // The map is initialised once. Markers read offices through this ref (seeded
  // with the first render's value) so the init effect stays dependency-free.
  const officesRef = useRef(offices);

  const flyTo = useCallback((lng: number, lat: number) => {
    mapRef.current?.flyTo({ center: [lng, lat], zoom: 15, pitch: 60, duration: 1600 });
  }, []);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          osm: { type: 'raster', tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'], tileSize: 256, attribution: '&copy; OpenStreetMap contributors' },
        },
        layers: [{ id: 'osm', type: 'raster', source: 'osm' }],
      },
      center: [69.2600, 41.3000],
      zoom: 11,
      pitch: 60,
    });

    map.addControl(new maplibregl.NavigationControl(), 'top-right');
    mapRef.current = map;

    map.on('load', () => {
      officesRef.current.forEach((office) => {
        const el = buildMarkerEl();

        const popup = new maplibregl.Popup({ offset: [0, -22], closeButton: true, maxWidth: '280px' })
          .setHTML(`
            <h4>${office.name}</h4>
            <p style="display:flex;align-items:flex-start;gap:6px;margin-bottom:4px;"><span style="color:#d4a82e;flex-shrink:0">📍</span> ${office.address}</p>
            <p style="display:flex;align-items:flex-start;gap:6px;margin-bottom:4px;"><span style="color:#d4a82e;flex-shrink:0">📞</span> ${office.phone}</p>
            <p style="display:flex;align-items:flex-start;gap:6px;margin-bottom:6px;"><span style="color:#d4a82e;flex-shrink:0">🕐</span> ${office.workTime}</p>
            <a href="https://www.google.com/maps/dir/?api=1&destination=${office.lat},${office.lng}"
               target="_blank" rel="noopener noreferrer"
               style="display:inline-flex;align-items:center;gap:5px;padding:7px 14px;background:#0f172a;color:#fff;font-size:12px;font-weight:600;border-radius:999px;text-decoration:none;">
              ➚ Yo'nalish olish
            </a>
          `);

        const marker = new maplibregl.Marker({ element: el, anchor: 'bottom' })
          .setLngLat([office.lng, office.lat])
          .setPopup(popup)
          .addTo(map);

        el.addEventListener('click', () => {
          setActiveId(office.id);
          el.classList.add('active');
          setTimeout(() => el.classList.remove('active'), 600);
        });

        markersRef.current.push(marker);
      });
    });

    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <section className="office-map-section">
      <div className="contain">
        <div className="section-header">
          <h2>{t('officeMap.title')}</h2>
          <div className="accent-line"><span /><span /></div>
          <p>{t('officeMap.subtitle')}</p>
        </div>

        <div className="grid-2" style={{ marginTop: 40, alignItems: 'start' }}>
          <div className="office-info">
            {offices.map((office) => (
              <div
                key={office.id}
                className={`office-card${activeId === office.id ? ' active' : ''}`}
                onClick={() => { setActiveId(office.id); flyTo(office.lng, office.lat); }}
              >
                <div className="office-card-title">{office.name}</div>
                <div className="office-card-row"><HiLocationMarker />{office.address}</div>
                <div className="office-card-row"><HiPhone />{office.phone}</div>
                <div className="office-card-row"><HiClock />{office.workTime}</div>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${office.lat},${office.lng}`}
                  target="_blank" rel="noopener noreferrer"
                  className="office-card-btn"
                  onClick={(e) => e.stopPropagation()}
                >
                  <HiExternalLink />{t('officeMap.directions')}
                </a>
              </div>
            ))}
          </div>

          <div ref={mapContainer} className="office-map" />
        </div>
      </div>
    </section>
  );
}

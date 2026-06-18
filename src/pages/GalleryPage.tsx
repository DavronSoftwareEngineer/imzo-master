import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { HiX, HiChevronLeft, HiChevronRight, HiZoomIn } from 'react-icons/hi';
import PageHero from '../components/ui/PageHero';
import Seo from '../components/ui/Seo';

const BASE = import.meta.env.BASE_URL;

// Har rasm: tartib raqami (gallery/N.jpg) va kategoriyasi.
// Kategoriyalar: residential (turar-joy), commercial (tijorat), interior (ichki).
// Egasi bu yerda kategoriyani moslab tahrirlashi mumkin.
const GALLERY: { n: number; cat: 'residential' | 'commercial' | 'interior' }[] = [
  { n: 1, cat: 'interior' }, { n: 2, cat: 'residential' }, { n: 3, cat: 'interior' }, { n: 4, cat: 'commercial' },
  { n: 5, cat: 'residential' }, { n: 6, cat: 'residential' }, { n: 7, cat: 'residential' }, { n: 8, cat: 'commercial' },
  { n: 9, cat: 'commercial' }, { n: 10, cat: 'residential' }, { n: 11, cat: 'interior' }, { n: 12, cat: 'interior' },
  { n: 13, cat: 'residential' }, { n: 14, cat: 'residential' }, { n: 15, cat: 'residential' }, { n: 16, cat: 'residential' },
  { n: 17, cat: 'commercial' }, { n: 18, cat: 'residential' }, { n: 19, cat: 'residential' }, { n: 20, cat: 'commercial' },
  { n: 21, cat: 'commercial' }, { n: 22, cat: 'commercial' }, { n: 23, cat: 'interior' }, { n: 24, cat: 'residential' },
  { n: 25, cat: 'interior' }, { n: 26, cat: 'residential' }, { n: 27, cat: 'residential' }, { n: 28, cat: 'interior' },
  { n: 29, cat: 'residential' }, { n: 30, cat: 'residential' }, { n: 31, cat: 'interior' }, { n: 32, cat: 'residential' },
  { n: 33, cat: 'residential' },
];
const CAT_KEYS = ['all', 'residential', 'commercial', 'interior'] as const;

export default function GalleryPage() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<string>('all');
  const [idx, setIdx] = useState<number | null>(null);

  const items = GALLERY.filter((g) => filter === 'all' || g.cat === filter);
  const label = (c: string) => t(`gallery.filters.${c}`);

  const close = useCallback(() => setIdx(null), []);
  const prev = useCallback(() => setIdx((i) => (i === null ? i : (i - 1 + items.length) % items.length)), [items.length]);
  const next = useCallback(() => setIdx((i) => (i === null ? i : (i + 1) % items.length)), [items.length]);

  useEffect(() => {
    if (idx === null) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', h);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', h); document.body.style.overflow = ''; };
  }, [idx, close, prev, next]);

  return (
    <>
      <Seo title={t('gallery.title')} description={t('gallery.subtitle')} />
      <PageHero title={t('gallery.title')} subtitle={t('gallery.subtitle')} />
      <section className="section bg-surface">
        <div className="contain">
          <div className="gallery-filters">
            {CAT_KEYS.map((k) => (
              <button key={k} type="button" className={`gfilter${filter === k ? ' active' : ''}`} onClick={() => setFilter(k)}>
                {t(`gallery.filters.${k}`)}
              </button>
            ))}
          </div>

          <div className="gallery-grid">
            {items.map((g, i) => (
              <button key={g.n} type="button" className="gallery-item" onClick={() => setIdx(i)} aria-label={label(g.cat)}>
                <img
                  src={BASE + `gallery/${g.n}.jpg`}
                  alt={label(g.cat)}
                  loading="lazy"
                  onError={(e) => { (e.currentTarget.closest('.gallery-item') as HTMLElement)?.style.setProperty('display', 'none'); }}
                />
                <span className="gallery-ov"><HiZoomIn /></span>
                <span className="gallery-cap">{label(g.cat)}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {idx !== null && items[idx] && (
        <div className="lightbox" onClick={close} role="dialog" aria-modal="true">
          <button type="button" className="lb-close" onClick={close} aria-label="Yopish"><HiX /></button>
          {items.length > 1 && <button type="button" className="lb-nav lb-prev" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Oldingi"><HiChevronLeft /></button>}
          <figure className="lb-fig" onClick={(e) => e.stopPropagation()}>
            <img src={BASE + `gallery/${items[idx].n}.jpg`} alt={label(items[idx].cat)} />
            <figcaption>{label(items[idx].cat)} · {idx + 1} / {items.length}</figcaption>
          </figure>
          {items.length > 1 && <button type="button" className="lb-nav lb-next" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Keyingi"><HiChevronRight /></button>}
        </div>
      )}
    </>
  );
}

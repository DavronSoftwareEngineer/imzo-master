import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HiChevronLeft, HiChevronRight, HiArrowRight } from 'react-icons/hi';

const BASE = import.meta.env.BASE_URL;
// Bosh sahifa uchun galereya fotolaridan namuna (gallery/1..10.jpg).
const IMGS = Array.from({ length: 10 }, (_, i) => `gallery/${i + 1}.jpg`);

export default function GallerySlider() {
  const { t } = useTranslation();
  const track = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('.gslide');
    const step = card ? card.offsetWidth + 18 : 340;
    el.scrollBy({ left: dir * step * 2, behavior: 'smooth' });
  };

  return (
    <section className="section bg-surface">
      <div className="contain">
        <div className="section-header">
          <h2>{t('home.galleryTitle')}</h2>
          <div className="accent-line"><span/><span/></div>
          <p>{t('home.gallerySub')}</p>
        </div>

        <div className="gslider-track" ref={track}>
          {IMGS.map((src, i) => (
            <Link key={i} to="/gallery" className="gslide" aria-label={t('home.galleryTitle')}>
              <img src={BASE + src} alt="" loading="lazy" onError={(e) => { (e.currentTarget.closest('.gslide') as HTMLElement)?.style.setProperty('display', 'none'); }} />
            </Link>
          ))}
        </div>

        <div className="pslider-foot">
          <div className="pslider-arrows">
            <button type="button" onClick={() => scroll(-1)} aria-label="Oldingi"><HiChevronLeft /></button>
            <button type="button" onClick={() => scroll(1)} aria-label="Keyingi"><HiChevronRight /></button>
          </div>
          <Link to="/gallery" className="btn btn-primary">{t('home.galleryCta')}<HiArrowRight /></Link>
        </div>
      </div>
    </section>
  );
}

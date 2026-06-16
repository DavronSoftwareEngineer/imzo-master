import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HiChevronLeft, HiChevronRight, HiArrowRight } from 'react-icons/hi';

const BASE = import.meta.env.BASE_URL;

// imzo.uz katalogidagi 9 kategoriya. Mavjud sahifalar bo'lsa o'shanga, aks holda /products ga.
const CATS = [
  { img: 'categories/plastik.jpg', link: '/plastic-windows' },
  { img: 'categories/alyumin.jpg', link: '/aluminum-windows' },
  { img: 'categories/eshiklar.jpg', link: '/products' },
  { img: 'categories/surilma.jpg', link: '/for-cafes' },
  { img: 'categories/import.jpg', link: '/for-cafes' },
  { img: 'categories/fasad.jpg', link: '/products' },
  { img: 'categories/rollet.jpg', link: '/products' },
  { img: 'categories/aksessuar.jpg', link: '/products' },
  { img: 'categories/oynali.jpg', link: '/for-cafes' },
];

export default function ProductSlider() {
  const { t } = useTranslation();
  const labels = t('home.cats', { returnObjects: true }) as unknown as string[];
  const track = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('.pslide');
    const step = card ? card.offsetWidth + 18 : 280;
    el.scrollBy({ left: dir * step * 2, behavior: 'smooth' });
  };

  return (
    <section className="section bg-surface">
      <div className="contain">
        <div className="section-header text-left" style={{ marginBottom: 28 }}>
          <h2>{t('home.productsTitle')}</h2>
          <div className="accent-line" style={{ justifyContent: 'flex-start' }}><span/><span/></div>
          <p style={{ margin: 0 }}>{t('home.productsSubtitle')}</p>
        </div>

        <div className="pslider-track" ref={track}>
          {CATS.map((c, i) => (
            <Link key={i} to={c.link} className="pslide">
              <div className="pslide-img">
                <img src={BASE + c.img} alt={Array.isArray(labels) ? labels[i] : ''} loading="lazy" />
              </div>
              <div className="pslide-label">{Array.isArray(labels) ? labels[i] : ''}</div>
            </Link>
          ))}
        </div>

        <div className="pslider-foot">
          <div className="pslider-arrows">
            <button type="button" onClick={() => scroll(-1)} aria-label="Oldingi"><HiChevronLeft /></button>
            <button type="button" onClick={() => scroll(1)} aria-label="Keyingi"><HiChevronRight /></button>
          </div>
          <Link to="/products" className="btn btn-primary">{t('home.allProducts')}<HiArrowRight /></Link>
        </div>
      </div>
    </section>
  );
}

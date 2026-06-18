import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HiArrowRight, HiPhone } from 'react-icons/hi';
import { FaTelegramPlane } from 'react-icons/fa';
import PageHero from '../components/ui/PageHero';
import Seo from '../components/ui/Seo';

const BASE = import.meta.env.BASE_URL;
// Katalog tartibida (i18n products.catalog bilan mos): rasm + havola.
const CATS = [
  { img: 'categories/plastik.jpg', link: '/plastic-windows' },
  { img: 'categories/alyumin.jpg', link: '/aluminum-windows' },
  { img: 'categories/eshiklar.jpg', link: '/contact' },
  { img: 'categories/surilma.jpg', link: '/for-cafes' },
  { img: 'categories/import.jpg', link: '/for-cafes' },
  { img: 'categories/fasad.jpg', link: '/contact' },
  { img: 'categories/rollet.jpg', link: '/contact' },
  { img: 'categories/aksessuar.jpg', link: '/contact' },
  { img: 'categories/oynali.jpg', link: '/contact' },
];

export default function ProductsPage() {
  const { t } = useTranslation();
  const catalog = t('products.catalog', { returnObjects: true }) as unknown as { title: string; items: string[] }[];

  return (
    <>
      <Seo title={t('products.title')} description={t('products.subtitle')} />
      <PageHero title={t('products.title')} subtitle={t('products.subtitle')} />

      <section className="section bg-surface">
        <div className="contain">
          <div className="grid-3">
            {Array.isArray(catalog) && catalog.map((cat, i) => {
              const meta = CATS[i] || CATS[0];
              const hasPage = meta.link === '/plastic-windows' || meta.link === '/aluminum-windows';
              return (
                <div key={cat.title} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ position: 'relative', aspectRatio: '2 / 3', overflow: 'hidden' }}>
                    <img src={BASE + meta.img} alt={cat.title} loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                  </div>
                  <div className="card-body" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h3 style={{ marginBottom: 12 }}>{cat.title}</h3>
                    <div className="flex flex-wrap gap-2" style={{ flex: 1 }}>
                      {cat.items.map((it) => (
                        <span key={it} className="tag">{it}</span>
                      ))}
                    </div>
                    <Link to={meta.link} className="flex items-center gap-1.5 mt-5 pt-3 border-t text-accent font-semibold text-sm" style={{ borderColor: 'var(--border-light)' }}>
                      {hasPage ? t('products.details') : t('products.inquire')}
                      <HiArrowRight />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-mesh cta">
        <div className="cta-inner">
          <div className="cta-eyebrow">{t('cta.title')}</div>
          <h2>{t('cta.subtitle')}</h2>
          <p>{t('contact.intro')}</p>
          <div className="cta-actions">
            <a href={`tel:${t('common.phoneRaw')}`} className="btn btn-primary"><HiPhone />{t('common.phone')}</a>
            <a href={t('common.telegramUrl')} target="_blank" rel="noopener noreferrer" className="btn btn-outline"><FaTelegramPlane />{t('cta.call')}</a>
          </div>
        </div>
      </section>
    </>
  );
}

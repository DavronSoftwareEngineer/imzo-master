import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HiArrowRight, HiPhone } from 'react-icons/hi';
import { FaTelegramPlane } from 'react-icons/fa';
import PageHero from '../components/ui/PageHero';
import Seo from '../components/ui/Seo';

export default function ProductsPage() {
  const { t } = useTranslation();

  const categories = [
    { link: '/plastic-windows', img: 'products/rehau-artevo.png', key: 'pvc', gradient: 'from-blue-500 to-cyan-600' },
    { link: '/aluminum-windows', img: 'products/thermo65.png', key: 'aluminum', gradient: 'from-slate-600 to-slate-800' },
    { link: '/for-cafes', img: 'products/bioclimatic.jpg', key: 'cafe', gradient: 'from-amber-500 to-orange-600' },
  ];

  return (
    <>
      <Seo title={t('products.title')} description={t('products.subtitle')} />
      <PageHero title={t('products.title')} subtitle={t('products.subtitle')} />
      <section className="section bg-surface">
        <div className="contain">
          <div className="grid-3">
            {categories.map((cat) => (
              <Link key={cat.link} to={cat.link} className="card">
                <div className={`h-48 bg-gradient-to-br ${cat.gradient} flex items-center justify-center relative overflow-hidden`}>
                  <img src={import.meta.env.BASE_URL + cat.img} alt={t(`products.categories.${cat.key}.title`)} loading="lazy" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
                  <div className="absolute inset-0 bg-black/25" />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 h-16 pointer-events-none" />
                  <span className="absolute bottom-4 left-5 text-white font-bold text-base drop-shadow">{t(`products.categories.${cat.key}.title`)}</span>
                </div>
                <div className="card-body">
                  <div className="subtitle">{t(`products.categories.${cat.key}.subtitle`)}</div>
                  <p>{t(`products.categories.${cat.key}.description`)}</p>
                  <div className="text-xs mt-3" style={{ color: 'var(--text-muted2)' }}>
                    <b style={{ color: 'var(--text-muted)' }}>{t('products.models')}:</b> {t(`products.categories.${cat.key}.models`)}
                  </div>
                  <div className="flex items-center gap-1.5 mt-4 pt-3 border-t text-accent font-semibold text-sm" style={{ borderColor: 'var(--border-light)' }}>
                    {t('products.details')} <HiArrowRight />
                  </div>
                </div>
              </Link>
            ))}
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

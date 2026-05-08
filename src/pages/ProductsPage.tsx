import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HiArrowRight, HiPhone, HiMail } from 'react-icons/hi';
import PageHero from '../components/ui/PageHero';

export default function ProductsPage() {
  const { t } = useTranslation();

  const categories = [
    { link: '/plastic-windows', emoji: '🪟', key: 'pvc', gradient: 'from-blue-500 to-cyan-600' },
    { link: '/aluminum-windows', emoji: '🏢', key: 'aluminum', gradient: 'from-slate-600 to-slate-800' },
    { link: '/for-cafes', emoji: '🏠', key: 'cafe', gradient: 'from-amber-500 to-orange-600' },
  ];

  return (
    <>
      <PageHero title={t('products.title')} subtitle={t('products.subtitle')} />
      <section className="section bg-surface">
        <div className="contain">
          <div className="grid-3">
            {categories.map((cat) => (
              <Link key={cat.link} to={cat.link} className="card">
                <div className={`h-48 bg-gradient-to-br ${cat.gradient} flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10" />
                  <span className="relative text-6xl">{cat.emoji}</span>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/40 h-16 pointer-events-none" />
                  <span className="absolute bottom-4 left-5 text-white font-bold text-base drop-shadow">{t(`products.categories.${cat.key}.title`)}</span>
                </div>
                <div className="card-body">
                  <div className="subtitle">{t(`products.categories.${cat.key}.subtitle`)}</div>
                  <p>{t(`products.categories.${cat.key}.description`)}</p>
                  <div className="text-xs text-gray-400 mt-3">
                    <b className="text-gray-500">{t('products.models')}:</b> {t(`products.categories.${cat.key}.models`)}
                  </div>
                  <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-gray-50 text-accent font-semibold text-sm">
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
            <a href={`mailto:${t('common.email')}`} className="btn btn-outline"><HiMail /><HiArrowRight />{t('cta.call')}</a>
          </div>
        </div>
      </section>
    </>
  );
}

import { useTranslation } from 'react-i18next';
import { HiCheckCircle, HiPhone, HiMail, HiArrowRight } from 'react-icons/hi';
import PageHero from '../components/ui/PageHero';
import Seo from '../components/ui/Seo';

const gradients = ['from-amber-500 to-orange-600', 'from-emerald-500 to-teal-600', 'from-sky-500 to-blue-600', 'from-rose-500 to-pink-600', 'from-purple-500 to-indigo-600'];
const emojis = ['🪟', '🏕️', '🏗️', '🌿', '🚪'];

export default function ForCafesPage() {
  const { t } = useTranslation();
  const systems = ['guillotine', 'tentPergola', 'chempion', 'bioclimatic', 'bkh65'];

  return (
    <>
      <Seo title={t('cafe.title')} description={t('cafe.subtitle')} />
      <PageHero title={t('cafe.title')} subtitle={t('cafe.subtitle')} />
      <section className="section-sm bg-white">
        <div className="contain text-center" style={{ maxWidth: 720, margin:'0 auto' }}>
          <p style={{ color:'var(--text-muted)', fontSize:16, lineHeight:1.7 }}>{t('cafe.description')}</p>
        </div>
      </section>

      {systems.map((sysId, i) => {
        const features = t(`cafe.systems.${sysId}.features`, { returnObjects: true }) as unknown as string[];
        return (
          <section key={sysId} className={`section${i % 2 === 0 ? ' bg-surface' : ' bg-white'}`}>
            <div className="contain">
              <div className="grid-2" style={{ alignItems:'start' }}>
                <div className={`rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br ${gradients[i]} flex items-center justify-center`} style={{ minHeight: 'clamp(200px, 42vw, 360px)' }}>
                  <span className="text-7xl py-20">{emojis[i]}</span>
                </div>
                <div>
                  <h2 style={{ fontSize:'clamp(20px, 5vw, 24px)', fontWeight:800, color:'var(--text-heading)', marginBottom:16 }}>{t(`cafe.systems.${sysId}.name`)}</h2>
                  <p style={{ color:'var(--text-muted)', marginBottom:24, lineHeight:1.7 }}>{t(`cafe.systems.${sysId}.description`)}</p>
                  <h3 style={{ fontSize:18, fontWeight:700, color:'var(--text-heading)', marginBottom:16 }}>{t('cafe.features')}</h3>
                  <div className="feature-list">
                    {Array.isArray(features) && features.map((f: string, j: number) => (
                      <div key={j} className="feature-item">
                        <span className="dot"><HiCheckCircle /></span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

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

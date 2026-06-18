import { useTranslation } from 'react-i18next';
import { HiCheckCircle, HiPhone } from 'react-icons/hi';
import { FaTelegramPlane } from 'react-icons/fa';
import PageHero from '../components/ui/PageHero';
import Seo from '../components/ui/Seo';

const images = ['products/guillotine.jpg', 'products/pergola.jpg', 'products/champion.png', 'products/bioclimatic.jpg', 'products/bkh65.jpg'];

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
        const isRender = images[i].endsWith('.png'); // shaffof render (foto emas)
        return (
          <section key={sysId} className={`section${i % 2 === 0 ? ' bg-surface' : ' bg-white'}`}>
            <div className="contain">
              <div className="grid-2" style={{ alignItems:'start' }}>
                <div className="rounded-2xl overflow-hidden shadow-lg relative" style={{ height: 'clamp(220px, 42vw, 380px)', background: isRender ? 'radial-gradient(circle at 50% 40%, var(--surface-soft), var(--bg-soft))' : 'var(--surface-soft)' }}>
                  <img src={import.meta.env.BASE_URL + images[i]} alt={t(`cafe.systems.${sysId}.name`)} loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: isRender ? 'contain' : 'cover' }} />
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
            <a href={t('common.telegramUrl')} target="_blank" rel="noopener noreferrer" className="btn btn-outline"><FaTelegramPlane />{t('cta.call')}</a>
          </div>
        </div>
      </section>
    </>
  );
}

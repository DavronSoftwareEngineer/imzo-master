import { useTranslation } from 'react-i18next';
import { HiPhone } from 'react-icons/hi';
import { FaTelegramPlane } from 'react-icons/fa';
import PageHero from '../components/ui/PageHero';
import Seo from '../components/ui/Seo';

export default function PlasticWindowsPage() {
  const { t } = useTranslation();
  const sl = (key: string) => t(`plasticWindows.models.trio60.specs.${key}`);

  const models = [
    { id: 'trio60', gradient: 'from-blue-400 to-blue-600' },
    { id: 'quattro60', gradient: 'from-cyan-400 to-cyan-600' },
    { id: 'engelberg70', gradient: 'from-indigo-400 to-indigo-600' },
    { id: 'engelberg80', gradient: 'from-violet-400 to-violet-700' },
  ];

  const specData: Record<string, { label: string; value: string }[]> = {
    trio60: [
      { label: sl('type'), value: 'ПВХ / PVX' }, { label: sl('chambers'), value: '3' },
      { label: sl('wallThickness'), value: '2.8 мм' }, { label: sl('mountDepth'), value: '60 мм' },
      { label: sl('maxSashHeight'), value: '1800 мм' }, { label: sl('maxSashWidth'), value: '800 мм' }, { label: sl('glassThickness'), value: '20 мм' },
    ],
    quattro60: [
      { label: sl('type'), value: 'ПВХ / PVX' }, { label: sl('chambers'), value: '4' },
      { label: sl('wallThickness'), value: '2.8 мм' }, { label: sl('maxSashHeight'), value: '1800 мм' },
      { label: sl('maxSashWidth'), value: '800 мм' }, { label: sl('glassThickness'), value: '20 мм' },
    ],
    engelberg70: [
      { label: sl('type'), value: 'ПВХ / PVX' }, { label: sl('chambers'), value: '5' },
      { label: sl('wallThickness'), value: '2.8 мм' }, { label: sl('mountPlane'), value: '70 мм' },
      { label: sl('maxSashHeight'), value: '2300 мм' }, { label: sl('maxSashWidth'), value: '1000 мм' }, { label: sl('glassThickness'), value: '24–32 мм' },
    ],
    engelberg80: [
      { label: sl('type'), value: 'ПВХ / PVX' }, { label: sl('profileSeries'), value: 'Теплая / Issiq' },
      { label: sl('chambers'), value: '6' }, { label: sl('wallThickness'), value: '2.8 мм' },
      { label: sl('mountPlane'), value: '80 мм' }, { label: sl('mountDepth'), value: '80 мм' },
      { label: sl('maxSashHeight'), value: '2300 мм' }, { label: sl('maxSashWidth'), value: '1000 мм' },
      { label: sl('glassThickness'), value: '24–50 мм' }, { label: sl('maxSashWeight'), value: '80 кг gacha' },
    ],
  };

  return (
    <>
      <Seo title={t('plasticWindows.title')} description={t('plasticWindows.subtitle')} />
      <PageHero title={t('plasticWindows.title')} subtitle={t('plasticWindows.subtitle')} />
      <section className="section-sm bg-white">
        <div className="contain text-center" style={{ maxWidth: 720, margin:'0 auto' }}>
          <p style={{ color:'var(--text-muted)', fontSize:16, lineHeight:1.7 }}>{t('plasticWindows.description')}</p>
        </div>
      </section>

      {models.map((model, i) => {
        const specs = specData[model.id] || [];
        const features = t(`plasticWindows.models.${model.id}.features`, { returnObjects: true }) as unknown as string[];
        return (
          <section key={model.id} className={`section${i % 2 === 0 ? ' bg-surface' : ' bg-white'}`}>
            <div className="contain">
              <div className="grid-2" style={{ alignItems:'start' }}>
                <div className={`rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br ${model.gradient} flex items-center justify-center`} style={{ minHeight: 'clamp(200px, 42vw, 360px)' }}>
                  <span className="text-7xl py-20">🪟</span>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h2 style={{ fontSize:'clamp(20px, 5vw, 24px)', fontWeight:800, color:'var(--text-heading)' }}>{t(`plasticWindows.models.${model.id}.name`)}</h2>
                    <span className="tag" style={{ background:'rgba(212,168,46,0.1)', color:'#b8921a', border:'1px solid rgba(212,168,46,0.2)' }}>
                      {t(`plasticWindows.models.${model.id}.tagline`)}
                    </span>
                  </div>
                  <p style={{ color:'var(--text-muted)', marginBottom:24, lineHeight:1.7 }}>{t(`plasticWindows.models.${model.id}.description`)}</p>

                  <h3 style={{ fontSize:18, fontWeight:700, color:'var(--text-heading)', marginBottom:16 }}>{t('plasticWindows.specs')}</h3>
                  <div className="spec-table">
                    <table><tbody>
                      {specs.map((s, j) => (
                        <tr key={j}><td>{s.label}</td><td>{s.value}</td></tr>
                      ))}
                    </tbody></table>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-5">
                    {Array.isArray(features) && features.map((f: string) => (
                      <span key={f} className="tag">{f}</span>
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

import { useTranslation } from 'react-i18next';
import { HiPhone } from 'react-icons/hi';
import { FaTelegramPlane } from 'react-icons/fa';
import PageHero from '../components/ui/PageHero';
import Seo from '../components/ui/Seo';
import FitImage from '../components/ui/FitImage';

export default function AluminumWindowsPage() {
  const { t } = useTranslation();
  const sl = (key: string) => t(`aluminumWindows.models.thermo57.specs.${key}`);

  const models = [
    { id: 'thermo57', img: 'products/thermo57.png', gradient: 'from-slate-400 to-slate-600' },
    { id: 'thermo64', img: 'products/thermo64.png', gradient: 'from-slate-500 to-slate-700' },
    { id: 'thermo65', img: 'products/thermo65.png', gradient: 'from-gray-400 to-gray-600' },
    { id: 'thermo78', img: 'products/thermo78.png', gradient: 'from-zinc-500 to-zinc-700' },
    { id: 'thermo85', img: 'products/thermo85.png', gradient: 'from-zinc-600 to-zinc-800' },
    { id: 'thermo98', img: 'products/thermo98.png', gradient: 'from-neutral-600 to-neutral-800' },
    { id: 'thermo105', img: 'products/thermo105.png', gradient: 'from-stone-600 to-stone-800' },
    { id: 'champion', img: 'products/champion.png', gradient: 'from-sky-500 to-sky-700' },
  ];

  const specData: Record<string, { label: string; value: string }[]> = {
    thermo57: [
      { label: sl('type'), value: 'Алюминий / Alyumin' }, { label: sl('profileSeries'), value: 'Теплая / Issiq' },
      { label: sl('frameDepthWindow'), value: '49 мм' }, { label: sl('frameDepthDoor'), value: '57 мм' },
      { label: sl('sashDepth'), value: '57 мм' }, { label: sl('glassThickness'), value: '4–30 мм' },
      { label: sl('thermalBreak'), value: '17 мм' }, { label: sl('coating'), value: 'Анодирование, RAL, Ламинация' },
    ],
    thermo65: [
      { label: sl('type'), value: 'Алюминий / Alyumin' }, { label: sl('profileSeries'), value: 'Теплая / Issiq' },
      { label: sl('chambers'), value: '3' }, { label: sl('wallThickness'), value: '1.4 мм' },
      { label: sl('mountDepth'), value: '65 мм' }, { label: sl('maxSashHeight'), value: '2500 мм' },
      { label: sl('maxSashWidth'), value: '1600 мм' }, { label: sl('glassThickness'), value: '6–32 мм' },
      { label: sl('coating'), value: 'Анодирование, RAL, Ламинация' },
    ],
    thermo78: [
      { label: sl('type'), value: 'Алюминий / Alyumin' }, { label: sl('profileSeries'), value: 'Теплая / Issiq' },
      { label: sl('wallThickness'), value: '1.4–1.9 мм' }, { label: sl('maxSashHeight'), value: '2600 мм' },
      { label: sl('maxSashWidth'), value: '1200 мм' }, { label: sl('glassThickness'), value: '20–36 мм' },
      { label: sl('coating'), value: 'Анодирование, RAL, Ламинация' },
    ],
    thermo98: [
      { label: sl('type'), value: 'Алюминий / Alyumin' }, { label: sl('profileSeries'), value: 'Теплая / Issiq' },
      { label: sl('mountDepth'), value: '90 мм' }, { label: sl('sashDepth'), value: '98 мм' },
      { label: sl('thermalBreak'), value: '54 мм' }, { label: sl('coating'), value: 'Анодирование, RAL, Ламинация' },
    ],
    thermo64: [
      { label: sl('type'), value: 'Алюминий / Alyumin' }, { label: sl('profileSeries'), value: 'Теплая / Issiq' },
      { label: sl('mountDepth'), value: '64 мм' }, { label: sl('glassThickness'), value: '6–32 мм' },
      { label: sl('coating'), value: 'Анодирование, RAL, Ламинация' },
    ],
    thermo85: [
      { label: sl('type'), value: 'Алюминий / Alyumin' }, { label: sl('profileSeries'), value: 'Теплая / Issiq' },
      { label: sl('mountDepth'), value: '85 мм' }, { label: sl('sashDepth'), value: '85 мм' },
      { label: sl('coating'), value: 'Анодирование, RAL, Ламинация' },
    ],
    thermo105: [
      { label: sl('type'), value: 'Алюминий / Alyumin' }, { label: sl('profileSeries'), value: 'Теплая / Issiq' },
      { label: sl('wallThickness'), value: '1,4 мм' }, { label: sl('mountDepth'), value: '98 мм' },
      { label: sl('sashDepth'), value: '105 мм' }, { label: sl('thermalBreak'), value: '54 мм' },
      { label: sl('maxSashHeight'), value: '3000 мм' }, { label: sl('maxSashWidth'), value: '1000 мм' },
      { label: sl('coating'), value: 'Анодирование, RAL, Ламинация' },
    ],
    champion: [
      { label: sl('type'), value: 'Алюминий / Alyumin' }, { label: sl('profileSeries'), value: 'Холодная / Sovuq' },
      { label: sl('wallThickness'), value: '1,1 мм' }, { label: sl('mountDepth'), value: '47 мм' },
      { label: sl('maxSashHeight'), value: '2200 мм' }, { label: sl('maxSashWidth'), value: '1100 мм' },
      { label: sl('glassThickness'), value: '4–24 мм' }, { label: sl('coating'), value: 'Анодирование, RAL, Ламинация' },
    ],
  };

  return (
    <>
      <Seo title={t('aluminumWindows.title')} description={t('aluminumWindows.subtitle')} />
      <PageHero title={t('aluminumWindows.title')} subtitle={t('aluminumWindows.subtitle')} />
      <section className="section-sm bg-white">
        <div className="contain text-center" style={{ maxWidth: 720, margin:'0 auto' }}>
          <p style={{ color:'var(--text-muted)', fontSize:16, lineHeight:1.7 }}>{t('aluminumWindows.description')}</p>
        </div>
      </section>

      {models.map((model, i) => {
        const specs = specData[model.id] || [];
        const features = t(`aluminumWindows.models.${model.id}.features`, { returnObjects: true }) as unknown as string[];
        return (
          <section key={model.id} className={`section${i % 2 === 0 ? ' bg-surface' : ' bg-white'}`}>
            <div className="contain">
              <div className="grid-2" style={{ alignItems:'start' }}>
                <div className={`rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br ${model.gradient} relative`} style={{ height: 'clamp(220px, 42vw, 380px)' }}>
                  <FitImage src={import.meta.env.BASE_URL + model.img} alt={t(`aluminumWindows.models.${model.id}.name`)} />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h2 style={{ fontSize:'clamp(20px, 5vw, 24px)', fontWeight:800, color:'var(--text-heading)' }}>{t(`aluminumWindows.models.${model.id}.name`)}</h2>
                    <span className="tag" style={{ background:'rgba(212,168,46,0.1)', color:'#b8921a', border:'1px solid rgba(212,168,46,0.2)' }}>
                      {t(`aluminumWindows.models.${model.id}.tagline`)}
                    </span>
                  </div>
                  <p style={{ color:'var(--text-muted)', marginBottom:24, lineHeight:1.7 }}>{t(`aluminumWindows.models.${model.id}.description`)}</p>
                  <h3 style={{ fontSize:18, fontWeight:700, color:'var(--text-heading)', marginBottom:16 }}>{t('aluminumWindows.specs')}</h3>
                  <div className="spec-table"><table><tbody>{specs.map((s, j) => (<tr key={j}><td>{s.label}</td><td>{s.value}</td></tr>))}</tbody></table></div>
                  <div className="flex flex-wrap gap-2 mt-5">{Array.isArray(features) && features.map((f: string) => (<span key={f} className="tag">{f}</span>))}</div>
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

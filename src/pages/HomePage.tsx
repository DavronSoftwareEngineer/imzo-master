import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HiShieldCheck, HiTruck, HiCash, HiArrowRight, HiCheckCircle, HiPhone, HiClipboardCheck, HiCog, HiTruck as HiDelivery, HiHome } from 'react-icons/hi';
import { FaTelegramPlane } from 'react-icons/fa';
import { lazy, Suspense } from 'react';
import Seo from '../components/ui/Seo';
const OfficeMapSection = lazy(() => import('../components/map/OfficeMapSection'));

const processIcons = [HiClipboardCheck, HiCog, HiDelivery, HiHome];

export default function HomePage() {
  const { t } = useTranslation();

  const advantages = [
    { icon: HiShieldCheck, title: t('home.adv1Title'), desc: t('home.adv1Desc') },
    { icon: HiCash, title: t('home.adv2Title'), desc: t('home.adv2Desc') },
    { icon: HiTruck, title: t('home.adv3Title'), desc: t('home.adv3Desc') },
  ];

  const stats = [
    { icon: '🏆', value: t('home.statYears'), label: t('home.statYearsLabel') },
    { icon: '⚙️', value: t('home.statUnits'), label: t('home.statUnitsLabel') },
    { icon: '🪟', value: t('home.statModels'), label: t('home.statModelsLabel') },
    { icon: '🤖', value: t('home.statAuto'), label: t('home.statAutoLabel') },
  ];

  const categories = [
    { link: '/plastic-windows', emoji: '🪟', key: 'pvc', gradient: 'from-blue-500 to-cyan-600' },
    { link: '/aluminum-windows', emoji: '🏢', key: 'aluminum', gradient: 'from-slate-600 to-slate-800' },
    { link: '/for-cafes', emoji: '🏠', key: 'cafe', gradient: 'from-amber-500 to-orange-600' },
  ];

  const factoryFacts = t('home.factoryFacts', { returnObjects: true }) as unknown as string[];
  const workSteps = t('home.howWeWork', { returnObjects: true }) as unknown as { title: string; desc: string }[];

  return (
    <>
      <Seo title={t('home.heroTitle')} description={t('home.heroSubtitle')} />
      {/* ═══ HERO ═══ */}
      <section className="bg-mesh text-white hero">
        <div className="contain">
          <div className="text-center mx-auto" style={{ maxWidth: 640 }}>
            <div className="flex items-center justify-center gap-2 mb-5">
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-sm text-accent font-medium">
                <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"/><span className="relative inline-flex rounded-full h-2 w-2 bg-accent"/></span>
                {t('home.statYearsLabel')}: <b>{t('home.statYears')}</b>
              </span>
            </div>
            <h1>{t('home.heroTitle')}</h1>
            <p className="mx-auto" style={{ maxWidth: 520 }}>{t('home.heroSubtitle')}</p>
            <div className="hero-actions justify-center">
              <Link to="/products" className="btn btn-primary"><HiArrowRight />{t('home.heroCta1')}</Link>
              <a href={`tel:${t('common.phoneRaw')}`} className="btn btn-outline"><HiPhone />{t('common.phone')}</a>
            </div>
          </div>

          {/* Stats strip */}
          <div className="stats-grid">
            {stats.map((s) => (
              <div key={s.label} className="stat-card bg-white/5 border border-white/10">
                <div className="stat-icon">{s.icon}</div>
                <div className="stat-value text-white">{s.value}</div>
                <div className="stat-label text-white/60">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ADVANTAGES ═══ */}
      <section className="section bg-white">
        <div className="contain">
          <div className="section-header">
            <h2>{t('home.whyUsTitle')}</h2>
            <div className="accent-line"><span/><span/></div>
            <p>{t('home.whyUsSubtitle')}</p>
          </div>
          <div className="grid-3">
            {advantages.map((adv) => (
              <div key={adv.title} className="card card-body">
                <div style={{ width:44, height:44, background:'linear-gradient(135deg, #0f172a, #1e3a5f)', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16 }}>
                  <adv.icon style={{ color:'#d4a82e', fontSize:22 }} />
                </div>
                <h3>{adv.title}</h3>
                <p>{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW WE WORK ═══ */}
      <section className="section bg-surface">
        <div className="contain">
          <div className="section-header">
            <h2>{t('home.howWeWorkTitle')}</h2>
            <div className="accent-line"><span/><span/></div>
            <p>{t('home.howWeWorkSubtitle')}</p>
          </div>
          <div className="grid-4" style={{ marginTop: 48 }}>
            {Array.isArray(workSteps) && workSteps.map((step, i) => {
              const Icon = processIcons[i];
              return (
                <div key={i} className="text-center">
                  <div style={{ width:72, height:72, margin:'0 auto 16px', position:'relative' }}>
                    <div style={{ width:72, height:72, background:'var(--surface)', borderRadius:24, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 16px var(--shadow)' }}>
                      <Icon style={{ fontSize:30, color:'var(--text-heading)' }} />
                    </div>
                    <div style={{ position:'absolute', top:-6, right:-6, width:26, height:26, borderRadius:'50%', background:'var(--primary)', color:'var(--primary-text)', fontSize:13, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center' }}>{i+1}</div>
                  </div>
                  <h4 style={{ fontSize:16, fontWeight:700, color:'var(--text-heading)', marginBottom:6 }}>{step.title}</h4>
                  <p style={{ fontSize:14, color:'var(--text-muted)', lineHeight:1.5 }}>{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ PRODUCT CATEGORIES ═══ */}
      <section className="section bg-white">
        <div className="contain">
          <div className="section-header">
            <h2>{t('home.productsTitle')}</h2>
            <div className="accent-line"><span/><span/></div>
            <p>{t('home.productsSubtitle')}</p>
          </div>
          <div className="grid-3" style={{ marginTop: 40 }}>
            {categories.map((cat) => (
              <Link key={cat.link} to={cat.link} className="card">
                <div className={`h-48 bg-gradient-to-br ${cat.gradient} flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10" />
                  <span className="relative text-6xl">{cat.emoji}</span>
                </div>
                <div className="card-body">
                  <h3>{t(`products.categories.${cat.key}.title`)}</h3>
                  <div className="subtitle">{t(`products.categories.${cat.key}.subtitle`)}</div>
                  <p>{t(`products.categories.${cat.key}.description`)}</p>
                  <div className="flex items-center gap-1.5 mt-4 text-accent font-semibold text-sm">
                    {t('products.details')}
                    <HiArrowRight />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FACTORY ═══ */}
      <section className="section bg-surface">
        <div className="contain">
          <div className="grid-2" style={{ alignItems:'center' }}>
            <div>
              <div className="section-header text-left" style={{ marginBottom: 24 }}>
                <h2>{t('home.factoryTitle')}</h2>
                <div className="accent-line" style={{ justifyContent:'flex-start' }}><span/><span/></div>
                <p style={{ margin:0 }}>{t('home.factorySubtitle')}</p>
              </div>
              <div className="feature-list">
                {Array.isArray(factoryFacts) && factoryFacts.map((item: string, i: number) => (
                  <div key={i} className="feature-item">
                    <span className="dot"><HiCheckCircle /></span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center">
              <div className="card card-body" style={{ maxWidth: 360, margin:'0 auto' }}>
                <div style={{ width:64, height:64, background:'linear-gradient(135deg, rgba(212,168,46,0.2), rgba(212,168,46,0.05))', borderRadius:20, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px' }}>
                  <span style={{ fontSize:36 }}>🏭</span>
                </div>
                <div style={{ fontSize:'clamp(40px, 11vw, 56px)', fontWeight:900, color:'var(--text-heading)', lineHeight:1.1 }}>2 500</div>
                <p style={{ color:'var(--text-muted)', marginTop:4 }}>{t('home.factoryUnits')}</p>
                <div style={{ height:4, background:'var(--surface-soft)', borderRadius:99, overflow:'hidden', marginTop:20 }}>
                  <div style={{ height:'100%', background:'linear-gradient(90deg, #d4a82e, #ecc94b)', borderRadius:99, width:'100%' }} />
                </div>
                <p style={{ fontSize:12, color:'var(--text-muted2)', marginTop:8 }}>{t('home.factoryDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ OFFICE MAP ═══ */}
      <Suspense fallback={<section className="office-map-section"><div className="contain text-center" style={{padding:'80px 0',color:'var(--text-muted2)'}}>Xarita yuklanmoqda...</div></section>}>
        <OfficeMapSection />
      </Suspense>

      {/* ═══ CTA ═══ */}
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

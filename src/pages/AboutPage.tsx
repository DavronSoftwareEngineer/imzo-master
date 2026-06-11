import { useTranslation } from 'react-i18next';
import { HiCheckCircle, HiShieldCheck, HiCash, HiClipboardList, HiTruck, HiSparkles, HiLightningBolt, HiPhone } from 'react-icons/hi';
import { FaTelegramPlane } from 'react-icons/fa';
import PageHero from '../components/ui/PageHero';
import Seo from '../components/ui/Seo';

const icons = [HiShieldCheck, HiCash, HiClipboardList, HiTruck, HiSparkles, HiLightningBolt];

export default function AboutPage() {
  const { t } = useTranslation();
  const list = t('about.list', { returnObjects: true }) as unknown as string[];
  const factoryFeatures = t('about.factoryFeatures', { returnObjects: true }) as unknown as string[];
  const advantages = t('about.advantages', { returnObjects: true }) as unknown as { title: string; description: string }[];

  return (
    <>
      <Seo title={t('about.title')} description={t('about.subtitle')} />
      <PageHero title={t('about.title')} subtitle={t('about.subtitle')} />

      {/* Company story */}
      <section className="section bg-white">
        <div className="contain">
          <div className="grid-2" style={{ alignItems:'center' }}>
            <div>
              <div className="section-header text-left" style={{ marginBottom:20 }}>
                <h2>{t('about.aboutTitle')}</h2>
                <div className="accent-line" style={{ justifyContent:'flex-start' }}><span/><span/></div>
              </div>
              <p style={{ color:'var(--text-muted)', lineHeight:1.7, marginBottom:24 }}>{t('about.description')}</p>
              <div style={{ background:'rgba(212,168,46,0.06)', border:'1px solid rgba(212,168,46,0.2)', borderRadius:16, padding:'14px 18px', display:'inline-flex', alignItems:'center', gap:12 }}>
                <div style={{ width:40, height:40, background:'#d4a82e', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <span style={{ color:'#fff', fontWeight:700 }}>📞</span>
                </div>
                <div>
                  <div style={{ fontSize:10, color:'var(--text-muted2)', fontWeight:600, textTransform:'uppercase', letterSpacing:1 }}>{t('about.contactUs')}</div>
                  <div style={{ fontWeight:700, color:'var(--text-heading)', fontSize:15 }}>{t('common.phone')}</div>
                </div>
              </div>
            </div>
            <div style={{ background:'linear-gradient(135deg, #0f172a, #1e3a5f)', borderRadius:20, padding:'clamp(24px, 6vw, 36px)', color:'#fff' }}>
              <h3 style={{ fontSize:20, fontWeight:700, marginBottom:20, textAlign:'center' }}>{t('about.listTitle')}</h3>
              <div style={{ display:'flex', flexDirection:'column', gap:14, maxWidth:320, margin:'0 auto' }}>
                {Array.isArray(list) && list.map((item: string, i: number) => (
                  <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
                    <span style={{ width:22, height:22, borderRadius:'50%', background:'rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1 }}>
                      <HiCheckCircle style={{ color:'#d4a82e', fontSize:13 }} />
                    </span>
                    <span style={{ color:'rgba(255,255,255,0.85)', fontSize:15 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Factory */}
      <section className="section bg-surface">
        <div className="contain">
          <div className="grid-2" style={{ alignItems:'center' }}>
            <div className="text-center" style={{ order:2 }}>
              <div className="card card-body" style={{ maxWidth:340, margin:'0 auto' }}>
                <div style={{ width:64, height:64, background:'linear-gradient(135deg, rgba(212,168,46,0.2), rgba(212,168,46,0.05))', borderRadius:20, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px' }}>
                  <span style={{ fontSize:36 }}>🏭</span>
                </div>
                <div style={{ fontSize:'clamp(40px, 11vw, 56px)', fontWeight:900, color:'var(--text-heading)', lineHeight:1.1 }}>2 500</div>
                <p style={{ color:'var(--text-muted)', marginTop:4 }}>{t('about.factoryUnits')}</p>
                <div style={{ height:4, background:'var(--surface-soft)', borderRadius:99, overflow:'hidden', marginTop:20 }}>
                  <div style={{ height:'100%', background:'linear-gradient(90deg, #d4a82e, #ecc94b)', borderRadius:99, width:'100%' }} />
                </div>
                <p style={{ fontSize:12, color:'var(--text-muted2)', marginTop:8 }}>{t('about.factory100')}</p>
              </div>
            </div>
            <div style={{ order:1 }}>
              <div className="section-header text-left" style={{ marginBottom:20 }}>
                <h2>{t('about.factoryTitle')}</h2>
                <div className="accent-line" style={{ justifyContent:'flex-start' }}><span/><span/></div>
              </div>
              <p style={{ color:'var(--text-muted)', lineHeight:1.7, marginBottom:24 }}>{t('about.factoryDesc')}</p>
              <div className="feature-list">
                {Array.isArray(factoryFeatures) && factoryFeatures.map((item: string, i: number) => (
                  <div key={i} className="feature-item"><span className="dot"><HiCheckCircle /></span><span>{item}</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="section bg-white">
        <div className="contain">
          <div className="section-header">
            <h2>{t('about.advantagesTitle')}</h2>
            <div className="accent-line"><span/><span/></div>
            <p>{t('about.advantagesSubtitle')}</p>
          </div>
          <div className="grid-3" style={{ marginTop:40 }}>
            {Array.isArray(advantages) && advantages.map((adv, i) => {
              const Icon = icons[i] || HiSparkles;
              return (
                <div key={adv.title} className="card card-body">
                  <div style={{ width:40, height:40, background:'linear-gradient(135deg, #0f172a, #1e3a5f)', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:14 }}>
                    <Icon style={{ color:'#d4a82e', fontSize:20 }} />
                  </div>
                  <h3>{adv.title}</h3>
                  <p>{adv.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

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

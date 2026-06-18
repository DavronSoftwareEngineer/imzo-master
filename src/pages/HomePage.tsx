import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HiShieldCheck, HiTruck, HiCash, HiArrowRight, HiCheckCircle, HiPhone, HiClipboardCheck, HiCog, HiTruck as HiDelivery, HiHome, HiCreditCard, HiClipboardList, HiBadgeCheck, HiOfficeBuilding, HiChevronDown } from 'react-icons/hi';
import { FaTelegramPlane } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import { lazy, Suspense, useState, useEffect, type FormEvent } from 'react';
import Seo from '../components/ui/Seo';
import ProductSlider from '../components/ui/ProductSlider';
import ImageFader from '../components/ui/ImageFader';
import CountUp from '../components/ui/CountUp';

// Stat karta foni uchun chiroyli real foto-rasmlar (kesilganda ham yaxshi ko'rinadi).
const MODEL_IMGS = ['categories/alyumin.jpg', 'categories/surilma.jpg', 'categories/oynali.jpg', 'categories/import.jpg', 'portfolio/p3.jpg'];
import { sendLeadToTelegram, isTelegramConfigured } from '../lib/telegram';
const OfficeMapSection = lazy(() => import('../components/map/OfficeMapSection'));

const processIcons = [HiClipboardCheck, HiCog, HiDelivery, HiHome];
const warrantyIcons: Record<string, IconType> = { shield: HiShieldCheck, badge: HiBadgeCheck, ruler: HiClipboardList, factory: HiOfficeBuilding };
const BASE = import.meta.env.BASE_URL;
const portfolioImgs = ['portfolio/p1.jpg', 'portfolio/p2.jpg', 'portfolio/p3.jpg', 'portfolio/p4.jpg', 'portfolio/p5.jpg', 'portfolio/p6.jpg', 'portfolio/p7.jpg'];

function CallbackForm() {
  const { t } = useTranslation();
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');

  // Telegram'ga to'g'ridan-to'g'ri qo'lda yuborish uchun zaxira (bot sozlanmagan bo'lsa).
  const openTelegram = () => {
    const msg = `🔔 Qo'ng'iroq so'rovi\n📞 ${phone}`;
    window.open(`${t('common.telegramUrl')}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!phone.trim() || status === 'sending') return;
    if (isTelegramConfigured()) {
      // Bot sozlangan — to'g'ridan-to'g'ri admin Telegram'iga yuboriladi.
      setStatus('sending');
      try {
        await sendLeadToTelegram({ name: "Qo'ng'iroq so'rovi (sayt)", phone });
      } catch {
        openTelegram(); // yuborib bo'lmasa — Telegram chatini ochamiz
      }
      setStatus('done');
    } else {
      // Bot sozlanmagan — Telegram chatini ochib, matnni tayyorlab beramiz.
      openTelegram();
      setStatus('done');
    }
  };

  if (status === 'done') return (
    <div className="success-pop" style={{ textAlign: 'center' }}>
      <div className="success-check">&#10003;</div>
      <p style={{ color: 'var(--text-heading)', fontWeight: 700 }}>{t('home.callbackSuccess')}</p>
    </div>
  );

  const sending = status === 'sending';
  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} disabled={sending} placeholder={t('home.callbackPhonePlaceholder')}
        style={{ width: '100%', padding: '14px 16px', border: '1px solid var(--border)', borderRadius: 12, fontSize: 15, outline: 'none', background: 'var(--surface)', color: 'var(--text)' }} />
      <button type="submit" className="btn btn-primary" disabled={sending} style={{ justifyContent: 'center', opacity: sending ? 0.7 : 1, cursor: sending ? 'wait' : 'pointer' }}>
        <HiPhone />{sending ? t('contact.formSending') : t('home.callbackBtn')}
      </button>
      <p className="callback-note" style={{ textAlign: 'center' }}>{t('home.callbackNote')}</p>
    </form>
  );
}

function FaqList() {
  const { t } = useTranslation();
  const faq = t('home.faq', { returnObjects: true }) as unknown as { q: string; a: string }[];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="faq-list">
      {Array.isArray(faq) && faq.map((f, i) => (
        <div key={i} className={`faq-item${open === i ? ' open' : ''}`}>
          <button className="faq-q" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
            <span>{f.q}</span><HiChevronDown className="chev" />
          </button>
          <div className="faq-a"><p>{f.a}</p></div>
        </div>
      ))}
    </div>
  );
}

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
    { icon: '🪟', value: t('home.statModels'), label: t('home.statModelsLabel'), id: 'models' },
    { icon: '🤖', value: t('home.statAuto'), label: t('home.statAutoLabel') },
  ];

  const factoryFacts = t('home.factoryFacts', { returnObjects: true }) as unknown as string[];
  const workSteps = t('home.howWeWork', { returnObjects: true }) as unknown as { title: string; desc: string }[];
  const heroSlides = t('home.heroSlides', { returnObjects: true }) as unknown as { eyebrow: string; title: string; subtitle: string }[];
  const portfolio = t('home.portfolio', { returnObjects: true }) as unknown as { name: string; type: string }[];
  const reviews = t('home.reviews', { returnObjects: true }) as unknown as { name: string; role: string; text: string; rating: number }[];
  const partners = t('home.partners', { returnObjects: true }) as unknown as string[];
  const warranty = t('home.warranty', { returnObjects: true }) as unknown as { icon: string; title: string; desc: string }[];

  // Hero slider — auto-advance.
  const slideCount = Array.isArray(heroSlides) ? heroSlides.length : 0;
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    if (slideCount <= 1) return;
    const id = setInterval(() => setSlide((s) => (s + 1) % slideCount), 6000);
    return () => clearInterval(id);
  }, [slideCount]);
  const active = Array.isArray(heroSlides) && heroSlides[slide] ? heroSlides[slide] : { eyebrow: t('home.statYearsLabel'), title: t('home.heroTitle'), subtitle: t('home.heroSubtitle') };

  return (
    <>
      <Seo title={t('home.heroTitle')} description={t('home.heroSubtitle')} />

      {/* ═══ PORTFOLIO ═══ */}
      <section className="section bg-white">
        <div className="contain">
          <div className="section-header">
            <h2>{t('home.portfolioTitle')}</h2>
            <div className="accent-line"><span/><span/></div>
            <p>{t('home.portfolioSubtitle')}</p>
          </div>
          <div className="grid-3" style={{ marginTop: 40 }}>
            {Array.isArray(portfolio) && portfolio.map((pf, i) => (
              <div key={pf.name} className="portfolio-card">
                <img src={BASE + portfolioImgs[i % portfolioImgs.length]} alt={pf.name} loading="lazy" />
                <div className="portfolio-overlay">
                  <div className="pf-name">{pf.name}</div>
                  <div className="pf-type">{pf.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRODUCT SLIDER ═══ */}
      <ProductSlider />

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

      {/* ═══ WARRANTY / TRUST BADGES ═══ */}
      <section className="section bg-surface">
        <div className="contain">
          <div className="warranty-grid">
            {Array.isArray(warranty) && warranty.map((w) => {
              const Icon = warrantyIcons[w.icon] || HiBadgeCheck;
              return (
                <div key={w.title} className="warranty-item">
                  <span className="warranty-icon"><Icon /></span>
                  <span className="w-title">{w.title}</span>
                  <span className="w-desc">{w.desc}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ HERO (slider) ═══ */}
      <section className="bg-mesh text-white hero">
        <div className="contain">
          <div className="text-center mx-auto" style={{ maxWidth: 660 }}>
            <div key={slide} className="hero-slide">
              <div className="flex items-center justify-center gap-2 mb-5">
                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-sm text-accent font-medium">
                  <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"/><span className="relative inline-flex rounded-full h-2 w-2 bg-accent"/></span>
                  {active.eyebrow}
                </span>
              </div>
              <h1>{active.title}</h1>
              <p className="mx-auto" style={{ maxWidth: 540 }}>{active.subtitle}</p>
            </div>
            <div className="hero-actions justify-center">
              <Link to="/products" className="btn btn-primary"><HiArrowRight />{t('home.heroCta1')}</Link>
              <a href={`tel:${t('common.phoneRaw')}`} className="btn btn-outline"><HiPhone />{t('common.phone')}</a>
            </div>
          </div>

          {/* Stats strip */}
          <div className="stats-grid">
            {stats.map((s) => (
              <div key={s.label} className={`stat-card bg-white/5 border border-white/10${s.id === 'models' ? ' stat-card-img' : ''}`}>
                {s.id === 'models' ? (
                  <>
                    <ImageFader images={MODEL_IMGS} className="stat-bg" interval={3000} />
                    <div className="stat-bg-overlay" />
                  </>
                ) : (
                  <div className="stat-icon">{s.icon}</div>
                )}
                <div className="stat-value text-white"><CountUp value={s.value} /></div>
                <div className="stat-label text-white/60">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ INSTALLMENT BANNER ═══ */}
      <section className="section bg-surface">
        <div className="contain">
          <div className="promo-band">
            <div>
              <div className="promo-eyebrow">{t('home.installmentCta')}</div>
              <h2>{t('home.installmentTitle')}</h2>
              <p>{t('home.installmentDesc')}</p>
            </div>
            <a href={`tel:${t('common.phoneRaw')}`} className="btn btn-primary" style={{ flexShrink:0 }}><HiCreditCard />{t('home.installmentCta')}</a>
          </div>
        </div>
      </section>

      {/* ═══ HOW WE WORK ═══ */}
      <section className="section bg-white">
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

      {/* ═══ REVIEWS ═══ */}
      <section className="section bg-surface">
        <div className="contain">
          <div className="section-header">
            <h2>{t('home.reviewsTitle')}</h2>
            <div className="accent-line"><span/><span/></div>
            <p>{t('home.reviewsSubtitle')}</p>
          </div>
          <div className="grid-3" style={{ marginTop: 40 }}>
            {Array.isArray(reviews) && reviews.map((r) => (
              <div key={r.name} className="review-card">
                <div className="review-stars">{'★'.repeat(r.rating)}{'☆'.repeat(Math.max(0, 5 - r.rating))}</div>
                <p className="review-text">“{r.text}”</p>
                <div className="review-meta">
                  <span className="review-name">{r.name}</span>
                  <span className="review-role">{r.role}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Partners strip */}
          <div className="section-header" style={{ marginTop: 56, marginBottom: 0 }}>
            <p style={{ fontWeight:600, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:1, fontSize:13 }}>{t('home.partnersTitle')}</p>
          </div>
          <div className="marquee">
            <div className="marquee-track">
              {Array.isArray(partners) && [...partners, ...partners].map((p, i) => (
                <span key={i} className="partner-logo">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CALLBACK ═══ */}
      <section className="section bg-white">
        <div className="contain">
          <div className="callback-band">
            <div>
              <h2>{t('home.callbackTitle')}</h2>
              <p>{t('home.callbackDesc')}</p>
            </div>
            <CallbackForm />
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

      {/* ═══ FAQ ═══ */}
      <section className="section bg-white">
        <div className="contain">
          <div className="section-header">
            <h2>{t('home.faqTitle')}</h2>
            <div className="accent-line"><span/><span/></div>
            <p>{t('home.faqSubtitle')}</p>
          </div>
          <FaqList />
        </div>
      </section>

      {/* ═══ FREE MEASUREMENT CTA ═══ */}
      <section className="section bg-surface">
        <div className="contain">
          <div className="promo-band" style={{ background:'linear-gradient(120deg, #b8921a, #d4a82e)' }}>
            <div>
              <div className="promo-eyebrow" style={{ color:'rgba(255,255,255,0.85)' }}>{t('home.measureCta')}</div>
              <h2>{t('home.measureTitle')}</h2>
              <p style={{ color:'rgba(255,255,255,0.9)' }}>{t('home.measureDesc')}</p>
            </div>
            <a href={`tel:${t('common.phoneRaw')}`} className="btn" style={{ flexShrink:0, background:'#0f172a', color:'#fff' }}><HiClipboardList />{t('home.measureCta')}</a>
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

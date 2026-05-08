import { useTranslation } from 'react-i18next';
import { HiPhone, HiMail, HiLocationMarker, HiClock, HiArrowRight, HiUser } from 'react-icons/hi';
import { useState, type FormEvent } from 'react';
import PageHero from '../components/ui/PageHero';

function ContactForm() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: FormEvent) => { e.preventDefault(); setSubmitted(true); };

  if (submitted) return (
    <div className="card card-body text-center" style={{ background:'#f0fdf4', border:'1px solid #dcfce7' }}>
      <div style={{ fontSize:40, marginBottom:12 }}>&#10003;</div>
      <h3 style={{ color:'#166534', marginBottom:6 }}>{t('contact.formSuccess')}</h3>
      <p style={{ color:'#166534', fontSize:14 }}>{t('contact.formSuccessDesc')}</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="card card-body">
      <h3 style={{ fontSize:18, fontWeight:700, color:'#0f172a', marginBottom:20 }}>{t('contact.formTitle')}</h3>
      <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
        <div>
          <label style={{ display:'block', fontSize:13, fontWeight:500, color:'#64748b', marginBottom:6 }}>{t('contact.formName')}</label>
          <div style={{ position:'relative' }}>
            <HiUser style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'#94a3b8' }} />
            <input type="text" required placeholder={t('contact.formNamePlaceholder')} style={{ width:'100%', padding:'12px 12px 12px 36px', border:'1px solid #e2e8f0', borderRadius:12, fontSize:14, outline:'none' }} />
          </div>
        </div>
        <div>
          <label style={{ display:'block', fontSize:13, fontWeight:500, color:'#64748b', marginBottom:6 }}>{t('contact.formPhone')}</label>
          <div style={{ position:'relative' }}>
            <HiPhone style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'#94a3b8' }} />
            <input type="tel" required placeholder={t('contact.formPhonePlaceholder')} style={{ width:'100%', padding:'12px 12px 12px 36px', border:'1px solid #e2e8f0', borderRadius:12, fontSize:14, outline:'none' }} />
          </div>
        </div>
        <div>
          <label style={{ display:'block', fontSize:13, fontWeight:500, color:'#64748b', marginBottom:6 }}>{t('contact.formEmail')}</label>
          <div style={{ position:'relative' }}>
            <HiMail style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'#94a3b8' }} />
            <input type="email" placeholder={t('contact.formEmailPlaceholder')} style={{ width:'100%', padding:'12px 12px 12px 36px', border:'1px solid #e2e8f0', borderRadius:12, fontSize:14, outline:'none' }} />
          </div>
        </div>
        <button type="submit" className="btn btn-primary" style={{ width:'100%', justifyContent:'center' }}>{t('contact.formSubmit')}</button>
      </div>
    </form>
  );
}

export default function ContactPage() {
  const { t } = useTranslation();
  const contacts = [
    { icon: HiPhone, label: t('contact.phone'), val: t('common.phone'), href: `tel:${t('common.phoneRaw')}`, link: true },
    { icon: HiMail, label: t('contact.email'), val: t('common.email'), href: `mailto:${t('common.email')}`, link: true },
    { icon: HiLocationMarker, label: t('contact.address'), val: t('common.address'), link: false },
    { icon: HiClock, label: t('contact.workHours'), val: t('contact.workHoursValue'), link: false },
  ];

  return (
    <>
      <PageHero title={t('contact.title')} subtitle={t('contact.subtitle')} />
      <section className="section bg-white">
        <div className="contain">
          <div className="grid-2" style={{ alignItems:'start' }}>
            <div>
              <h2 style={{ fontSize:24, fontWeight:800, color:'#0f172a', marginBottom:12 }}>{t('contact.heading')}</h2>
              <p style={{ color:'#64748b', marginBottom:32, lineHeight:1.7 }}>{t('contact.intro')}</p>
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {contacts.map((c, i) => {
                  const el = (
                    <div style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 16px', background:'#f8f7f4', borderRadius:14 }}>
                      <div style={{ width:44, height:44, background:'rgba(212,168,46,0.1)', borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                        <c.icon style={{ color:'#b8921a', fontSize:20 }} />
                      </div>
                      <div>
                        <div style={{ fontSize:10, fontWeight:600, color:'#94a3b8', textTransform:'uppercase', letterSpacing:1 }}>{c.label}</div>
                        <div style={{ fontWeight:700, color:'#0f172a', fontSize:15 }}>{c.val}</div>
                      </div>
                    </div>
                  );
                  return c.link ? <a key={i} href={c.href!} style={{ textDecoration:'none' }}>{el}</a> : <div key={i}>{el}</div>;
                })}
              </div>
            </div>
            <ContactForm />
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
            <a href={`mailto:${t('common.email')}`} className="btn btn-outline"><HiMail /><HiArrowRight />{t('cta.call')}</a>
          </div>
        </div>
      </section>
    </>
  );
}

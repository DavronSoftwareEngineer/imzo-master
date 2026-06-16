import { useTranslation } from 'react-i18next';
import { HiPhone, HiMail, HiLocationMarker, HiClock, HiUser } from 'react-icons/hi';
import { FaTelegramPlane } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import { useState, type FormEvent } from 'react';
import PageHero from '../components/ui/PageHero';
import Seo from '../components/ui/Seo';
import { sendLeadToTelegram, isTelegramConfigured } from '../lib/telegram';

type Status = 'idle' | 'sending' | 'success' | 'error';

const inputStyle = {
  width: '100%', padding: '12px 12px 12px 36px', border: '1px solid var(--border)',
  borderRadius: 12, fontSize: 14, outline: 'none', background: 'var(--surface)', color: 'var(--text)',
} as const;
const labelStyle = { display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-muted)', marginBottom: 6 } as const;
const iconStyle = { position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted2)' } as const;

function ContactForm() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<Status>('idle');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;

    // No bot configured yet → open a direct Telegram chat with the admin so the
    // customer reaches us instantly (the message text is included as a hint).
    if (!isTelegramConfigured()) {
      const msg = [
        `${t('contact.formName')}: ${name}`,
        `${t('contact.formPhone')}: ${phone}`,
        email ? `${t('contact.formEmail')}: ${email}` : '',
      ].filter(Boolean).join('\n');
      window.open(`${t('common.telegramUrl')}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
      setStatus('success');
      return;
    }

    setStatus('sending');
    try {
      await sendLeadToTelegram({ name, phone, email });
      setStatus('success');
    } catch (err) {
      console.error('Lead submit failed:', err);
      setStatus('error');
    }
  };

  if (status === 'success') return (
    <div className="card card-body text-center success-pop" style={{ background:'var(--tag-bg)', border:'1px solid var(--tag-border)' }}>
      <div className="success-check">&#10003;</div>
      <h3 style={{ color:'var(--tag-text)', marginBottom:6 }}>{t('contact.formSuccess')}</h3>
      <p style={{ color:'var(--tag-text)', fontSize:14 }}>{t('contact.formSuccessDesc')}</p>
    </div>
  );

  const sending = status === 'sending';

  return (
    <form onSubmit={handleSubmit} className="card card-body">
      <h3 style={{ fontSize:18, fontWeight:700, color:'var(--text-heading)', marginBottom:20 }}>{t('contact.formTitle')}</h3>
      <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
        <div>
          <label style={labelStyle}>{t('contact.formName')}</label>
          <div style={{ position:'relative' }}>
            <HiUser style={iconStyle} />
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} disabled={sending} placeholder={t('contact.formNamePlaceholder')} style={inputStyle} />
          </div>
        </div>
        <div>
          <label style={labelStyle}>{t('contact.formPhone')}</label>
          <div style={{ position:'relative' }}>
            <HiPhone style={iconStyle} />
            <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} disabled={sending} placeholder={t('contact.formPhonePlaceholder')} style={inputStyle} />
          </div>
        </div>
        <div>
          <label style={labelStyle}>{t('contact.formEmail')}</label>
          <div style={{ position:'relative' }}>
            <HiMail style={iconStyle} />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={sending} placeholder={t('contact.formEmailPlaceholder')} style={inputStyle} />
          </div>
        </div>
        {status === 'error' && (
          <p role="alert" style={{ fontSize:13, color:'#dc2626', margin:0 }}>{t('contact.formError')}</p>
        )}
        <button type="submit" className="btn btn-primary" disabled={sending} style={{ width:'100%', justifyContent:'center', opacity: sending ? 0.7 : 1, cursor: sending ? 'wait' : 'pointer' }}>
          {sending ? t('contact.formSending') : t('contact.formSubmit')}
        </button>
      </div>
    </form>
  );
}

export default function ContactPage() {
  const { t } = useTranslation();
  const contacts: { icon: IconType; label: string; val: string; href?: string; link: boolean; external?: boolean }[] = [
    { icon: HiPhone, label: t('contact.phone'), val: t('common.phone'), href: `tel:${t('common.phoneRaw')}`, link: true },
    { icon: FaTelegramPlane, label: t('contact.telegram'), val: t('common.telegram'), href: t('common.telegramUrl'), link: true, external: true },
    { icon: HiMail, label: t('contact.email'), val: t('common.email'), href: `mailto:${t('common.email')}`, link: true },
    { icon: HiLocationMarker, label: t('contact.address'), val: t('common.address'), link: false },
    { icon: HiClock, label: t('contact.workHours'), val: t('contact.workHoursValue'), link: false },
  ];

  return (
    <>
      <Seo title={t('contact.title')} description={t('contact.subtitle')} />
      <PageHero title={t('contact.title')} subtitle={t('contact.subtitle')} />
      <section className="section bg-white">
        <div className="contain">
          <div className="grid-2" style={{ alignItems:'start' }}>
            <div>
              <h2 style={{ fontSize:'clamp(20px, 5vw, 24px)', fontWeight:800, color:'var(--text-heading)', marginBottom:12 }}>{t('contact.heading')}</h2>
              <p style={{ color:'var(--text-muted)', marginBottom:32, lineHeight:1.7 }}>{t('contact.intro')}</p>
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {contacts.map((c, i) => {
                  const el = (
                    <div style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 16px', background:'var(--surface-soft)', borderRadius:14 }}>
                      <div style={{ width:44, height:44, background:'rgba(212,168,46,0.1)', borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                        <c.icon style={{ color:'#b8921a', fontSize:20 }} />
                      </div>
                      <div>
                        <div style={{ fontSize:10, fontWeight:600, color:'var(--text-muted2)', textTransform:'uppercase', letterSpacing:1 }}>{c.label}</div>
                        <div style={{ fontWeight:700, color:'var(--text-heading)', fontSize:15 }}>{c.val}</div>
                      </div>
                    </div>
                  );
                  return c.link
                    ? <a key={i} href={c.href!} style={{ textDecoration:'none' }} {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{el}</a>
                    : <div key={i}>{el}</div>;
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
            <a href={t('common.telegramUrl')} target="_blank" rel="noopener noreferrer" className="btn btn-outline"><FaTelegramPlane />{t('cta.call')}</a>
          </div>
        </div>
      </section>
    </>
  );
}

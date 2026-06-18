import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HiPhone, HiArrowUp } from 'react-icons/hi';
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';
import { useTheme } from '../../hooks/useTheme';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  const { t, i18n } = useTranslation();
  const { theme, toggle } = useTheme();

  useScrollReveal();

  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', background:'var(--bg)' }}>
      <Header theme={theme} onThemeToggle={toggle} />
      <main style={{ flex:1 }}>
        <Outlet />
      </main>
      <Footer />
      {/* Suzuvchi tezkor aloqa: WhatsApp · Telegram · Qo'ng'iroq */}
      <div className="fab-stack">
        <a href={`https://wa.me/${t('common.phoneRaw').replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="fab fab-wa"><FaWhatsapp /></a>
        <a href={t('common.telegramUrl')} target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="fab fab-tg"><FaTelegramPlane /></a>
        <a href={`tel:${t('common.phoneRaw')}`} aria-label={t('common.phone')} className="fab fab-call"><HiPhone /></a>
      </div>
      {/* Yuqoriga qaytish */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label={i18n.language === 'uz' ? 'Yuqoriga' : 'Наверх'}
        className={`scroll-top${showTop ? ' show' : ''}`}
      >
        <HiArrowUp />
      </button>
    </div>
  );
}

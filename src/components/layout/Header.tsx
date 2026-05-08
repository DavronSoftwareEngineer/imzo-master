import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HiMenu, HiX, HiPhone, HiGlobe } from 'react-icons/hi';
import ThemeToggle from '../ui/ThemeToggle';

interface HeaderProps {
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}

export default function Header({ theme, onThemeToggle }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => { setMenuOpen(false); }, [location]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.products'), path: '/products' },
    { label: t('nav.plasticWindows'), path: '/plastic-windows' },
    { label: t('nav.aluminumWindows'), path: '/aluminum-windows' },
    { label: t('nav.forCafes'), path: '/for-cafes' },
    { label: t('nav.about'), path: '/about' },
    { label: t('nav.contact'), path: '/contact' },
  ];

  const NavLinks = () => (
    <>
      {links.map((l) => (
        <NavLink key={l.path} to={l.path} end={l.path === '/'} className={({ isActive }) => `header-nav-link${isActive ? ' active' : ''}`}>
          {l.label}
        </NavLink>
      ))}
    </>
  );

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`}>
      <div className="header-inner">
        <Link to="/" className="header-logo">
          <div className="header-logo-icon">IM</div>
          <div className="header-logo-text">
            <div className="header-logo-brand">Imzo<span>Master</span></div>
            <span className="header-logo-sub">{t('common.shortAddress')}</span>
          </div>
        </Link>

        <nav className="header-nav"><NavLinks /></nav>

        <div className="header-actions">
          <a href={`tel:${t('common.phoneRaw')}`} className="header-phone">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <HiPhone />
            <span className="hidden lg:inline">{t('common.phone')}</span>
          </a>
          <button onClick={() => i18n.changeLanguage(i18n.language === 'uz' ? 'ru' : 'uz')} className="header-lang">
            <HiGlobe />
            <span className="uppercase tracking-wider">{i18n.language}</span>
          </button>
          <ThemeToggle theme={theme} onToggle={onThemeToggle} />
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <HiX size={22} /> : <HiMenu size={22} />}
          </button>
        </div>
      </div>
      <div className={`mobile-nav${menuOpen ? ' open' : ''}`}><NavLinks /></div>
    </header>
  );
}

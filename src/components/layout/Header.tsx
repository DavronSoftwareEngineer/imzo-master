import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HiMenu, HiX, HiPhone, HiGlobe } from 'react-icons/hi';
import ThemeToggle from '../ui/ThemeToggle';

interface HeaderProps {
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}

interface NavItem {
  label: string;
  path: string;
}

function NavLinks({ items, onNavigate }: { items: NavItem[]; onNavigate?: () => void }) {
  return (
    <>
      {items.map((l) => (
        <NavLink
          key={l.path}
          to={l.path}
          end={l.path === '/'}
          onClick={onNavigate}
          className={({ isActive }) => `header-nav-link${isActive ? ' active' : ''}`}
        >
          {l.label}
        </NavLink>
      ))}
    </>
  );
}

export default function Header({ theme, onThemeToggle }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links: NavItem[] = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.products'), path: '/products' },
    { label: t('nav.plasticWindows'), path: '/plastic-windows' },
    { label: t('nav.aluminumWindows'), path: '/aluminum-windows' },
    { label: t('nav.forCafes'), path: '/for-cafes' },
    { label: t('nav.about'), path: '/about' },
    { label: t('nav.contact'), path: '/contact' },
  ];

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`}>
      <div className="header-inner">
        <Link to="/" className="header-logo">
          <img src={theme === 'dark' ? '/imzoLight.svg' : '/imzoDark.svg'} alt={t('common.siteName')} className="header-logo-img" />
          <div className="header-logo-text">
            <div className="header-logo-brand">Imzo<span>Master</span></div>
            <span className="header-logo-sub">{t('common.shortAddress')}</span>
          </div>
        </Link>

        <nav className="header-nav"><NavLinks items={links} /></nav>

        <div className="header-actions">
          <a href={`tel:${t('common.phoneRaw')}`} className="header-phone" aria-label={t('common.phone')}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <HiPhone />
            <span className="hidden lg:inline">{t('common.phone')}</span>
          </a>
          <button onClick={() => i18n.changeLanguage(i18n.language === 'uz' ? 'ru' : 'uz')} className="header-lang" aria-label={i18n.language === 'uz' ? "Tilni o'zgartirish" : 'Сменить язык'}>
            <HiGlobe />
            <span className="uppercase tracking-wider">{i18n.language}</span>
          </button>
          <ThemeToggle theme={theme} onToggle={onThemeToggle} />
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={i18n.language === 'uz' ? 'Menyu' : 'Меню'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <HiX size={22} /> : <HiMenu size={22} />}
          </button>
        </div>
      </div>
      <div className={`mobile-nav${menuOpen ? ' open' : ''}`}>
        <NavLinks items={links} onNavigate={() => setMenuOpen(false)} />
      </div>
    </header>
  );
}

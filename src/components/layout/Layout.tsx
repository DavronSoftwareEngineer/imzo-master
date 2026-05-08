import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HiPhone } from 'react-icons/hi';
import { useTheme } from '../../hooks/useTheme';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  const { t } = useTranslation();
  const { theme, toggle } = useTheme();

  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', background:'var(--bg)' }}>
      <Header theme={theme} onThemeToggle={toggle} />
      <main style={{ flex:1 }}>
        <Outlet />
      </main>
      <Footer />
      <a href={`tel:${t('common.phoneRaw')}`}
        className="btn btn-primary floating-call"
        style={{ position:'fixed', bottom:24, right:24, zIndex:50, width:48, height:48, borderRadius:14, padding:0, boxShadow:'0 8px 28px rgba(212,168,46,0.4)' }}>
        <HiPhone style={{ fontSize:22 }} />
      </a>
    </div>
  );
}

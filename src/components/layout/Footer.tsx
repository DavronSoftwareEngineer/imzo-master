import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HiLocationMarker, HiPhone, HiMail, HiArrowUp } from 'react-icons/hi';

export default function Footer() {
  const { t } = useTranslation();

  const navLinks = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.products'), path: '/products' },
    { label: t('nav.plasticWindows'), path: '/plastic-windows' },
    { label: t('nav.aluminumWindows'), path: '/aluminum-windows' },
    { label: t('nav.forCafes'), path: '/for-cafes' },
    { label: t('nav.about'), path: '/about' },
    { label: t('nav.contact'), path: '/contact' },
  ];

  return (
    <footer className="footer">
      <div style={{ position:'relative' }}>
        <button onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}
          style={{ position:'absolute', top:-20, right:28, width:40, height:40, background:'#d4a82e', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', border:0, cursor:'pointer', zIndex:10 }}>
          <HiArrowUp style={{ color:'#0f172a', fontSize:18 }} />
        </button>
      </div>
      <div className="contain" style={{ paddingTop:48, paddingBottom:24 }}>
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div className="footer-brand">
              <div className="footer-brand-icon">IM</div>
              <div className="footer-brand-name">Imzo<span>Master</span></div>
            </div>
            <p style={{ color:'#94a3b8', fontSize:14, lineHeight:1.7, maxWidth:280, marginBottom:16 }}>{t('footer.description')}</p>
            <Link to="/privacy-policy" style={{ color:'#64748b', fontSize:12, textDecoration:'underline', textUnderlineOffset:4 }}>{t('nav.privacy')}</Link>
          </div>

          {/* Nav */}
          <div>
            <div className="footer-title">{t('footer.nav')}</div>
            <div className="footer-links">
              {navLinks.map((l) => (<Link key={l.path} to={l.path}>{l.label}</Link>))}
            </div>
          </div>

          {/* Contacts */}
          <div>
            <div className="footer-title">{t('footer.contacts')}</div>
            <div className="footer-contact">
              <a href={`tel:${t('common.phoneRaw')}`} className="footer-contact-item"><HiPhone />{t('common.phone')}</a>
              <a href={`mailto:${t('common.email')}`} className="footer-contact-item"><HiMail />{t('common.email')}</a>
              <div className="footer-contact-item"><HiLocationMarker />{t('common.address')}</div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} {t('common.siteName')}. {t('footer.copyright')}</span>
          <span>Made with ❤️ in Tashkent</span>
        </div>
      </div>
    </footer>
  );
}

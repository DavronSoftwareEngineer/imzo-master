import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HiHome } from 'react-icons/hi';
import Seo from '../components/ui/Seo';

export default function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <>
      <Seo title="404" />
      <section className="section bg-white" style={{ paddingTop:120, paddingBottom:120 }}>
      <div className="contain text-center">
        <div style={{ fontSize:'clamp(52px, 14vw, 72px)', marginBottom:20 }}>🔍</div>
        <h1 style={{ fontSize:'clamp(44px, 13vw, 64px)', fontWeight:900, color:'var(--text-heading)', lineHeight:1, marginBottom:8 }}>404</h1>
        <p style={{ fontSize:18, color:'var(--text-muted2)', marginBottom:8 }}>{t('notFound.title')}</p>
        <p style={{ color:'var(--text-muted)', marginBottom:32, maxWidth:400, margin:'0 auto 32px' }}>{t('notFound.message')}</p>
        <Link to="/" className="btn btn-dark"><HiHome />{t('notFound.back')}</Link>
      </div>
      </section>
    </>
  );
}

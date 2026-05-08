import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HiHome } from 'react-icons/hi';

export default function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <section className="section bg-white" style={{ paddingTop:120, paddingBottom:120 }}>
      <div className="contain text-center">
        <div style={{ fontSize:72, marginBottom:20 }}>🔍</div>
        <h1 style={{ fontSize:64, fontWeight:900, color:'#0f172a', lineHeight:1, marginBottom:8 }}>404</h1>
        <p style={{ fontSize:18, color:'#94a3b8', marginBottom:8 }}>{t('notFound.title')}</p>
        <p style={{ color:'#64748b', marginBottom:32, maxWidth:400, margin:'0 auto 32px' }}>{t('notFound.message')}</p>
        <Link to="/" className="btn btn-dark"><HiHome />{t('notFound.back')}</Link>
      </div>
    </section>
  );
}

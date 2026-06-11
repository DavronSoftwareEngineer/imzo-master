import { useTranslation } from 'react-i18next';
import PageHero from '../components/ui/PageHero';
import Seo from '../components/ui/Seo';

export default function PrivacyPolicyPage() {
  const { t } = useTranslation();
  return (
    <>
      <Seo title={t('privacy.title')} />
      <PageHero title={t('privacy.title')} />
      <section className="section bg-white">
        <div className="contain" style={{ maxWidth:800 }}>
          <div style={{ whiteSpace:'pre-line', color:'var(--text-muted)', lineHeight:1.8, fontSize:15 }}>
            {t('privacy.text')}
          </div>
        </div>
      </section>
    </>
  );
}

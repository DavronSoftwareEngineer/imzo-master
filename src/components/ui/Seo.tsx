import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface SeoProps {
  /** Page title (without the site-name suffix). */
  title: string;
  /** Meta description for search engines and social previews. */
  description?: string;
}

export default function Seo({ title, description }: SeoProps) {
  const { t, i18n } = useTranslation();
  const siteName = t('common.siteName');
  const fullTitle = `${title} — ${siteName}`;
  const locale = i18n.language === 'uz' ? 'uz_UZ' : 'ru_RU';

  return (
    <Helmet>
      <html lang={i18n.language} />
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:locale" content={locale} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
    </Helmet>
  );
}

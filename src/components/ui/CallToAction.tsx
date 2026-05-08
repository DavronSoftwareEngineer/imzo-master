import { useTranslation } from 'react-i18next';
import { HiPhone, HiMail, HiArrowRight } from 'react-icons/hi';

export default function CallToAction() {
  const { t } = useTranslation();

  return (
    <section className="relative bg-mesh pt-14 pb-10 sm:pt-20 sm:pb-14 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl pointer-events-none" />
      <div className="relative contain text-center">
        <span className="inline-block text-accent font-semibold text-sm uppercase tracking-widest mb-4">
          {t('cta.title')}
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
          {t('cta.subtitle')}
        </h2>
        <p className="text-gray-300/80 mb-10 max-w-md mx-auto text-base leading-relaxed">
          {t('contact.intro')}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`tel:${t('common.phoneRaw')}`}
            className="group inline-flex items-center gap-3 bg-accent hover:bg-accent-light text-primary-dark font-semibold px-8 py-4 rounded-xl text-base transition-all duration-300 btn-glow"
          >
            <HiPhone className="text-xl group-hover:scale-110 transition-transform" />
            {t('common.phone')}
          </a>
          <a
            href={`mailto:${t('common.email')}`}
            className="group inline-flex items-center gap-3 border-2 border-white/20 hover:border-white/50 text-white font-semibold px-8 py-4 rounded-xl text-base transition-all duration-300 hover:bg-white/5"
          >
            <HiMail className="text-xl" />
            {t('cta.call')}
            <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}

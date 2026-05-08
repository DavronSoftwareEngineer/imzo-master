import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { HiPhone, HiMail, HiUser } from 'react-icons/hi';

export default function ContactForm() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="text-5xl mb-4">&#10003;</div>
        <h3 className="text-xl font-semibold text-green-800 mb-2">{t('contact.formSuccess')}</h3>
        <p className="text-green-700">{t('contact.formSuccessDesc')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
      <h3 className="text-xl font-bold text-primary mb-6">{t('contact.formTitle')}</h3>
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('contact.formName')}</label>
          <div className="relative">
            <HiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-primary-light outline-none transition"
              placeholder={t('contact.formNamePlaceholder')}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('contact.formPhone')}</label>
          <div className="relative">
            <HiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-primary-light outline-none transition"
              placeholder={t('contact.formPhonePlaceholder')}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('contact.formEmail')}</label>
          <div className="relative">
            <HiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-primary-light outline-none transition"
              placeholder={t('contact.formEmailPlaceholder')}
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-accent hover:bg-accent-light text-primary-dark font-semibold py-3 rounded-lg transition-colors mt-2"
        >
          {t('contact.formSubmit')}
        </button>
      </div>
    </form>
  );
}

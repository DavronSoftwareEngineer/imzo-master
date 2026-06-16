import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import uz from './uz.json';
import ru from './ru.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      uz: { translation: uz },
      ru: { translation: ru },
    },
    supportedLngs: ['uz', 'ru'],
    fallbackLng: 'uz',
    // Sukut bo'yicha o'zbekcha: birinchi tashrifda (localStorage bo'sh) doim uz.
    // Foydalanuvchi tilni o'zgartirsa — tanlovi localStorage'da saqlanadi.
    detection: {
      order: ['localStorage'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

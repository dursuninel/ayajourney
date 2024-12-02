import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend"; // Dil dosyalarını sunucudan yüklemek için
import detector from "i18next-browser-languagedetector"; // Kullanıcı dilini tespit etmek için

i18n
  .use(detector) // Tarayıcı dilini algılar
  .use(Backend) // Dil dosyalarını uzaktan yükler
  .use(initReactI18next) // React entegrasyonu
  .init({
    lng: "tr", // Varsayılan dil
    fallbackLng: "en", // Yedek dil
    debug: false, // Geliştirme modu için hata ayıklama aktif (false ise kapalı)
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // Dil dosyalarının yolu
    },
    detection: {
      order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag"], // Dil algılama sırası
      caches: ["localStorage", "cookie"], // Algılanan dili depolamak için
    },
    react: {
      useSuspense: true, // Asenkron dil yüklemelerini beklemek için
    },
    interpolation: {
      escapeValue: false, // React içinde HTML olmayan metinler
    },
    saveMissing: true, // Eksik çevirileri otomatik olarak backend'e kaydeder
  });

export default i18n;
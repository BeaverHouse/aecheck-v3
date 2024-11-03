import i18n from "i18next";
import Backend from "i18next-chained-backend";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import TransJA from "./i18n/ja.json";
import TransKO from "./i18n/ko.json";
import TransEN from "./i18n/en.json";
import resourcesToBackend from "i18next-resources-to-backend";

const resource = {
  en: {
    translation: TransEN,
  },
  ko: {
    translation: TransKO,
  },
  ja: {
    translation: TransJA,
  },
};

i18n
  .use(Backend)
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      backends: [HttpBackend, resourcesToBackend(resource)],
      backendOptions: [
        {
          loadPath: `${import.meta.env.VITE_API_URL}/translation/{{lng}}`,
          parse: (data: string) =>
            (JSON.parse(data) as APIResponse<Map<string, string>>).data,
        },
        {
          resources: resource,
          keySeparator: false,
          interpolation: {
            escapeValue: false,
          },
        },
      ],
    },
    debug: true,
    fallbackLng: "en",
  });

export default i18n;

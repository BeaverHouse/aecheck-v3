import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import TransJP from "./i18n/jp.json";
import TransKO from "./i18n/ko.json";
import TransEN from "./i18n/en.json";

const resource = {
    en: {
        translations: TransEN
    },
    ko: {
        translations: TransKO
    },
    jp: {
        translations: TransJP
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources: resource,
        fallbackLng: "ko",
        // debug: true,
        defaultNS: "translations",
        ns: "translations",
        keySeparator: false,
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
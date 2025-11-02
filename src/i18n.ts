import en from './locales/en';

export type Locale = 'en';
export type Translation = typeof en;

const translations: Record<Locale, Translation> = {
    en,
};

let currentLocale: Locale = 'en';

export function setLocale(locale: Locale): void {
    if (translations[locale]) {
        currentLocale = locale;
    }
}

export function getLocale(): Locale {
    return currentLocale;
}

export function t(): Translation {
    return translations[currentLocale];
}

export function initI18n(): void {
    const browserLang = navigator.language.split('-')[0] as Locale;

    if (translations[browserLang]) {
        setLocale(browserLang);
    }
}

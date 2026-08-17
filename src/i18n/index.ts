import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { enUS } from './locales/en-US.ts';
import { jaJP } from './locales/ja-JP.ts';
import { zhCN } from './locales/zh-CN.ts';

export const supportedLanguages = ['zh-CN', 'en-US', 'ja-JP'] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

const languageStorageKey = 'lunaria.language';
const savedLanguage = window.localStorage.getItem(languageStorageKey);

const normalizeLanguage = (language?: string | null): SupportedLanguage => {
  if (language?.startsWith('en')) {
    return 'en-US';
  }

  if (language?.startsWith('ja')) {
    return 'ja-JP';
  }

  return 'zh-CN';
};

const initialLanguage = normalizeLanguage(savedLanguage);

void i18n.use(initReactI18next).init({
  resources: {
    'zh-CN': zhCN,
    'en-US': enUS,
    'ja-JP': jaJP,
  },
  lng: initialLanguage,
  fallbackLng: 'zh-CN',
  interpolation: {
    escapeValue: false,
  },
});

const syncLanguage = (language: string) => {
  const normalizedLanguage = normalizeLanguage(language);
  window.localStorage.setItem(languageStorageKey, normalizedLanguage);
  document.documentElement.lang = normalizedLanguage;
};

syncLanguage(initialLanguage);
i18n.on('languageChanged', syncLanguage);

export default i18n;

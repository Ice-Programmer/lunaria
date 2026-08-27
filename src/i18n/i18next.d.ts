import 'i18next';

import type { zhCN } from './locales/zh-CN.ts';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: typeof zhCN;
    strictKeyChecks: true;
  }
}

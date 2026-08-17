import React from 'react';
import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import jaJP from 'antd/locale/ja_JP';
import zhCN from 'antd/locale/zh_CN';
import { RouterProvider } from 'react-router';
import { useTranslation } from 'react-i18next';

import './App.css';
import { routers } from './router';
import { appThemeCssVariables, theme } from './theme/theme.ts';

export const App: React.FC = () => {
  const { i18n } = useTranslation();
  const locale = i18n.resolvedLanguage?.startsWith('en')
    ? enUS
    : i18n.resolvedLanguage?.startsWith('ja')
      ? jaJP
      : zhCN;

  return (
    <ConfigProvider theme={theme} locale={locale}>
      <div className="appTheme" style={appThemeCssVariables}>
        <RouterProvider router={routers} />
      </div>
    </ConfigProvider>
  );
};

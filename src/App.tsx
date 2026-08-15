import React from 'react';
import { ConfigProvider } from 'antd';
import { RouterProvider } from 'react-router';

import './App.css';
import { routers } from './router';
import { appThemeCssVariables, theme } from './theme/theme.ts';

export const App: React.FC = () => {
  return (
    <ConfigProvider theme={theme}>
      <div className="appTheme" style={appThemeCssVariables}>
        <RouterProvider router={routers} />
      </div>
    </ConfigProvider>
  );
};

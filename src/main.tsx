import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import './i18n';

const appStyle: React.CSSProperties = {
  userSelect: 'none',
  WebkitUserSelect: 'none',
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <div style={appStyle}>
      <App />
    </div>
  </React.StrictMode>
);

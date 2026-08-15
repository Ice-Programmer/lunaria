import React from 'react';
import './App.css';
import { RouterProvider } from 'react-router';
import { routers } from './router';
import './App.css';

export const App: React.FC = () => {
  return <RouterProvider router={routers}></RouterProvider>;
};

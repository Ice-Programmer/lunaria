import { createHashRouter } from 'react-router';
import { MainLayout } from '../layouts/MainLayout.tsx';
import { HomePage } from '../pages/Home';

export const routers = createHashRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
]);

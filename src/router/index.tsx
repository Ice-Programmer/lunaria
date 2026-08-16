import { createHashRouter } from 'react-router';
import { MainLayout } from '../layouts/MainLayout.tsx';
import { HomePage } from '@/pages/Home';
import { CharacterPage } from '@/pages/Character';
import { ResourcePage } from '@/pages/Resource';
import { ProjectRouters } from '@/router/project.tsx';

export const routers = createHashRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'character',
        element: <CharacterPage />,
      },
      {
        path: 'resource',
        element: <ResourcePage />,
      },
      ...ProjectRouters,
    ],
  },
]);

import { RouteObject } from 'react-router';
import { CreateProjectPage } from '@/pages/Project/CreateProject';

export const ProjectRouters: RouteObject[] = [
  {
    path: '/project/create',
    element: <CreateProjectPage />,
  },
];

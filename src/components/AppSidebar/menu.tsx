import { AppstoreOutlined, HomeOutlined, TeamOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

export const menuItems: MenuItem[] = [
  {
    key: '/',
    icon: <HomeOutlined />,
  },
  {
    key: '/character',
    icon: <TeamOutlined />,
  },
  {
    key: '/resource',
    icon: <AppstoreOutlined />,
  },
];

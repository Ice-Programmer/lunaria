import { AppstoreOutlined, HomeOutlined, TeamOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import type { TFunction } from 'i18next';

type MenuItem = Required<MenuProps>['items'][number];

export const getMenuItems = (t: TFunction): MenuItem[] => [
  { key: '/', icon: <HomeOutlined />, label: t('navigation.home') },
  { key: '/character', icon: <TeamOutlined />, label: t('navigation.characters') },
  { key: '/resource', icon: <AppstoreOutlined />, label: t('navigation.resources') },
];

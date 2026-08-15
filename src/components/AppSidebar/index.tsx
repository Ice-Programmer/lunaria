import React from 'react';

import { Layout, Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router';

import { appTheme } from '../../theme/theme.ts';
import styles from './index.module.css';
import { menuItems } from './menu.tsx';

const { Sider } = Layout;

export const AppSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeItemIndex = menuItems.findIndex((item) => item?.key === location.pathname);
  const activeIndicatorStyle = {
    '--app-sidebar-active-item-offset': `${
      activeItemIndex * (appTheme.sidebar.itemSize + appTheme.sidebar.itemGap)
    }px`,
  } as React.CSSProperties;

  return (
    <Sider
      width={appTheme.sidebar.width}
      collapsedWidth={appTheme.sidebar.collapsedWidth}
      collapsed
      theme="light"
      className={styles.sidebar}
    >
      {activeItemIndex >= 0 && (
        <span aria-hidden="true" className={styles.activeIndicator} style={activeIndicatorStyle} />
      )}

      <Menu
        mode="inline"
        inlineCollapsed
        items={menuItems}
        selectedKeys={[location.pathname]}
        onClick={({ key }) => navigate(key)}
        className={styles.menu}
      />
    </Sider>
  );
};

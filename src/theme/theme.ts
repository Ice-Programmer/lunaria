import type { CSSProperties } from 'react';
import type { ThemeConfig } from 'antd';

export const appTheme = {
  colors: {
    primary: '#8067dc',
    border: '#ded7f8',
    sidebarBackground: '#f8f7ff',
    sidebarItem: '#7c7588',
    sidebarItemActive: '#6951d8',
    sidebarItemHoverBackground: '#f1edff',
    sidebarItemActiveBackground: '#eee9ff',
    sidebarItemActiveBorder: '#d8ceff',
    sidebarIndicator: '#795fe8',
  },
  sidebar: {
    width: 160,
    collapsedWidth: 60,
    menuPaddingTop: 4,
    itemSize: 42,
    itemGap: 12,
    itemRadius: 12,
    iconSize: 24,
    selectedShadow: '0 0 0 1px rgba(105, 81, 216, 0.06), 0 2px 6px rgba(105, 81, 216, 0.08)',
    indicatorWidth: 4,
    indicatorHeight: 28,
    indicatorRadius: 4,
    motionDuration: 220,
    motionEasing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
    pressedScale: 0.92,
  },
} as const;

const toPx = (value: number) => `${value}px`;

type AppThemeCssVariables = CSSProperties & Record<`--app-${string}`, string | number>;

export const appThemeCssVariables: AppThemeCssVariables = {
  '--app-sidebar-border-color': appTheme.colors.border,
  '--app-sidebar-menu-padding-top': toPx(appTheme.sidebar.menuPaddingTop),
  '--app-sidebar-item-active-border': appTheme.colors.sidebarItemActiveBorder,
  '--app-sidebar-item-active-shadow': appTheme.sidebar.selectedShadow,
  '--app-sidebar-indicator-color': appTheme.colors.sidebarIndicator,
  '--app-sidebar-indicator-width': toPx(appTheme.sidebar.indicatorWidth),
  '--app-sidebar-indicator-height': toPx(appTheme.sidebar.indicatorHeight),
  '--app-sidebar-indicator-top': toPx(
    appTheme.sidebar.menuPaddingTop +
      appTheme.sidebar.itemGap +
      (appTheme.sidebar.itemSize - appTheme.sidebar.indicatorHeight) / 2
  ),
  '--app-sidebar-indicator-radius': toPx(appTheme.sidebar.indicatorRadius),
  '--app-sidebar-motion-duration': `${appTheme.sidebar.motionDuration}ms`,
  '--app-sidebar-motion-easing': appTheme.sidebar.motionEasing,
  '--app-sidebar-pressed-scale': appTheme.sidebar.pressedScale,
};

export const theme: ThemeConfig = {
  cssVar: {
    prefix: 'lunaria',
  },
  token: {
    colorPrimary: appTheme.colors.primary,
    colorBgLayout: appTheme.colors.sidebarBackground,
    colorBorder: appTheme.colors.border,
    colorBorderSecondary: appTheme.colors.border,
    colorTextSecondary: appTheme.colors.sidebarItem,
    colorPrimaryBg: appTheme.colors.sidebarItemActiveBackground,
    colorPrimaryBgHover: appTheme.colors.sidebarItemHoverBackground,
    colorPrimaryBorder: appTheme.colors.sidebarItemActiveBorder,
  },
  components: {
    Layout: {
      lightSiderBg: appTheme.colors.sidebarBackground,
    },
    Typography: {
      titleMarginTop: 0,
      titleMarginBottom: 0,
    },
    Menu: {
      itemBg: 'transparent',
      itemColor: appTheme.colors.sidebarItem,
      itemHoverColor: appTheme.colors.sidebarItemActive,
      itemHoverBg: appTheme.colors.sidebarItemHoverBackground,
      itemActiveBg: appTheme.colors.sidebarItemHoverBackground,
      itemSelectedColor: appTheme.colors.sidebarItemActive,
      itemSelectedBg: appTheme.colors.sidebarItemActiveBackground,
      itemHeight: appTheme.sidebar.itemSize,
      itemBorderRadius: appTheme.sidebar.itemRadius,
      itemMarginBlock: appTheme.sidebar.itemGap,
      itemMarginInline: (appTheme.sidebar.collapsedWidth - appTheme.sidebar.itemSize) / 2,
      collapsedWidth: appTheme.sidebar.collapsedWidth,
      collapsedIconSize: appTheme.sidebar.iconSize,
    },
  },
};

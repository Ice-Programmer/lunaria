import React from 'react';
import { ConfigProvider, Tabs, theme } from 'antd';
import type { TabsProps } from 'antd';

interface CustomTabsProps {
  tabs: TabsProps['items'];
}

export const CustomTabs: React.FC<CustomTabsProps> = ({ tabs }: CustomTabsProps) => {
  const { token } = theme.useToken();

  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            titleFontSizeSM: 12,
            itemColor: '#999999',
            itemSelectedColor: token.colorPrimary,
            itemHoverColor: '#666666',
          },
        },
      }}
    >
      <Tabs
        size="small"
        defaultActiveKey="1"
        items={tabs}
        styles={{
          header: { marginBottom: 0, paddingInline: 15 },
          body: {
            padding: '16px 15px 15px',
            backgroundColor: token.colorBgLayout,
          },
        }}
      />
    </ConfigProvider>
  );
};

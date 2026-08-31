import React from 'react';
import { ConfigProvider, Tabs } from 'antd';
import type { TabsProps } from 'antd';

interface CustomTabsProps {
  tabs: TabsProps['items'];
}

export const CustomTabs: React.FC<CustomTabsProps> = ({ tabs }: CustomTabsProps) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            titleFontSizeSM: 12,
            itemColor: '#999999',
            itemSelectedColor: '#333333',
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
          header: { paddingInline: 15 },
          body: { padding: '0 15px 15px' },
        }}
      />
    </ConfigProvider>
  );
};

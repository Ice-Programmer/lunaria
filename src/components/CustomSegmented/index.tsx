import React from 'react';
import { ConfigProvider, Segmented } from 'antd';
import { appTheme } from '@/theme/theme.ts';

interface CustomSegmentedProps {
  options: string[];
}

export const CustomSegmented: React.FC<CustomSegmentedProps> = ({
  options,
}: CustomSegmentedProps) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Segmented: {
            trackBg: '#f3f0f7',
            trackPadding: 4,
            itemColor: '#7d7888',
            itemSelectedBg: '#ffffff',
            itemSelectedColor: appTheme.colors.primary,
            itemHoverColor: appTheme.colors.primary,
          },
        },
      }}
    >
      <Segmented
        options={options}
        style={{ alignSelf: 'flex-start', border: '1px solid #ded8e8', borderRadius: 10 }}
      />
    </ConfigProvider>
  );
};

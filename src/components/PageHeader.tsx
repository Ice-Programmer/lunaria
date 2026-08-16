import React, { ReactNode } from 'react';
import { Flex, Space } from 'antd';

interface PageHeaderProps {
  title: string;
  subTitle?: string;
  leftExtra?: ReactNode;
  rightExtra?: ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subTitle, leftExtra, rightExtra }) => {
  return (
    <Flex justify="space-between" style={{ backgroundColor: 'white', padding: '15px 20px' }}>
      <Space>
        {leftExtra}
        <Space vertical size={5} align="start">
          <div style={{ fontWeight: 'bold', fontSize: 18 }}>{title}</div>
          {subTitle && <div style={{ color: '#898393', fontSize: 13 }}>{subTitle}</div>}
        </Space>
      </Space>

      {rightExtra}
    </Flex>
  );
};

import React from 'react';
import { Button, Flex } from 'antd';
import { CustomSegmented } from '@/components/CustomSegmented';
import { PlusOutlined } from '@ant-design/icons';

export const CharacterSpriteTab: React.FC = () => {
  return (
    <Flex vertical align="start">
      <Flex align="center" justify="space-between" style={{ width: '100%' }}>
        <CustomSegmented
          width="70%"
          options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']}
        />
        <Button type="primary" icon={<PlusOutlined />}>
          新建套装
        </Button>
      </Flex>
    </Flex>
  );
};

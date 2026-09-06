import React from 'react';
import { Button, Flex, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Text } = Typography;

export const CreateSpriteBtn: React.FC = () => {
  return (
    <Button
      type="dashed"
      style={{
        width: 'clamp(110px, 15%, 135px)',
        aspectRatio: '3 / 5',
        height: 'auto',
      }}
    >
      <Flex vertical align="center" justify="center" gap={10}>
        <PlusOutlined style={{ color: '#8b8b8c' }} />
        <Text type="secondary">添加差分</Text>
      </Flex>
    </Button>
  );
};

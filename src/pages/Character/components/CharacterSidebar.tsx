import React from 'react';
import { Button, Flex, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { appTheme } from '@/theme/theme.ts';

const { Title } = Typography;

export const CharacterSidebar: React.FC = () => {
  return (
    <Flex vertical>
      <Flex
        align="center"
        justify="space-between"
        style={{ borderBottom: `1px solid ${appTheme.colors.border}`, padding: '10px' }}
      >
        <Title level={5}>角色</Title>
        <Button icon={<PlusOutlined />} style={{ padding: '0px 18px' }} />
      </Flex>
    </Flex>
  );
};

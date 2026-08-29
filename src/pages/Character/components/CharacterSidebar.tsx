import React, { useState } from 'react';
import { Button, Flex, Input, Typography } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { appTheme } from '@/theme/theme.ts';
import { CreateCharacterModal } from '@/pages/Character/components/CreateCharacterModal.tsx';

const { Title, Text } = Typography;

export const CharacterSidebar: React.FC = () => {
  const [createCharacterOpen, setCreateCharacterOpen] = useState(false);

  return (
    <Flex vertical>
      <Flex
        align="center"
        justify="space-between"
        style={{ borderBottom: `1px solid ${appTheme.colors.border}`, padding: '15px 10px' }}
      >
        <Title level={5}>角色</Title>
        <Button
          icon={<PlusOutlined />}
          style={{ padding: '0px 18px' }}
          onClick={() => setCreateCharacterOpen(true)}
        />
      </Flex>

      <Input
        style={{ width: '90%', margin: '10px auto' }}
        placeholder="搜索角色"
        prefix={<SearchOutlined />}
      />

      <CharacterList />

      <CreateCharacterModal
        open={createCharacterOpen}
        handleCancel={() => setCreateCharacterOpen(false)}
        handleOk={() => {
          // 重新请求角色列表
        }}
      />
    </Flex>
  );
};

const CharacterList: React.FC = () => {
  return (
    <Flex vertical align="start" style={{ width: '100%', padding: '8px 10px' }}>
      <Text type="secondary" style={{ fontSize: 12 }}>
        全部角色 · 3
      </Text>
    </Flex>
  );
};

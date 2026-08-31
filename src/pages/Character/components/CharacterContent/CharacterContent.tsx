import React from 'react';
import type { TabsProps } from 'antd';
import { Button, Flex, Typography } from 'antd';
import type { CharacterDTO } from '@/types/character.ts';
import { EllipsisOutlined } from '@ant-design/icons';
import { CharacterSpriteTab } from '@/pages/Character/components/CharacterContent/CharacterSpriteTab.tsx';
import { CustomTabs } from '@/components/CustomTabs';

const { Title, Text } = Typography;

const items: TabsProps['items'] = [
  {
    key: '1',
    label: '立绘与差分',
    children: <CharacterSpriteTab />,
  },
  {
    key: '2',
    label: '角色资料',
    children: 'Content of Tab Pane 2',
  },
  {
    key: '3',
    label: '语音台词',
    children: 'Content of Tab Pane 3',
  },
  {
    key: '4',
    label: '剧情引用',
    children: 'Content of Tab Pane 3',
  },
];

interface CharacterContentProps {
  character: CharacterDTO;
}

export const CharacterContent: React.FC<CharacterContentProps> = ({
  character,
}: CharacterContentProps) => {
  return (
    <>
      <Flex vertical style={{ height: '100%', minHeight: 0 }}>
        <CharacterContentHeader character={character} />
      </Flex>
    </>
  );
};

const CharacterContentHeader: React.FC<CharacterContentProps> = ({
  character,
}: CharacterContentProps) => {
  return (
    <Flex vertical style={{ backgroundColor: 'white' }}>
      <Flex justify="space-between" align="center" style={{ padding: '15px 15px 0' }}>
        <Flex align="start" vertical>
          <Title level={5}>{character.characterName}</Title>

          <Text type="secondary" style={{ fontSize: 12 }}>
            {character.characterCode}
          </Text>
        </Flex>

        <Button icon={<EllipsisOutlined />} />
      </Flex>

      <CustomTabs tabs={items} />
    </Flex>
  );
};

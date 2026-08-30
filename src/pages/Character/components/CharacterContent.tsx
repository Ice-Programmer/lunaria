import React from 'react';
import { Button, Flex, Typography } from 'antd';
import { CharacterDTO } from '@/types/character.ts';
import { EllipsisOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;

interface CharacterContentProps {
  character: CharacterDTO;
}

export const CharacterContent: React.FC<CharacterContentProps> = ({
  character,
}: CharacterContentProps) => {
  return (
    <>
      <Flex vertical>
        <CharacterContentHeader character={character} />
      </Flex>
    </>
  );
};

const CharacterContentHeader: React.FC<CharacterContentProps> = ({
  character,
}: CharacterContentProps) => {
  return (
    <Flex justify='space-between' align='center' style={{ backgroundColor: 'white', padding: '15px' }}>
      <Flex align="start" vertical>
        <Title level={5}>{character.characterName}</Title>
        <Text type="secondary" style={{ fontSize: 12 }}>
          {character.characterCode}
        </Text>
      </Flex>

      <Button icon={<EllipsisOutlined />} />
    </Flex>
  );
};

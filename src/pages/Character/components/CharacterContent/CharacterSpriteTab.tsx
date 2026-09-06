import React from 'react';
import { Flex, Spin } from 'antd';
import { CustomSegmented } from '@/components/CustomSegmented';
import { CreateSpriteButton } from '@/pages/Character/components/CreateSpriteSet/CreateSpriteButton.tsx';
import { useListCharacterSet } from '@/pages/Character/hooks/useListCharacterSet.ts';

interface CharacterSpriteTabProps {
  characterId: number;
}

export const CharacterSpriteTab: React.FC<CharacterSpriteTabProps> = ({ characterId }) => {
  const { spriteSets, isLoading } = useListCharacterSet(characterId);

  const spriteSetTab = ['全部', ...spriteSets.map((spriteSet) => spriteSet.spriteSetName)];

  return (
    <Spin spinning={isLoading}>
      <Flex vertical align="start">
        <Flex align="center" justify="space-between" style={{ width: '100%' }}>
          <CustomSegmented width="70%" options={spriteSetTab} />

          <CreateSpriteButton characterId={characterId} />
        </Flex>

        <CharacterSpriteContent />
      </Flex>
    </Spin>
  );
};

const CharacterSpriteContent: React.FC = () => {
  return <></>;
};

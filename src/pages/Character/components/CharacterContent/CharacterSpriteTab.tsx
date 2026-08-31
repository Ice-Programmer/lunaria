import React from 'react';
import { Flex } from 'antd';
import { CustomSegmented } from '@/components/CustomSegmented';
import { CreateSpriteButton } from '@/pages/Character/components/CreateSpriteSet/CreateSpriteButton.tsx';

interface CharacterSpriteTabProps {
  characterId: number;
}

export const CharacterSpriteTab: React.FC<CharacterSpriteTabProps> = ({ characterId }) => {
  return (
    <Flex vertical align="start">
      <Flex align="center" justify="space-between" style={{ width: '100%' }}>
        <CustomSegmented
          width="70%"
          options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']}
        />

        <CreateSpriteButton characterId={characterId} />
      </Flex>

      <CharacterSpriteContent />
    </Flex>
  );
};

const CharacterSpriteContent: React.FC = () => {
  return <></>;
};

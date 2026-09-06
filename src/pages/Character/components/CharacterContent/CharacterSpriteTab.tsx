import React, { useState } from 'react';
import { Divider, Flex, Spin, Typography } from 'antd';
import { CustomSegmented } from '@/components/CustomSegmented';
import { CreateSpriteButton } from '@/pages/Character/components/CreateSpriteSet/CreateSpriteButton.tsx';
import { useListCharacterSet } from '@/pages/Character/hooks/useListCharacterSet.ts';
import { SpriteSetDTO } from '@/types/character_sprite_set.ts';
import { CreateSpriteBtn } from '@/pages/Character/components/CharacterContent/CreateSpriteBtn.tsx';

const { Text } = Typography;

interface CharacterSpriteTabProps {
  characterId: number;
}

export const CharacterSpriteTab: React.FC<CharacterSpriteTabProps> = ({ characterId }) => {
  const { spriteSets, isLoading } = useListCharacterSet(characterId);
  const [selectedSpriteSet, setSelectedSpriteSet] = useState('全部');

  const spriteSetTab = ['全部', ...spriteSets.map((spriteSet) => spriteSet.spriteSetName)];
  const spriteList = spriteSets.filter(
    (set) => selectedSpriteSet === '全部' || set.spriteSetName === selectedSpriteSet
  );

  return (
    <Spin spinning={isLoading}>
      <Flex vertical align="start">
        <Flex align="center" justify="space-between" style={{ width: '100%' }}>
          <CustomSegmented
            width="70%"
            options={spriteSetTab}
            value={selectedSpriteSet}
            onChange={setSelectedSpriteSet}
          />

          <CreateSpriteButton characterId={characterId} />
        </Flex>

        <CharacterSpriteContent spriteSetList={spriteList} />
      </Flex>
    </Spin>
  );
};
interface CharacterSpriteContentProps {
  spriteSetList: SpriteSetDTO[];
}

const CharacterSpriteContent: React.FC<CharacterSpriteContentProps> = ({ spriteSetList }) => {
  return spriteSetList.map((spriteSet) => (
    <Flex vertical style={{ width: '100%', marginBottom: '1rem' }}>
      <Divider titlePlacement="left">
        <Flex align="center" gap="middle">
          <Text>{spriteSet.spriteSetName}</Text>
          <Text type="secondary" style={{ fontSize: 11 }}>
            {spriteSet.spriteList.length} 差分
          </Text>
        </Flex>
      </Divider>

      <CreateSpriteBtn />
    </Flex>
  ));
};

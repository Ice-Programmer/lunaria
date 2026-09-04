import React, { useState } from 'react';
import { Avatar, Button, Flex, Input, Listy, Typography } from 'antd';
import { PlusOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { appTheme } from '@/theme/theme.ts';
import { CreateCharacterModal } from '@/pages/Character/components/CreateCharacter/CreateCharacterModal.tsx';
import { useCreateCharacter } from '@/pages/Character/hooks/useCreateCharacter.ts';
import type { CharacterDTO } from '@/types/character.ts';
import { useCharacterPageViewModel } from '@/pages/Character/view-model';
import { convertFileSrc } from '@tauri-apps/api/core';
import styles from './CharacterSidebar.module.css';

const { Title, Text } = Typography;

export const CharacterSidebar: React.FC = () => {
  const [createCharacterOpen, setCreateCharacterOpen] = useState(false);
  const { characterList, loading, selectedCharacterId, selectCharacter, refreshCharacterList } =
    useCharacterPageViewModel();

  const { handleCreateCharacter } = useCreateCharacter({
    onSuccess: () => {
      setCreateCharacterOpen(false);
      void refreshCharacterList();
    },
  });

  return (
    <Flex vertical style={{ height: '100%', minHeight: 0, overflow: 'hidden' }}>
      <Flex
        align="center"
        justify="space-between"
        style={{
          flexShrink: 0,
          borderBottom: `1px solid ${appTheme.colors.border}`,
          padding: '15px 10px',
        }}
      >
        <Title level={5}>角色</Title>
        <Button
          icon={<PlusOutlined />}
          style={{ padding: '0px 18px' }}
          onClick={() => setCreateCharacterOpen(true)}
        />
      </Flex>

      <Input
        style={{ width: '90%', margin: '10px auto', flexShrink: 0 }}
        placeholder="搜索角色"
        prefix={<SearchOutlined />}
      />

      <CharacterList
        characterList={characterList}
        loading={loading}
        selectedCharacterId={selectedCharacterId}
        onSelectCharacter={selectCharacter}
      />

      <CreateCharacterModal
        open={createCharacterOpen}
        onCancel={() => setCreateCharacterOpen(false)}
        onCreate={handleCreateCharacter}
      />
    </Flex>
  );
};

interface CharacterListProps {
  characterList: CharacterDTO[];
  loading: boolean;
  selectedCharacterId: number | null;
  onSelectCharacter: (characterId: number) => void;
}

const CharacterList: React.FC<CharacterListProps> = ({
  characterList,
  loading,
  selectedCharacterId,
  onSelectCharacter,
}) => {
  return (
    <Flex
      vertical
      align="start"
      aria-busy={loading}
      style={{ flex: 1, minHeight: 0, width: '100%', padding: '8px 10px', overflow: 'hidden' }}
    >
      <Text type="secondary" style={{ fontSize: 12 }}>
        全部角色 · {characterList.length}
      </Text>

      <div style={{ flex: 1, minHeight: 0, width: '100%', overflowY: 'auto' }}>
        <Listy<CharacterDTO>
          items={characterList}
          rowKey="id"
          styles={{ item: { borderBottom: 'none', padding: '6px 0' } }}
          itemRender={(item) => (
            <CharacterContent
              character={item}
              selected={item.id === selectedCharacterId}
              onSelect={onSelectCharacter}
            />
          )}
        />
      </div>
    </Flex>
  );
};

interface CharacterContentProps {
  character: CharacterDTO;
  selected: boolean;
  onSelect: (characterId: number) => void;
}

const CharacterContent: React.FC<CharacterContentProps> = ({ character, selected, onSelect }) => {
  const avatarSrc = character.avatarPath ? convertFileSrc(character.avatarPath) : undefined;

  return (
    <button
      type="button"
      className={`${styles.characterItem} ${selected ? styles.characterItemSelected : ''}`}
      aria-pressed={selected}
      onClick={() => onSelect(character.id)}
    >
      <Flex align="center" gap={10}>
        <Avatar
          shape="square"
          size={40}
          src={avatarSrc}
          icon={<UserOutlined />}
          alt={character.characterName}
        />

        <Flex vertical align="start">
          <Text style={selected ? { color: appTheme.colors.sidebarItemActive } : undefined}>
            {character.characterName}
          </Text>
          <Text type="secondary" style={{ fontSize: 11 }}>
            {character.spriteSetNum} 种立绘 · {character.spriteNum} 个差分
          </Text>
        </Flex>
      </Flex>
    </button>
  );
};

import React, { useState } from 'react';
import { Col, Row } from 'antd';
import { CharacterSidebar } from '@/pages/Character/components/CharacterSidebar/CharacterSidebar.tsx';
import { appTheme } from '@/theme/theme.ts';
import { CharacterContent } from '@/pages/Character/components/CharacterContent/CharacterContent.tsx';
import { useCharacters } from '@/pages/Character/hooks/useCharacters.ts';
import { CharacterRefreshContext } from '@/pages/Character/context/CharacterRefreshContext.ts';
import { useProjectStore } from '@/store/ProjectStore.ts';

export const CharacterPage: React.FC = () => {
  const projectId = useProjectStore((state) => state.projectId);

  return <CharacterPageContent key={projectId ?? 'no-project'} projectId={projectId} />;
};

interface CharacterPageContentProps {
  projectId: number | undefined;
}

const CharacterPageContent: React.FC<CharacterPageContentProps> = ({ projectId }) => {
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(null);
  const { characters, isLoading, refresh } = useCharacters(projectId);
  const selectedCharacter = characters.find((character) => character.id === selectedCharacterId);

  return (
    <CharacterRefreshContext value={refresh}>
      <Row style={{ height: '100%', minHeight: 0, overflow: 'hidden' }}>
        <Col
          span={5}
          style={{
            height: '100%',
            minHeight: 0,
            borderRight: `1px solid ${appTheme.colors.border}`,
          }}
        >
          <CharacterSidebar
            characterList={characters}
            loading={isLoading}
            selectedCharacterId={selectedCharacterId}
            onSelectCharacter={setSelectedCharacterId}
          />
        </Col>

        <Col
          span={13}
          style={{
            height: '100%',
            minHeight: 0,
            borderRight: `1px solid ${appTheme.colors.border}`,
          }}
        >
          {selectedCharacter && <CharacterContent character={selectedCharacter} />}
        </Col>
        <Col span={6}>col-6</Col>
      </Row>
    </CharacterRefreshContext>
  );
};

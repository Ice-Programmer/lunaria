import React, { useState } from 'react';
import { Col, Row, Typography } from 'antd';
import { CharacterSidebar } from '@/pages/Character/components/CharacterSidebar.tsx';
import { appTheme } from '@/theme/theme.ts';
import type { CharacterDTO } from '@/types/character.ts';

const { Title } = Typography;

export const CharacterPage: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterDTO | null>(null);

  return (
    <Row style={{ height: '100%', minHeight: 0, overflow: 'hidden' }}>
      <Col
        span={5}
        style={{ height: '100%', minHeight: 0, borderRight: `1px solid ${appTheme.colors.border}` }}
      >
        <CharacterSidebar
          selectedCharacterId={selectedCharacter?.id ?? null}
          onSelectCharacter={setSelectedCharacter}
        />
      </Col>

      <Col span={13} style={{ padding: 24 }}>
        {selectedCharacter && (
          <Title level={4}>{selectedCharacter.characterName}</Title>
        )}
      </Col>
      <Col span={6}>col-6</Col>
    </Row>
  );
};

import React from 'react';
import { Col, Row } from 'antd';
import { CharacterSidebar } from '@/pages/Character/components/CharacterSidebar.tsx';
import { appTheme } from '@/theme/theme.ts';

export const CharacterPage: React.FC = () => {
  return (
    <Row style={{ height: '100%', minHeight: 0, overflow: 'hidden' }}>
      <Col
        span={5}
        style={{ height: '100%', minHeight: 0, borderRight: `1px solid ${appTheme.colors.border}` }}
      >
        <CharacterSidebar />
      </Col>

      <Col span={13}>col-12</Col>
      <Col span={6}>col-6</Col>
    </Row>
  );
};

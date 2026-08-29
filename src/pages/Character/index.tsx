import React from 'react';
import { Col, Row } from 'antd';
import { CharacterSidebar } from '@/pages/Character/components/CharacterSidebar.tsx';

export const CharacterPage: React.FC = () => {
  return (
    <Row style={{ minHeight: '100%' }}>
      <Col span={5} style={{ borderRight: '1px solid ${appTheme.colors.border}' }}>
        <CharacterSidebar />
      </Col>

      <Col span={13}>col-12</Col>
      <Col span={6}>col-6</Col>
    </Row>
  );
};

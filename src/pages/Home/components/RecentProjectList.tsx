import React from 'react';
import { Card, Flex, Typography } from 'antd';

const { Title, Text } = Typography;

export const RecentProjectList: React.FC = () => {
  return (
    <Card
      styles={{ body: { padding: 16, height: '100%' } }}
      style={{ width: '100%', height: '100%' }}
    >
      <Flex gap={2} vertical align="start">
        <Title level={5}>最近编辑</Title>
      </Flex>
    </Card>
  );
};

interface RecentProjectContentProps {
  projectName: string;
  projectPath: string;
  lastedOpenedAt: number;
}

const RecentProjectContent: React.FC<RecentProjectContentProps> = () => {
  return <Flex></Flex>;
};

import React from 'react';
import { Card, Flex, Typography } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export const ProjectSupportCard: React.FC = () => {
  return (
    <Card style={{ width: '100%' }}>
      <Flex vertical align="start">
        <ProjectSupportTitle />
        <ProjectSupportContent />
      </Flex>
    </Card>
  );
};

const ProjectSupportTitle: React.FC = () => (
  <Flex gap={1} vertical align="start">
    <Title level={5}>项目与支持</Title>
    <Text type="secondary">Lunaria · v0.1.0</Text>
  </Flex>
);

const ProjectSupportContent: React.FC = () => {
  return (
    <Flex vertical>
      <Flex>
        <GithubOutlined style={{ fontSize: 30 }} />
      </Flex>
    </Flex>
  );
};

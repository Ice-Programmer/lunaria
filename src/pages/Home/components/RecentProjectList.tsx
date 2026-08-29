import React from 'react';
import { Button, Card, Col, Flex, Row, Typography } from 'antd';
import { useFetchRecentProjects } from '@/pages/Home/hooks/useFetchProject.ts';
import { ProjectIcon } from '@/components/ProjectIcon.tsx';

const { Title, Text } = Typography;

export const RecentProjectList: React.FC = () => {
  return (
    <Card
      styles={{ body: { padding: 16, height: '100%' } }}
      style={{ width: '100%', height: '100%' }}
    >
      <Flex gap={20} vertical align="start">
        <Flex align="center" justify="space-between" style={{ width: '100%' }}>
          <Title level={5} style={{ margin: 0 }}>
            最近编辑
          </Title>
          <Button size="small">查看全部</Button>
        </Flex>

        <RecentProjectContent />
      </Flex>
    </Card>
  );
};

const RecentProjectContent: React.FC = () => {
  const { projects, loading } = useFetchRecentProjects(7);
  const recentProjects = projects.slice(1);

  if (loading) {
    return <>loading...</>;
  }

  if (recentProjects.length === 0) {
    return <>nothing...</>;
  }

  return (
    <Row gutter={[16, 16]} style={{ width: '100%' }}>
      {recentProjects.map((_, index) => (
        <Col span={12} key={index}>
          <RecentProjectItem
            projectName={recentProjects[index].projectName}
            lastOpenedAt={recentProjects[index].lastOpenedAt}
          />
        </Col>
      ))}
    </Row>
  );
};

interface RecentProjectItemProps {
  projectName: string;
  lastOpenedAt: number;
}

// todo 补充
const RecentProjectItem: React.FC<RecentProjectItemProps> = ({ projectName, lastOpenedAt }) => {
  return (
    <Flex align="center" justify="space-between">
      <Flex gap={15}>
        <ProjectIcon text={projectName.charAt(0)} />
        <Flex vertical align="start">
          <Text>{projectName}</Text>
          <Text type="secondary">xxxxxx</Text>
        </Flex>
      </Flex>
      <Text type="secondary">{formatLastOpenedAt(lastOpenedAt)}</Text>
    </Flex>
  );
};

const formatLastOpenedAt = (timestamp: number) => {
  const diff = Date.now() - timestamp * 1000;

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < hour) {
    return `${Math.max(1, Math.floor(diff / minute))} 分钟前`;
  }

  if (diff < day) {
    return `${Math.floor(diff / hour)} 小时前`;
  }

  if (diff < day * 2) {
    return '昨天';
  }

  return `${Math.floor(diff / day)} 天前`;
};

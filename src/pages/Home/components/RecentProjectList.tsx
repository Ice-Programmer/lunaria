import React from 'react';
import { Button, Card, Col, Flex, Row, Typography } from 'antd';
import { useFetchRecentProjects } from '@/pages/Home/hooks/useFetchProject.ts';
import { ProjectIcon } from '@/components/ProjectIcon.tsx';
import { useProjectStore } from '@/store/ProjectStore.ts';
import { useOpenProject } from '@/pages/Home/hooks/useOpenProject.ts';
import type { Project } from '@/types/project.ts';

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
  const projectId = useProjectStore((state) => state.projectId);
  const { isOpeningProject, openProjectPath } = useOpenProject();
  const recentProjects = projects.filter((project) => project.id !== projectId);

  if (loading) {
    return <>loading...</>;
  }

  if (recentProjects.length === 0) {
    return <>nothing...</>;
  }

  return (
    <Row gutter={[16, 16]} style={{ width: '100%' }}>
      {recentProjects.slice(0, 8).map((project) => (
        <Col span={12} key={project.id}>
          <RecentProjectItem
            project={project}
            disabled={isOpeningProject}
            onOpen={() => void openProjectPath(project.projectPath)}
          />
        </Col>
      ))}
    </Row>
  );
};

interface RecentProjectItemProps {
  project: Project;
  disabled: boolean;
  onOpen: () => void;
}

const RecentProjectItem: React.FC<RecentProjectItemProps> = ({ project, disabled, onOpen }) => {
  return (
    <Button
      type="text"
      disabled={disabled}
      onClick={onOpen}
      style={{ width: '100%', height: 'auto', padding: 0 }}
    >
      <Flex align="center" justify="space-between" style={{ width: '100%', minWidth: 0 }}>
        <Flex gap={15} style={{ minWidth: 0 }}>
          <ProjectIcon text={project.projectName.charAt(0)} />
          <Flex vertical align="start" style={{ minWidth: 0 }}>
            <Text>{project.projectName}</Text>
            <Text type="secondary" ellipsis={{ tooltip: project.projectPath }}>
              {project.projectPath}
            </Text>
          </Flex>
        </Flex>
        <Text type="secondary">{formatLastOpenedAt(project.lastOpenedAt)}</Text>
      </Flex>
    </Button>
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

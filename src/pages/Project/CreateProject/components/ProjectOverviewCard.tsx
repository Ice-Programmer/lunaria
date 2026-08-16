import React from 'react';
import { Card, Flex, Typography } from 'antd';
import { ProjectIcon } from '@/components/ProjectIcon.tsx';
import { useCreateProjectStore } from '@/pages/Project/CreateProject/store/createProjectStore.ts';
import { getRandomProjectBackground } from '@/utils/background.ts';

const { Title, Text } = Typography;

export const ProjectOverviewCard: React.FC = () => {
  return (
    <Card cover={<img src={getRandomProjectBackground()} alt="projectOverviewHeaderBackground" />}>
      <ProjectBasicInfoContent />
      <Flex vertical></Flex>
    </Card>
  );
};

const ProjectBasicInfoContent: React.FC = () => {
  const projectName = useCreateProjectStore((state) => state.projectName);

  return (
    <div style={{ position: 'absolute', top: 20, left: 20, height: '100%' }}>
      <Flex gap={20} vertical>
        <ProjectIcon text={projectName.length > 0 ? projectName[0] : 'u'} />

        <Flex align="start" vertical>
          <Title level={5} style={{ color: 'white' }}>
            {projectName}
          </Title>
          <Text style={{ color: 'rgba(255, 255, 255, .62)' }}>基础视觉小说</Text>
        </Flex>
      </Flex>
    </div>
  );
};

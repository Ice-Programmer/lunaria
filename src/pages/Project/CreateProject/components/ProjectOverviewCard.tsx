import React, { useState } from 'react';
import { Card, Divider, Flex, Typography } from 'antd';
import { ProjectIcon } from '@/components/ProjectIcon.tsx';
import { useCreateProjectStore } from '@/pages/Project/CreateProject/store/createProjectStore.ts';
import { getRandomProjectBackground } from '@/utils/background.ts';

const { Title, Text, Paragraph } = Typography;

export const ProjectOverviewCard: React.FC = () => {
  const [backgroundImage] = useState(() => getRandomProjectBackground());
  const store = useCreateProjectStore((state) => state);

  return (
    <Card cover={<img src={backgroundImage} alt="projectOverviewHeaderBackground" />}>
      <ProjectBasicInfoContent />
      <Flex vertical>
        <ProjectBasicInfoItem title="项目名称" content={store.projectName} />
        <ProjectBasicInfoItem title="项目类型" content="空白项目" />
        <ProjectStructure />
      </Flex>
    </Card>
  );
};

const ProjectBasicInfoContent: React.FC = () => {
  const projectName = useCreateProjectStore((state) => state.projectName);

  return (
    <div
      style={{
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        height: '100%',
      }}
    >
      <Flex gap={20} vertical>
        <ProjectIcon text={projectName.length > 0 ? projectName[0] : 'u'} />

        <Flex vertical align="start" style={{ minWidth: 0 }}>
          <Title level={5} ellipsis style={{ color: 'white', width: '100%', textAlign: 'left' }}>
            {projectName}
          </Title>

          <Text style={{ color: 'rgba(255, 255, 255, .62)' }}>空白项目</Text>
        </Flex>
      </Flex>
    </div>
  );
};

interface ProjectBasicInfoProps {
  title: string;
  content: string;
  rows?: number;
}

const ProjectBasicInfoItem: React.FC<ProjectBasicInfoProps> = ({ title, content, rows }) => {
  return (
    <Flex vertical>
      <Flex align="center" gap={20} style={{ width: '100%', minWidth: 0 }}>
        <Text type="secondary" style={{ flexShrink: 0 }}>
          {title}
        </Text>
        <Paragraph ellipsis={{ rows: rows ?? 1 }} style={{ margin: 0 }}>
          {content}
        </Paragraph>
      </Flex>

      <Divider size="middle" />
    </Flex>
  );
};

const ProjectStructure: React.FC = () => {
  const projectName = useCreateProjectStore((state) => state.projectName);

  return (
    <div
      style={{
        width: '100%',
        padding: '8px 20px 5px 20px',
        border: '1px solid #ddd9e8',
        borderRadius: 16,
        background: '#faf9fc',
      }}
    >
      <Text strong style={{ display: 'block', fontSize: 13, textAlign: 'left' }}>
        {projectName}/
      </Text>
      <pre style={{ margin: 0, fontSize: 13, color: '#666272', textAlign: 'left' }}>
        {'├── project.lunaria\n├── assets/\n├── locales/\n├── exports/\n└── backups/'}
      </pre>
    </div>
  );
};

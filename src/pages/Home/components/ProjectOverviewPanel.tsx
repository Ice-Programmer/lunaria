import React from 'react';
import { AppstoreOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Space, Typography } from 'antd';

import emptyProjectStoryBranches from '@/assets/home/empty-project-story-branches.png';
import { useProjectStore } from '@/store/ProjectStore.ts';

const { Title, Text } = Typography;

export const ProjectOverviewPanel: React.FC = () => {
  const projectName = useProjectStore((state) => state.projectName);

  return (
    <Card styles={{ body: { padding: 0 } }} style={cardStyle}>
      <Flex align="center" justify="space-between" style={{ minHeight: 260, padding: '0 28px' }}>
        {projectName == null && <EmptyProjectCardContent />}
      </Flex>
    </Card>
  );
};

const EmptyProjectCardContent: React.FC = () => {
  return (
    <>
      <Space vertical size={30} align="start">
        <Space vertical size={4} align="start">
          <Title level={3} style={{ margin: 0 }}>
            开始创作你的第一个故事
          </Title>

          <Text type="secondary">创建一个项目，搭建世界、角色与剧情分支</Text>
        </Space>

        <Space size={12} wrap>
          <Button type="primary" icon={<PlusOutlined />}>
            新建项目
          </Button>

          <Button icon={<AppstoreOutlined />}>浏览模板</Button>
        </Space>
      </Space>

      <img src={emptyProjectStoryBranches} style={backgroundStyle} alt="" aria-hidden="true" />
    </>
  );
};

const cardStyle: React.CSSProperties = {
  margin: '0 15px',
  overflow: 'hidden',
  background: 'linear-gradient(110deg, #ffffff 0%, #fbf9ff 48%, #f3efff 100%)',
  borderColor: '#ded7f8',
};

const backgroundStyle: React.CSSProperties = {
  width: '43%',
  maxWidth: 520,
  objectFit: 'contain',
  opacity: 0.4,
};

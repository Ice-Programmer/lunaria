import React from 'react';
import { AppstoreOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import emptyProjectStoryBranches from '@/assets/home/empty-project-story-branches.png';
import { useProjectStore } from '@/store/ProjectStore.ts';
import { useAppNavigate } from '@/hooks/useAppNavigate.ts';
import { useAppNotification } from '@/components/AppNotification';

const { Title, Text } = Typography;

export const ProjectOverviewPanel: React.FC = () => {
  const projectName = useProjectStore((state) => state.projectName);

  return (
    <Card styles={{ body: { padding: 0 } }} style={cardStyle}>
      <Flex
        align="center"
        justify="space-between"
        style={{ minHeight: 'clamp(180px, 22vh, 320px)', padding: '0 28px' }}
      >
        {projectName == null && <EmptyProjectCardContent />}
      </Flex>
    </Card>
  );
};

const EmptyProjectCardContent: React.FC = () => {
  const { goCreateProject } = useAppNavigate();
  const { t } = useTranslation();
  const notification = useAppNotification();

  return (
    <>
      <Space vertical size={22} align="start">
        <Space vertical size={4} align="start">
          <Title level={3}>{t('home.overview.title')}</Title>

          <Text type="secondary">{t('home.overview.subtitle')}</Text>
        </Space>

        <Space size={12} wrap>
          <Button type="primary" icon={<PlusOutlined />} onClick={goCreateProject}>
            {t('home.overview.create')}
          </Button>

          <Button
            icon={<AppstoreOutlined />}
            onClick={() => notification.success({ title: 'test message' })}
          >
            {t('home.overview.browseTemplates')}
          </Button>
        </Space>
      </Space>

      <img src={emptyProjectStoryBranches} style={backgroundStyle} alt="" aria-hidden="true" />
    </>
  );
};

const cardStyle: React.CSSProperties = {
  background: 'linear-gradient(110deg, #ffffff 0%, #fbf9ff 48%, #f3efff 100%)',
};

const backgroundStyle: React.CSSProperties = {
  width: '43%',
  maxWidth: 520,
  maxHeight: 'clamp(150px, 18vh, 240px)',
  objectFit: 'contain',
  opacity: 0.4,
};

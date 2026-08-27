import React from 'react';
import { useAppNavigate } from '@/hooks/useAppNavigate.ts';
import { useTranslation } from 'react-i18next';
import { useAppNotification } from '@/components/AppNotification';
import { Button, Space, Typography } from 'antd';
import { AppstoreOutlined, PlusOutlined } from '@ant-design/icons';
import emptyProjectStoryBranches from '@/assets/home/empty-project-story-branches.png';

const { Title, Text } = Typography;

export const EmptyProjectCardContent: React.FC = () => {
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

const backgroundStyle: React.CSSProperties = {
  width: '43%',
  maxWidth: 520,
  maxHeight: 'clamp(150px, 18vh, 240px)',
  objectFit: 'contain',
  opacity: 0.4,
};

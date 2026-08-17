import React from 'react';
import { useProjectStore } from '@/store/ProjectStore.ts';
import { PageHeader } from '@/components/PageHeader.tsx';
import { Button, Space } from 'antd';
import { AppstoreOutlined, PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

export const ProjectHeader: React.FC = () => {
  const projectName = useProjectStore((state) => state.projectName);
  const { t } = useTranslation();

  return (
    <PageHeader
      title={t('home.header.title')}
      subTitle={
        projectName == null ? t('home.header.noRecent') : t('home.header.recent', { projectName })
      }
      rightExtra={
        projectName && (
          <>
            <Space>
              <Button icon={<AppstoreOutlined />}>{t('home.overview.browseTemplates')}</Button>
              <Button type="primary" icon={<PlusOutlined />}>
                {t('home.overview.create')}
              </Button>
            </Space>
          </>
        )
      }
    />
  );
};

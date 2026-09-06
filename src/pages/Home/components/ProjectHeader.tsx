import React from 'react';
import { useProjectStore } from '@/store/ProjectStore.ts';
import { PageHeader } from '@/components/PageHeader.tsx';
import { Button, Space } from 'antd';
import { AppstoreOutlined, FolderOpenOutlined, PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useAppNavigate } from '@/hooks/useAppNavigate.ts';
import { useOpenProject } from '@/pages/Home/hooks/useOpenProject.ts';

export const ProjectHeader: React.FC = () => {
  const projectName = useProjectStore((state) => state.projectName);
  const { t } = useTranslation();
  const { goCreateProject } = useAppNavigate();
  const { isOpeningProject, selectProjectFolder } = useOpenProject();

  return (
    <PageHeader
      title={t('home.header.title')}
      subTitle={
        projectName == null ? t('home.header.noRecent') : t('home.header.recent', { projectName })
      }
      rightExtra={
        <Space>
          <Button
            icon={<FolderOpenOutlined />}
            loading={isOpeningProject}
            onClick={() => void selectProjectFolder()}
          >
            {t('home.openProject.button')}
          </Button>
          {projectName && (
            <>
              <Button icon={<AppstoreOutlined />}>{t('home.overview.browseTemplates')}</Button>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                disabled={isOpeningProject}
                onClick={goCreateProject}
              >
                {t('home.overview.create')}
              </Button>
            </>
          )}
        </Space>
      }
    />
  );
};

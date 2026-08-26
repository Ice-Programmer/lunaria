import React from 'react';
import { CustomFooter } from '@/components/Footer';
import { Button, Flex, Space, Typography } from 'antd';
import { FolderOutlined } from '@ant-design/icons';
import { useAppNotification } from '@/components/AppNotification';
import { appTheme } from '@/theme/theme.ts';
import { getCommandErrorMessage } from '@/i18n/commandErrors.ts';
import { useCreateProject } from '@/pages/Project/CreateProject/hooks/useCreateProject.ts';
import { useFullProjectPath } from '@/pages/Project/CreateProject/hooks/useFullProjectPath.ts';
import { useCreateProjectStore } from '@/pages/Project/CreateProject/store/createProjectStore.ts';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

export const SubmitProjectFooter: React.FC = () => {
  const fullProjectPath = useFullProjectPath();
  const projectName = useCreateProjectStore((state) => state.projectName);
  const { isCreating, submitProject } = useCreateProject();
  const notification = useAppNotification();
  const { t } = useTranslation();
  const normalizedProjectName = projectName.trim();
  const canCreateProject = normalizedProjectName.length > 0 && fullProjectPath.length > 0;

  const handleCreateProject = async () => {
    if (!canCreateProject) {
      return;
    }

    try {
      await submitProject({
        projectName: normalizedProjectName,
        projectPath: fullProjectPath,
      });
      notification.success({
        title: t('createProject.notifications.successTitle'),
        description: t('createProject.notifications.successDescription', {
          projectName: normalizedProjectName,
        }),
      });
    } catch (error) {
      notification.error({
        title: t('createProject.notifications.errorTitle'),
        description: getCommandErrorMessage(error, t),
      });
    }
  };

  return (
    <CustomFooter
      content={
        <Flex align="center" justify="space-between" style={{ margin: '10px 20px' }}>
          <Space style={{ minWidth: 0 }}>
            <FolderOutlined style={{ color: `${appTheme.colors.primary}`, fontSize: 20 }} />
            <Text type="secondary" ellipsis={{ tooltip: fullProjectPath }}>
              {fullProjectPath || t('createProject.loadingPath')}
            </Text>
          </Space>
          <Button
            type="primary"
            disabled={!canCreateProject}
            loading={isCreating}
            onClick={() => void handleCreateProject()}
          >
            {t('createProject.create')}
          </Button>
        </Flex>
      }
    />
  );
};

import React from 'react';
import { CustomFooter } from '@/components/Footer';
import { Button, Flex, Space, Typography } from 'antd';
import { FolderOutlined } from '@ant-design/icons';
import { appTheme } from '@/theme/theme.ts';
import { useFullProjectPath } from '@/pages/Project/CreateProject/hooks/useFullProjectPath.ts';
import { useCreateProjectStore } from '@/pages/Project/CreateProject/store/createProjectStore.ts';
const { Text } = Typography;

export const SubmitProjectFooter: React.FC = () => {
  const fullProjectPath = useFullProjectPath();
  const projectName = useCreateProjectStore((state) => state.projectName);
  const canCreateProject = projectName.trim().length > 0;

  return (
    <CustomFooter
      content={
        <Flex align="center" justify="space-between" style={{ margin: '10px 20px' }}>
          <Space style={{ minWidth: 0 }}>
            <FolderOutlined style={{ color: `${appTheme.colors.primary}`, fontSize: 20 }} />
            <Text type="secondary" ellipsis={{ tooltip: fullProjectPath }}>
              {fullProjectPath || '正在获取默认保存位置…'}
            </Text>
          </Space>
          <Button type="primary" disabled={!canCreateProject}>
            创建项目
          </Button>
        </Flex>
      }
    />
  );
};

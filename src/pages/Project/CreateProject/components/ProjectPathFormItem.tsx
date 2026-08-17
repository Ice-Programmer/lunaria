import React from 'react';
import { Button, Flex, Form, Input, Typography } from 'antd';
import { FolderOutlined } from '@ant-design/icons';
import { CreateProjectRequest } from '@/types/project.ts';
import { useProjectPath } from '@/pages/Project/CreateProject/hooks/useProjectPath.ts';
import { useTranslation } from 'react-i18next';

const { Text, Link } = Typography;

interface ProjectPathFormItemProps {
  projectName: string;
}

export const ProjectPathFormItem: React.FC<ProjectPathFormItemProps> = ({ projectName }) => {
  const { restoreDefaultPath, selectDirectory, setProjectPath } = useProjectPath();
  const { t } = useTranslation();

  return (
    <Form.Item
      label={t('createProject.form.saveLocation')}
      extra={
        <Flex justify="space-between" style={{ width: '100%', marginTop: 5 }}>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {t('createProject.form.subdirectoryHint', { projectName })}
          </Text>

          <Link onClick={restoreDefaultPath} style={{ fontSize: 12 }}>
            {t('createProject.form.restoreDefault')}
          </Link>
        </Flex>
      }
    >
      <Flex gap={12}>
        <Form.Item<CreateProjectRequest> name="projectPath" noStyle>
          <Input onChange={(event) => setProjectPath(event.target.value)} style={{ flex: 1 }} />
        </Form.Item>

        <Button icon={<FolderOutlined />} onClick={selectDirectory}>
          {t('createProject.form.selectFolder')}
        </Button>
      </Flex>
    </Form.Item>
  );
};

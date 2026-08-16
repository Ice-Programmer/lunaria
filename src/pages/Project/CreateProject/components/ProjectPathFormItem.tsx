import React, { useEffect } from 'react';
import { Button, Flex, Form, Input, Typography } from 'antd';
import { FolderOutlined } from '@ant-design/icons';
import { documentDir, join } from '@tauri-apps/api/path';
import { open } from '@tauri-apps/plugin-dialog';
import { CreateProjectRequest } from '@/types/project.ts';

const { Text, Link } = Typography;
const defaultProjectFolderName = 'Lunaria Projects';

const getDefaultProjectPath = async () => {
  const documentsPath = await documentDir();
  return join(documentsPath, defaultProjectFolderName);
};

interface ProjectPathFormItemProps {
  projectName: string;
}

export const ProjectPathFormItem: React.FC<ProjectPathFormItemProps> = ({ projectName }) => {
  const form = Form.useFormInstance<CreateProjectRequest>();

  const handleRestoreDefaultPath = async () => {
    form.setFieldValue('projectPath', await getDefaultProjectPath());
  };

  useEffect(() => {
    void getDefaultProjectPath().then((defaultPath) => {
      form.setFieldValue('projectPath', defaultPath);
    });
  }, [form]);

  const handleSelectDirectory = async () => {
    const selectedPath = await open({
      directory: true,
      multiple: false,
      title: '选择项目保存位置',
    });

    if (selectedPath) {
      form.setFieldValue('projectPath', selectedPath);
    }
  };

  return (
    <Form.Item
      label="保存位置"
      extra={
        <Flex justify="space-between" style={{ width: '100%', marginTop: 5 }}>
          <Text type="secondary" style={{ fontSize: 12 }}>
            将自动创建名为「{projectName}」的子目录
          </Text>

          <Link onClick={handleRestoreDefaultPath} style={{ fontSize: 12 }}>
            恢复默认位置
          </Link>
        </Flex>
      }
    >
      <Flex gap={12}>
        <Form.Item<CreateProjectRequest> name="projectPath" noStyle>
          <Input style={{ flex: 1 }} />
        </Form.Item>

        <Button icon={<FolderOutlined />} onClick={handleSelectDirectory}>
          选择...
        </Button>
      </Flex>
    </Form.Item>
  );
};

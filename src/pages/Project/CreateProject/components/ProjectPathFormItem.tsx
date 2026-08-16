import React from 'react';
import { Button, Flex, Form, Input, Typography } from 'antd';
import { FolderOutlined } from '@ant-design/icons';
import { CreateProjectRequest } from '@/types/project.ts';
import { useProjectPath } from '@/pages/Project/CreateProject/hooks/useProjectPath.ts';

const { Text, Link } = Typography;

interface ProjectPathFormItemProps {
  projectName: string;
}

export const ProjectPathFormItem: React.FC<ProjectPathFormItemProps> = ({ projectName }) => {
  const { restoreDefaultPath, selectDirectory, setProjectPath } = useProjectPath();

  return (
    <Form.Item
      label="保存位置"
      extra={
        <Flex justify="space-between" style={{ width: '100%', marginTop: 5 }}>
          <Text type="secondary" style={{ fontSize: 12 }}>
            将自动创建名为「{projectName}」的子目录
          </Text>

          <Link onClick={restoreDefaultPath} style={{ fontSize: 12 }}>
            恢复默认位置
          </Link>
        </Flex>
      }
    >
      <Flex gap={12}>
        <Form.Item<CreateProjectRequest> name="projectPath" noStyle>
          <Input onChange={(event) => setProjectPath(event.target.value)} style={{ flex: 1 }} />
        </Form.Item>

        <Button icon={<FolderOutlined />} onClick={selectDirectory}>
          选择文件夹
        </Button>
      </Flex>
    </Form.Item>
  );
};

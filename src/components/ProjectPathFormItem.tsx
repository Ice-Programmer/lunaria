import React, { useEffect, useState } from 'react';
import { Button, Flex, Form, Input, Typography } from 'antd';
import { FolderOutlined } from '@ant-design/icons';
import { documentDir, join } from '@tauri-apps/api/path';
import { open } from '@tauri-apps/plugin-dialog';

const { Text, Link } = Typography;
const defaultProjectFolderName = 'Lunaria Projects';

const getDefaultProjectPath = async () => {
  const documentsPath = await documentDir();
  return join(documentsPath, defaultProjectFolderName);
};

export const ProjectPathFormItem: React.FC = () => {
  const [projectPath, setProjectPath] = useState('');

  const handleRestoreDefaultPath = async () => {
    setProjectPath(await getDefaultProjectPath());
  };

  useEffect(() => {
    let isMounted = true;

    void getDefaultProjectPath().then((defaultPath) => {
      if (isMounted) {
        setProjectPath(defaultPath);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSelectDirectory = async () => {
    const selectedPath = await open({
      directory: true,
      multiple: false,
      title: '选择项目保存位置',
    });

    if (selectedPath) {
      setProjectPath(selectedPath);
    }
  };

  return (
    <Form layout="vertical">
      <Form.Item
        label="保存位置"
        extra={
          <Flex justify="space-between" style={{ width: '100%', marginTop: 5 }}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              将自动创建名为“未命名项目”的子目录
            </Text>

            <Link onClick={handleRestoreDefaultPath} style={{ fontSize: 12 }}>
              恢复默认位置
            </Link>
          </Flex>
        }
      >
        <Flex gap={12}>
          <Input
            value={projectPath}
            onChange={(event) => setProjectPath(event.target.value)}
            style={{ flex: 1 }}
          />

          <Button icon={<FolderOutlined />} onClick={handleSelectDirectory}>
            选择...
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};

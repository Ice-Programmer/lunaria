import React from 'react';
import { Button, Flex, Form, Input, Typography } from 'antd';
import { FolderOutlined } from '@ant-design/icons';

const { Text, Link } = Typography;

export const ProjectPathFormItem: React.FC = () => {
  return (
    <Form layout="vertical">
      <Form.Item
        label="保存位置"
        extra={
          <Flex justify="space-between" style={{ width: '100%', marginTop: 5 }}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              将自动创建名为“未命名项目”的子目录
            </Text>

            <Link style={{ fontSize: 12 }}>恢复默认位置</Link>
          </Flex>
        }
      >
        <Flex gap={12}>
          <Input value="~/Documents/Lunaria Projects" style={{ flex: 1 }} />

          <Button icon={<FolderOutlined />}>选择...</Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};

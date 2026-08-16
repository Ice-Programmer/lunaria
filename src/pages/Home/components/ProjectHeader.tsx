import React from 'react';
import { Button, Flex, Space } from 'antd';
import { AppstoreOutlined, PlusOutlined } from '@ant-design/icons';
import { useProjectStore } from '@/store/ProjectStore.ts';

export const ProjectHeader: React.FC = () => {
  const projectName = useProjectStore((state) => state.projectName);

  return (
    <Flex justify="space-between" style={{ backgroundColor: 'white', padding: '15px 20px' }}>
      <Space vertical size={5} align="start">
        <div style={{ fontWeight: 'bold', fontSize: 18 }}>项目首页</div>
        <div style={{ color: '#898393', fontSize: 13 }}>
          {projectName == null
            ? '暂无最近项目 · 新建项目，或从模板开始创作'
            : '最近项目、模版和示例项目 · ' + projectName}
        </div>
      </Space>

      {projectName == null ? undefined : (
        <>
          <Space>
            <Button icon={<AppstoreOutlined />}>浏览模版</Button>
            <Button type="primary" icon={<PlusOutlined />}>
              新建项目
            </Button>
          </Space>
        </>
      )}
    </Flex>
  );
};

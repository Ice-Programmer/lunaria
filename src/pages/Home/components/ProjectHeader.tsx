import React from 'react';
import { useProjectStore } from '@/store/ProjectStore.ts';
import { PageHeader } from '@/components/PageHeader.tsx';
import { Button, Space } from 'antd';
import { AppstoreOutlined, PlusOutlined } from '@ant-design/icons';

export const ProjectHeader: React.FC = () => {
  const projectName = useProjectStore((state) => state.projectName);

  return (
    <PageHeader
      title="项目首页"
      subTitle={
        projectName == null
          ? '暂无最近项目 · 新建项目，或从模板开始创作'
          : `最近项目、模版和示例项目 · ${projectName}`
      }
      rightExtra={
        projectName && (
          <>
            <Space>
              <Button icon={<AppstoreOutlined />}>浏览模版</Button>
              <Button type="primary" icon={<PlusOutlined />}>
                新建项目
              </Button>
            </Space>
          </>
        )
      }
    />
  );
};

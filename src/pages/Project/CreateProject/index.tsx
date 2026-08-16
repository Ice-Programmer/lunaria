import React from 'react';
import { Button, Col, Flex, Row } from 'antd';
import { PageHeader } from '@/components/PageHeader.tsx';
import { LeftOutlined } from '@ant-design/icons';
import { useAppNavigate } from '@/hooks/useAppNavigate.ts';
import { CreateProjectContent } from '@/pages/Project/CreateProject/components/CreateProjectContent.tsx';
import { ProjectOverviewCard } from '@/pages/Project/CreateProject/components/ProjectOverviewCard.tsx';

export const CreateProjectPage: React.FC = () => {
  const { goBack } = useAppNavigate();
  return (
    <Flex vertical gap="middle">
      <PageHeader
        title="新建项目向导"
        subTitle="模版、信息、主题和确认"
        leftExtra={<Button type="text" icon={<LeftOutlined />} onClick={goBack} />}
      />

      <Row style={{ margin: '0 15px' }} gutter={[24, 8]}>
        <Col span={16}>
          <CreateProjectContent />
        </Col>
        <Col span={8}>
          <ProjectOverviewCard />
        </Col>
      </Row>
    </Flex>
  );
};

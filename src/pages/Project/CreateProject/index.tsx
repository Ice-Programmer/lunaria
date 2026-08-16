import React, { useEffect } from 'react';
import { Button, Col, Flex, Row } from 'antd';
import { PageHeader } from '@/components/PageHeader.tsx';
import { LeftOutlined } from '@ant-design/icons';
import { useAppNavigate } from '@/hooks/useAppNavigate.ts';
import { CreateProjectForm } from '@/pages/Project/CreateProject/components/CreateProjectForm.tsx';
import { ProjectOverviewCard } from '@/pages/Project/CreateProject/components/ProjectOverviewCard.tsx';
import { SubmitProjectFooter } from '@/pages/Project/CreateProject/components/SubmitProjectFooter.tsx';
import { useCreateProjectStore } from '@/pages/Project/CreateProject/store/createProjectStore.ts';

export const CreateProjectPage: React.FC = () => {
  const { goBack } = useAppNavigate();
  const reset = useCreateProjectStore((state) => state.reset);

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <Flex vertical gap="middle" style={{ height: '100%' }}>
      <PageHeader
        title="新建项目向导"
        subTitle="模版、信息、主题和确认"
        leftExtra={<Button type="text" icon={<LeftOutlined />} onClick={goBack} />}
      />

      <Row style={{ margin: '0 15px' }} gutter={[24, 8]}>
        <Col span={16}>
          <CreateProjectForm />
        </Col>
        <Col span={8}>
          <ProjectOverviewCard />
        </Col>
      </Row>

      <SubmitProjectFooter />
    </Flex>
  );
};

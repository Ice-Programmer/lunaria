import React from 'react';
import { Card, Divider, Flex, Form, Input, Typography } from 'antd';
import { ProjectPathFormItem } from '@/pages/Project/CreateProject/components/ProjectPathFormItem.tsx';
import { CreateProjectRequest } from '@/types/project.ts';

const { Title, Text } = Typography;

export const CreateProjectForm: React.FC = () => {
  return (
    <Card>
      <Flex vertical>
        <TitleHeader />

        <ProjectCreationForm />
      </Flex>
    </Card>
  );
};

const TitleHeader = () => (
  <Flex vertical align="start">
    <Title level={4}>创建一个新项目</Title>
    <Text type="secondary">项目会创建在你选择的本地文件夹中</Text>
    <Divider />
  </Flex>
);

const ProjectCreationForm = () => {
  const [form] = Form.useForm<CreateProjectRequest>();
  const projectName = Form.useWatch('projectName', form);

  return (
    <Form<CreateProjectRequest> form={form} layout="vertical">
      <Form.Item<CreateProjectRequest> label="项目名称" name="projectName" initialValue="">
        <Input placeholder="请输入项目名称，例如：月下回声" />
      </Form.Item>

      <ProjectPathFormItem projectName={projectName} />
    </Form>
  );
};

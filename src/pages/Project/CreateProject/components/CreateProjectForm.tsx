import React from 'react';
import { Card, Divider, Flex, Form, Input, Typography } from 'antd';
import { ProjectPathFormItem } from '@/pages/Project/CreateProject/components/ProjectPathFormItem.tsx';
import { CreateProjectRequest } from '@/types/project.ts';
import { useCreateProjectStore } from '@/pages/Project/CreateProject/store/createProjectStore.ts';
import { SelectedCardGroup, SelectedCardOption } from '@/components/SelectedCardGroup';
import { FileOutlined, ReadOutlined, BranchesOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
type ProjectType = 'empty' | 'vision' | 'branch';

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
  const storedProjectName = useCreateProjectStore((state) => state.projectName);
  const setProjectName = useCreateProjectStore((state) => state.setProjectName);

  const options: SelectedCardOption<ProjectType>[] = [
    {
      value: 'empty',
      title: '空白项目',
      description: '只创建项目文件和空白 Story，适合从零开始',
      icon: <FileOutlined />,
    },
    {
      value: 'vision',
      title: '基础视觉小说',
      description: '预置章节、Dialogue 与基础玩家洁面',
      icon: <ReadOutlined />,
      disabled: true,
    },
    {
      value: 'branch',
      title: '多结局分支故事',
      description: '预置变量、Condition、Choice 与两个 Ending',
      icon: <BranchesOutlined />,
      disabled: true,
    },
  ];
  return (
    <Form<CreateProjectRequest> form={form} layout="vertical" style={{ textAlign: 'left' }}>
      <Form.Item<CreateProjectRequest>
        label="项目名称"
        name="projectName"
        initialValue={storedProjectName}
        rules={[{ required: true, whitespace: true, message: '请输入项目名称' }]}
      >
        <Input
          placeholder="请输入项目名称，例如：月下回声"
          onChange={(event) => setProjectName(event.target.value)}
        />
      </Form.Item>

      <ProjectPathFormItem projectName={projectName} />

      <Form.Item label="项目类型" name="projectType" initialValue="empty">
        <SelectedCardGroup options={options} />
      </Form.Item>
    </Form>
  );
};

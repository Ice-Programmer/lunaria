import React from 'react';
import { Card, Divider, Flex, Form, Input, Typography } from 'antd';
import { ProjectPathFormItem } from '@/pages/Project/CreateProject/components/ProjectPathFormItem.tsx';
import { CreateProjectRequest } from '@/types/project.ts';
import { useCreateProjectStore } from '@/pages/Project/CreateProject/store/createProjectStore.ts';
import { SelectedCardGroup, SelectedCardOption } from '@/components/SelectedCardGroup';
import { FileOutlined, ReadOutlined, BranchesOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

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

const TitleHeader = () => {
  const { t } = useTranslation();

  return (
    <Flex vertical align="start">
      <Title level={4}>{t('createProject.form.title')}</Title>
      <Text type="secondary">{t('createProject.form.subtitle')}</Text>
      <Divider />
    </Flex>
  );
};

const ProjectCreationForm = () => {
  const [form] = Form.useForm<CreateProjectRequest>();
  const projectName = Form.useWatch('projectName', form);
  const storedProjectName = useCreateProjectStore((state) => state.projectName);
  const setProjectName = useCreateProjectStore((state) => state.setProjectName);
  const { t } = useTranslation();
  const options: SelectedCardOption<ProjectType>[] = [
    {
      value: 'empty',
      title: t('createProject.types.empty.title'),
      description: t('createProject.types.empty.description'),
      icon: <FileOutlined />,
    },
    {
      value: 'vision',
      title: t('createProject.types.visualNovel.title'),
      description: t('createProject.types.visualNovel.description'),
      icon: <ReadOutlined />,
      disabled: true,
    },
    {
      value: 'branch',
      title: t('createProject.types.branching.title'),
      description: t('createProject.types.branching.description'),
      icon: <BranchesOutlined />,
      disabled: true,
    },
  ];

  return (
    <Form<CreateProjectRequest> form={form} layout="vertical" style={{ textAlign: 'left' }}>
      <Form.Item<CreateProjectRequest>
        label={t('createProject.form.projectName')}
        name="projectName"
        initialValue={storedProjectName}
        rules={[
          {
            required: true,
            whitespace: true,
            message: t('createProject.form.projectNameRequired'),
          },
        ]}
      >
        <Input
          maxLength={50}
          placeholder={t('createProject.form.projectNamePlaceholder')}
          onChange={(event) => setProjectName(event.target.value)}
        />
      </Form.Item>

      <ProjectPathFormItem projectName={projectName} />

      <Form.Item
        label={t('createProject.form.projectType')}
        name="projectType"
        initialValue="empty"
      >
        <SelectedCardGroup options={options} />
      </Form.Item>
    </Form>
  );
};

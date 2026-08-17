import React, { ReactNode } from 'react';
import { Button, Card, Divider, Flex, Typography } from 'antd';
import {
  ExportOutlined,
  GithubOutlined,
  MessageOutlined,
  ReadOutlined,
  RightOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { useOpenExternal } from '@/hooks/useOpenExternal.ts';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;

export const ProjectSupportCard: React.FC = () => {
  return (
    <Card style={{ width: '100%' }}>
      <Flex vertical align="start" gap={10}>
        <ProjectSupportTitle />
        <ProjectSupportContent />
      </Flex>
    </Card>
  );
};

const ProjectSupportTitle: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Flex gap={1} vertical align="start">
      <Title level={5}>{t('home.support.title')}</Title>
      <Text type="secondary">Lunaria · v0.1.0</Text>
    </Flex>
  );
};

const ProjectSupportContent: React.FC = () => {
  const { goToGithub } = useOpenExternal();
  const { t } = useTranslation();

  return (
    <Flex vertical style={{ width: '100%' }}>
      <SupportItemContent
        icon={<GithubOutlined style={{ fontSize: 28 }} />}
        title={t('home.support.repository')}
        subTitle="github/Ice-Programmer/lunaria"
        handleButton={
          <Button
            type="text"
            icon={<ExportOutlined style={{ color: '#8067dc' }} />}
            onClick={goToGithub}
          />
        }
      />

      <Divider style={{ margin: '10px' }} />

      <SupportItemContent
        icon={<ReadOutlined style={{ fontSize: 28, color: '#8067dc' }} />}
        title={t('home.support.docs')}
        subTitle={t('home.support.docsDescription')}
        handleButton={<Button type="text" icon={<RightOutlined style={{ color: '#8067dc' }} />} />}
      />

      <Divider style={{ margin: '10px' }} />

      <SupportItemContent
        icon={<MessageOutlined style={{ fontSize: 28, color: '#8067dc' }} />}
        title={t('home.support.feedback')}
        subTitle={t('home.support.feedbackDescription')}
        handleButton={<Button type="text" icon={<RightOutlined style={{ color: '#8067dc' }} />} />}
      />

      <Flex gap={10} justify="center" style={{ width: '100%', marginTop: '20px' }}>
        <StarOutlined style={{ color: '#8067dc' }} />
        <Text style={{ color: '#8067dc' }}>{t('home.support.openSource')}</Text>
      </Flex>
    </Flex>
  );
};

interface ProjectSupportContentProps {
  icon: ReactNode;
  title: string;
  subTitle: string;
  handleButton: ReactNode;
}

const SupportItemContent: React.FC<ProjectSupportContentProps> = ({
  icon,
  title,
  subTitle,
  handleButton,
}) => (
  <Flex gap={10} justify="space-between" align="center">
    <Flex gap={10}>
      {icon}

      <Flex vertical align="start">
        <Text strong={true}>{title}</Text>
        <Text type="secondary" style={{ fontSize: 12 }}>
          {subTitle}
        </Text>
      </Flex>
    </Flex>

    {handleButton}
  </Flex>
);

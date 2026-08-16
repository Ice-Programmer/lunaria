import React, { ReactNode } from 'react';
import { Button, Card, Divider, Flex, Typography } from 'antd';
import {
  GithubOutlined,
  ExportOutlined,
  MessageOutlined,
  ReadOutlined,
  RightOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { openUrl } from '@tauri-apps/plugin-opener';

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

const ProjectSupportTitle: React.FC = () => (
  <Flex gap={1} vertical align="start">
    <Title level={5}>项目与支持</Title>
    <Text type="secondary">Lunaria · v0.1.0</Text>
  </Flex>
);

const ProjectSupportContent: React.FC = () => {
  return (
    <Flex vertical style={{ width: '100%' }}>
      <SupportItemContent
        icon={<GithubOutlined style={{ fontSize: 28 }} />}
        title="GitHub 仓库"
        subTitle="github/Ice-Programmer/lunaria"
        handleButton={
          <Button
            type="text"
            icon={<ExportOutlined style={{ color: '#8067dc' }} />}
            onClick={async () => {
              await openUrl('https://github.com/Ice-Programmer/lunaria');
            }}
          />
        }
      />

      <Divider style={{ margin: '10px' }} />

      <SupportItemContent
        icon={<ReadOutlined style={{ fontSize: 28, color: '#8067dc' }} />}
        title="使用文档"
        subTitle="查看功能于操作说明"
        handleButton={<Button type="text" icon={<RightOutlined style={{ color: '#8067dc' }} />} />}
      />

      <Divider style={{ margin: '10px' }} />

      <SupportItemContent
        icon={<MessageOutlined style={{ fontSize: 28, color: '#8067dc' }} />}
        title="问题反馈"
        subTitle="提交 Bug 或功能建议"
        handleButton={<Button type="text" icon={<RightOutlined style={{ color: '#8067dc' }} />} />}
      />

      <Flex gap={10} justify="center" style={{ width: '100%', marginTop: '20px' }}>
        <StarOutlined style={{ color: '#8067dc' }} />
        <Text style={{ color: '#8067dc' }}>开源项目 · 欢迎参与贡献和反馈</Text>
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

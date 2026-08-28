import React from 'react';
import { Button, Card, Col, Divider, Flex, Row, Typography } from 'antd';
import {
  ApartmentOutlined,
  AppstoreOutlined,
  EditOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import { appTheme } from '@/theme/theme.ts';

const { Text, Title } = Typography;

export const ProjectWorkspaceCard: React.FC = () => {
  return (
    <Card styles={{ body: { padding: '25px 8px' } }}>
      <Flex vertical gap={20}>
        <Title level={5} style={{ alignSelf: 'flex-start', paddingLeft: '1rem' }}>
          项目工作区
        </Title>
        <Row>
          <ProjectStats
            icon={<ApartmentOutlined />}
            title="剧情结构"
            content="5 Story · 26 剧情块"
          />
          <ProjectStats icon={<EditOutlined />} title="场景写作" content="Chapter 2 · 月台重逢" />
          <ProjectStats
            icon={<AppstoreOutlined />}
            title="角色与资源"
            content="3 角色 · 126 素材"
          />
          <ProjectStats
            icon={<PlayCircleOutlined />}
            title="预览发布"
            content="3 项待处理"
            needDivider={false}
          />
        </Row>
      </Flex>
    </Card>
  );
};

interface ProjectStatsProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  needDivider?: boolean;
}

const ProjectStats: React.FC<ProjectStatsProps> = ({
  icon,
  title,
  content,
  needDivider = true,
}) => {
  return (
    <Col span={6}>
      <Flex justify="space-between">
        <Flex gap="middle" style={{ paddingLeft: '1rem' }}>
          <Button
            type="primary"
            icon={icon}
            disabled
            style={{ backgroundColor: '#F1EBFF', color: appTheme.colors.primary }}
            size="large"
          />

          <Flex vertical align="start">
            <Text strong={true} style={{ fontSize: 14 }}>
              {title}
            </Text>
            <Text type="secondary" strong={true} style={{ fontSize: 10 }}>
              {content}
            </Text>
          </Flex>
        </Flex>

        {needDivider && <Divider vertical style={{ height: 'auto' }} />}
      </Flex>
    </Col>
  );
};

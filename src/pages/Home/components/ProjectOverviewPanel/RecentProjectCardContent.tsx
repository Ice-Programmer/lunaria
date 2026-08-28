import React from 'react';
import { Button, Flex, Typography } from 'antd';
import { useProjectStore } from '@/store/ProjectStore.ts';
import { useTranslation } from 'react-i18next';
import { EditOutlined, ApartmentOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export const RecentProjectCardContent: React.FC = () => {
  const projectName = useProjectStore((state) => state.projectName);
  const { t } = useTranslation();
  return (
    <>
      <Flex justify="space-between" style={{ width: '100%' }}>
        <Flex vertical align="start">
          <Title level={4}>{projectName}</Title>
          <Text type="secondary">
            {t('home.recentProject.recentEdit')}: Chapter 2 · 月台重逢 · Dialogue #81
          </Text>

          <Text type="secondary" style={{ marginTop: 20, fontSize: 12 }}>
            18,420 字 · 26 个剧情块 · 3 个角色
          </Text>
        </Flex>

        <Flex gap={13} vertical>
          <Button type="primary" icon={<EditOutlined />}>
            继续写作
          </Button>
          <Button icon={<ApartmentOutlined />}>剧情结构</Button>
        </Flex>
      </Flex>
    </>
  );
};

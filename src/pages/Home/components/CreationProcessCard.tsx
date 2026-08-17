import React from 'react';
import { Card, Flex, Space, Steps, Typography } from 'antd';
import type { StepsProps } from 'antd';
import { useTranslation } from 'react-i18next';

const { Text, Title } = Typography;

export const CreateProcessCard: React.FC = () => {
  const { t } = useTranslation();
  const progressItems: ProgressItem[] = [
    { title: t('home.process.world.title'), subtitle: t('home.process.world.subtitle') },
    { title: t('home.process.characters.title'), subtitle: t('home.process.characters.subtitle') },
    { title: t('home.process.story.title'), subtitle: t('home.process.story.subtitle') },
    { title: t('home.process.publish.title'), subtitle: t('home.process.publish.subtitle') },
  ];
  const items: StepsProps['items'] = progressItems.map((item) => ({
    title: <ProgressContent {...item} />,
  }));

  return (
    <Card styles={{ body: { padding: '14px 20px' } }}>
      <Flex vertical gap={12}>
        <Space vertical align="start" size={1}>
          <Title level={4}>{t('home.process.title')}</Title>
          <Text type="secondary">{t('home.process.subtitle')}</Text>
        </Space>

        <Steps current={-1} items={items} styles={stylesObject} />
      </Flex>
    </Card>
  );
};

interface ProgressItem {
  title: string;
  subtitle: string;
}

const ProgressContent: React.FC<ProgressItem> = ({ title, subtitle }) => {
  return (
    <Flex vertical gap={2}>
      <Text strong style={{ fontSize: 15 }}>
        {title}
      </Text>

      <Text type="secondary" style={{ fontSize: 12 }}>
        {subtitle}
      </Text>
    </Flex>
  );
};

const stylesObject: StepsProps['styles'] = {
  itemIcon: { borderRadius: '30%', backgroundColor: '#8067dc', color: 'white' },
};

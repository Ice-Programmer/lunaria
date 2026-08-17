import React from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Tag, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import storyTemplateCampusRomance from '@/assets/home/template/story-template-campus-romance.png';
import storyTemplateFantasyJourney from '@/assets/home/template/story-template-fantasy-journey.png';
import storyTemplateRainyMystery from '@/assets/home/template/story-template-rainy-mystery.png';

const { Title, Text } = Typography;

export const StoryTemplateSection: React.FC = () => {
  const { t } = useTranslation();
  const storyTemplates: StoryTemplate[] = [
    {
      id: 'campus',
      title: t('home.templates.campus.title'),
      category: t('home.templates.campus.category'),
      image: storyTemplateCampusRomance,
      imageAlt: t('home.templates.campus.imageAlt'),
    },
    {
      id: 'mystery',
      title: t('home.templates.mystery.title'),
      category: t('home.templates.mystery.category'),
      image: storyTemplateRainyMystery,
      imageAlt: t('home.templates.mystery.imageAlt'),
    },
    {
      id: 'fantasy',
      title: t('home.templates.fantasy.title'),
      category: t('home.templates.fantasy.category'),
      image: storyTemplateFantasyJourney,
      imageAlt: t('home.templates.fantasy.imageAlt'),
    },
  ];

  return (
    <Card
      style={{ width: '100%', height: '100%' }}
      styles={{ body: { padding: 16, height: '100%' } }}
    >
      <Flex vertical justify="space-between" style={{ height: '100%' }}>
        <Flex align="start" justify="space-between" gap={16}>
          <Flex gap={2} vertical align="start">
            <Title level={5}>{t('home.templates.title')}</Title>
            <Text type="secondary">{t('home.templates.subtitle')}</Text>
          </Flex>

          <Button
            type="text"
            size="small"
            style={{ paddingInline: 0, color: '#8067dc' }}
            icon={<ArrowRightOutlined />}
            iconPlacement="end"
          >
            {t('home.templates.viewAll')}
          </Button>
        </Flex>

        <Flex gap={12} style={{ width: '100%' }}>
          {storyTemplates.map((template) => (
            <StoryTemplateCard key={template.id} template={template} />
          ))}
        </Flex>
      </Flex>
    </Card>
  );
};

interface StoryTemplate {
  id: string;
  title: string;
  category: string;
  image: string;
  imageAlt: string;
}

interface StoryTemplateCardProps {
  template: StoryTemplate;
}

const StoryTemplateCard: React.FC<StoryTemplateCardProps> = ({ template }) => {
  const { t } = useTranslation();

  return (
    <Card
      hoverable
      style={{ flex: '1 1 0', minWidth: 0, overflow: 'hidden' }}
      styles={{ body: { padding: '6px 10px' } }}
      cover={
        <div style={{ position: 'relative' }}>
          <img
            alt={template.imageAlt}
            src={template.image}
            style={{
              display: 'block',
              height: 'clamp(130px, 13vh, 180px)',
              width: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      }
    >
      <Flex align="start" vertical gap={5} style={{ width: '100%' }}>
        <Text strong ellipsis style={{ minWidth: 0 }}>
          {template.title}
        </Text>

        <Flex align="center" justify="space-between" gap={8} style={{ width: '100%' }}>
          <Tag color="purple">{template.category}</Tag>

          <Button
            type="text"
            size="small"
            style={{
              height: 'auto',
              padding: 0,
              color: '#8067dc',
              fontSize: 12,
            }}
          >
            {t('home.templates.use')}
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};

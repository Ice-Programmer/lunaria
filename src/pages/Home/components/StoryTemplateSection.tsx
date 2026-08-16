import React from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Tag, Typography } from 'antd';

import storyTemplateCampusRomance from '@/assets/home/template/story-template-campus-romance.png';
import storyTemplateFantasyJourney from '@/assets/home/template/story-template-fantasy-journey.png';
import storyTemplateRainyMystery from '@/assets/home/template/story-template-rainy-mystery.png';

const { Title, Text } = Typography;


const storyTemplates: StoryTemplate[] = [
  {
    title: '校园心动',
    category: '恋爱',
    image: storyTemplateCampusRomance,
    imageAlt: '樱花盛开的校园',
  },
  {
    title: '雨夜谜案',
    category: '悬疑',
    image: storyTemplateRainyMystery,
    imageAlt: '雨夜中的街道',
  },
  {
    title: '异世界旅途',
    category: '奇幻',
    image: storyTemplateFantasyJourney,
    imageAlt: '通往幻想城堡的原野',
  },
];

export const StoryTemplateSection: React.FC = () => {
  return (
    <Card style={{ width: '100%', height: '100%' }} styles={{ body: { padding: 16 } }}>
      <Flex vertical gap={10}>
        <Flex align="start" justify="space-between" gap={16}>
          <Flex gap={2} vertical align="start">
            <Title level={5}>灵感模板</Title>
            <Text type="secondary">从一个主题开始你的故事</Text>
          </Flex>

          <Button
            type="text"
            size="small"
            style={{ paddingInline: 0, color: '#8067dc' }}
            icon={<ArrowRightOutlined />}
            iconPlacement="end"
          >
            查看全部
          </Button>
        </Flex>

        <Flex gap={12} style={{ width: '100%' }}>
          {storyTemplates.map((template) => (
            <StoryTemplateCard key={template.title} template={template} />
          ))}
        </Flex>
      </Flex>
    </Card>
  );
};


interface StoryTemplate {
  title: string;
  category: string;
  image: string;
  imageAlt: string;
}

interface StoryTemplateCardProps {
  template: StoryTemplate;
}

const StoryTemplateCard: React.FC<StoryTemplateCardProps> = ({ template }) => {
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
              height: 'clamp(110px, 13vh, 180px)',
              width: '100%',
              objectFit: 'cover',
            }}
          />
          <Tag
            color="purple"
            style={{
              position: 'absolute',
              top: 8,
              left: 8,
              border: 4,
              marginInlineEnd: 0,
            }}
          >
            {template.category}
          </Tag>
        </div>
      }
    >
      <Flex align="center" justify="space-between" gap={8} style={{ width: '100%' }}>
        <Text strong ellipsis style={{ minWidth: 0 }}>
          {template.title}
        </Text>

        <Button
          type="text"
          size="small"
          style={{
            flexShrink: 0,
            height: 'auto',
            padding: 0,
            color: '#8067dc',
            fontSize: 12,
          }}
        >
          使用模板
        </Button>
      </Flex>
    </Card>
  );
};

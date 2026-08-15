import React from 'react';
import { Card, Flex, Space, Steps, Typography } from 'antd';
import type { StepsProps } from 'antd';

const { Text, Title } = Typography;

export const CreateProcessCard: React.FC = () => {
  const items: StepsProps['items'] = progressItems.map((item) => ({
    title: <ProgressContent {...item} />,
  }));

  return (
    <Card style={cardStyle}>
      <Flex vertical gap={25}>
        <Space vertical align="start" size={1}>
          <Title level={4} style={{ margin: 0 }}>
            推荐模版
          </Title>
          <Text type="secondary">四步完成你的第一步作品</Text>
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

const progressItems: ProgressItem[] = [
  { title: '世界设定', subtitle: '建立故事背景' },
  { title: '角色与资源', subtitle: '添加人物和立绘' },
  { title: '剧情编排', subtitle: '连接对话与分支' },
  { title: '预览发布', subtitle: '检查并导出作品' },
];

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

const cardStyle: React.CSSProperties = {
  margin: '0 15px',
  overflow: 'hidden',
  borderColor: '#ded7f8',
};

const stylesObject: StepsProps['styles'] = {
  itemIcon: { borderRadius: '30%', backgroundColor: '#8067dc', color: 'white' },
};

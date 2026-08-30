import React from 'react';
import { Card, Flex, Typography } from 'antd';
import { ImageCropUploader } from '@/components/ImageCropUploader';

const { Text } = Typography;

interface CharacterUploaderProps {
  onChange?: (file: File) => void;
}

export const CharacterUploader: React.FC<CharacterUploaderProps> = ({ onChange }) => {
  return (
    <Card style={{ width: '100%', backgroundColor: '#F8F6FB' }} styles={{ body: { padding: 10 } }}>
      <Flex vertical>
        <Text strong>角色头像</Text>
        <Text type="secondary" style={{ fontSize: 11, marginBottom: 8 }}>
          只用于编辑器的角色列表
        </Text>

        <ImageCropUploader onChange={onChange} />

        <Text type="secondary" style={{ fontSize: 10, marginTop: 8 }}>
          可稍后添加，不作为游戏立绘使用
        </Text>
      </Flex>
    </Card>
  );
};

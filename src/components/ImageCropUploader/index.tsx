import React, { useEffect, useState } from 'react';
import { Flex, Upload, Typography, UploadProps } from 'antd';
import { TeamOutlined } from '@ant-design/icons';

const { Text } = Typography;

export const ImageCropUploader: React.FC = () => {
  const [previewUrl, setPreviewUrl] = useState<string>();

  const handleBeforeUpload: UploadProps['beforeUpload'] = (file) => {
    const url = URL.createObjectURL(file);

    setPreviewUrl((oldUrl) => {
      if (oldUrl) {
        URL.revokeObjectURL(oldUrl);
      }

      return url;
    });

    return false;
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <Upload
      style={{ width: '100%', height: 'auto', aspectRatio: '1 / 1', backgroundColor: 'white' }}
      listType="picture-card"
      accept=".png,.jpg,.jpeg"
      showUploadList={false}
      beforeUpload={handleBeforeUpload}
    >
      {previewUrl ? (
        <img
          src={previewUrl}
          alt="avatar"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <Flex vertical align="center" gap={8}>
          <TeamOutlined style={{ fontSize: 30 }} />

          <Text strong style={{ fontSize: 12 }}>
            添加头像
          </Text>

          <Text type="secondary" style={{ fontSize: 9 }}>
            PNG/JPG 建议 512x512
          </Text>
        </Flex>
      )}
    </Upload>
  );
};

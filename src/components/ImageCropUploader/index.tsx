import React, { useEffect, useRef, useState } from 'react';
import { Flex, Typography, Upload } from 'antd';
import type { UploadProps } from 'antd';
import { TeamOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';

const { Text } = Typography;

interface ImageCropUploaderProps {
  onChange?: (file: File) => void;
}

export const ImageCropUploader: React.FC<ImageCropUploaderProps> = ({ onChange }) => {
  const previewUrlRef = useRef<string | undefined>(undefined);
  const [previewUrl, setPreviewUrl] = useState<string>();

  useEffect(
    () => () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    },
    []
  );

  const handleBeforeUpload: UploadProps['beforeUpload'] = (file) => {
    const nextPreviewUrl = URL.createObjectURL(file);

    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    previewUrlRef.current = nextPreviewUrl;
    setPreviewUrl(nextPreviewUrl);
    onChange?.(file);

    return false;
  };

  return (
    <ImgCrop
      aspect={1}
      cropShape="rect"
      showGrid
      zoomSlider={false}
      rotationSlider={false}
      modalTitle="裁剪头像"
      modalOk="确认裁剪"
      modalCancel="取消"
    >
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
    </ImgCrop>
  );
};

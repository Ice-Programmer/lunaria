import React, { useEffect, useRef, useState } from 'react';
import type { UploadProps } from 'antd';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

interface ImageCropUploaderProps {
  onChange?: (file: File) => void;
  content: React.ReactNode;
  aspectRatio?: number;
  enableCrop?: boolean;
}

export const ImageCropUploader: React.FC<ImageCropUploaderProps> = ({
  onChange,
  content,
  aspectRatio = 1,
  enableCrop = true,
}) => {
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

  const uploader = (
    <Upload
      style={{
        width: '100%',
        height: 'auto',
        aspectRatio: aspectRatio,
        backgroundColor: 'white',
      }}
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
        content
      )}
    </Upload>
  );

  if (!enableCrop) {
    return uploader;
  }

  return (
    <ImgCrop
      aspect={aspectRatio}
      cropShape="rect"
      showGrid
      zoomSlider={true}
      rotationSlider={false}
      modalTitle="裁剪头像"
      modalOk="确认裁剪"
      modalCancel="取消"
    >
      {uploader}
    </ImgCrop>
  );
};

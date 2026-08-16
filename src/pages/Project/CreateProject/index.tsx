import React from 'react';
import { Button, Flex } from 'antd';
import { PageHeader } from '@/components/PageHeader.tsx';
import { LeftOutlined } from '@ant-design/icons';
import { useAppNavigate } from '@/hooks/useAppNavigate.ts';

export const CreateProjectPage: React.FC = () => {
  const { goBack } = useAppNavigate();
  return (
    <Flex vertical gap="middle">
      <PageHeader
        title="新建项目向导"
        subTitle="模版、信息、主题和确认"
        leftExtra={<Button type="text" icon={<LeftOutlined />} onClick={goBack} />}
      />
    </Flex>
  );
};

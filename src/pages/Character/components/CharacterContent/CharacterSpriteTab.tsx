import React from 'react';
import { Flex } from 'antd';
import { CustomSegmented } from '@/components/CustomSegmented';

export const CharacterSpriteTab: React.FC = () => {
  return (
    <Flex vertical>
      <CustomSegmented options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']} />
    </Flex>
  );
};

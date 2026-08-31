import React from 'react';
import { Flex } from 'antd';
import { CustomSegmented } from '@/components/CustomSegmented';

export const CharacterSpriteTab: React.FC = () => {
  return (
    <Flex vertical align="start">
      <CustomSegmented
        width="70%"
        options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']}
      />
    </Flex>
  );
};

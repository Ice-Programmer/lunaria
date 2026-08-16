import React from 'react';
import { Flex } from 'antd';
import { appTheme } from '@/theme/theme.ts';

export interface ProjectIconProps {
  size?: number;
  text: string;
  borderSize?: number;
  fontSize?: number;
}

export const ProjectIcon: React.FC<ProjectIconProps> = ({ size, text, borderSize, fontSize }) => {
  return (
    <Flex
      align="center"
      justify="center"
      style={{
        width: size ?? 40,
        height: size ?? 40,
        borderRadius: borderSize ?? 10,
        background: appTheme.colors.primary,
        color: 'white',
        fontSize: fontSize ?? 16,
        fontWeight: 'bold',
      }}
    >
      {text}
    </Flex>
  );
};

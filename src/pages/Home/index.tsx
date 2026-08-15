import React from 'react';
import { ProjectHeader } from './components/ProjectHeader.tsx';
import { Flex } from 'antd';
import { ProjectOverviewPanel } from './components/ProjectOverviewPanel.tsx';

export const HomePage: React.FC = () => {
  return (
    <>
      <Flex vertical gap="middle">
        <ProjectHeader />
        <ProjectOverviewPanel />
      </Flex>
    </>
  );
};

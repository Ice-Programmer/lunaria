import React from 'react';
import { ProjectHeader } from './components/ProjectHeader.tsx';
import { Flex } from 'antd';
import { ProjectOverviewPanel } from './components/ProjectOverviewPanel.tsx';
import { CreateProcessCard } from '@/pages/Home/components/CreationProcessCard.tsx';

export const HomePage: React.FC = () => {
  return (
    <>
      <Flex vertical gap="middle">
        <ProjectHeader />
        <ProjectOverviewPanel />
        <CreateProcessCard />
      </Flex>
    </>
  );
};

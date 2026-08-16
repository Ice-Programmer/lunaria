import React from 'react';
import { ProjectHeader } from './components/ProjectHeader.tsx';
import { Flex } from 'antd';
import { ProjectOverviewPanel } from './components/ProjectOverviewPanel.tsx';
import { CreateProcessCard } from '@/pages/Home/components/CreationProcessCard.tsx';
import { StoryTemplateSection } from '@/pages/Home/components/StoryTemplateSection.tsx';
import { ProjectSupportCard } from '@/pages/Home/components/ProjectSupportCard.tsx';

export const HomePage: React.FC = () => {
  return (
    <>
      <Flex vertical gap="middle">
        <ProjectHeader />

        <Flex gap={20} vertical style={{ margin: '0 15px' }}>
          <ProjectOverviewPanel />

          <CreateProcessCard />

          <Flex gap={20} justify="space-between">
            <div style={{ display: 'flex', flex: '7 1 0', minWidth: 0 }}>
              <StoryTemplateSection />
            </div>
            <div style={{ display: 'flex', flex: '3 1 0', minWidth: 280 }}>
              <ProjectSupportCard />
            </div>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

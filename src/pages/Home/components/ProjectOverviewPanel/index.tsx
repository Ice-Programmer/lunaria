import React from 'react';
import { Card, Flex } from 'antd';

import { useProjectStore } from '@/store/ProjectStore.ts';
import { EmptyProjectCardContent } from '@/pages/Home/components/ProjectOverviewPanel/EmptyProjectCardContent.tsx';

export const ProjectOverviewPanel: React.FC = () => {
  const projectName = useProjectStore((state) => state.projectName);

  return (
    <Card
      styles={{ body: { padding: 0 } }}
      style={{
        background: 'linear-gradient(110deg, #ffffff 0%, #fbf9ff 48%, #f3efff 100%)',
      }}
    >
      <Flex
        align="center"
        justify="space-between"
        style={{ minHeight: 'clamp(180px, 22vh, 320px)', padding: '0 28px' }}
      >
        {projectName == null && <EmptyProjectCardContent />}
      </Flex>
    </Card>
  );
};

import { useState } from 'react';
import { createProject } from '@/api/project.ts';
import { useAppNavigate } from '@/hooks/useAppNavigate.ts';
import { useProjectStore } from '@/store/ProjectStore.ts';
import type { CreateProjectRequest } from '@/types/project.ts';

export const useCreateProject = () => {
  const [isCreating, setIsCreating] = useState(false);
  const setProject = useProjectStore((state) => state.setProject);
  const isOpeningProject = useProjectStore((state) => state.isOpeningProject);
  const setIsOpeningProject = useProjectStore((state) => state.setIsOpeningProject);
  const { goHome } = useAppNavigate();

  const submitProject = async (request: CreateProjectRequest) => {
    if (useProjectStore.getState().isOpeningProject) {
      throw new Error('A project is already being opened');
    }

    setIsOpeningProject(true);
    setIsCreating(true);

    try {
      const project = await createProject(request);
      setProject(project.id, project.projectName, project.projectPath);
      goHome();
    } finally {
      setIsCreating(false);
      setIsOpeningProject(false);
    }
  };

  return { isCreating, isOpeningProject, submitProject };
};

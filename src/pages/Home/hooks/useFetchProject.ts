import { useCallback, useEffect, useState } from 'react';
import { queryRecentOpenedProject } from '@/api/project.ts';
import { useAppNotification } from '@/components/AppNotification';
import { getCommandErrorMessage } from '@/i18n/commandErrors.ts';
import { useProjectStore } from '@/store/ProjectStore.ts';
import { Project } from '@/types/project.ts';
import { useOpenProject } from '@/pages/Home/hooks/useOpenProject.ts';

export const useFetchProject = () => {
  const { restoreLatestProject } = useOpenProject();

  useEffect(() => {
    void restoreLatestProject();
  }, [restoreLatestProject]);
};

export const useFetchRecentProjects = (lastNum: number = 9) => {
  const projectId = useProjectStore((state) => state.projectId);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  const notification = useAppNotification();

  const fetchProjects = useCallback(async () => {
    setLoading(true);

    try {
      const projects = await queryRecentOpenedProject({ lastNum: lastNum });

      setProjects(projects);
    } catch (error) {
      notification.error({
        title: '',
        description: getCommandErrorMessage(error),
      });
    } finally {
      setLoading(false);
    }
  }, [lastNum, notification]);

  useEffect(() => {
    void fetchProjects();
  }, [fetchProjects, projectId]);

  return {
    projects,
    loading,
    refetch: fetchProjects,
  };
};

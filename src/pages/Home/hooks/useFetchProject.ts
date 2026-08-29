import { useCallback, useEffect, useState } from 'react';
import { fetchLatestOpenedProject, queryRecentOpenedProject } from '@/api/project.ts';
import { useAppNotification } from '@/components/AppNotification';
import { getCommandErrorMessage } from '@/i18n/commandErrors.ts';
import { useProjectStore } from '@/store/ProjectStore.ts';
import { useTranslation } from 'react-i18next';
import { Project } from '@/types/project.ts';

export const useFetchProject = () => {
  const projectId = useProjectStore((state) => state.projectId);
  const setProject = useProjectStore((state) => state.setProject);
  const notification = useAppNotification();
  const { t } = useTranslation();

  useEffect(() => {
    if (projectId != null) {
      return;
    }

    let cancelled = false;

    const fetchProject = async () => {
      try {
        const project = await fetchLatestOpenedProject();

        if (!cancelled && project != null) {
          setProject(project.id, project.projectName, project.projectPath);
        }
      } catch (error) {
        if (!cancelled) {
          notification.error({
            title: t('home.notifications.loadLatestProjectErrorTitle'),
            description: getCommandErrorMessage(error),
          });
        }
      }
    };

    void fetchProject();

    return () => {
      cancelled = true;
    };
  }, [notification, projectId, setProject, t]);
};

export const useFetchRecentProjects = (lastNum: number = 9) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  const notification = useAppNotification();
  const { t } = useTranslation();

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
  }, [lastNum, notification, t]);

  useEffect(() => {
    void fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    loading,
    refetch: fetchProjects,
  };
};

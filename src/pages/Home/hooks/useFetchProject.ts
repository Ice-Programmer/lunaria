import { useEffect } from 'react';
import { fetchLatestOpenedProject } from '@/api/project.ts';
import { useAppNotification } from '@/components/AppNotification';
import { getCommandErrorMessage } from '@/i18n/commandErrors.ts';
import { useProjectStore } from '@/store/ProjectStore.ts';
import { useTranslation } from 'react-i18next';

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

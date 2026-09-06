import { useCallback } from 'react';
import { open } from '@tauri-apps/plugin-dialog';
import { useTranslation } from 'react-i18next';
import { fetchLatestOpenedProject, openProject } from '@/api/project.ts';
import { useAppNotification } from '@/components/AppNotification';
import { getCommandErrorMessage } from '@/i18n/commandErrors.ts';
import { useProjectStore } from '@/store/ProjectStore.ts';
import type { Project } from '@/types/project.ts';

export const useOpenProject = () => {
  const isOpeningProject = useProjectStore((state) => state.isOpeningProject);
  const setIsOpeningProject = useProjectStore((state) => state.setIsOpeningProject);
  const setProject = useProjectStore((state) => state.setProject);
  const notification = useAppNotification();
  const { t } = useTranslation();

  const runOpen = useCallback(
    async (loadProject: () => Promise<Project | null>, errorTitle: string) => {
      if (useProjectStore.getState().isOpeningProject) return;

      setIsOpeningProject(true);
      try {
        const project = await loadProject();
        if (project) {
          setProject(project.id, project.projectName, project.projectPath);
        }
      } catch (error) {
        notification.error({
          title: errorTitle,
          description: getCommandErrorMessage(error),
        });
      } finally {
        setIsOpeningProject(false);
      }
    },
    [notification, setIsOpeningProject, setProject]
  );

  const openProjectPath = (projectPath: string) =>
    runOpen(() => openProject(projectPath), t('home.notifications.openProjectErrorTitle'));

  const selectProjectFolder = () =>
    runOpen(async () => {
      const projectPath = await open({
        directory: true,
        multiple: false,
        title: t('home.openProject.selectFolderDialog'),
      });
      return projectPath ? openProject(projectPath) : null;
    }, t('home.notifications.openProjectErrorTitle'));

  const restoreLatestProject = useCallback(() => {
    if (useProjectStore.getState().projectId != null) return;

    return runOpen(async () => {
      const project = await fetchLatestOpenedProject();
      return project ? openProject(project.projectPath) : null;
    }, t('home.notifications.loadLatestProjectErrorTitle'));
  }, [runOpen, t]);

  return { isOpeningProject, openProjectPath, selectProjectFolder, restoreLatestProject };
};

import { useEffect, useState } from 'react';
import { join } from '@tauri-apps/api/path';
import { useCreateProjectStore } from '@/pages/Project/CreateProject/store/createProjectStore.ts';

export const useFullProjectPath = () => {
  const filePath = useCreateProjectStore((state) => state.filePath);
  const projectName = useCreateProjectStore((state) => state.projectName);
  const [fullProjectPath, setFullProjectPath] = useState(filePath);

  useEffect(() => {
    let isActive = true;

    const resolveFullProjectPath = async () => {
      const normalizedProjectName = projectName.trim();
      const fullPath =
        filePath && normalizedProjectName ? await join(filePath, normalizedProjectName) : filePath;

      if (isActive) {
        setFullProjectPath(fullPath);
      }
    };

    void resolveFullProjectPath();

    return () => {
      isActive = false;
    };
  }, [filePath, projectName]);

  return fullProjectPath;
};

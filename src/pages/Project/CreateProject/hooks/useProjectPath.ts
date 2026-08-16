import { useCallback, useEffect } from 'react';
import { Form } from 'antd';
import { documentDir, join } from '@tauri-apps/api/path';
import { open } from '@tauri-apps/plugin-dialog';
import { useCreateProjectStore } from '@/pages/Project/CreateProject/store/createProjectStore.ts';
import type { CreateProjectRequest } from '@/types/project.ts';

const defaultProjectFolderName = 'Lunaria Projects';

const getDefaultProjectPath = async () => {
  const documentsPath = await documentDir();
  return join(documentsPath, defaultProjectFolderName);
};

export const useProjectPath = () => {
  const form = Form.useFormInstance<CreateProjectRequest>();
  const setFilePath = useCreateProjectStore((state) => state.setFilePath);

  const setProjectPath = useCallback(
    (path: string) => {
      form.setFieldValue('projectPath', path);
      setFilePath(path);
    },
    [form, setFilePath]
  );

  useEffect(() => {
    let isActive = true;

    const initializeProjectPath = async () => {
      const storedFilePath = useCreateProjectStore.getState().filePath;
      const initialPath = storedFilePath || (await getDefaultProjectPath());

      if (isActive) {
        setProjectPath(initialPath);
      }
    };

    void initializeProjectPath();

    return () => {
      isActive = false;
    };
  }, [setProjectPath]);

  const restoreDefaultPath = useCallback(async () => {
    setProjectPath(await getDefaultProjectPath());
  }, [setProjectPath]);

  const selectDirectory = useCallback(async () => {
    const selectedPath = await open({
      directory: true,
      multiple: false,
      title: '选择项目保存位置',
    });

    if (selectedPath) {
      setProjectPath(selectedPath);
    }
  }, [setProjectPath]);

  return {
    restoreDefaultPath,
    selectDirectory,
    setProjectPath,
  };
};

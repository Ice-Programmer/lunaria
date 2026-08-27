import { create } from 'zustand';

interface ProjectStore {
  projectId?: number;
  projectName?: string;
  projectPath?: string;

  setProject: (id: number, name: string, path: string) => void;

  clearProject: () => void;

  isEmpty: () => boolean;
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projectId: undefined,
  projectName: undefined,
  projectPath: undefined,

  setProject: (id, name, path) => {
    set({
      projectId: id,
      projectName: name,
      projectPath: path,
    });
  },

  clearProject: () => {
    set({
      projectId: undefined,
      projectName: undefined,
      projectPath: undefined,
    });
  },

  isEmpty: () => {
    const { projectId, projectName, projectPath } = get();
    return projectId == undefined && projectName == undefined && projectPath == undefined;
  },
}));

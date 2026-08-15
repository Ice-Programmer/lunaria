import { create } from 'zustand';

interface ProjectStore {
  projectId?: number;
  projectName?: string;
  projectPath?: string;

  setProject: (id: number, name: string, path: string) => void;

  clearProject: () => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
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
}));

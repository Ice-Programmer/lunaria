import { create } from 'zustand';

interface ProjectStore {
  projectId?: number;
  projectName?: string;
  projectPath?: string;
  isOpeningProject: boolean;

  setProject: (id: number, name: string, path: string) => void;
  setIsOpeningProject: (isOpening: boolean) => void;

  clearProject: () => void;

  isEmpty: () => boolean;
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projectId: undefined,
  projectName: undefined,
  projectPath: undefined,
  isOpeningProject: false,

  setIsOpeningProject: (isOpeningProject) => set({ isOpeningProject }),

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

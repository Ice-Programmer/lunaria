import { create } from 'zustand';

interface CreateProjectState {
  projectName: string;
  filePath: string;

  setProjectName: (projectName: string) => void;
  setFilePath: (filePath: string) => void;
  reset: () => void;
}

export const useCreateProjectStore = create<CreateProjectState>((set) => ({
  projectName: 'untitled',
  filePath: '',

  setProjectName: (projectName) => set({ projectName }),
  setFilePath: (filePath) => set({ filePath }),

  reset: () =>
    set({
      projectName: 'untitled',
      filePath: '',
    }),
}));

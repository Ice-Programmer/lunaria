import { openUrl } from '@tauri-apps/plugin-opener';

export const useOpenExternal = () => {
  return {
    goToGithub: async () => {
      await openUrl('https://github.com/Ice-Programmer/lunaria');
    },
  };
};

import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppNotification } from '@/components/AppNotification';
import { listCharacter } from '@/api/character';
import type { CharacterDTO } from '@/types/character';

interface CharactersState {
  projectId: number | null | undefined;
  characters: CharacterDTO[];
  isLoading: boolean;
}

export const useCharacters = (projectId: number | null | undefined) => {
  const notification = useAppNotification();
  const activeProjectId = useRef<number | null | undefined>(undefined);
  const latestRequestId = useRef(0);
  const [state, setState] = useState<CharactersState>(() => ({
    projectId,
    characters: [],
    isLoading: projectId != null,
  }));

  const load = useCallback((): Promise<void> => {
    if (projectId == null || activeProjectId.current !== projectId) return Promise.resolve();

    const requestId = ++latestRequestId.current;
    const isCurrentRequest = () =>
      activeProjectId.current === projectId && latestRequestId.current === requestId;

    return listCharacter(projectId).then(
      (characters) => {
        if (isCurrentRequest()) {
          setState({ projectId, characters, isLoading: false });
        }
      },
      () => {
        if (!isCurrentRequest()) return;

        setState((previous) => ({
          projectId,
          characters: previous.projectId === projectId ? previous.characters : [],
          isLoading: false,
        }));
        notification.error({
          title: '无法获取角色列表',
          description: '角色列表获取失败，请稍后重试',
        });
      }
    );
  }, [projectId, notification]);

  const refresh = useCallback(async () => {
    if (projectId == null || activeProjectId.current !== projectId) return;

    setState((previous) => ({
      projectId,
      characters: previous.projectId === projectId ? previous.characters : [],
      isLoading: true,
    }));
    await load();
  }, [projectId, load]);

  useEffect(() => {
    activeProjectId.current = projectId;
    void load();

    return () => {
      activeProjectId.current = undefined;
      // Tauri requests cannot be aborted; ignore results from the previous lifecycle.
      latestRequestId.current += 1;
    };
  }, [projectId, load]);

  const isCurrentProject = state.projectId === projectId;

  return {
    characters: isCurrentProject ? state.characters : [],
    isLoading: isCurrentProject ? state.isLoading : projectId != null,
    refresh,
  };
};

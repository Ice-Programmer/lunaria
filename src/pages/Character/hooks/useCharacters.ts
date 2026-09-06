import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppNotification } from '@/components/AppNotification';
import { listCharacter } from '@/api/character';
import { useProjectStore } from '@/store/ProjectStore.ts';
import type { CharacterDTO } from '@/types/character';

interface CharactersState {
  characters: CharacterDTO[];
  isLoading: boolean;
}

export const useCharacters = () => {
  const projectId = useProjectStore((state) => state.projectId);
  const notification = useAppNotification();
  const isActive = useRef(false);
  const [state, setState] = useState<CharactersState>(() => ({
    characters: [],
    isLoading: projectId != null,
  }));

  const load = useCallback((): Promise<void> => {
    if (projectId == null || !isActive.current) return Promise.resolve();

    return listCharacter(projectId).then(
      (characters) => {
        if (isActive.current) {
          setState({ characters, isLoading: false });
        }
      },
      () => {
        if (!isActive.current) return;

        setState((previous) => ({ ...previous, isLoading: false }));
        notification.error({
          title: '无法获取角色列表',
          description: '角色列表获取失败，请稍后重试',
        });
      }
    );
  }, [projectId, notification]);

  const refresh = useCallback(async () => {
    if (projectId == null || !isActive.current) return;

    setState((previous) => ({ ...previous, isLoading: true }));
    await load();
  }, [projectId, load]);

  useEffect(() => {
    isActive.current = true;
    void load();

    return () => {
      isActive.current = false;
    };
  }, [load]);

  return {
    ...state,
    refresh,
  };
};

import { useCallback, useEffect, useState } from 'react';
import { useAppNotification } from '@/components/AppNotification';
import { listCharacter } from '@/api/character';
import { useProjectStore } from '@/store/ProjectStore.ts';
import type { CharacterDTO } from '@/types/character';

export const useCharacters = () => {
  const projectId = useProjectStore((state) => state.projectId);
  const notification = useAppNotification();

  const [characters, setCharacters] = useState<CharacterDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const load = useCallback(async () => {
    if (projectId == null) {
      setCharacters([]);
      return;
    }

    setIsLoading(true);

    try {
      const characters = await listCharacter(projectId);
      setCharacters(characters);
    } catch {
      notification.error({
        title: '无法获取角色列表',
        description: '角色列表获取失败，请稍后重试',
      });
    } finally {
      setIsLoading(false);
    }
  }, [projectId, notification]);

  useEffect(() => {
    void load();
  }, [load]);

  return {
    characters,
    isLoading,
    refresh: load,
  };
};

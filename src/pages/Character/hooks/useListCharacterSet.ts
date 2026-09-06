import { useCallback, useEffect, useState } from 'react';
import { listSpriteSet } from '@/api/character_sprite_set.ts';
import { useAppNotification } from '@/components/AppNotification';
import type { SpriteSetDTO } from '@/types/character_sprite_set.ts';
import { useProjectStore } from '@/store/ProjectStore.ts';

export const useListCharacterSet = (characterId: number) => {
  const projectId = useProjectStore((state) => state.projectId);
  const notification = useAppNotification();

  const [spriteSets, setSpriteSets] = useState<SpriteSetDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(async () => {
    if (projectId == null) {
      setSpriteSets([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const spriteSets = await listSpriteSet({ projectId, characterId });
      setSpriteSets(spriteSets);
    } catch {
      notification.error({
        title: '无法获取立绘组',
        description: '立绘组获取失败，请稍后重试',
      });
    } finally {
      setIsLoading(false);
    }
  }, [projectId, characterId, notification]);

  useEffect(() => {
    void load();
  }, [load]);

  return {
    spriteSets,
    isLoading,
    refresh: load,
  };
};

import { useCallback, useEffect, useState } from 'react';
import { listSpriteSet } from '@/api/character_sprite_set.ts';
import { useAppNotification } from '@/components/AppNotification';
import type { SpriteSetDTO } from '@/types/character_sprite_set.ts';

export const useListCharacterSet = (characterId: number) => {
  const notification = useAppNotification();

  const [spriteSets, setSpriteSets] = useState<SpriteSetDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(async () => {
    setIsLoading(true);

    try {
      const spriteSets = await listSpriteSet({ characterId });
      setSpriteSets(spriteSets);
    } catch {
      notification.error({
        title: '无法获取立绘组',
        description: '立绘组获取失败，请稍后重试',
      });
    } finally {
      setIsLoading(false);
    }
  }, [characterId, notification]);

  useEffect(() => {
    void load();
  }, [load]);

  return {
    spriteSets,
    isLoading,
    refresh: load,
  };
};

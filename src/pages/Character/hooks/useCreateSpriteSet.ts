import { createSpriteSet } from '@/api/character_sprite_set.ts';
import { useAppNotification } from '@/components/AppNotification';
import { getCommandErrorMessage } from '@/i18n/commandErrors.ts';
import type { CreateCharacterSpriteSetInput } from '@/types/character_sprite.ts';
import { useProjectStore } from '@/store/ProjectStore.ts';

interface UseCreateSpriteSetOptions {
  characterId: number;
  onSuccess?: () => void | Promise<void>;
}

export const useCreateSpriteSet = ({ characterId, onSuccess }: UseCreateSpriteSetOptions) => {
  const projectId = useProjectStore((state) => state.projectId);
  const notification = useAppNotification();

  const handleCreateSpriteSet = async (input: CreateCharacterSpriteSetInput) => {
    if (projectId == null) {
      notification.error({
        title: '无法创建立绘',
        description: '请先打开一个项目',
      });
      throw new Error('No project is open');
    }

    try {
      await createSpriteSet({ characterId, ...input });
    } catch (error) {
      notification.error({
        title: '创建立绘失败',
        description: getCommandErrorMessage(error),
      });
      throw error;
    }

    notification.success({
      title: '立绘已创建',
      description: `已创建立绘“${input.spriteSetName}”`,
    });
    await onSuccess?.();
  };

  return { handleCreateSpriteSet };
};

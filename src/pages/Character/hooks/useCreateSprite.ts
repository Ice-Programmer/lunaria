import { useAppNotification } from '@/components/AppNotification';
import { CreateCharacterSpriteRequest } from '@/types/character_sprite.ts';
import { createCharacterSprite } from '@/api/character_sprite.ts';
import { getCommandErrorMessage } from '@/i18n/commandErrors.ts';

interface UseCreateSpriteProps {
  onSuccess?: () => void | Promise<void>;
}

export const useCreateSprite = ({ onSuccess }: UseCreateSpriteProps) => {
  const notification = useAppNotification();

  const handleCreateSprite = async (input: CreateCharacterSpriteRequest) => {
    try {
      await createCharacterSprite({ ...input });
    } catch (error) {
      notification.error({
        title: '创建差分失败',
        description: getCommandErrorMessage(error),
      });
      throw error;
    }

    notification.success({
      title: '差分创建成功',
      description: `已创建差分 「${input.spriteName}」`,
    });

    await onSuccess?.();
  };

  return { handleCreateSprite };
};

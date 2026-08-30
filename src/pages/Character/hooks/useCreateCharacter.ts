import { createCharacter } from '@/api/character.ts';
import { useAppNotification } from '@/components/AppNotification';
import { getCommandErrorMessage } from '@/i18n/commandErrors.ts';
import { useProjectStore } from '@/store/ProjectStore.ts';
import type { CreateCharacterInput } from '@/types/character.ts';

interface UseCreateCharacterOptions {
  onSuccess?: () => void;
}

export const useCreateCharacter = ({ onSuccess }: UseCreateCharacterOptions = {}) => {
  const projectId = useProjectStore((state) => state.projectId);
  const notification = useAppNotification();

  const handleCreateCharacter = async (input: CreateCharacterInput) => {
    if (projectId == null) {
      notification.error({
        title: '无法创建角色',
        description: '请先打开一个项目',
      });
      throw new Error('No project is open');
    }

    try {
      await createCharacter({ projectId, ...input });
      notification.success({
        title: '角色已创建',
        description: `已创建角色“${input.characterName}”`,
      });
      onSuccess?.();
    } catch (error) {
      notification.error({
        title: '无法创建角色',
        description: getCommandErrorMessage(error),
      });
      throw error;
    }
  };

  return { handleCreateCharacter };
};

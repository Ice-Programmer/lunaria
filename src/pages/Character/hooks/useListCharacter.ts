import { useCallback, useState } from 'react';
import { useAppNotification } from '@/components/AppNotification';
import { listCharacter } from '@/api/character';
import type { CharacterDTO } from '@/types/character';

interface ListCharacterProps {
  projectId?: number | null;
}

interface ListCharacterOptions {
  preserveOnError?: boolean;
}

export const useListCharacter = ({ projectId }: ListCharacterProps) => {
  const notification = useAppNotification();

  const [characterList, setCharacterList] = useState<CharacterDTO[]>([]);
  const [loading, setLoading] = useState(false);

  const handleListCharacter = useCallback(
    async (options: ListCharacterOptions = {}) => {
      const { preserveOnError = false } = options;
      if (projectId == null) {
        notification.error({
          title: '无法获取角色列表',
          description: '请先打开一个项目',
        });

        setCharacterList([]);
        return false;
      }

      try {
        setLoading(true);
        const characters = await listCharacter(projectId);
        setCharacterList(characters);
        return true;
      } catch (error) {
        notification.error({
          title: '无法获取角色列表',
          description: '角色列表获取失败，请稍后重试',
        });

        if (!preserveOnError) {
          setCharacterList([]);
        }

        return false;
      } finally {
        setLoading(false);
      }
    },
    [projectId, notification]
  );

  return {
    characterList,
    loading,
    handleListCharacter,
  };
};

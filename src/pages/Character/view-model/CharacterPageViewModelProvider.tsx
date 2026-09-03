import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { useListCharacter } from '@/pages/Character/hooks/useListCharacter.ts';
import {
  CharacterPageViewModelContext,
  type CharacterPageViewModel,
} from '@/pages/Character/view-model/context.ts';
import { useProjectStore } from '@/store/ProjectStore.ts';

export const CharacterPageViewModelProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const projectId = useProjectStore((state) => state.projectId);
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(null);
  const { characterList, loading, handleListCharacter } = useListCharacter({ projectId });

  useEffect(() => {
    if (projectId != null) {
      void handleListCharacter();
    }
  }, [projectId, handleListCharacter]);

  const refreshCharacterList = useCallback(async () => {
    await handleListCharacter({ preserveOnError: true });
  }, [handleListCharacter]);

  const selectCharacter = useCallback((characterId: number) => {
    setSelectedCharacterId(characterId);
  }, []);

  const selectedCharacter = useMemo(
    () => characterList.find((character) => character.id === selectedCharacterId) ?? null,
    [characterList, selectedCharacterId]
  );

  const viewModel = useMemo<CharacterPageViewModel>(
    () => ({
      characterList,
      loading,
      selectedCharacterId,
      selectedCharacter,
      selectCharacter,
      refreshCharacterList,
    }),
    [
      characterList,
      loading,
      refreshCharacterList,
      selectCharacter,
      selectedCharacter,
      selectedCharacterId,
    ]
  );

  return (
    <CharacterPageViewModelContext.Provider value={viewModel}>
      {children}
    </CharacterPageViewModelContext.Provider>
  );
};

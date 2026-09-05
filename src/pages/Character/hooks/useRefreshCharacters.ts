import { useContext } from 'react';
import { CharacterRefreshContext } from '@/pages/Character/context/CharacterRefreshContext.ts';

export const useRefreshCharacters = () => {
  const refreshCharacters = useContext(CharacterRefreshContext);

  if (refreshCharacters == null) {
    throw new Error('useRefreshCharacters must be used within CharacterRefreshContext');
  }

  return refreshCharacters;
};

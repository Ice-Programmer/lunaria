import { useContext } from 'react';
import { CharacterPageViewModelContext } from '@/pages/Character/view-model/context.ts';

export const useCharacterPageViewModel = () => {
  const viewModel = useContext(CharacterPageViewModelContext);

  if (viewModel == null) {
    throw new Error('useCharacterPageViewModel must be used within CharacterPageViewModelProvider');
  }

  return viewModel;
};

import { createContext } from 'react';
import type { CharacterDTO } from '@/types/character.ts';

export interface CharacterPageViewModel {
  characterList: CharacterDTO[];
  loading: boolean;
  selectedCharacterId: number | null;
  selectedCharacter: CharacterDTO | null;
  selectCharacter: (characterId: number) => void;
  refreshCharacterList: () => Promise<void>;
}

export const CharacterPageViewModelContext = createContext<CharacterPageViewModel | null>(null);

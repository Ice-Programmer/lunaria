import { SpriteSetDTO } from '@/types/character_sprite.ts';
import { create } from 'zustand';

interface CharacterSpriteStore {
  spriteSetList?: SpriteSetDTO[];

  setCharacterSprite: (spriteSetList: SpriteSetDTO[]) => void;

  clearCharacterSprite: () => void;
}

export const useCharacterSpriteStore = create<CharacterSpriteStore>((set) => ({
  spriteSetList: undefined,
  setCharacterSprite: (spriteSetList: SpriteSetDTO[]) => {
    set({
      spriteSetList: spriteSetList,
    });
  },
  clearCharacterSprite: () =>
    set({
      spriteSetList: undefined,
    }),
}));

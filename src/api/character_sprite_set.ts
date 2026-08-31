import { invokeCommand } from '@/api/tauri.ts';
import type { CreateCharacterSpriteSetRequest } from '@/types/character_sprite_set.ts';

export const createSpriteSet = async (request: CreateCharacterSpriteSetRequest): Promise<void> => {
  await invokeCommand('create_character_sprite_set', { ...request });
};

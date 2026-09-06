import { CreateCharacterSpriteRequest } from '@/types/character_sprite.ts';
import { invokeCommand } from '@/api/tauri.ts';

export const createCharacterSprite = async (request: CreateCharacterSpriteRequest): Promise<void> =>
  await invokeCommand('create_character_sprite', { ...request });

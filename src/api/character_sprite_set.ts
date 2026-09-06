import { invokeCommand } from '@/api/tauri.ts';
import type {
  CreateCharacterSpriteSetRequest,
  ListSpriteSetRequest,
  SpriteSetDTO,
} from '@/types/character_sprite.ts';

export const createSpriteSet = async (request: CreateCharacterSpriteSetRequest): Promise<void> => {
  await invokeCommand('create_character_sprite_set', { ...request });
};

export const listSpriteSet = async (request: ListSpriteSetRequest): Promise<SpriteSetDTO[]> =>
  await invokeCommand<SpriteSetDTO[]>('list_sprite_set', { ...request });

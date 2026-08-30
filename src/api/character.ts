import { Character, CharacterDTO, CreateCharacterRequest } from '@/types/character.ts';
import { invokeCommand } from '@/api/tauri.ts';

export const createCharacter = (request: CreateCharacterRequest): Promise<Character> =>
  invokeCommand<Character>('create_character', { ...request });

export const listCharacter = (projectId: number): Promise<CharacterDTO[]> =>
  invokeCommand<CharacterDTO[]>('list_character', { projectId: projectId });

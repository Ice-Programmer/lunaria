import type { ImageInput } from '@/types/image.ts';

export interface Character {
  id: number;
  character_code: string;
  name: string;
  tags: string[];
  avatar_path: string | null;
  created_at: number;
  updated_at: number;
}

export interface CreateCharacterRequest {
  characterName: string;
  characterCode: string;
  avatar?: ImageInput;
  tags: string[];
}

export interface CharacterDTO {
  id: number;
  characterName: string;
  characterCode: string;
  avatarPath: string | null;
  spriteSetNum: number;
  spriteNum: number;
}
export type CreateCharacterInput = CreateCharacterRequest;

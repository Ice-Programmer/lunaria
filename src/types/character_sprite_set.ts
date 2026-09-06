import { ImageOutput } from '@/types/image.ts';

export interface CreateCharacterSpriteSetRequest {
  projectId: number;
  characterId: number;
  spriteSetName: string;
  spriteSetCode: string;
}

export type CreateCharacterSpriteSetInput = Omit<
  CreateCharacterSpriteSetRequest,
  'projectId' | 'characterId'
>;

export interface ListSpriteSetRequest {
  projectId: number;
  characterId: number;
}

export interface SpriteSetDTO {
  spriteSetName: string;
  spriteSetCode: string;
  spriteList: SpriteDTO[];
}

export interface SpriteDTO {
  spriteName: string;
  spriteCode: string;
  imageOutput: ImageOutput;
  isDefault: number;
  sortOrder: number;
}

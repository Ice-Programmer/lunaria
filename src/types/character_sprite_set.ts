import { ImageOutput } from '@/types/image.ts';

export interface CreateCharacterSpriteSetRequest {
  characterId: number;
  spriteSetName: string;
  spriteSetCode: string;
}

export type CreateCharacterSpriteSetInput = Omit<CreateCharacterSpriteSetRequest, 'characterId'>;

export interface ListSpriteSetRequest {
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

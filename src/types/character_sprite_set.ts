export interface CreateCharacterSpriteSetRequest {
  characterId: number;
  spriteSetName: string;
  spriteSetCode: string;
}

export type CreateCharacterSpriteSetInput = Omit<CreateCharacterSpriteSetRequest, 'characterId'>;

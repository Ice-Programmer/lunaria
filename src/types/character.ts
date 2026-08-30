import type { ImageInput } from '@/types/image.ts';

export interface Character {
  id: number;
  projectId: number;
  characterCode: string;
  name: string;
  description?: string;
  avatarPath?: string;
  createdAt: number;
  UpdatedAt: number;
}

export interface CreateCharacterRequest {
  projectId: number;
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
}
export type CreateCharacterInput = Omit<CreateCharacterRequest, 'projectId'>;

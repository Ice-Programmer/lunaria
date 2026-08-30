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

export interface CharacterAvatarInput {
  bytes: number[];
  mimeType: 'image/png' | 'image/jpeg';
}

export interface CreateCharacterRequest {
  projectId: number;
  characterName: string;
  characterCode: string;
  avatar?: CharacterAvatarInput;
  tags: string[];
}

export interface CharacterDTO {
  id: number;
  characterName: string;
  characterCode: string;
  avatarPath: string | null;
}
export type CreateCharacterInput = Omit<CreateCharacterRequest, 'projectId'>;

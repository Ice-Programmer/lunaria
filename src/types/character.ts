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
  imgPath?: string;
  tags: string[];
}

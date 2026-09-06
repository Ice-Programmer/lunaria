export interface ImageInput {
  bytes: number[];
  mimeType: string;
}

export interface ImageOutput {
  imagePath: string;
  width: number;
  height: number;
}

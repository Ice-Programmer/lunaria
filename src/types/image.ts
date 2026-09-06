export interface ImageInput {
  bytes: number[];
  mimeType: string;
}

export const toImageInput = async (file?: File): Promise<ImageInput | undefined> => {
  if (!file) return undefined;

  if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
    throw new Error(`Unsupported avatar type: ${file.type}`);
  }

  return {
    bytes: Array.from(new Uint8Array(await file.arrayBuffer())),
    mimeType: file.type,
  };
};

export interface ImageOutput {
  imagePath: string;
  width: number;
  height: number;
}

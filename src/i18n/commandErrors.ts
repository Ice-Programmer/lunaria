import { TauriCommandError } from '@/api/tauri.ts';
import i18n from '@/i18n/index.ts';

const commandErrorKeys = {
  PROJECT_PATH_ALREADY_REGISTERED: 'errors.projectPathAlreadyRegistered',
  PROJECT_DIRECTORY_CREATION_FAILED: 'errors.projectDirectoryCreationFailed',
  DATABASE_OPERATION_FAILED: 'errors.databaseOperationFailed',
  FILE_SYSTEM_OPERATION_FAILED: 'errors.fileSystemOperationFailed',
  SYSTEM_TIME_UNAVAILABLE: 'errors.systemTimeUnavailable',
  TOO_MANY_TAGS: 'errors.tooManyTags',
  PROJECT_NOT_FOUND: 'errors.projectNotFound',
  CHARACTER_CODE_ALREADY_REGISTERED: 'errors.characterCodeAlreadyRegistered',
  INVALID_AVATAR_DATA: 'errors.invalidAvatarData',
  AVATAR_TOO_LARGE: 'errors.avatarTooLarge',
  INVALID_CHARACTER_SPRITE_IMAGE_DATA: 'errors.invalidCharacterSpriteImageData',
  CHARACTER_SPRITE_IMAGE_TOO_LARGE: 'errors.characterSpriteImageTooLarge',
  CHARACTER_SPRITE_SET_NOT_FOUND: 'errors.characterSpriteSetNotFound',
  INVALID_CHARACTER_SPRITE_CODE: 'errors.invalidCharacterSpriteCode',
  CHARACTER_SPRITE_CODE_ALREADY_REGISTERED: 'errors.characterSpriteCodeAlreadyRegistered',
} as const;

type CommandErrorCode = keyof typeof commandErrorKeys;
type CommandErrorKey = (typeof commandErrorKeys)[CommandErrorCode];

const isKnownCommandErrorCode = (code: string): code is CommandErrorCode =>
  Object.prototype.hasOwnProperty.call(commandErrorKeys, code);

const translateCommandError = (key: CommandErrorKey, params: Record<string, unknown>): string => {
  return i18n.t(key, params as never);
};

export const getCommandErrorMessage = (error: unknown): string => {
  if (!(error instanceof TauriCommandError) || !isKnownCommandErrorCode(error.code)) {
    return i18n.t('errors.unknown');
  }

  return translateCommandError(commandErrorKeys[error.code], error.params);
};

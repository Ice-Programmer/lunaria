import type { TFunction } from 'i18next';
import { TauriCommandError } from '@/api/tauri.ts';

const commandErrorKeys = {
  PROJECT_PATH_ALREADY_REGISTERED: 'errors.projectPathAlreadyRegistered',
  PROJECT_DIRECTORY_CREATION_FAILED: 'errors.projectDirectoryCreationFailed',
  DATABASE_OPERATION_FAILED: 'errors.databaseOperationFailed',
  FILE_SYSTEM_OPERATION_FAILED: 'errors.fileSystemOperationFailed',
  SYSTEM_TIME_UNAVAILABLE: 'errors.systemTimeUnavailable',
} as const;

type CommandErrorCode = keyof typeof commandErrorKeys;

const isKnownCommandErrorCode = (code: string): code is CommandErrorCode =>
  Object.prototype.hasOwnProperty.call(commandErrorKeys, code);

export const getCommandErrorMessage = (error: unknown, t: TFunction): string => {
  if (!(error instanceof TauriCommandError) || !isKnownCommandErrorCode(error.code)) {
    return t('errors.unknown');
  }

  return t(commandErrorKeys[error.code], error.params);
};

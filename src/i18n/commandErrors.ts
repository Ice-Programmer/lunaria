import { TauriCommandError } from '@/api/tauri.ts';
import i18n from '@/i18n/index.ts';

const commandErrorKeys = {
  PROJECT_PATH_ALREADY_REGISTERED: 'errors.projectPathAlreadyRegistered',
  PROJECT_DIRECTORY_CREATION_FAILED: 'errors.projectDirectoryCreationFailed',
  DATABASE_OPERATION_FAILED: 'errors.databaseOperationFailed',
  FILE_SYSTEM_OPERATION_FAILED: 'errors.fileSystemOperationFailed',
  SYSTEM_TIME_UNAVAILABLE: 'errors.systemTimeUnavailable',
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

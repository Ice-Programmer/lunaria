import { invoke } from '@tauri-apps/api/core';

type CommandErrorParams = Record<string, unknown>;

export class TauriCommandError extends Error {
  readonly code: string;
  readonly params: CommandErrorParams;
  readonly originalError: unknown;

  constructor(code: string, params: CommandErrorParams = {}, originalError?: unknown) {
    super(code);
    this.name = 'TauriCommandError';
    this.code = code;
    this.params = params;
    this.originalError = originalError;
  }
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const toTauriCommandError = (error: unknown): TauriCommandError => {
  if (isRecord(error) && typeof error.code === 'string') {
    const params = isRecord(error.params) ? error.params : {};
    return new TauriCommandError(error.code, params, error);
  }

  return new TauriCommandError('UNKNOWN_COMMAND_ERROR', {}, error);
};

export const invokeCommand = async <Result>(
  command: string,
  args?: Record<string, unknown>
): Promise<Result> => {
  try {
    return await invoke<Result>(command, args);
  } catch (error) {
    throw toTauriCommandError(error);
  }
};

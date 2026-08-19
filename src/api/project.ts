import { invoke } from '@tauri-apps/api/core';
import type { CreateProjectRequest, Project } from '@/types/project.ts';

const projectCommands = {
  create: 'create_project',
} as const;

export const createProject = (request: CreateProjectRequest): Promise<Project> =>
  invoke<Project>(projectCommands.create, {
    projectName: request.projectName,
    projectPath: request.projectPath,
  });


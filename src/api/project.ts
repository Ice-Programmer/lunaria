import { invokeCommand } from '@/api/tauri.ts';
import type { CreateProjectRequest, Project } from '@/types/project.ts';

const projectCommands = {
  create: 'create_project',
} as const;

export const createProject = (request: CreateProjectRequest): Promise<Project> =>
  invokeCommand<Project>(projectCommands.create, {
    projectName: request.projectName,
    projectPath: request.projectPath,
  });

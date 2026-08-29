import { invokeCommand } from '@/api/tauri.ts';
import { CreateProjectRequest, Project, QueryRecentOpenedProjectRequest } from '@/types/project.ts';

export const createProject = (request: CreateProjectRequest): Promise<Project> =>
  invokeCommand<Project>('create_project', {
    projectName: request.projectName,
    projectPath: request.projectPath,
  });

export const fetchLatestOpenedProject = (): Promise<Project | null> =>
  invokeCommand<Project | null>('fetch_latest_opened_project');

export const queryRecentOpenedProject = (
  request: QueryRecentOpenedProjectRequest
): Promise<Project[]> =>
  invokeCommand('query_recent_opened_project', {
    lastNum: request.lastNum,
  });

export interface CreateProjectRequest {
  projectName: string;
  projectPath: string;
}

export interface Project {
  id: number;
  projectName: string;
  projectPath: string;
  createdAt: number;
  lastOpenedAt: number;
}

export interface QueryRecentOpenedProjectRequest {
  lastNum: number;
}

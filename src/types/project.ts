export interface CreateProjectRequest {
  projectName: string;
  projectPath: string;
}

export interface Project {
  // 本机最近项目索引的 ID，不属于项目数据库中的业务数据。
  id: number;
  projectName: string;
  projectPath: string;
  createdAt: number;
  lastOpenedAt: number;
}

export interface QueryRecentOpenedProjectRequest {
  lastNum: number;
}

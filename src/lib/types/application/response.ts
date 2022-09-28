import { GenericAPIError, ResponseOkModel } from '../../util/type/response';
import { CreateProgram } from 'typescript';
import { Datastore } from '../datastore';

export interface ApplicationAndDataStore {
  application_id?: string;
  name?: string;
  display_id?: string;
  datastores?: [Datastore];
}

export interface CreateApp {
  project_id: string;
}


export interface ProjectInfo {
  p_id?: string;
  w_id?: string;
  name?: string;
  display_id?: string;
  template_id?: string;
  display_order?: number;
}

/** Data response from request graphql */

export interface DtAppAndDs {
  getApplicationAndDataStore: [ApplicationAndDataStore];
}

export interface DtCreateApp {
  applicationCreateProject: CreateApp;
}
export interface DtProjectInfo {
  getInfoProject: ProjectInfo;
}

/** Response */
export interface AppAndDsRes {
  appAndDs?: [ApplicationAndDataStore];
  error?: string;
}

export interface CreateAppRes {
  app?: CreateApp;
  error?: string;
}

export interface ProjectInfoRes {
  project?: ProjectInfo;
  error?: string;
}

export interface DtDeleteProject {
  deleteProject: ResponseOkModel;
}

export interface DtUpdateThemeProject {
  updateProjectTheme: ResponseOkModel;
}

export interface DtUpdateNameProject {
  updateProjectName: ResponseOkModel;
}
import { ModelRes } from '../../util/type';
import { HxbAbstract } from '../../../HxbAbstract';
import {
  GET_APPLICATION_AND_DATASTORE,
  APPLICATION_CREATE_PROJECT,
  GET_INFO_PROJECT,
  DELETE_PROJECT,
  UPDATE_PROJECT_THEME,
  UPDATE_PROJECT_NAME,
  GET_APPLICATIONS,
  GET_TEMPLATES
} from '../../graphql/application';
import {
  AppAndDsRes,
  DtAppAndDs,
  CreateProjectPl,
  CreateAppRes,
  DtCreateApp,
  ProjectInfoRes,
  DtProjectInfo,
  DtDeleteProject,
  DeleteProjectPl,
  DtUpdateThemeProject,
  UpdateProjectThemePl,
  DtUpdateNameProject,
  UpdateProjectNamePl,
  ApplicationRes,
  DtApplicationRes,
  TemplateRes,
  DtTemplates
} from '../../types/application';

export default class Application extends HxbAbstract {
  /**
   * function get: get list application in a workspace
   * @params workspaceId
   * @returns ApplicationRes
   */
  async get(workspaceId: string): Promise<ApplicationRes> {
    const data: ApplicationRes = {
      getApplications: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtApplicationRes = await this.client.request(GET_APPLICATIONS, { workspaceId });

      data.getApplications = res.getApplications;
    } catch (error: any) {
      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function getProjectsAndDatastores: get list application and datastore in a workspace
   * @params workspaceId
   * @returns AppAndDsRes
   */
  async getProjectsAndDatastores(workspaceId: string): Promise<AppAndDsRes> {
    const data: AppAndDsRes = {
      appAndDs: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtAppAndDs = await this.client.request(GET_APPLICATION_AND_DATASTORE, { workspaceId });

      data.appAndDs = res.getApplicationAndDataStore;
    } catch (error: any) {

      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function getTemplates: get templates
   * @returns TemplateRes
   */
  async getTemplates(): Promise<TemplateRes> {
    const data: TemplateRes = {
      getTemplates: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtTemplates = await this.client.request(GET_TEMPLATES);

      data.getTemplates = res.getTemplates;
    } catch (error: any) {
      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function create: get list application and datastore in a workspace
   * @params workspaceId
   * @returns AppAndDsRes
   */
  async create(createProjectParams: CreateProjectPl): Promise<CreateAppRes> {
    const data: CreateAppRes = {
      app: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtCreateApp = await this.client.request(APPLICATION_CREATE_PROJECT, { createProjectParams });

      data.app = res.applicationCreateProject;
    } catch (error: any) {

      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function getDetail: get info project
   * @params projectId string
   * @returns ReportDataRes
   */
  async getDetail(projectId: string): Promise<ProjectInfoRes> {
    const data: ProjectInfoRes = {
      project: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtProjectInfo = await this.client.request(GET_INFO_PROJECT, { projectId });

      data.project = res.getInfoProject;
    } catch (error: any) {

      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function delete: delete project in workspace
   * @params {DeleteProjectPl} payload is requirement
   * @returns ModelRes
   */
  async delete(payload: DeleteProjectPl): Promise<ModelRes> {
    const data: ModelRes = {
      data: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtDeleteProject = await this.client.request(DELETE_PROJECT, payload);

      data.data = res.deleteProject;
    } catch (error: any) {
      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }


  /**
   * function updateProjectTheme: update project theme in workspace
   * @params {UpdateProjectThemePl} payload is requirement
   * @returns ModelRes
   */
  async updateProjectTheme(payload: UpdateProjectThemePl): Promise<ModelRes> {
    const data: ModelRes = {
      data: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtUpdateThemeProject = await this.client.request(UPDATE_PROJECT_THEME, payload);

      data.data = res.updateProjectTheme;
    } catch (error: any) {
      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function updateProjectName: update project name in workspace
   * @params {UpdateProjectNamePl} payload is requirement
   * @returns ModelRes
   */
  async updateProjectName(payload: UpdateProjectNamePl): Promise<ModelRes> {
    const data: ModelRes = {
      data: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtUpdateNameProject = await this.client.request(UPDATE_PROJECT_NAME, payload);

      data.data = res.updateProjectName;
    } catch (error: any) {
      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }


}

import { HxbAbstract } from '../../../HxbAbstract';
import {
  GET_APPLICATION_AND_DATASTORE,
  APPLICATION_CREATE_PROJECT,
  GET_REPORTS
} from '../../graphql/application';
import {
  AppAndDsRes,
  DtAppAndDs,
  CreateProjectPl,
  CreateAppRes,
  DtCreateApp,
  GetReportsRes,
  DtGetReports
} from '../../types/application';

export default class Application extends HxbAbstract {

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
      const res: DtAppAndDs = await this.client.request(GET_APPLICATION_AND_DATASTORE, {workspaceId});

      data.appAndDs = res.getApplicationAndDataStore;
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
   * function getReports: get reports list in project
   * @params projectId
   * @returns GetReportsRes
   */
  async getReports(projectId: string): Promise<GetReportsRes> {
    const data: GetReportsRes = {
      reports: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtGetReports = await this.client.request(GET_REPORTS, { projectId });

      data.reports = res.getReports;
    } catch (error: any) {

      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

}

import { HxbAbstract } from '../../../HxbAbstract';
import {
  GET_APPLICATION_AND_DATASTORE,
  APPLICATION_CREATE_PROJECT
} from '../../graphql/application';
import {
  AppAndDsRes,
  DtAppAndDs,
  CreateProjectPl,
  CreateAppRes,
  DtCreateApp
} from '../../types/application';

export default class Application extends HxbAbstract {

  /**
   * function getAppAndDsAsync: get list application and datastore in a workspace
   * @params workspaceId
   * @returns AppAndDsRes
   */
  async getAppAndDsAsync(workspaceId: string): Promise<AppAndDsRes> {
    let data: AppAndDsRes = {
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
   * function getAppAndDsAsync: get list application and datastore in a workspace
   * @params workspaceId
   * @returns AppAndDsRes
   */
  async createAppAsync(createProjectParams: CreateProjectPl): Promise<CreateAppRes> {
    let data: CreateAppRes = {
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

}

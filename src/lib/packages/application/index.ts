import { HxbAbstract } from '../../../HxbAbstract';
import {
  GET_APPLICATION_AND_DATASTORE
} from '../../graphql/application';
import {
  ApplicationAndDataStoreRes
} from '../../types/application';

export default class Application extends HxbAbstract {

  /**
   * function getAppAndDsAsync: get list application and datastore in a workspace
   * @params workspaceId
   * @returns ApplicationAndDataStoreRes
   */
  async getAppAndDsAsync(workspaceId: string): Promise<ApplicationAndDataStoreRes> {
    return await this.client.request(GET_APPLICATION_AND_DATASTORE, {
      workspaceId,
    });
  }

}
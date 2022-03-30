import { HxbAbstract } from '../../../HxbAbstract';
import { WORKSPACES } from '../../graphql/workspace';
import {
  WorkspacesRes,
} from '../../types/workspace';

export default class Workspace extends HxbAbstract {

  /**
   * function hexabaseWorspacesAsync: get workspaces and current workspace id
   * @returns WorkspacesRes
   */
  async hexabaseWorspacesAsync(): Promise<WorkspacesRes> {
    return await this.client.request(WORKSPACES);
  }
}
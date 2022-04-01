import { HxbAbstract } from '../../../HxbAbstract';
import {
  WORKSPACES,
  WORKSPACE_CURRENT,
  WORKSPACE_PASSWORD_POLICY,
  WORKSPACE_FUNCTIONALITY,
  WORKSPACE_USAGE,
  WORKSPACE_GROUP_CHILDREN
} from '../../graphql/workspace';
import {
  WorkspacesRes,
  WorkspaceCurrentRes,
  WsPasswordPolicyRes,
  WsFunctionalityRes,
  WsUsageRes,
  WsGetGroupChildrenRes
} from '../../types/workspace';

export default class Workspace extends HxbAbstract {

  /**
   * function workspacesAsync: get workspaces and current workspace id
   * @returns WorkspacesRes
   */
  async workspacesAsync(): Promise<WorkspacesRes> {
    return await this.client.request(WORKSPACES);
  }

  /**
   * function wsCurrentAsync: get workspaces id current
   * @returns WorkspaceCurrentRes
   */
  async wsCurrentAsync(): Promise<WorkspaceCurrentRes> {
    return await this.client.request(WORKSPACE_CURRENT);
  }

  /**
   * function wsPasswordPolicyAsync: get workspace password policy
   * @returns WsPasswordPolicyRes
   */
  async wsPasswordPolicyAsync(workingspaceId: string): Promise<WsPasswordPolicyRes> {
    return await this.client.request(WORKSPACE_PASSWORD_POLICY,{workingspaceId});
  }
  
  /**
   * function wsFunctionalityAsync: get workspace functionlity
   * @returns WsFunctionalityRes
   */
  async wsFunctionalityAsync(workingspaceId: string): Promise<WsFunctionalityRes> {
    return await this.client.request(WORKSPACE_FUNCTIONALITY,{workingspaceId});
  }

  /**
   * function wsUsageAsync: get workspace usage
   * @returns WsUsageRes
   */
  async wsUsageAsync(workingspaceId: string): Promise<WsUsageRes> {
    return await this.client.request(WORKSPACE_USAGE,{workingspaceId});
  }

  /**
   * function wsGetGroupChildrenAsync: get workspace childrent in group
   * @returns WsGetGroupChildrenRes
   */
  async wsGetGroupChildrenAsync(workingspaceId: string): Promise<WsGetGroupChildrenRes> {
    return await this.client.request(WORKSPACE_GROUP_CHILDREN,{workingspaceId});
  }
}
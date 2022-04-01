import { HxbAbstract } from '../../../HxbAbstract';
import {
  WORKSPACES,
  WORKSPACE_CURRENT,
  WORKSPACE_PASSWORD_POLICY,
  WORKSPACE_FUNCTIONALITY,
  WORKSPACE_USAGE,
  WORKSPACE_GROUP_CHILDREN,
  TASK_QUEUE_LIST,
  TASK_QUEUE_STATUS
} from '../../graphql/workspace';
import {
  QueryTaskList,
  WorkspacesRes,
  WorkspaceCurrentRes,
  WsPasswordPolicyRes,
  WsFunctionalityRes,
  WsUsageRes,
  WsGetGroupChildrenRes,
  TaskGetQueueListRes,
  TaskQueueStatusRes
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
    return await this.client.request(WORKSPACE_PASSWORD_POLICY, {workingspaceId});
  }

  /**
   * function wsFunctionalityAsync: get workspace functionlity
   * @returns WsFunctionalityRes
   */
  async wsFunctionalityAsync(workingspaceId: string): Promise<WsFunctionalityRes> {
    return await this.client.request(WORKSPACE_FUNCTIONALITY, {workingspaceId});
  }

  /**
   * function wsUsageAsync: get workspace usage
   * @returns WsUsageRes
   */
  async wsUsageAsync(workingspaceId: string): Promise<WsUsageRes> {
    return await this.client.request(WORKSPACE_USAGE, {workingspaceId});
  }

  /**
   * function wsGetGroupChildrenAsync: get workspace childrent in group
   * @returns WsGetGroupChildrenRes
   */
  async wsGetGroupChildrenAsync(workingspaceId: string): Promise<WsGetGroupChildrenRes> {
    return await this.client.request(WORKSPACE_GROUP_CHILDREN, {workingspaceId});
  }

  /**
   * function taskQueueListAsync: get queue list
   * @param: option: workspaceId or none, queryTaskList or none
   * @returns TaskGetQueueListRes
   */
  async taskQueueListAsync(workspaceId?: string, queryTaskList?: QueryTaskList): Promise<TaskGetQueueListRes> {
    return await this.client.request(TASK_QUEUE_LIST, {workspaceId, queryTaskList});
  }

  /**
   * function taskQueueStatusAsync: get task queue status
   * @param: option: taskId and workspaceId are required
   * @returns TaskQueueStatusRes
   */
  async taskQueueStatusAsync(taskId: string, workspaceId: string): Promise<TaskQueueStatusRes> {
    return await this.client.request(TASK_QUEUE_STATUS,{taskId, workspaceId});
  }
}
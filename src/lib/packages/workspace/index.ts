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
  WsGroupChildrenRes,
  TaskQueueListRes,
  TaskQueueStatusRes,
  DtWorkspaces,
  DtWorkspaceCurrent,
  DtWsPasswordPolicy,
  DtWsFunctionality,
  DtWsUsage,
  DtWsGroupChildren,
  DtTaskQueueList,
  DtTaskQueueStatus
} from '../../types/workspace';

export default class Workspace extends HxbAbstract {

  /**
   * function workspacesAsync: get workspaces and current workspace id
   * @returns WorkspacesRes
   */
  async workspacesAsync(): Promise<WorkspacesRes> {
    let data: WorkspacesRes = {
      workspaces: undefined,
      error: undefined,
    }

    // handle call graphql
    try {
      const res: DtWorkspaces= await this.client.request(WORKSPACES);
      data.workspaces = res.workspaces
    } catch(error: any) {

      data.error = JSON.stringify(error.response.error)
    }

    return data;
  }

  /**
   * function wsCurrentAsync: get workspaces id current
   * @returns WorkspaceCurrentRes
   */
  async wsCurrentAsync(): Promise<WorkspaceCurrentRes> {
    let data: WorkspaceCurrentRes = {
      wsCurrent: undefined,
      error: undefined,
    }

    // handle call graphql
    try {
      const res: DtWorkspaceCurrent = await this.client.request(WORKSPACE_CURRENT);
      data.wsCurrent = res.workspaceCurrent
    } catch(error: any) {

      data.error = JSON.stringify(error.response.error)
    }

    return data;
  }

  /**
   * function wsPasswordPolicyAsync: get workspace password policy
   * @returns WsPasswordPolicyRes
   */
  async wsPasswordPolicyAsync(workingspaceId: string): Promise<WsPasswordPolicyRes> {
    let data: WsPasswordPolicyRes = {
      wsPasswordPolicy: undefined,
      error: undefined,
    }

    // handle call graphql
    try {
      const res: DtWsPasswordPolicy = await this.client.request(WORKSPACE_PASSWORD_POLICY, {workingspaceId});
      data.wsPasswordPolicy = res.workspacePasswordPolicy
    } catch(error: any) {

      data.error = JSON.stringify(error.response.error)
    }

    return data;
  }

  /**
   * function wsFunctionalityAsync: get workspace functionlity
   * @returns WsFunctionalityRes
   */
  async wsFunctionalityAsync(workingspaceId: string): Promise<WsFunctionalityRes> {
    let data: WsFunctionalityRes = {
      wsFunctionality: undefined,
      error: undefined,
    }

    // handle call graphql
    try {
      const res: DtWsFunctionality = await this.client.request(WORKSPACE_FUNCTIONALITY, {workingspaceId});
      
      data.wsFunctionality = res.workspaceFunctionality
    } catch(error: any) {

      data.error = JSON.stringify(error.response.error)
    }

    return data;
  }

  /**
   * function wsUsageAsync: get workspace usage
   * @returns WsUsageRes
   */
  async wsUsageAsync(workingspaceId: string): Promise<WsUsageRes> {
    let data: WsUsageRes = {
      wsUsage: undefined,
      error: undefined,
    }

    // handle call graphql
    try {
      const res: DtWsUsage = await this.client.request(WORKSPACE_USAGE, {workingspaceId});
      
      data.wsUsage = res.workspaceUsage
    } catch(error: any) {

      data.error = JSON.stringify(error.response.error)
    }

    return data;
  }

  /**
   * function wsGroupChildrenAsync: get workspace childrent in group
   * @returns WsGroupChildrenRes
   */
  async wsGroupChildrenAsync(workingspaceId: string): Promise<WsGroupChildrenRes> {
    let data: WsGroupChildrenRes = {
      wsGroupChildren: undefined,
      error: undefined,
    }

    // handle call graphql
    try {
      const res: DtWsGroupChildren = await this.client.request(WORKSPACE_GROUP_CHILDREN, {workingspaceId});
      
      data.wsGroupChildren = res.workspaceGetGroupChildren
    } catch(error: any) {

      data.error = JSON.stringify(error.response.error)
    }

    return data;
  }

  /**
   * function taskQueueListAsync: get queue list
   * @param: option: workspaceId or none, queryTaskList or none
   * @returns TaskGetQueueListRes
   */
  async taskQueueListAsync(workspaceId?: string, queryTaskList?: QueryTaskList): Promise<TaskQueueListRes> {
    let data: TaskQueueListRes = {
      taskQueueList: undefined,
      error: undefined,
    }

    // handle call graphql
    try {
      const res: DtTaskQueueList = await this.client.request(TASK_QUEUE_LIST, {workspaceId, queryTaskList});
      
      data.taskQueueList = res.taskGetQueueList
    } catch(error: any) {

      data.error = JSON.stringify(error.response.error)
    }

    return data;
  }

  /**
   * function taskQueueStatusAsync: get task queue status
   * @param: option: taskId and workspaceId are required
   * @returns TaskQueueStatusRes
   */
  async taskQueueStatusAsync(taskId: string, workspaceId: string): Promise<TaskQueueStatusRes> {
    let data: TaskQueueStatusRes = {
      taskQueueStatus: undefined,
      error: undefined,
    }

    // handle call graphql
    try {
      const res: DtTaskQueueStatus = await this.client.request(TASK_QUEUE_STATUS,{taskId, workspaceId});
      
      data.taskQueueStatus = res.taskGetQueueTaskStatus
    } catch(error: any) {

      data.error = JSON.stringify(error.response.error)
    }

    return data;
  }
}
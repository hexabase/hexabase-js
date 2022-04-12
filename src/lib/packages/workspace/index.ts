import { ModelRes } from '../../util/type';
import { HxbAbstract } from '../../../HxbAbstract';
import {
  WORKSPACES,
  WORKSPACE_CURRENT,
  WORKSPACE_PASSWORD_POLICY,
  WORKSPACE_FUNCTIONALITY,
  WORKSPACE_USAGE,
  WORKSPACE_GROUP_CHILDREN,
  TASK_QUEUE_LIST,
  TASK_QUEUE_STATUS,
  CREATE_WORKSPACE,
  SET_CURRENT_WORKSPACE
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
  DtTaskQueueStatus,
  CreateWsInput,
  WorkspaceIDRes,
  DtWorkspaceID,
  DtCurrentWs,
  SetWsInput
} from '../../types/workspace';

export default class Workspace extends HxbAbstract {

  /**
   * function getWorkspacesAsync: get workspaces and current workspace id
   * @returns WorkspacesRes
   */
  async getWorkspacesAsync(): Promise<WorkspacesRes> {
    const data: WorkspacesRes = {
      workspaces: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtWorkspaces = await this.client.request(WORKSPACES);
      data.workspaces = res.workspaces;
    } catch (error: any) {
      console.log('error', error);

      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function getCurrentWorkspaceAsync: get workspaces id current
   * @returns WorkspaceCurrentRes
   */
  async getCurrentWorkspaceAsync(): Promise<WorkspaceCurrentRes> {
    const data: WorkspaceCurrentRes = {
      wsCurrent: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtWorkspaceCurrent = await this.client.request(WORKSPACE_CURRENT);
      data.wsCurrent = res.workspaceCurrent;
    } catch (error: any) {

      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function getPasswordPolicyAsync: get workspace password policy
   * @returns WsPasswordPolicyRes
   */
  async getPasswordPolicyAsync(workingspaceId: string): Promise<WsPasswordPolicyRes> {
    const data: WsPasswordPolicyRes = {
      wsPasswordPolicy: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtWsPasswordPolicy = await this.client.request(WORKSPACE_PASSWORD_POLICY, {workingspaceId});
      data.wsPasswordPolicy = res.workspacePasswordPolicy;
    } catch (error: any) {

      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function getFunctionalityAsync: get workspace functionlity
   * @returns WsFunctionalityRes
   */
  async getFunctionalityAsync(workingspaceId: string): Promise<WsFunctionalityRes> {
    const data: WsFunctionalityRes = {
      wsFunctionality: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtWsFunctionality = await this.client.request(WORKSPACE_FUNCTIONALITY, {workingspaceId});

      data.wsFunctionality = res.workspaceFunctionality;
    } catch (error: any) {

      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function getUsageAsync: get workspace usage
   * @returns WsUsageRes
   */
  async getUsageAsync(workingspaceId: string): Promise<WsUsageRes> {
    const data: WsUsageRes = {
      wsUsage: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtWsUsage = await this.client.request(WORKSPACE_USAGE, {workingspaceId});

      data.wsUsage = res.workspaceUsage;
    } catch (error: any) {

      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function getGroupChildrenAsync: get workspace childrent in group
   * @returns WsGroupChildrenRes
   */
  async getGroupChildrenAsync(workingspaceId: string): Promise<WsGroupChildrenRes> {
    const data: WsGroupChildrenRes = {
      wsGroupChildren: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtWsGroupChildren = await this.client.request(WORKSPACE_GROUP_CHILDREN, {workingspaceId});

      data.wsGroupChildren = res.workspaceGetGroupChildren;
    } catch (error: any) {

      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function taskQueueListAsync: get queue list
   * @param: option: workspaceId or none, queryTaskList or none
   * @returns TaskGetQueueListRes
   */
  async getTaskQueueListAsync(workspaceId?: string, queryTaskList?: QueryTaskList): Promise<TaskQueueListRes> {
    const data: TaskQueueListRes = {
      taskQueueList: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtTaskQueueList = await this.client.request(TASK_QUEUE_LIST, {workspaceId, queryTaskList});

      data.taskQueueList = res.taskGetQueueList;
    } catch (error: any) {

      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function taskQueueStatusAsync: get task queue status
   * @param: option: taskId and workspaceId are required
   * @returns TaskQueueStatusRes
   */
  async getTaskQueueStatusAsync(taskId: string, workspaceId: string): Promise<TaskQueueStatusRes> {
    const data: TaskQueueStatusRes = {
      taskQueueStatus: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtTaskQueueStatus = await this.client.request( TASK_QUEUE_STATUS, {taskId, workspaceId} );

      data.taskQueueStatus = res.taskGetQueueTaskStatus;
    } catch (error: any) {

      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function createWorkspaceAsync: created workspace
   * @param: createWorkSpaceInput: {name}
   * @returns WorkspaceIDRes
   */
  async createWorkspaceAsync(createWorkSpaceInput: CreateWsInput): Promise<WorkspaceIDRes> {
    const data: WorkspaceIDRes = {
      w_id: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtWorkspaceID = await this.client.request( CREATE_WORKSPACE, {createWorkSpaceInput} );

      data.w_id = res.createWorkspace?.w_id;
    } catch (error: any) {

      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function setCurrentWsAsync: set workspace current with id
   * @param: option: setCurrentWorkSpaceInput: {workspace_id} are required
   * @returns ModelRes
   */
  async setCurrentWsAsync(setCurrentWorkSpaceInput: SetWsInput): Promise<ModelRes> {
    const data: ModelRes = {
      data: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtCurrentWs = await this.client.request( SET_CURRENT_WORKSPACE, {setCurrentWorkSpaceInput} );

      data.data = res.setCurrentWorkSpace;
    } catch (error: any) {

      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }
}
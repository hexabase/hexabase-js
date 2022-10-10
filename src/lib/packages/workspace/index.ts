import { ModelRes, ResponseErrorNull } from '../../util/type';
import { HxbAbstract } from '../../../HxbAbstract';
import {
  WORKSPACES,
  WORKSPACE_PASSWORD_POLICY,
  WORKSPACE_FUNCTIONALITY,
  WORKSPACE_USAGE,
  WORKSPACE_GROUP_CHILDREN,
  TASK_QUEUE_LIST,
  TASK_QUEUE_STATUS,
  CREATE_WORKSPACE,
  SET_CURRENT_WORKSPACE,
  UPDATE_WORKSPACE_SETTINGS,
  WORKSPACE_DETAIL,
  ARCHIVE_WORKSPACE,
  WORKSPACE_CURRENT
} from '../../graphql/workspace';
import {
  QueryTaskList,
  WorkspacesRes,
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
  SetWsInput,
  WorkspaceSettingReq,
  WorkspaceDetailRes,
  ArchiveWorkspace,
  WorkspaceCurrentRes
} from '../../types/workspace';

export default class Workspace extends HxbAbstract {

  /**
   * function get: get workspaces and current workspace id
   * @returns WorkspacesRes
   */
  async get(): Promise<WorkspacesRes> {
    const data: WorkspacesRes = {
      workspaces: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtWorkspaces = await this.client.request(WORKSPACES);
      data.workspaces = res.workspaces;
    } catch (error: any) {
      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function getDetail: get workspace detail
   * @params: workspaceId
   * @returns Workspace
   */
  async getDetail(): Promise<WorkspaceDetailRes> {
    const data: WorkspaceDetailRes = {
      workspace: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: WorkspaceDetailRes = await this.client.request(WORKSPACE_DETAIL);
      data.workspace = res.workspace;
    } catch (error: any) {
      console.log('error', error);
      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function getPasswordPolicy: get workspace password policy
   * @returns WsPasswordPolicyRes
   */
  async getPasswordPolicy(workspaceId: string): Promise<WsPasswordPolicyRes> {
    const data: WsPasswordPolicyRes = {
      wsPasswordPolicy: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtWsPasswordPolicy = await this.client.request(WORKSPACE_PASSWORD_POLICY, { workingspaceId: workspaceId });
      data.wsPasswordPolicy = res.workspacePasswordPolicy;
    } catch (error: any) {
      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function getFunctionality: get workspace functionlity
   * @returns WsFunctionalityRes
   */
  async getFunctionality(workspaceId: string): Promise<WsFunctionalityRes> {
    const data: WsFunctionalityRes = {
      wsFunctionality: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtWsFunctionality = await this.client.request(WORKSPACE_FUNCTIONALITY, { workingspaceId: workspaceId });

      data.wsFunctionality = res.workspaceFunctionality;
    } catch (error: any) {
      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function getUsage: get workspace usage
   * @returns WsUsageRes
   */
  async getUsage(workspaceId: string): Promise<WsUsageRes> {
    const data: WsUsageRes = {
      wsUsage: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtWsUsage = await this.client.request(WORKSPACE_USAGE, { workingspaceId: workspaceId });

      data.wsUsage = res.workspaceUsage;
    } catch (error: any) {
      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function getGroupChildren: get workspace childrent in group
   * @returns WsGroupChildrenRes
   */
  async getGroupChildren(workspaceId: string): Promise<WsGroupChildrenRes> {
    const data: WsGroupChildrenRes = {
      wsGroupChildren: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtWsGroupChildren = await this.client.request(WORKSPACE_GROUP_CHILDREN, { workingspaceId: workspaceId });

      data.wsGroupChildren = res.workspaceGetGroupChildren;
    } catch (error: any) {
      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function getTaskQueueList: get queue list
   * @param: option: workspaceId or none, queryTaskList or none
   * @returns TaskQueueListRes
   */
  async getTaskQueueList(workspaceId?: string, queryTaskList?: QueryTaskList): Promise<TaskQueueListRes> {
    const data: TaskQueueListRes = {
      taskQueueList: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtTaskQueueList = await this.client.request(TASK_QUEUE_LIST, { workspaceId, queryTaskList });

      data.taskQueueList = res.taskGetQueueList;
    } catch (error: any) {
      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function getTaskQueueStatus: get task queue status
   * @param: option: taskId and workspaceId are required
   * @returns TaskQueueStatusRes
   */
  async getTaskQueueStatus(taskId: string, workspaceId: string): Promise<TaskQueueStatusRes> {
    const data: TaskQueueStatusRes = {
      taskQueueStatus: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtTaskQueueStatus = await this.client.request(TASK_QUEUE_STATUS, { taskId, workspaceId });

      data.taskQueueStatus = res.taskGetQueueTaskStatus;
    } catch (error: any) {
      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function create: created workspace
   * @param: createWorkSpaceInput: {name}
   * @returns WorkspaceIDRes
   */
  async create(createWsInput: CreateWsInput): Promise<WorkspaceIDRes> {
    const data: WorkspaceIDRes = {
      w_id: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtWorkspaceID = await this.client.request(CREATE_WORKSPACE, { createWorkSpaceInput: createWsInput });

      data.w_id = res.createWorkspace?.w_id;
    } catch (error: any) {
      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function update: update workspace settings
   * @param: payload: WorkspaceSettingReq
   * @returns ResponseErrorNull
   */
  async update(payload: WorkspaceSettingReq): Promise<ResponseErrorNull> {
    const data: ResponseErrorNull = {
      error: undefined,
    };

    try {
      const res: ResponseErrorNull = await this.client.request(UPDATE_WORKSPACE_SETTINGS, payload);
      data.error = res.error;
    } catch (error: any) {
      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function archive: archive workspace
   * @param: payload: WorkspaceSettingReq
   * @returns ResponseErrorNull
   */
  async archive(payload: ArchiveWorkspace): Promise<ResponseErrorNull> {
    const data: ResponseErrorNull = {
      error: undefined,
    };

    try {
      const res: ResponseErrorNull = await this.client.request(ARCHIVE_WORKSPACE, payload);
      data.error = res.error;
    } catch (error: any) {
      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }


  /**
   * function setCurrent: set workspace current with id
   * @param: option: SetWsInput: {workspace_id} are required
   * @returns ModelRes
   */
  async setCurrent(setCurrentWsPl: SetWsInput): Promise<ModelRes> {
    const data: ModelRes = {
      data: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtCurrentWs = await this.client.request(SET_CURRENT_WORKSPACE, { setCurrentWorkSpaceInput: setCurrentWsPl });
      data.data = res.setCurrentWorkSpace;
    } catch (error: any) {
      data.error = JSON.stringify(error.response.errors);
    }
    return data;
  }

  /**
   * function getCurrent: get workspaces id current
   * @returns WorkspaceCurrentRes
   */
  async getCurrent(): Promise<WorkspaceCurrentRes> {
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
}
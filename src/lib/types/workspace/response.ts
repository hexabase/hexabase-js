import {ResponseOkModel} from '../../util/type'
export interface WorkSpacesInfo {
  workspace_name?: string;
  workspace_id?: string;
}

export interface Workspaces {
  workspaces: [WorkSpacesInfo];
  current_workspace_id?: string;
}
export interface WorkspaceCurrent {
  workspace_id?: string;
}

export interface WsPasswordPolicy {
  expired_day?: number;
  lockout_count?: number;
  lockout_time?: number;
  min_length?: number;
  pattern_check_type?: number;
  same_limit?: number;
  use_expired_day?: boolean;
  use_lockout_count?: boolean;
  use_lockout_time?: boolean;
  use_min_length?: boolean;
  use_pattern_check?: boolean;
  use_same_limit?: boolean;
}

export interface WsFunctions {
  use_create_workspace?: number;
  use_password_policy?: boolean;
  use_global_search?: boolean;
  use_beta?: boolean;
}

export interface AppFunctions {
  use_create_application?: boolean;
  use_queries?: boolean;
  use_reports?: boolean;
  use_dashboards?: boolean;
}

export interface WsFunctionality {
  w_id?: string;
  ws_functions?: WsFunctions;
  app_functions?: AppFunctions;
}

export interface UsageWorkSpace {
  users?: number;
  users_limit?: number;
  storage?: number;
  storage_limit?: number;
  datastores?: number;
  datastores_limit?: number;
  items?: number;
  items_limit?: number;
}
export interface WsUsage {
  w_id?: string;
  usage?: UsageWorkSpace;
}

export interface FieldGroup {
  g_id?: string;
  group_id?: string;
  name?: string;
  index?: number;
}

export interface WsGroupChildren {
  error?: string;
  group?: FieldGroup;
  children?: FieldGroup[];
  count?: number;
}

export interface FieldStatusQueue {
  name: string;
  id: number;
}

export interface FieldMetadata {
  w_id: string;
}

export interface TaskQueueStatus {
  qt_id: string;
  category: string;
  status: FieldStatusQueue;
  created_at: string;
  started_at: string;
  finished_at: string;
  metadata: FieldMetadata;
}

export interface WorkspaceID {
  w_id: string;
}

/** Data response from request graphql */
export interface DtWorkspaces {
  workspaces: Workspaces;
}

export interface DtWorkspaceCurrent {
  workspaceCurrent: WorkspaceCurrent;
}

export interface DtWsPasswordPolicy {
  workspacePasswordPolicy: WsPasswordPolicy;
}

export interface DtWsFunctionality {
  workspaceFunctionality: WsFunctionality;
}

export interface DtWsUsage {
  workspaceUsage: WsUsage;
}

export interface DtWsGroupChildren {
  workspaceGetGroupChildren: WsGroupChildren;
}

export interface DtTaskQueueList {
  taskGetQueueList: any;
}

export interface DtTaskQueueStatus {
  taskGetQueueTaskStatus: TaskQueueStatus;
}

export interface DtWorkspaceID {
  createWorkspace?: WorkspaceID;
}

export interface DtCurrentWs {
  setCurrentWorkSpace?: ResponseOkModel;
}

/** Response */
export interface WorkspacesRes {
  workspaces?: Workspaces;
  error?: string;
}

export interface WorkspaceCurrentRes {
  wsCurrent?: WorkspaceCurrent;
  error?: string;
}

export interface WsPasswordPolicyRes {
  wsPasswordPolicy?: WsPasswordPolicy;
  error?: string;
}

export interface WsFunctionalityRes {
  wsFunctionality?: WsFunctionality;
  error?: string;
}

export interface WsUsageRes {
  wsUsage?: WsUsage;
  error?: string;
}

export interface WsGroupChildrenRes {
  wsGroupChildren?: WsGroupChildren;
  error?: string;
}

export interface TaskQueueListRes {
  taskQueueList?: any;
  error?: string;
}

export interface TaskQueueStatusRes {
  taskQueueStatus?: TaskQueueStatus;
  error?: string;
}

export interface WorkspaceIDRes {
  w_id?: string;
  error?: string;
}

import { ResponseOkModel } from '../../util/type';

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

export interface WsAdminUser {
  user_id?: string;
  email?: string;
  user_name?: string;
  access_key?: string;
}

export interface Language {
  lang_cd?: string;

  use?: boolean;

  default?: boolean;
}

export interface PwdPolicy {
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

  use_language_en?: boolean;

  use_language_ja?: boolean;
}

export interface UserSessions {
  session_timeout_sec?: number;

  use?: boolean;

  default?: boolean;
}

export interface WsSettings {
  disable_change_name?: boolean;

  disable_change_logo?: boolean;

  disable_manage_admins?: boolean;

  disable_archive?: boolean;

  disable_password_policy?: boolean;

  disable_global_search?: boolean;
}

export interface GroupSettings {
  disable_new_group?: boolean;

  disable_group_import?: boolean;

  disable_user_import?: boolean;

  disable_group_roles?: boolean;
}

export interface DeveloperFunctions {
  disable_developer_mode?: boolean;

  disable_beta?: boolean;

  disable_generate_token?: boolean;

  show_access_keys?: number;
}

export interface TaskQueue {
  show_task_list?: number;
}

export interface NewWorkspaces {
  new_workspace?: number;
}

export interface WsFunctionsOb {
  ws_settings?: WsSettings;

  group_settings?: GroupSettings;

  developer_functions?: DeveloperFunctions;

  task_queue?: TaskQueue;

  new_workspaces?: NewWorkspaces;
}

export interface AppSettings {
  disable_change_name?: boolean;

  disable_role_settings?: boolean;

  disable_left_menu_extension?: boolean;

  disable_program_extension?: boolean;

  disable_delete_application?: boolean;

  enable_action_validation?: boolean;

  enable_field_values_validation?: boolean;
}

export interface AppTemplates {
  disable_new_application?: boolean;

  disable_save_templates?: boolean;
}

export interface Dashboards {
  disable_edit_dashboards?: boolean;

  disable_edit_dash_items?: boolean;
}

export interface DataReports {
  disable_edit_reports?: boolean;

  disable_save_reports?: boolean;

  disable_csv_downloads?: boolean;
}

export interface DatastoresBl {
  disable_db_settings?: boolean;

  disable_grid_view?: boolean;

  disable_borad_view?: boolean;

  disable_status_update?: boolean;

  disable_query?: boolean;
}

export interface CsvImport {
  disable_csv_update?: boolean;

  disable_replace_import?: boolean;

  use_qr_download?: boolean;
}

export interface ItemView {
  disable_pagination?: boolean;

  disable_change_layouts?: boolean;

  disable_edit_statuses?: boolean;

  disable_edit_fields?: boolean;

  disable_edit_actions?: boolean;

  hide_link_items?: boolean;

  disable_pin_items?: boolean;
}

export interface AppFunctionsOb {
  app_settings?: AppSettings;

  app_templates?: AppTemplates;

  dashboards?: Dashboards;

  data_reports?: DataReports;

  datastores?: DatastoresBl;

  csv_import?: CsvImport;

  item_view?: ItemView;
}

export interface Redirect {
  is_apply_redirect_url_for_disabled_users?: boolean;

  redirect_url?: string;
}


export interface WorkspaceDetail {
  id?: string;

  w_id?: string;

  plan_id?: string;

  plan_name?: string;

  ws_admin?: any;

  ws_admin_users?: [WsAdminUser];

  user_id?: string;

  name?: string;

  ws_usage?: UsageWorkSpace;

  languages?: [Language];

  pwd_policy?: PwdPolicy;

  user_sessions?: UserSessions;

  ws_functions?: WsFunctionsOb;


  app_functions?: AppFunctionsOb;

  redirect?: Redirect;


  created_at?: string;


  updated_at?: string;
}

export interface WorkspaceDetailRes {
  workspace?: WorkspaceDetail;
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

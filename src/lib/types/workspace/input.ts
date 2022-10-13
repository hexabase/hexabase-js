export interface QueryTaskList {
  all?: string;
  category?: string;
  stream_id?: string;
}
export interface CreateWsInput {
  name: string;
}
export interface SetWsInput {
  workspace_id: string;
}

export interface AppSettings {
  disable_change_name?: boolean;
  disable_delete_application?: boolean;
  disable_left_menu_extension?: boolean;
  disable_program_extension?: boolean;
  disable_role_settings?: boolean;
  enable_action_validation?: boolean;
  enable_field_values_validation?: boolean;
}

export interface AppTemplates {
  disable_new_application?: boolean;
  disable_save_templates?: boolean;
}

export interface CsvImport {
  disable_csv_update?: boolean;
  disable_replace_import?: boolean;
  use_qr_download?: boolean;
}

export interface Dashboards {
  disable_edit_dash_items?: boolean;
  disable_edit_dashboards?: boolean;
}

export interface DataReports {
  disable_csv_downloads?: boolean;
  disable_edit_reports?: boolean;
  disable_save_reports?: boolean;
}

export interface DatastoresPl {
  disable_borad_view?: boolean;
  disable_db_settings?: boolean;
  disable_grid_view?: boolean;
  disable_query?: boolean;
  disable_status_update?: boolean;
}

export interface ItemView {
  disable_change_layouts?: boolean;
  disable_edit_actions?: boolean;
  disable_edit_fields?: boolean;
  disable_edit_statuses?: boolean;
  disable_pagination?: boolean;
  disable_pin_items?: boolean;
  hide_link_items?: boolean;
}

export interface AppFunctionsPl {
  app_settings?: AppSettings;
  app_templates?: AppTemplates;
  csv_import?: CsvImport;
  dashboards?: Dashboards;
  data_reports?: DataReports;
  datastores?: DatastoresPl;
  item_view?: ItemView;
}

export interface Languages {
  lang_cd?: string;
  use?: boolean;
  name?: string;
  default?: boolean;
}

export interface PwdPolicyPl {
  expired_day?: number;
  lockout_count?: number;
  lockout_time?: number;
  min_length?: number;
  pattern_check_type?: number;
  same_limit?: number;
  use_expired_day?: boolean;
  use_language_en?: boolean;
  use_language_ja?: boolean;
  use_lockout_count?: boolean;
  use_lockout_time?: boolean;
  use_min_length?: boolean;
  use_pattern_check?: boolean;
  use_same_limit?: boolean;
}

export interface Redirect {
  is_apply_redirect_url_for_disabled_users?: boolean;
  redirect_url?: string;
}

export interface UserSessions {
  session_timeout_sec?: number;
  default?: any;
  use?: any;
}

export interface WsAdminUsers {
  user_id?: string;
  user_name?: string;
  media_link?: string;
  email?: string;
  access_key?: string;
}

export interface DeveloperFunctions {
  disable_beta?: boolean;
  disable_developer_mode?: boolean;
  disable_generate_token?: boolean;
  show_access_keys?: number;
}

export interface GroupSettings {
  disable_group_import?: boolean;

  disable_group_roles?: boolean;

  disable_new_group?: boolean;

  disable_user_import?: boolean;
}

export interface NewWorkspaces {
  new_workspace?: number;
}

export interface TaskQueue {
  show_task_list?: number;
}

export interface WsSettings {
  disable_archive?: boolean;
  disable_change_logo?: boolean;
  disable_global_search?: boolean;
  disable_change_name?: boolean;
  disable_manage_admins?: boolean;
  disable_password_policy?: boolean;
}

export interface WsFunctionsPl {
  developer_functions?: DeveloperFunctions;
  group_settings?: GroupSettings;
  new_workspaces?: NewWorkspaces;
  task_queue?: TaskQueue;
  ws_settings?: WsSettings;
}

export interface WsUsage {
  datastores?: number;
  items?: number;
  storage_size?: number;
  users?: number;
  users_limit?: any;
  items_limit?: any;
  storage?: any;
  storage_limit: any;
  datastores_limit: any;
}

export interface WorkspaceSettingPl {
  id?: string;
  created_at?: string;
  ws_key?: string;
  name?: string;
  plan_id?: string;
  plan_name?: string;
  updated_at?: string;
  user_id?: string;
  w_id?: string;
  app_functions?: AppFunctionsPl;
  languages?: Languages[];
  pwd_policy?: PwdPolicyPl;
  redirect?: Redirect;
  user_sessions?: UserSessions;
  ws_admin?: any;
  ws_admin_users?: WsAdminUsers[];
  ws_functions?: WsFunctionsPl;
  ws_usage?: WsUsage;
}

export interface WorkspaceSettingReq {
  payload: WorkspaceSettingPl;
}

export interface ArchiveWorkspacePl {
  archived: boolean;
  w_id: string;
}

export interface ArchiveWorkspace {
  payload: ArchiveWorkspacePl;
}
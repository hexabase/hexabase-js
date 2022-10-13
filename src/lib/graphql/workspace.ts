import { gql } from 'graphql-request';

export const WORKSPACES = gql`
  query Workspaces {
    workspaces {
      workspaces {
        workspace_name
        workspace_id
      }
      current_workspace_id
    }
  }
`;

export const WORKSPACE_DETAIL = gql`
query Workspace {
  workspace {
    app_functions {
      dashboards {
        disable_edit_dash_items
      }
    }
  app_functions {
      dashboards {
        disable_edit_dashboards
      }
      app_templates {
        disable_new_application
        disable_save_templates
      }
      app_settings {
        disable_role_settings
      disable_program_extension
      disable_left_menu_extension
      disable_delete_application
      disable_change_name
        enable_field_values_validation
      enable_action_validation
      }
      csv_import {
        use_qr_download
        disable_csv_update
      disable_replace_import
      }
      data_reports {
        disable_save_reports
        disable_csv_downloads
      disable_edit_reports
      }
      item_view {
        disable_pin_items
        disable_edit_fields
      disable_edit_statuses
      disable_pagination
        disable_change_layouts
      disable_edit_actions
        hide_link_items
      }
      datastores {
        disable_status_update
        disable_grid_view
      disable_query
        disable_db_settings
        disable_borad_view
      }
    }
    created_at
    id
    languages {
      default
    lang_cd
    use
    }
  name
    plan_name
  plan_id
    pwd_policy {
      expired_day
      min_length
    lockout_time
    lockout_count
      use_same_limit
    use_pattern_check
    use_min_length
    use_lockout_time
    use_lockout_count
    use_language_ja
    use_language_en
    use_expired_day
    same_limit
    pattern_check_type
    }
    redirect {
      redirect_url
      is_apply_redirect_url_for_disabled_users
    }
    updated_at
  user_id
    w_id
    ws_admin
    user_sessions {
      use
      default
    session_timeout_sec
    }
    ws_admin_users {
      user_name
      access_key
    email
    user_id
    }
    ws_functions {
      ws_settings {
        disable_archive
        disable_change_name
        disable_change_logo
        disable_global_search
        disable_password_policy
        disable_manage_admins
      }
      task_queue {
        show_task_list
      }
      new_workspaces {
        new_workspace
      }
      group_settings {
        disable_group_import
        disable_user_import
        disable_new_group
        disable_group_roles
      }
      developer_functions {
        disable_beta
        disable_generate_token
        disable_developer_mode
        show_access_keys
      }
    }
    ws_usage {
      users_limit
      items_limit
    storage
    storage_limit
    users
      datastores
    datastores_limit
    items
    }
  }
}
`;

export const WORKSPACE_CURRENT = gql`
  query WorkspaceCurrent {
    workspaceCurrent {
      workspace_id
    }
  }
`;

export const WORKSPACE_PASSWORD_POLICY = gql`
  query WorkspacePasswordPolicy($workingspaceId: String!) {
    workspacePasswordPolicy(workingspaceId: $workingspaceId) {
      expired_day
      lockout_count
      lockout_time
      min_length
      pattern_check_type
      same_limit
      use_expired_day
      use_lockout_count
      use_lockout_time
      use_min_length
      use_pattern_check
      use_same_limit
    }
  }
`;

export const WORKSPACE_FUNCTIONALITY = gql`
  query WorkspaceFunctionality($workingspaceId: String!) {
    workspaceFunctionality(workingspaceId: $workingspaceId) {
      w_id
      ws_functions {
        use_global_search
        use_beta
        use_password_policy
        use_create_workspace
      }
      app_functions {
        use_dashboards
        use_queries
        use_create_application
        use_reports
      }
    }
  }
`;

export const WORKSPACE_USAGE = gql`
  query WorkspaceUsage($workingspaceId: String) {
    workspaceUsage(workingspaceId: $workingspaceId) {
      w_id
      usage {
        users
        users_limit
        storage
        storage_limit
        items
        items_limit
        datastores_limit
        datastores
      }
    }
  }
`;

export const WORKSPACE_GROUP_CHILDREN = gql`
  query WorkspaceGetGroupChildren($groupId: String) {
    workspaceGetGroupChildren(groupId: $groupId) {
      error
      group {
        index
        name
        group_id
        g_id
      }
      children {
        index
        name
        group_id
        g_id
      }
      count
    }
  }
`;

export const TASK_QUEUE_LIST = gql`
  query TaskGetQueueList($workspaceId: String, $queryTaskList: QueryTaskList) {
    taskGetQueueList(workspaceId: $workspaceId, queryTaskList: $queryTaskList)
  }
`;

export const TASK_QUEUE_STATUS = gql`
  query TaskGetQueueTaskStatus($taskId: String!, $workspaceId: String!) {
    taskGetQueueTaskStatus(taskId: $taskId, workspaceId: $workspaceId) {
      qt_id
      category
      status {
        id
        name
      }
      created_at
      started_at
      finished_at
      metadata {
        w_id
      }
    }
  }
`;

export const CREATE_WORKSPACE = gql`
  mutation CreateWorkspace($createWorkSpaceInput: CreateWorkSpaceInput!) {
    createWorkspace(createWorkSpaceInput: $createWorkSpaceInput) {
      w_id
    }
  }
`;

export const SET_CURRENT_WORKSPACE = gql`
  mutation SetCurrentWorkSpace($setCurrentWorkSpaceInput: SetCurrentWorkSpaceInput!) {
    setCurrentWorkSpace(setCurrentWorkSpaceInput: $setCurrentWorkSpaceInput) {
      success
      data
    }
  }
`;

export const UPDATE_WORKSPACE_SETTINGS = gql`
  mutation UpdateWorkspaceSettings($payload: WorkspaceSettingReq!) {
    updateWorkspaceSettings(payload: $payload) {
      error
    }
  }
`;

export const ARCHIVE_WORKSPACE = gql`
  mutation archiveWorkspace($payload: ArchiveWorkspace!) {
    archiveWorkspace(payload: $payload) {
      error
    }
  }
`;
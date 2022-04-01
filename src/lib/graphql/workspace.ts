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

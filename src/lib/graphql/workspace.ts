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

import { gql } from 'graphql-request';

export const GET_APPLICATION_AND_DATASTORE = gql`
  query GetApplicationAndDataStore($workspaceId: String!) {
    getApplicationAndDataStore(workspaceId: $workspaceId) {
      application_id
      name
      display_id
      datastores {
        name
        datastore_id
      }
    }
  }
`;

export const APPLICATION_CREATE_PROJECT = gql`
  mutation ApplicationCreateProject($createProjectParams: CreateProjectParams) {
    applicationCreateProject(createProjectParams: $createProjectParams) {
      project_id
    }
  }
`;


export const GET_INFO_PROJECT = gql`
 query Query($projectId: String!) {
    getInfoProject(projectId: $projectId) {
      p_id
      display_order
      template_id
      display_id
      name
      w_id
    }
  }
`;




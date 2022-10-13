import { gql } from 'graphql-request';

export const GET_APPLICATIONS = gql`
  query GetApplications($workspaceId: String!) {
    getApplications(workspaceId: $workspaceId) {
      application_id
      name
      display_id
      theme
      display_order
    }
  }
`;

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

export const GET_TEMPLATES = gql`
  query GetTemplates {
    getTemplates {
      categories {
        category
        templates {
          tp_id
          name
          description
        }
      }
      enabled
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


export const DELETE_PROJECT = gql`
  mutation DeleteProject($payload: DeleteProjectPl!) {
    deleteProject(payload: $payload) {
      data
      success
    }
  }
`;

export const UPDATE_PROJECT_THEME = gql`
  mutation UpdateProjectTheme($payload: UpdateProjectThemePl!) {
    updateProjectTheme(payload: $payload) {
      data
      success
    }
  }
`;

export const UPDATE_PROJECT_NAME = gql`
  mutation UpdateProjectName($payload: UpdateProjectNamePl!) {
    updateProjectName(payload: $payload) {
      data
      success
    }
  }
`;

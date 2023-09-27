"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UPDATE_PROJECT_NAME = exports.UPDATE_PROJECT_THEME = exports.DELETE_PROJECT = exports.GET_INFO_PROJECT = exports.APPLICATION_CREATE_PROJECT = exports.GET_TEMPLATES = exports.GET_APPLICATION_AND_DATASTORE = exports.GET_APPLICATIONS = void 0;
const graphql_request_1 = require("graphql-request");
exports.GET_APPLICATIONS = (0, graphql_request_1.gql) `
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
exports.GET_APPLICATION_AND_DATASTORE = (0, graphql_request_1.gql) `
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
exports.GET_TEMPLATES = (0, graphql_request_1.gql) `
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
exports.APPLICATION_CREATE_PROJECT = (0, graphql_request_1.gql) `
  mutation ApplicationCreateProject($createProjectParams: CreateProjectParams) {
    applicationCreateProject(createProjectParams: $createProjectParams) {
      project_id
    }
  }
`;
exports.GET_INFO_PROJECT = (0, graphql_request_1.gql) `
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
exports.DELETE_PROJECT = (0, graphql_request_1.gql) `
  mutation DeleteProject($payload: DeleteProjectPl!) {
    deleteProject(payload: $payload) {
      data
      success
    }
  }
`;
exports.UPDATE_PROJECT_THEME = (0, graphql_request_1.gql) `
  mutation UpdateProjectTheme($payload: UpdateProjectThemePl!) {
    updateProjectTheme(payload: $payload) {
      data
      success
    }
  }
`;
exports.UPDATE_PROJECT_NAME = (0, graphql_request_1.gql) `
  mutation UpdateProjectName($payload: UpdateProjectNamePl!) {
    updateProjectName(payload: $payload) {
      data
      success
    }
  }
`;
//# sourceMappingURL=project.js.map
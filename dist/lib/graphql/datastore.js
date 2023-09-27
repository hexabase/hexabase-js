"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATASTORE_GET_FIELD_AUTO_NUMBER = exports.DELETE_DATASTORE = exports.UPDATE_DATASTORE_SETTING = exports.VALIDATE_DS_DISPLAY_ID = exports.CREATE_DATASTORE_FROM_TEMPLATE = exports.GET_DATASTORE_DETAIL = exports.GET_DATASTORES = exports.DS_ACTION_SETTING = exports.DS_STATUS = exports.DS_ACTIONS = exports.DS_FIELD_SETTING = exports.DS_FIELDS = void 0;
const graphql_request_1 = require("graphql-request");
exports.DS_FIELDS = (0, graphql_request_1.gql) `
  query DatastoreGetFields($datastoreId: String!, $projectId: String) {
    datastoreGetFields(datastoreId: $datastoreId, projectId: $projectId) {
      field_layout
      fields
    }
  }
`;
exports.DS_FIELD_SETTING = (0, graphql_request_1.gql) `
  query DatastoreGetFieldSettings($fieldId: String!, $datastoreId: String!) {
    datastoreGetFieldSettings(fieldId: $fieldId, datastoreId: $datastoreId) {
      value
      workspace_id
      project_id
      datastore_id
      field_id
      name {
        ja
        en
      }
      display_id
      dataType
      search
      show_list
      as_title
      status
      full_text
      unique
      hideOnInput
      hide_from_api
      has_index
      roles {
        can_execute
        can_use
        type
        name
        display_id
        role_id
        project_id
      }
    }
  }
`;
exports.DS_ACTIONS = (0, graphql_request_1.gql) `
  query DatastoreGetActions($datastoreId: String!) {
    datastoreGetActions(datastoreId: $datastoreId) {
      workspace_id
      project_id
      datastore_id
      action_id
      is_status_action
      display_id
      operation
      set_status
      name
    }
  }
`;
exports.DS_STATUS = (0, graphql_request_1.gql) `
  query DatastoreGetStatuses($datastoreId: String!) {
    datastoreGetStatuses(datastoreId: $datastoreId) {
      display_id
      name {
        ja
        en
      }
      displayed_name
      status_id
      sort_id
      x
      y
    }
  }
`;
exports.DS_ACTION_SETTING = (0, graphql_request_1.gql) `
  query DatastoreGetActionSetting($actionId: String!, $datastoreId: String!) {
    datastoreGetActionSetting(actionId: $actionId, datastoreId: $datastoreId) {
      workspace_id
      project_id
      datastore_id
      action_id
      is_status_action
      display_id
      operation
      set_status
      name {
        ja
        en
      }
      roles {
        can_execute
        can_use
        project_id
        type
        name
        display_id
        role_id
      }
    }
  }
`;
exports.GET_DATASTORES = (0, graphql_request_1.gql) `
  query Datastores($projectId: String!) {
    datastores(projectId: $projectId) {
      d_id
      data_source
      deleted
      display_id
      display_order
      external_service_data
      imported
      invisible
      is_external_service
      name
      no_status
      p_id
      show_display_id_to_list
      show_in_menu
      show_info_to_list
      show_only_dev_mode
      unread
      uploading
      use_board_view
      use_csv_update
      use_external_sync
      use_grid_view
      use_grid_view_by_default
      use_qr_download
      use_replace_upload
      w_id
      ws_name
    }
  }
`;
exports.GET_DATASTORE_DETAIL = (0, graphql_request_1.gql) `
  query DatastoreSetting($datastoreId: String!) {
    datastoreSetting(datastoreId: $datastoreId) {
      display_id
      names
      id
      field_layout {
        display_id
        col
        id
        row
        size_x
        size_y
      }
      fields {
        as_title
        data_type
        display_id
        display_name
        field_index
        full_text
        id
        max_value
        min_value
        names
        options {
          o_id
          _key
          fieldID
        }
        show_list
        search
        status
        title_order
        unique
      }
      roles {
        name
        id
        display_id
      }
      statuses {
        names
        display_id
        id
      }
    }
  }
`;
exports.CREATE_DATASTORE_FROM_TEMPLATE = (0, graphql_request_1.gql) `
  mutation CreateDatastoreFromTemplate($payload: CreateDatastoreFromSeedReq!) {
    createDatastoreFromTemplate(payload: $payload) {
      datastoreId
    }
  }
`;
exports.VALIDATE_DS_DISPLAY_ID = (0, graphql_request_1.gql) `
  mutation ValidateDatastoreDisplayID($payload: IsExistsDSDisplayIDExcludeOwnReq!) {
    validateDatastoreDisplayID(payload: $payload) {
      exits
    }
  }
`;
exports.UPDATE_DATASTORE_SETTING = (0, graphql_request_1.gql) `
  mutation UpdateDatastoreSetting($payload: DatastoreUpdateSetting!) {
    updateDatastoreSetting(payload: $payload) {
      data
      success
    }
  }
`;
exports.DELETE_DATASTORE = (0, graphql_request_1.gql) `
  mutation DeleteDatastore($datastoreId: String!) {
    deleteDatastore(datastoreId: $datastoreId) {
      data
      success
    }
  }
`;
exports.DATASTORE_GET_FIELD_AUTO_NUMBER = (0, graphql_request_1.gql) `
  query DatastoreGetFieldAutoNumber($datastoreId: String!, $fieldId: String!, $projectId: String!, $params: GetFieldAutoNumberQuery) {
    datastoreGetFieldAutoNumber(datastoreId: $datastoreId, fieldId: $fieldId, projectId: $projectId, getFieldAutoNumberQuery: $params) {
      errors {
        description
        error
        error_code
        error_level
        reference_id
      }
      has_error
      result
    }
  }
`;
//# sourceMappingURL=datastore.js.map
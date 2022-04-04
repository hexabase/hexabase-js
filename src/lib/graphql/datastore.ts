import { gql } from 'graphql-request';

export const DS_FIELD_SETTING = gql`
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

export const DS_ACTIONS = gql`
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


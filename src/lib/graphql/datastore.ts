import { gql } from 'graphql-request';

export const DS_FIELDS = gql`
  query DatastoreGetFields($datastoreId: String!, $projectId: String) {
    datastoreGetFields(datastoreId: $datastoreId, projectId: $projectId) {
      field_layout
      fields
    }
  }
`;

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
export const DS_STATUS = gql`
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

export const DS_ACTION_SETTING = gql`
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

export const GET_DATASTORES = gql`
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

export const GET_DATASTORE_DETAIL = gql`
	query DatastoreSetting($datastoreId: String!) {
		datastoreSetting(datastoreId: $datastoreId) {
			field_layout {
				display_id
			}
		field_layout {
				col
				id
				row
				size_x
				size_y
			}
			display_id
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
			names
		id
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

export const CREATE_DATASTORE_FROM_TEMPLATE = gql`
  mutation CreateDatastoreFromTemplate($payload: CreateDatastoreFromSeedReq!) {
    createDatastoreFromTemplate(payload: $payload) {
      datastoreId
    }
  }
`;

export const VALIDATE_DS_DISPLAY_ID = gql`
  mutation ValidateDatastoreDisplayID($payload: IsExistsDSDisplayIDExcludeOwnReq!) {
    validateDatastoreDisplayID(payload: $payload) {
      exits
    }
  }
`;

export const UPDATE_DATASTORE_SETTING = gql`
  mutation UpdateDatastoreSetting($payload: DatastoreUpdateSetting!) {
    updateDatastoreSetting(payload: $payload) {
      data
      success
    }
  }
`;

export const DELETE_DATASTORE = gql`
  mutation DeleteDatastore($datastoreId: String!) {
    deleteDatastore(datastoreId: $datastoreId) {
      data
      success
    }
  }
`;
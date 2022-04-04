import { FieldRoles, FieldNameENJP } from '../../util/type'
export interface Datastore {
  name?: string;
  datastore_id?: string;
}

export interface DsFieldSettings {
  value?: string;
  workspace_id?: string;
  project_id?: string;
  datastore_id?: string;
  field_id?: string;
  name?: FieldNameENJP;
  display_id?: string;
  dataType?: string;
  search?: boolean;
  show_list?: boolean;
  as_title?: boolean;
  status?: boolean;
  full_text?: boolean;
  unique?: boolean;
  hideOnInput?: boolean;
  hide_from_api?: boolean;
  has_index?: boolean;
  roles?: FieldRoles[];
}


export interface DsAction {
  workspace_id?: string;
  project_id?: string;
  datastore_id?: string;
  action_id?: string;
  is_status_action?: boolean;
  display_id?: string;
  operation?: string;
  set_status?: string;
  name?: string;
}

/** Data response from request graphql */
export interface DtDsFieldSettings {
  datastoreGetFieldSettings: DsFieldSettings;
}
export interface DtDsActions {
  datastoreGetActions: DsAction
}

/**export response */
export interface DsFieldSettingsRes {
  dsFieldSettings?: DsFieldSettings;
  error?: string;
}
export interface DsActionRes {
  dsActions?: DsAction;
  error?: string;
}

import { FieldRoles, FieldNameENJP } from '../../util/type';

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
export interface DsStatus {
  display_id: string;
  name: FieldNameENJP;
  displayed_name: string;
  status_id: string;
  sort_id: number;
  x: string;
  y: string;
}

export interface DsActionSetting {
  workspace_id: string;
  project_id: string;
  datastore_id: string;
  action_id: string;
  is_status_action: boolean;
  display_id: string;
  operation: string;
  set_status: string;
  name: FieldNameENJP;
  roles: FieldRoles[];
}


/** Data response from request graphql */
export interface DtDsFieldSettings {
  datastoreGetFieldSettings: DsFieldSettings;
}

export interface DtDsActions {
  datastoreGetActions: [DsAction];
}

export interface DtDsActionSetting {
  datastoreGetActionSetting: DsActionSetting;
}

export interface DtDsStatus {
  datastoreGetStatuses: [DsStatus];
}

/** export response */
export interface DsFieldSettingsRes {
  dsField?: DsFieldSettings;
  error?: string;
}

export interface DsActionRes {
  dsActions?: [DsAction];
  error?: string;
}

export interface DsStatusRes {
  dsStatuses?: [DsStatus];
  error?: string;
}

export interface DsActionSettingRes {
  dsAction?: DsActionSetting;
  error?: string;
}


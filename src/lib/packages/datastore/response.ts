import { FieldRoles, FieldNameENJP, ResponseOkModel } from '../../util/type';
import Item from '../item';

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

export interface DatastoreId {
  datastoreId?: string;
}

export interface DatastoreGetFields {
  fields: any;
  field_layout: any;
}

export interface DtValidateBeforeUpdateDs {
  exits?: boolean;
  error?: string;
}

export interface Datastores {
  d_id: string;
  p_id: string;
  w_id: string;
  ws_name: string;
  name: string;
  uploading: boolean;
  imported: boolean;
  no_status: boolean;
  show_in_menu: boolean;
  deleted: boolean;
  display_order: number;
  display_id: string;
  show_only_dev_mode: boolean;
  use_qr_download: boolean;
  use_csv_update: boolean;
  use_external_sync: boolean;
  use_replace_upload: boolean;
  unread: number;
  invisible: boolean;
  use_grid_view: boolean;
  use_grid_view_by_default: boolean;
  use_board_view: boolean;
  is_external_service: boolean;
  data_source: string;
  external_service_data: any;
  show_display_id_to_list: boolean;
  show_info_to_list: boolean;
}

export interface RoleNodeSetting {
  id: string;
  display_id: string;
  name: string;
}

export interface Option {
  _key: string;
  o_id: string;
  fieldID: string;
}

export interface FieldDatastoreSettings {
  id: string;
  display_name: string;
  display_id: string;
  names: any;
  data_type: string;
  search: boolean;
  show_list: boolean;
  as_title: boolean;
  status: boolean;
  field_index: number;
  title_order: number;
  full_text: boolean;
  unique: boolean;
  min_value: string;
  max_value: string;
  options: Option[];
}

export interface LayoutColSettings {
  id: string;
  display_id: string;
  col: number;
  row: number;
  size_x: number;
  size_y: number;
}

export interface StatusSetting {
  id: string;
  display_id: string;
  names: any;
}

export interface DatastoreSetting {
  id: string;
  names: any;
  roles: RoleNodeSetting;
  display_id: string;
  fields: FieldDatastoreSettings[];
  field_layout: LayoutColSettings[];
  statuses: StatusSetting[];
}

export interface ErrorField {
  description: string;
  error: string;
  error_code: string;
  error_level: string;
  reference_id: string;
}

export interface DatastoreFieldsAutoNum {
  errors: ErrorField[];
  has_error: boolean;
  result: any;
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

export interface DtCreateDatastoreFromSeed {
  createDatastoreFromTemplate?: DatastoreId;
}

export interface CreateDatastoreFromSeedRes {
  datastoreId?: string;
  error?: string;
}

export interface DtValidateBeforeUpdateDsRes {
  validateDatastoreDisplayID?: DtValidateBeforeUpdateDs;
}

export interface DtUpdateDatastore {
  updateDatastoreSetting: ResponseOkModel;
}

export interface DtDeleteDatastore {
  deleteDatastore: ResponseOkModel;
}

export interface DtDatastoreGetFieldsRes {
  datastoreGetFields?: DatastoreGetFields;
}

export interface DtDatastoreRes {
  datastores: Datastores[];
}

export interface DtDatastoreSettingRes {
  datastoreSetting: DatastoreSetting;
}

export interface DtDatastoreFieldsAutoNum {
  datastoreGetFieldAutoNumber: DatastoreFieldsAutoNum;
}

/** export response */
export interface DatastoreGetFieldsRes {
  dsFields?: DatastoreGetFields;
  error?: string;
}

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

export interface ExistsDSDisplayIDExcludeOwnRes {
  exits?: boolean;
  error?: string;
}

export interface DatastoreRes {
  datastores?: Datastores[];
  error?: string;
}

export interface DatastoreSettingRes {
  datastoreSetting?: DatastoreSetting;
  error?: string;
}

export interface DatastoreFieldsAutoNumRes {
  dsGetFieldAutoNum?: DatastoreFieldsAutoNum;
  error?: string;
}

export interface GlobalSearchResponse {
  item_list: {
    items: {[key: string]: any}[];
    totalItems: number;
  };
  search_result: {
    category: string;
    d_id: string;
    datastore_name: string;
    f_id: string;
    field_name: FieldNameENJP;
    file_name: string;
    highlight_value: {
      value: string[];
    };
    i_id: string;
    p_id: string;
    project_name: string;
    title: string;
    w_id: string;
  }[];
}

export interface GetDatastoresResponse {
  datastore_id: string;
  name: string;
  display_id: string;
  deleted: boolean;
  imported: boolean;
  uploading: boolean;
}

export interface GlobalSearchHighlightResponse {
  category: string;
  fieldName?: FieldNameENJP;
  fileName?: string;
  highlightValue: {
    [key: string]: string[];
  };
  item: Item;
}
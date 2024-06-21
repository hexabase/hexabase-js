import { FieldNameENJP } from '../../util/type';
import { GetItemsParameters, GlobalSearchCategory } from '../item/input';

export interface CreateDatastoreFromSeedInput {
  lang_cd: string;
  project_id: string;
  template_name: string;
  workspace_id: string;
  user_id?: string;
}
export interface CreateDatastoreFromSeedReq {
  payload: CreateDatastoreFromSeedInput;
}

export interface DatastoreUpdateNameInput {
  datastore_id: string;
  display_id: string;
  extend_limit_textarea_length?: number;
  ignore_save_template?: boolean;
  is_extend_limit_textarea?: boolean;
  name: FieldNameENJP;
  show_display_id_to_list?: boolean;
  show_in_menu?: boolean;
  show_info_to_list?: boolean;
  show_only_dev_mode?: boolean;
  use_board_view?: boolean;
  use_csv_update?: boolean;
  use_external_sync?: boolean;
  use_grid_view?: boolean;
  use_grid_view_by_default?: boolean;
  use_qr_download?: boolean;
  use_replace_upload?: boolean;
  use_status_update?: boolean;
}

export interface DatastoreUpdateSetting {
  payload: DatastoreUpdateNameInput;
}

export interface ExistsDSDisplayIDExcludeOwnInput {
  datastoreId: string;
  displayId: string;
  projectId: string;
}

export interface IsExistsDSDisplayIDExcludeOwnReq {
  payload: ExistsDSDisplayIDExcludeOwnInput;
}

export class GetFieldAutoNumberQuery {
  branch_key?: string;
  zero_padding?: boolean;
  digit?: number;
}

export interface GlobalSearchProps {
  query?: string;
  category?: GlobalSearchCategory;
  app_id?: string;
  datastore_id?: string;
  field_id?: string;
  return_item_list?: boolean;
  item_search_params?: GetItemsParameters;
}

import { FieldNameENJP } from '../../util/type';
import { HxbAbstract } from '../../../HxbAbstract';
import {
  DS_ACTIONS,
  DS_STATUS,
  UPDATE_DATASTORE_SETTING,
  CREATE_DATASTORE_FROM_TEMPLATE,
  DELETE_DATASTORE,
  VALIDATE_DS_DISPLAY_ID,
  GET_DATASTORES,
  GET_DATASTORE_DETAIL,
  DATASTORE_GET_FIELD_AUTO_NUMBER,
} from '../../graphql/datastore';
import {
  CreateDatastoreFromSeedInput,
  DatastoreUpdateNameInput,
  DsAction,
  DsStatus,
  DtCreateDatastoreFromSeed,
  DtDatastoreFieldsAutoNum,
  DtDatastoreRes,
  DtDatastoreSettingRes,
  DtDeleteDatastore,
  DtDsActions,
  DtDsStatus,
  DtUpdateDatastore,
  DtValidateBeforeUpdateDsRes,
  ExistsDSDisplayIDExcludeOwnInput,
  GetDatastoresResponse,
  GetFieldAutoNumberQuery,
  GlobalSearchHighlightResponse,
  GlobalSearchProps,
  GlobalSearchResponse,
} from './type';
import Project from '../project';
import Language from '../language';
import Field from '../field';
import Action from '../action';
import Status from '../status';
import Item from '../item';
import { GetItemsParameters, GetItemsPl } from '../item/type';

type allArgs = {
  project: Project;
};

const DEFAULT_TEXTAREA_LENGTH = 2000;

export default class Datastore extends HxbAbstract {
  public id: string;
  public name: FieldNameENJP | string;
  public project: Project;
  public language?: Language;
  public templateName: string = 'SEED1';
  public _fields: Field[] = [];
  // public fields = Field;
  // Update
  displayId: string;
  extendLimitEextareaLength = DEFAULT_TEXTAREA_LENGTH;
  ignoreSaveTemplate = false;
  showDisplayIdToList = false;
  showInMenu = true;
  showInfoToList = false;
  showOnlyDevMode = false;
  useBoardView = false;
  useCsvUpdate = false;
  useExternalSync = false;
  useGridView = false;
  useGridViewByDefault = false;
  useWrDownload = false;
  useReplaceUpload = false;
  useStatusUpdate = false;
  useStatusUpdateByDefault = false;
  displayOrder = 0;
  externalServiceUrl = '';
  dataSource: string = '';
  deleted: boolean;
  externalServiceData: string;
  imported: boolean;
  invisible: boolean;
  isExternalService: boolean;
  noStatus: boolean;
  unread: boolean;
  uploading: boolean;
  useQrDownload: boolean;

  // Cache
  private _actions: Action[] = [];

  constructor(params?: {[key: string]: any}) {
    super(params);
    if (this.project) {
      this.language = this.project.workspace.languages?.find(language => language.default);
    }
  }

  /**
   * function get: get all datastore in project
   * @params projectId is requirement
   * @returns DatastoreRes
   */
  static async all(project: Project): Promise<Datastore[]> {
    const res = await Datastore.rest('GET', `/api/v0/applications/${project.id}/datastores`) as GetDatastoresResponse[];
    const datastores = res
      .map(params => Datastore.fromJson({...{ project }, ...params}) as Datastore);
    await Promise.all(datastores.map(d => d.fields()));
    return datastores;
  }

  async createItemId(): Promise<string> {
    return Item.createItemId(this);
  }

  set(key: string, value: any): Datastore {
    switch (key) {
      case 'id':
      case 'd_id':
      case 'datastore_id':
        if (value && value.trim() !== '') this.id = value;
        break;
      case 'project':
        this.project = value;
        break;
      case 'name':
        this.name = value;
        break;
      case 'display_id':
      case 'displayId':
        this.displayId = value;
        break;
      case 'dipaly_order':
      case 'displayOrder':
        this.displayOrder = value;
        break;
      case 'data_source':
      case 'dataSource':
        this.dataSource = value;
        break;
      case 'deleted':
        this.deleted = value;
        break;
      case 'external_service_data':
      case 'externalServiceData':
        this.externalServiceData = value;
        break;
      case 'imported':
        this.imported = value;
        break;
      case 'invisible':
        this.invisible = value;
        break;
      case 'is_external_service':
      case 'isExternalService':
        this.isExternalService = value;
        break;
      case 'no_status':
      case 'noStatus':
        this.noStatus = value;
        break;
      case 'show_display_id_to_list':
      case 'showDisplayIdToList':
        this.showDisplayIdToList = value;
        break;
      case 'show_in_menu':
      case 'showInMenu':
        this.showInMenu = value;
        break;
      case 'show_info_to_list':
      case 'showInfoToList':
        this.showInfoToList = value;
        break;
      case 'show_only_dev_mode':
      case 'showOnlyDevMode':
        this.showOnlyDevMode = value;
        break;
      case 'unread':
        this.unread = value;
        break;
      case 'uploading':
        this.uploading = value;
        break;
      case 'use_board_view':
      case 'useBoardView':
        this.useBoardView = value;
        break;
      case 'use_csv_update':
      case 'useCsvUpdate':
        this.useCsvUpdate = value;
        break;
      case 'use_external_sync':
      case 'useExternalSync':
        this.useExternalSync = value;
        break;
      case 'use_grid_view':
      case 'useGridView':
        this.useGridView = value;
        break;
      case 'use_grid_view_by_default':
      case 'useGridViewByDefault':
        this.useGridViewByDefault = value;
        break;
      case 'use_qr_download':
      case 'useQrDownload':
        this.useQrDownload = value;
        break;
      case 'use_replace_upload':
      case 'useReplaceUpload':
        this.useReplaceUpload = value;
        break;
    }
    return this;
  }

  /**
   * function getDetail: get detail datastore in project
   * @params datastoreId is requirement
   * @returns DatastoreSettingRes
   */
  async fetch(): Promise<boolean> {
    const promises: Promise<any>[] = [];
    // handle call graphql
    promises.push(this.request(GET_DATASTORE_DETAIL, { datastoreId: this.id }));
    promises.push(this.fields());
    const ary = await Promise.all(promises);
    const res = ary[0] as DtDatastoreSettingRes;
    this.sets(res.datastoreSetting);
    return true;
  }

  async save(): Promise<boolean> {
    if (this.id) {
      return this.update();
    } else {
      return this.create();
    }
  }

  /**
   * function create: create datastore in project
   * @params {CreateDatastoreFromSeedReq} payload is requirement
   * @returns CreateDatastoreFromSeedRes
   */
  async create(): Promise<boolean> {
    const user = await Datastore.client.currentUser!;
    const payload: CreateDatastoreFromSeedInput = {
      lang_cd: this.language?.langCd || 'en',
      project_id: this.project.id,
      template_name: this.templateName,
      workspace_id: this.project.workspace.id,
      user_id: user.id,
    };
    // handle call graphql
    const res: DtCreateDatastoreFromSeed = await this.request(CREATE_DATASTORE_FROM_TEMPLATE, { payload });
    this.id = res?.createDatastoreFromTemplate?.datastoreId!;
    // await this.update(); // Update datastore name
    return true;
  }

  /**
   * function validateDatastoreDisplayID: validate before update datastore in project
   * @params {IsExistsDSDisplayIDExcludeOwnReq} payload is requirement
   * @returns ExistsDSDisplayIDExcludeOwnRes
   */
  async validateDisplayId(displayId: string): Promise<boolean> {
    const payload: ExistsDSDisplayIDExcludeOwnInput = {
      displayId,
      datastoreId: this.id,
      projectId: this.project.id,
    };
    // handle call graphql
    const res: DtValidateBeforeUpdateDsRes = await this.request(VALIDATE_DS_DISPLAY_ID, { payload });
    return res!.validateDatastoreDisplayID!.exits!;
  }

  /**
   * function updateDatastoreSetting: update datastore in project
   * @params {DatastoreUpdateSetting} payload, {DatastoreUpdateSetting} validate is requirement
   * @returns ModelRes
   */
  async update(): Promise<boolean> {
    const payload: DatastoreUpdateNameInput = {
      datastore_id: this.id,
      display_id: this.displayId || this.id,
      extend_limit_textarea_length: this.extendLimitEextareaLength,
      ignore_save_template: this.ignoreSaveTemplate,
      is_extend_limit_textarea: this.extendLimitEextareaLength !== DEFAULT_TEXTAREA_LENGTH,
      name: this.name as FieldNameENJP,
      show_display_id_to_list: this.showDisplayIdToList,
      show_in_menu: this.showInMenu,
      show_info_to_list: this.showInfoToList,
      show_only_dev_mode: this.showOnlyDevMode,
      use_board_view: this.useBoardView,
      use_csv_update: this.useCsvUpdate,
      use_external_sync: this.useExternalSync,
      use_grid_view: this.useGridView,
      use_grid_view_by_default: this.useGridViewByDefault,
      use_qr_download: this.useWrDownload,
      use_replace_upload: this.useReplaceUpload,
      use_status_update: this.useStatusUpdate,
    };
    // handle call graphql
    const resUpdate: DtUpdateDatastore = await this.request(UPDATE_DATASTORE_SETTING, { payload });
    return resUpdate.updateDatastoreSetting.success;
  }

  /**
   * function fields: get all field in Ds
   * @params projectId and datastoreId are requirement
   * @returns DatastoreGetFieldsRes
   */
  async fields(refresh?: boolean): Promise<Field[]> {
    if (refresh) this._fields = [];
    if (this._fields.length > 0) return this._fields;
    try {
      this._fields = await Field.all(this);
    } catch (e) {
      this._fields = [];
    }
    return this._fields;
  }


  /**
   * function field: get field setting in Ds
   * @params fieldId and datastoreId are requirement
   * @returns DsFieldSettingsRes
   */
  async field(id?: string): Promise<Field | undefined> {
    if (!id) {
      return Field.fromJson({ datastore: this }) as Field;
    }
    if (this._fields.length === 0) {
      await this.fields();
    }
    return this._fields.find(f => f.id === id || f.displayId === id);
  }

  fieldSync(id: string): Field {
    const field = this._fields.find(f => f.id === id || f.displayId === id);
    if (field) return field;
    throw new Error(`Field ${id} not found in datastore ${this.id}. This datastore has ${this._fields.length} fields.`);
  }

  /**
   * function getActions: get actions in Ds
   * @params datastoreId are requirement
   * @returns DsActionRes
   */

  async actions(): Promise<Action[]> {
    if (this._actions.length > 0) return this._actions;
    // handle call graphql
    const res: DtDsActions = await this.request(DS_ACTIONS, { datastoreId: this.id });
    this._actions = res.datastoreGetActions
      .map((action: DsAction) => Action.fromJson({...{ datastore: this }, ...action}) as Action);
    return this._actions;
  }


  /**
   * function getStatuses: get statuses in Ds
   * @params datastoreId are requirement
   * @returns DsStatusRes
   */
  async statuses(): Promise<Status[]> {
    // handle call graphql
    const res: DtDsStatus = await this.request(DS_STATUS, { datastoreId: this.id });
    return res.datastoreGetStatuses
      .map((status: DsStatus) => Status.fromJson({...{ datastore: this }, ...status}) as Status);
  }

  /**
   * function getAction: get field action setting in Ds
   * @params datastoreId and actionIdare requirement
   * @returns DsActionSettingRes
   */
  async action(operation: string): Promise<Action | undefined> {
    // handle call graphql
    const actions = await this.actions();
    return actions.find(a => a.operation === operation);
  }

  /**
   * function getAutoNumber: get datastore Field Auto Number in Ds
   * @params projectId, datastoreId and fieldId requirement
   * @returns DatastoreFieldsAutoNumRes
   */
  async autoNumber(
    fieldId: string,
    params?: GetFieldAutoNumberQuery,
  ): Promise<number> {
    const payload = {
      datastoreId: this.id,
      fieldId,
      projectId: this.project.id,
      getFieldAutoNumberQuery: params,
    };
    // handle call graphql
    const res: DtDatastoreFieldsAutoNum = await this.request(DATASTORE_GET_FIELD_AUTO_NUMBER, payload);
    return res.datastoreGetFieldAutoNumber.result.number as number;
  }

  /**
   * function deleteDatastore: delete datastore in project
   * @params {string} datastoreId is requirement
   * @returns ModelRes
   */
  async delete(): Promise<boolean> {
    // handle call graphql
    const resUpdate: DtDeleteDatastore = await this.request(DELETE_DATASTORE, { datastoreId: this.id });
    return resUpdate?.deleteDatastore.success;
  }

  async items(params?: GetItemsPl, options: {
    deep?: boolean;
  } = {}): Promise<Item[]> {
    const { items } = await this.itemsWithCount(params, options);
    return items;
  }

  async search(): Promise<Item[]> {
    const payload: GetItemsParameters = {
      datastore_id: this.id,
      project_id: this.project.id,
      page: 1,
      per_page: 100,
    };
    return Item.search(payload, this);
  }

  async globalSearch(query: string,
    payload: GlobalSearchProps = {},
  ): Promise<{items: Item[]; totalCount: number; hightlights?: GlobalSearchHighlightResponse[]}> {
    if (!query) throw new Error('Query is required');
    payload.return_item_list = true;
    payload.query = query;
    payload.datastore_id = this.id;
    payload.app_id = this.project.id;
    const res = await this.rest('POST', '/api/v0/globalsearch', {}, payload as any) as GlobalSearchResponse;
    await this.fields();
    console.log(res.search_result);
    const items = res.item_list.items
      .map((params: any) => Item.fromJson({ ...{ datastore: this }, ...params }) as Item);
    const hightlights = res.search_result?.map(params => {
      const item = items.find(i => i.id === params.i_id);
      return {
        item,
        category: params.category,
        fieldName: params.field_name,
        fileName: params.file_name,
        highlightValue: params.highlight_value,
      } as GlobalSearchHighlightResponse;
    });
    await Promise.all(items.map(item => item.fetch()));
    return {
      totalCount: res.item_list.totalItems,
      items,
      hightlights,
    };
  }

  async searchWithCount(options: GetItemsParameters): Promise<{ items: Item[]; totalCount: number }> {
    const payload: GetItemsParameters = {
      datastore_id: this.id,
      project_id: this.project.id,
      page: options.page,
      per_page: options.per_page,
      return_count_only: true,
      conditions: options.conditions,
      use_or_condition: options.use_or_condition || false,
      unread_only: options.unread_only || false,
      sort_fields: options.sort_fields,
      sort_field_id: options.sort_field_id,
      sort_order: options.sort_order,
      use_field_id: options.use_field_id || false,
      use_display_id: true,
      include_links: options.include_links || true,
      include_lookups: options.include_lookups || true,
      return_number_value: options.return_number_value || true,
      format: 'map',
      include_fields_data: options.include_fields_data || true,
      omit_fields_data: options.omit_fields_data || false,
      omit_total_items: options.omit_total_items || false,
      data_result_timeout_sec: options.data_result_timeout_sec || 30,
      total_count_timeout_sec: options.total_count_timeout_sec || 30,
      debug_query: false,
      select_fields: options.select_fields,
      select_fields_lookup: options.select_fields_lookup,
    };
    return Item.searchWithCount(payload, this);
  }

  itemsWithCount(params: GetItemsPl = {page: 1, per_page: 10}, options: {
    deep?: boolean;
  } = {}): Promise<{items: Item[]; totalCount: number}> {
    if (typeof params.page === 'undefined') params.page = 1;
    if (typeof params.per_page === 'undefined') params.per_page = 10;
    if (typeof params.use_display_id === 'undefined') params.use_display_id = true;
    if (typeof params.format === 'undefined') params.format = 'map';
    if (typeof params.include_links === 'undefined') params.include_links = true;
    if (typeof params.include_lookups === 'undefined') params.include_lookups = true;
    return Item.all(params, this, options);
  }

  async item(id?: string): Promise<Item> {
    const item = Item.fromJson({ datastore: this, i_id: id }) as Item;
    if (id) await item.fetch();
    return item;
  }
}

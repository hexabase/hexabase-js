import { FieldNameENJP, ModelRes } from '../../util/type';
import { HxbAbstract } from '../../../HxbAbstract';
import {
  DS_ACTIONS,
  DS_FIELD_SETTING,
  DS_ACTION_SETTING,
  DS_STATUS,
  UPDATE_DATASTORE_SETTING,
  CREATE_DATASTORE_FROM_TEMPLATE,
  DELETE_DATASTORE,
  VALIDATE_DS_DISPLAY_ID,
  DS_FIELDS,
  GET_DATASTORES,
  GET_DATASTORE_DETAIL,
  DATASTORE_GET_FIELD_AUTO_NUMBER,
} from '../../graphql/datastore';
import {
  CreateDatastoreFromSeedInput,
  CreateDatastoreFromSeedReq,
  CreateDatastoreFromSeedRes,
  DatastoreFieldsAutoNumRes,
  DatastoreGetFieldsRes,
  DatastoreRes,
  DatastoreSettingRes,
  DatastoreUpdateNameInput,
  DatastoreUpdateSetting,
  DsAction,
  DsActionRes,
  DsActionSettingRes,
  DsFieldSettingsRes,
  DsStatus,
  DsStatusRes,
  DtCreateDatastoreFromSeed,
  DtDatastoreFieldsAutoNum,
  DtDatastoreGetFieldsRes,
  DtDatastoreRes,
  DtDatastoreSettingRes,
  DtDeleteDatastore,
  DtDsActions,
  DtDsActionSetting,
  DtDsFieldSettings,
  DtDsStatus,
  DtUpdateDatastore,
  DtValidateBeforeUpdateDsRes,
  ExistsDSDisplayIDExcludeOwnInput,
  ExistsDSDisplayIDExcludeOwnRes,
  GetFieldAutoNumberQuery,
  IsExistsDSDisplayIDExcludeOwnReq,
} from '../../types/datastore';
import Project from '../project';
import Language from '../language';
import Field from '../field';
import Action from '../action';
import Status from '../status';
import Item from '../item';
import { GetItemsParameters, GetItemsPl } from '../../types/item';

type allArgs = {
  project: Project;
}

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
  displayId: string
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
  static async all({ project }: allArgs): Promise<Datastore[]> {
    const res: DtDatastoreRes = await Datastore.request(GET_DATASTORES, {
      projectId: project.id,
    });
    return res.datastores.map(params => Datastore.fromJson({...{ project }, ...params}) as Datastore);
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
        this.displayId = value;
        break;
      case 'dipaly_order':
        this.displayOrder = value;
        break;
      case 'data_source':
        this.dataSource = value;
        break;
      case 'deleted':
        this.deleted = value;
        break;
      case 'external_service_data':
        this.externalServiceData = value;
        break;
      case 'imported':
        this.imported = value;
        break;
      case 'invisible':
        this.invisible = value;
        break;
      case 'is_external_service':
        this.isExternalService = value;
        break;
      case 'no_status':
        this.noStatus = value;
        break;
      case 'show_display_id_to_list':
        this.showDisplayIdToList = value;
        break;
      case 'show_in_menu':
        this.showInMenu = value;
        break;
      case 'show_info_to_list':
        this.showInfoToList = value;
        break;
      case 'show_only_dev_mode':
        this.showOnlyDevMode = value;
        break;
      case 'unread':
        this.unread = value;
        break;
      case 'uploading':
        this.uploading = value;
        break;
      case 'use_board_view':
        this.useBoardView = value;
        break;
      case 'use_csv_update':
        this.useCsvUpdate = value;
        break;
      case 'use_external_sync':
        this.useExternalSync = value;
        break;
      case 'use_grid_view':
        this.useGridView = value;
        break;
      case 'use_grid_view_by_default':
        this.useGridViewByDefault = value;
        break;
      case 'use_qr_download':
        this.useQrDownload = value;
        break;
      case 'use_replace_upload':
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
    }
    // handle call graphql
    const res: DtCreateDatastoreFromSeed = await this.request(CREATE_DATASTORE_FROM_TEMPLATE, { payload });
    this.id = res?.createDatastoreFromTemplate?.datastoreId!;
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
      display_id: this.displayId,
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
  async fields(): Promise<Field[]> {
    if (this._fields.length > 0) return this._fields;
    this._fields = await Field.all(this);
    return this._fields;
  }


  /**
   * function field: get field setting in Ds
   * @params fieldId and datastoreId are requirement
   * @returns DsFieldSettingsRes
   */
  async field(id: string): Promise<Field> {
    const field = this._fields.find(f => f.id === id || f.displayId === id);
    if (field) return field;
    const f = await Field.get(this, id);
    if (!this._fields.find(f => f.id === id || f.displayId === id)) {
      this._fields.push(f);
    }
    return f;
  }

  fieldSync(id: string): Field {
    const field = this._fields.find(f => f.id === id || f.displayId === id);
    if (field) return field;
    throw new Error(`Field ${id} not found`);
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

  async items(params?: GetItemsPl): Promise<Item[]> {
    const { items } = await this.itemsWithCount(params);
    return items;
  }

  async search(): Promise<Item[]> {
    const payload: GetItemsParameters = {
      datastore_id: this.id,
      project_id: this.project.id,
      page: 1,
      per_page: 100,
    };
    return Item.search(payload);
  }

  itemsWithCount(params: GetItemsPl = {page: 1, per_page: 10}): Promise<{items: Item[], totalCount: number}> {
    if (!params.page) params.page = 1;
    if (!params.per_page) params.per_page = 10;
    return Item.all(params, this);
  }

  async item(id?: string): Promise<Item> {
    const item = new Item({ datastore: this, id });
    if (id) await item.fetch();
    return item;
  }
}

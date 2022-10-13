import { ModelRes } from '../../util/type';
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
} from '../../graphql/datastore';
import {
  CreateDatastoreFromSeedReq,
  CreateDatastoreFromSeedRes,
  DatastoreGetFieldsRes,
  DatastoreRes,
  DatastoreSettingRes,
  DatastoreUpdateSetting,
  DsActionRes,
  DsActionSettingRes,
  DsFieldSettingsRes,
  DsStatusRes,
  DtCreateDatastoreFromSeed,
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
  ExistsDSDisplayIDExcludeOwnRes,
  IsExistsDSDisplayIDExcludeOwnReq,
} from '../../types/datastore';

export default class Datastore extends HxbAbstract {
  /**
   * function get: get all datastore in project
   * @params projectId is requirement
   * @returns DatastoreRes
   */
  async get(projectId: string): Promise<DatastoreRes> {
    const data: DatastoreRes = {
      datastores: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtDatastoreRes = await this.client.request(GET_DATASTORES, { projectId });

      data.datastores = res.datastores;
    } catch (error: any) {
      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function getDetail: get detail datastore in project
   * @params datastoreId is requirement
   * @returns DatastoreSettingRes
   */
  async getDetail(datastoreId: string): Promise<DatastoreSettingRes> {
    const data: DatastoreSettingRes = {
      datastoreSetting: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtDatastoreSettingRes = await this.client.request(GET_DATASTORE_DETAIL, { datastoreId });

      data.datastoreSetting = res.datastoreSetting;
    } catch (error: any) {
      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function create: create datastore in project
   * @params {CreateDatastoreFromSeedReq} payload is requirement
   * @returns CreateDatastoreFromSeedRes
   */
  async create(payload: CreateDatastoreFromSeedReq): Promise<CreateDatastoreFromSeedRes> {
    const data: CreateDatastoreFromSeedRes = {
      datastoreId: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtCreateDatastoreFromSeed = await this.client.request(CREATE_DATASTORE_FROM_TEMPLATE, payload);

      data.datastoreId = res?.createDatastoreFromTemplate?.datastoreId;
    } catch (error: any) {
      throw new Error(JSON.stringify(error.response.errors));
    }

    return data;
  }

  /**
   * function validateDatastoreDisplayID: validate before update datastore in project
   * @params {IsExistsDSDisplayIDExcludeOwnReq} payload is requirement
   * @returns ExistsDSDisplayIDExcludeOwnRes
   */
  async validateDatastoreDisplayID(payload: IsExistsDSDisplayIDExcludeOwnReq): Promise<ExistsDSDisplayIDExcludeOwnRes> {
    const data: ExistsDSDisplayIDExcludeOwnRes = {
      exits: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const resUpdate: DtValidateBeforeUpdateDsRes = await this.client.request(VALIDATE_DS_DISPLAY_ID, payload);
      data.exits = resUpdate?.validateDatastoreDisplayID?.exits;
    } catch (error: any) {
      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function updateDatastoreSetting: update datastore in project
   * @params {DatastoreUpdateSetting} payload, {DatastoreUpdateSetting} validate is requirement
   * @returns ModelRes
   */
  async updateDatastoreSetting(payload: DatastoreUpdateSetting): Promise<ModelRes> {
    const data: ModelRes = {
      data: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const resUpdate: DtUpdateDatastore = await this.client.request(UPDATE_DATASTORE_SETTING, payload);
      data.data = resUpdate?.updateDatastoreSetting;
    } catch (error: any) {
      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function getFields: get all field in Ds
   * @params projectId and datastoreId are requirement
   * @returns DatastoreGetFieldsRes
   */
  async getFields(datastoreId: string, projectId: string): Promise<DatastoreGetFieldsRes> {
    const data: DatastoreGetFieldsRes = {
      dsFields: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtDatastoreGetFieldsRes = await this.client.request(DS_FIELDS, { datastoreId, projectId });

      data.dsFields = res.datastoreGetFields;
    } catch (error: any) {

      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function getField: get field setting in Ds
   * @params fieldId and datastoreId are requirement
   * @returns DsFieldSettingsRes
   */
  async getField(fieldId: string, datastoreId: string): Promise<DsFieldSettingsRes> {
    const data: DsFieldSettingsRes = {
      dsField: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtDsFieldSettings = await this.client.request(DS_FIELD_SETTING, { fieldId, datastoreId });

      data.dsField = res.datastoreGetFieldSettings;
    } catch (error: any) {

      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function getActions: get actions in Ds
   * @params datastoreId are requirement
   * @returns DsActionRes
   */
  async getActions(datastoreId: string): Promise<DsActionRes> {
    const data: DsActionRes = {
      dsActions: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtDsActions = await this.client.request(DS_ACTIONS, { datastoreId });

      data.dsActions = res.datastoreGetActions;
    } catch (error: any) {

      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function getStatuses: get statuses in Ds
   * @params datastoreId are requirement
   * @returns DsStatusRes
   */
  async getStatuses(datastoreId: string): Promise<DsStatusRes> {
    const data: DsStatusRes = {
      dsStatuses: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtDsStatus = await this.client.request(DS_STATUS, { datastoreId });

      data.dsStatuses = res.datastoreGetStatuses;
    } catch (error: any) {

      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function getAction: get field action setting in Ds
   * @params datastoreId and actionIdare requirement
   * @returns DsActionSettingRes
   */
  async getAction(datastoreId: string, actionId: string): Promise<DsActionSettingRes> {
    const data: DsActionSettingRes = {
      dsAction: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtDsActionSetting = await this.client.request(DS_ACTION_SETTING, { actionId, datastoreId });

      data.dsAction = res.datastoreGetActionSetting;
    } catch (error: any) {

      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function deleteDatastore: delete datastore in project
   * @params {string} datastoreId is requirement
   * @returns ModelRes
   */
  async deleteDatastore(datastoreId: string): Promise<ModelRes> {
    const data: ModelRes = {
      data: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const resUpdate: DtDeleteDatastore = await this.client.request(DELETE_DATASTORE, { datastoreId });
      data.data = resUpdate?.deleteDatastore;
    } catch (error: any) {
      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

}

import { HxbAbstract } from '../../../HxbAbstract';
import {
  DS_ACTIONS,
  DS_FIELD_SETTING,
  DS_ACTION_SETTING,
  DS_STATUS,
  UPDATE_ITEM
} from '../../graphql/datastore';
import {
  DsActionRes,
  DsActionSettingRes,
  DsFieldSettingsRes,
  DsStatusRes,
  DtDsActions,
  DtDsActionSetting,
  DtDsFieldSettings,
  DtDsStatus,
  DtUpdatedItem,
  ItemUpdatePayload,
  UpdatedItemRes
} from '../../types/datastore';

export default class Datastore extends HxbAbstract {

  /**
   * function dsFieldSettingsAsync: get field setting in Ds
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
   * function update: get field action setting in Ds
   * @params datastoreId and actionIdare requirement
   * @returns UpdatedItemRes
   */
  async update(projectId: string, datastoreId: string, itemId: string, itemUpdatePayload: ItemUpdatePayload,): Promise<UpdatedItemRes> {
    const data: UpdatedItemRes = {
      item: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtUpdatedItem = await this.client.request(UPDATE_ITEM, { projectId, datastoreId, itemId, itemUpdatePayload });

      data.item = res.datastoreUpdateItem;
    } catch (error: any) {

      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }
}

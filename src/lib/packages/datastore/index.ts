import { HxbAbstract } from '../../../HxbAbstract';
import {
  DS_ACTIONS,
  DS_FIELD_SETTING,
  DS_ACTION_SETTING,
  DS_STATUS
} from '../../graphql/datastore';
import {
  DsActionRes,
  DsActionSettingRes,
  DsFieldSettingsRes,
  DsStatusRes,
  DtDsActions,
  DtDsActionSetting,
  DtDsFieldSettings,
  DtDsStatus
} from '../../types/datastore';

export default class Datastore extends HxbAbstract {

  /**
   * function dsFieldSettingsAsync: get field setting in Ds
   * @params fieldId and datastoreId are requirement
   * @returns DsFieldSettingsRes
   */
  async getFieldSettingsAsync(fieldId: string, datastoreId: string): Promise<DsFieldSettingsRes> {
    let data: DsFieldSettingsRes = {
      dsFieldSettings: undefined,
      error: undefined,
    }

    // handle call graphql
    try {
      const res: DtDsFieldSettings = await this.client.request(DS_FIELD_SETTING, { fieldId, datastoreId });

      data.dsFieldSettings = res.datastoreGetFieldSettings
    } catch (error: any) {

      data.error = JSON.stringify(error.response.errors)
    }

    return data;
  }

  /**
   * function dsActionsAsync: get actions in Ds
   * @params datastoreId are requirement
   * @returns DsActionRes
   */
  async getActionsAsync(datastoreId: string): Promise<DsActionRes> {
    let data: DsActionRes = {
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
   * function dsStatusAsync: get statuses in Ds
   * @params datastoreId are requirement
   * @returns DsStatusRes
   */
  async getStatusesAsync(datastoreId: string): Promise<DsStatusRes> {
    let data: DsStatusRes = {
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
   * function dsActionSettingAsync: get field action setting in Ds
   * @params datastoreId and actionIdare requirement
   * @returns DsActionSettingRes
   */
  async getActionSettingAsync(datastoreId: string, actionId: string): Promise<DsActionSettingRes> {
    let data: DsActionSettingRes = {
      dsActionSettings: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtDsActionSetting = await this.client.request(DS_ACTION_SETTING, { actionId, datastoreId });

      data.dsActionSettings = res.datastoreGetActionSetting;
    } catch (error: any) {

      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }
}

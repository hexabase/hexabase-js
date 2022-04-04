import { HxbAbstract } from '../../../HxbAbstract';
import {
  DS_ACTIONS,
  DS_FIELD_SETTING
} from '../../graphql/datastore';
import {
  DsActionRes,
  DsFieldSettingsRes,
  DtDsActions,
  DtDsFieldSettings
} from '../../types/datastore';

export default class Datastore extends HxbAbstract {

  /**
   * function dsFieldSettingsAsync: get field setting in Ds
   * @params fieldId and datastoreId are requirement
   * @returns DsFieldSettingsRes
   */
  async dsFieldSettingsAsync(fieldId: string, datastoreId: string): Promise<DsFieldSettingsRes> {
    let data: DsFieldSettingsRes = {
      dsFieldSettings: undefined,
      error: undefined,
    }

    // handle call graphql
    try {
      const res: DtDsFieldSettings= await this.client.request(DS_FIELD_SETTING, { fieldId, datastoreId });

      data.dsFieldSettings = res.datastoreGetFieldSettings
    } catch(error: any) {

      data.error = JSON.stringify(error.response.error)
    }

    return data;
  }

  /**
   * function dsActions: get field setting in Ds
   * @params datastoreId are requirement
   * @returns DsActionRes
   */
  async dsActions(datastoreId: string): Promise<DsActionRes> {
    let data: DsActionRes = {
      dsActions: undefined,
      error: undefined,
    }

    // handle call graphql
    try {
      const res: DtDsActions = await this.client.request(DS_ACTIONS, { datastoreId });

      data.dsActions = res.datastoreGetActions
    } catch(error: any) {

      data.error = JSON.stringify(error.response.error)
    }

    return data;
  }

}

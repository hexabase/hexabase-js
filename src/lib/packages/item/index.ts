import { HxbAbstract } from '../../../HxbAbstract';
import {
  DS_ITEMS
} from '../../graphql/item';
import { DsItemsRes, DtDsItems, GetItemsPl } from '../../types/item';

export default class Item extends HxbAbstract {

  /**
   * function getItemsAsync: get items in datastore
   * @params getItemsParameters and datastoreId are requirement, projectId is option
   * @returns DsItemsRes
   */
  async getItemsAsync(getItemsParameters: GetItemsPl, datastoreId: string, projectId?: string): Promise<DsItemsRes> {
    let data: DsItemsRes = {
      dsItems: undefined,
      error: undefined,
    }

    // handle call graphql
    try {
      const res: DtDsItems = await this.client.request(DS_ITEMS, { getItemsParameters, datastoreId, projectId });

      data.dsItems = res.datastoreGetDatastoreItems
    } catch (error: any) {

      data.error = JSON.stringify(error.response.errors)
    }

    return data;
  }
}


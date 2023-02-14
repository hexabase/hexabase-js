import { DtItemWithSearch, GetItemsParameters } from "../types/item";

export default class HexabaseBuilder  {
  url: URL;
  constructor(
    url: URL,
    token?: string
  ) {
    // super(url ? url : "", token ? token : "");
    this.url = url;
  }


  // async then() {
  //   const parameter: any = {
  //     page: this.query?.page ? this?.query?.page : 1,
  //     per_page: this.query?.per_page ? this?.query?.per_page : 100,
  //   };

  //   this.query?.conditions?.map(v => {
  //     if (v?.hasOwnProperty('id') && v?.hasOwnProperty('search_value') && v?.hasOwnProperty('isArray') && v?.isArray === true) {
  //       parameter[v?.id] = v?.search_value;
  //     }
  //     if (v?.hasOwnProperty('id') && v?.hasOwnProperty('search_value') && !v?.hasOwnProperty('isArray') && v?.search_value?.[0] === 'true') {
  //       parameter[v?.id] = true;
  //     }
  //     if (v?.hasOwnProperty('id') && v?.hasOwnProperty('search_value') && !v?.hasOwnProperty('isArray') && v?.search_value?.[0] === 'false') {
  //       parameter[v?.id] = false;
  //     }
  //     if (v?.hasOwnProperty('id') && v?.hasOwnProperty('search_value') && !v?.hasOwnProperty('isArray') && !['true', 'false']?.includes(v?.search_value?.[0])) {
  //       parameter[v?.id] = v?.search_value?.[0];
  //     }
  //   })

  //   const payload: GetItemsParameters = {
  //     page: parameter['page'],
  //     per_page: parameter['per_page'],
  //     datastore_id: parameter['datastore_id'],
  //     project_id: parameter['project_id'],
  //     include_fields_data: parameter['include_fields_data'],
  //     omit_total_items: parameter['omit_total_items'],
  //     return_count_only: parameter['return_count_only'],
  //   }

  //   const data: ItemWithSearchRes = {
  //     item: undefined,
  //     error: undefined,
  //   };

  //   try {
  //     const res: DtItemWithSearch = await this.client.request(
  //       ITEM_WITH_SEARCH,
  //       {
  //         payload
  //       }
  //     );
  //     data.item = res.itemWithSearch;
  //   } catch (error: any) {
  //     data.error = JSON.stringify(error?.response?.errors);
  //   }

  //   return data;
  // }
}

import { DtItemWithSearch, GetItemsParameters } from '../types/item';
import HexabaseClient from '../../HexabaseClient';
export default class HexabaseBuilder  {
  url: URL;
  constructor(
    protected client: HexabaseClient,
  ) {
    this.url = new URL(this.client.urlHxb);
  }
}

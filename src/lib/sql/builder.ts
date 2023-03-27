import { DtItemWithSearch, GetItemsParameters } from "../types/item";

export default class HexabaseBuilder  {
  url: URL;
  constructor(
    url: URL,
    token?: string
  ) {
    this.url = url;
  }
}

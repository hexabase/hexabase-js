import { HxbAbstract } from "../../../HxbAbstract";
import Item from "../item";

export default class ItemStatus extends HxbAbstract {
	item: Item;
	id: string;
  displayId: string;
  name: string;

  set(key: string, value: any): ItemStatus {
    switch (key) {
			case 'status_id':
				this.id = value;
				break;
			case 'display_id':
				this.displayId = value;
				break;
			case 'status_name':
				this.name = value;
				break;
			case 'item':
				this.item = value as Item;
				break;
		}
		return this;
	}
}

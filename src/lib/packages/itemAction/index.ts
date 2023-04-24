import { HxbAbstract } from "../../../HxbAbstract";
import Item from "../item";

export default class ItemAction extends HxbAbstract {
	item: Item;
	id: string;
	displayId: string;
	name: string;
	displayOrder: number;
	crudType: string;

  set(key: string, value: any): ItemAction {
    switch (key) {
			case 'action_id':
				this.id = value;
				break;
			case 'display_id':
				this.displayId = value;
				break;
			case 'action_name':
				this.name = value;
				break;
			case 'display_order':
				this.displayOrder = value;
				break;
			case 'crud_type':
				this.crudType = value;
				break;
			case 'item':
				this.item = value as Item;
				break;
		}
		return this;
	}
}

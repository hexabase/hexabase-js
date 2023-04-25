import { ADD_ITEM_LINK } from "../../graphql/item";
import { HxbAbstract } from "../../../HxbAbstract";
import Item from "../item";
import { DtAddItemLink } from "../../types/item";

export default class RelatedItem extends HxbAbstract {
	item: Item;
	linkedItem: Item;

  set(key: string, value: any): RelatedItem {
    switch (key) {
			case 'item':
				this.item = value;
				break;
			case 'linkedItem':
				this.linkedItem = value;
				break;
		}
		return this;
	}

	async create(): Promise<boolean> {
		const params = {
			projectId: this.item.datastore.project.id,
			datastoreId: this.item.datastore.id,
			itemId: this.item.id,
			itemLinkRequestInput: {
				link_datastore_id: this.linkedItem.datastore.id,
				link_item_id: this.linkedItem.id,
			}
		};
		const res: DtAddItemLink = await this.request(ADD_ITEM_LINK, params);
		return res.addItemLink.success;
	}
}
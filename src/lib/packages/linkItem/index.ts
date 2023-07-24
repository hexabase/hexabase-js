import { ADD_ITEM_LINK, DELETE_ITEM_LINK } from '../../graphql/item';
import { HxbAbstract } from '../../../HxbAbstract';
import Item from '../item';
import { DtAddItemLink, DtDeleteItemLink } from '../../types/item';

export default class LinkItem extends HxbAbstract {
	item: Item;
	linkedItem: Item;
	saved: boolean = false;

  set(key: string, value: any): LinkItem {
    switch (key) {
			case 'item':
				this.item = value;
				break;
			case 'linkedItem':
				this.linkedItem = value;
				break;
			case 'saved':
				this.saved = value;
				break;
		}
		return this;
	}

	async create(): Promise<boolean> {
		if (this.saved) return true;
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
		this.saved = true;
		return res.addItemLink.success;
	}

	async delete(): Promise<boolean> {
		if (this.saved) return true;
		const params = {
			projectId: this.item.datastore.project.id,
			datastoreId: this.item.datastore.id,
			itemId: this.item.id,
			itemLinkRequestInput: {
				link_datastore_id: this.linkedItem.datastore.id,
				link_item_id: this.linkedItem.id,
			}
		};
		const res: DtDeleteItemLink = await this.request(DELETE_ITEM_LINK, params);
		this.saved = true;
		return res.deleteItemLink.success;
	}
}
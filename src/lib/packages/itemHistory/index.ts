import { HxbAbstract } from "../../../HxbAbstract";
import Item from "../item";
import User from "../user";

export default class ItemHistory extends HxbAbstract {
	id: string;
	item: Item;
	displayOrder: number;
	comment: string;
	isUnread: boolean;
	createdAt: Date;
	actionId: string;
	actionName: string;
	transactionId: string;
	actionOperation: string;
	isStatusAction: string;
	user: User;
	updatedBy: string;
	updatedAt: Date;
	mediaLink: string;
	isUpdated: boolean;
  set(key: string, value: any): ItemHistory {
    switch (key) {
			case 'history_id':
				this.id = value;
				break;
			case 'item':
				this.item = value as Item;
				break;
			case 'display_order':
				this.displayOrder = value;
				break;
			case 'comment':
				this.comment = value;
				break;
			case 'is_unread':
				this.isUnread = value;
				break;
			case 'created_at':
				this.createdAt = new Date(value);
				break;
			case 'action_id':
				this.actionId = value;
				break;
			case 'action_name':
				this.actionName = value;
				break;
			case 'transaction_id':
				this.transactionId = value;
				break;
			case 'action_operation':
				this.actionOperation = value;
				break;
			case 'is_status_action':
				this.isStatusAction = value;
				break;
			case 'user':
				this.user = new User({id: value});
				break;
			case 'updated_by':
				this.updatedBy = value;
				break;
			case 'updated_at':
				this.updatedAt = new Date(value);
				break;
			case 'media_link':
				this.mediaLink = value;
				break;
			case 'is_updated':
				this.isUpdated = value;
				break;
		}
		return this;
	}
}
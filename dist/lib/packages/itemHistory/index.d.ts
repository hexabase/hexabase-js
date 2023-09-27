import { HxbAbstract } from '../../../HxbAbstract';
import Item from '../item';
import User from '../user';
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
    set(key: string, value: any): ItemHistory;
    save(): Promise<boolean>;
    create(unread?: boolean): Promise<boolean>;
    update(): Promise<boolean>;
    delete(): Promise<boolean>;
}

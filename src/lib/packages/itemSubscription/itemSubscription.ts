import { SubscriptionUpdateItem } from '../../types/item';
import { HxbAbstract } from '../../../HxbAbstract';
import Item from '../item';
import User from '../user';

export default class ItemSubscription extends HxbAbstract {
  public id?: string;
  public actionname?: string;
  public comment?: string;
  public createdAt?: Date;
  public item?: Item;
  public displayorder?: number;
  public email?: string;
  public fileIds?: string[];
  public isFetchreplymail: boolean;
  public isNotify: boolean;
  public isChanged: boolean;
  public isNotifyToSender: boolean;
  public isSendItemUnread: boolean;
  public postForEel: boolean;
  public postMode: string;
  public user: User;

  constructor(params: SubscriptionUpdateItem) {
    super();
    this.user = new User();
  }

  set(key: string, value: any): ItemSubscription {
    switch (key) {
      case 'item':
        this.item = value ? value as Item : undefined;
      case '_id':
        this.id = value ? value as string : '';
        break;
      case 'user_id':
        this.user.id = value ? value as string : '';
        break;
      case 'user_obj_id':
        break;
      case 'username':
        this.user.userName = value ? value as string : '';
        break;
      case 'email':
        this.user.email = value ? value as string : '';
        break;
      case 'actionname':
        this.actionname = value ? value as string : '';
        break;
      case 'comment':
        this.comment = value ? value as string : '';
        break;
      case 'post_mode':
        this.postMode = value ? value as string : '';
        break;
      case 'post_for_rel':
        this.postForEel = value ? value as boolean : false;
        break;
      case 'ischanged':
        this.isChanged = value ? value as boolean : false;
        break;
      case 'is_fetchreplymail':
        this.isFetchreplymail = value ? value as boolean : false;
        break;
      case 'file_ids':
        this.fileIds = value ? value as string[] : [];
        break;
      case 'created_at':
        this.createdAt = value ? new Date(value) : undefined;
        break;
      case 'displayorder':
        this.displayorder = value ? value as number : 0;
        break;
      case 'is_notify':
        this.isNotify = value ? value as boolean : false;
        break;
      case 'isnotifytosender':
        this.isNotifyToSender = value ? value as boolean : false;
        break;
      case 'issenditemunread':
        this.isSendItemUnread = value ? value as boolean : false;
        break;
      case 'workspace_id':
      case 'project_id':
      case 'datastore_id':
      case 'i_id':
        break;
     }
    return this;
  }
}
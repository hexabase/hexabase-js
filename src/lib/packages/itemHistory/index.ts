import { HxbAbstract } from '../../../HxbAbstract';
import Item from '../item';
import User from '../user';
import { UpdateCommentItemsParameters, DtDatastoreDeleteCommentItem,
  ArchiveCommentItemsParameters,
  DtDatastoreCreateCommentItem,
  CreateCommentItemsParameters,
  DtDatastoreUpdateCommentItem,
} from '../../types/item';
import {
  POST_UPDATE_ITEM_HISTORY,
  POST_DELETE_ITEM_HISTORY,
  POST_NEW_ITEM_HISTORY
} from '../../graphql/item';

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
  isChanged: boolean;
  isFetchreplymail: boolean;
  postForRel: boolean;
  postMode: string;

  constructor(params: any) {
    super(params);
    this.user = new User;
  }

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
      case 'UserObjID':
        this.user.id = value;
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
      case 'user_id':
        this.user.id = value;
        break;
      case 'email':
        this.user.email = value;
        break;
      case 'username':
        this.user.userName = value;
        break;
      case 'datastore_name':
      case 'datastore_id':
      case 'i_id':
      case 'item_id':
      case 'project_id':
      case 'workspace_id':
        break;
      case 'is_fetchreplymail':
        this.isFetchreplymail = value;
        break;
      case 'IsChanged':
        this.isChanged = value;
        break;
      case 'post_for_rel':
        this.postForRel = value;
        break;
      case 'post_mode':
        this.postMode = value;
        break;
      default:
        // console.log({ key, value});
        break;
    }
    return this;
  }

  async save(): Promise<boolean> {
    if (this.id) return this.update();
    return this.create();
  }

  /**
   * function createComment: create comment item in datastore
   * @params projectId, datastoreId, itemId and CreateCommentParameters is requirement
   * @returns DatastoreCreateCommentItemRes
   */
  async create(unread = true): Promise<boolean> {
    const payload: CreateCommentItemsParameters = {
      workspace_id: ItemHistory.client.currentWorkspace!.id,
      project_id: this.item.datastore.project.id,
      datastore_id: this.item.datastore.id,
      item_id: this.item.id,
      post_mode: '',
      comment: this.comment,
    };

    if (unread) {
      payload.is_send_item_unread = true;
    }
    // handle call graphql
    const res: DtDatastoreCreateCommentItem = await this.request(POST_NEW_ITEM_HISTORY, { payload });
    this.sets(res.postNewItemHistory.item_history!);
    return true;
  }

  /**
   * function updateComment: update comment item in datastore
   * @params projectId, datastoreId, itemId , historyId and UpdateCommentParameters is requirement
   * @returns ResponseErrorNull
   */
  async update(): Promise<boolean> {
    const payload: UpdateCommentItemsParameters = {
      p_id: this.item.datastore.project.id,
      d_id: this.item.datastore.id,
      i_id: this.item.id,
      h_id: this.id,
      comment: this.comment,
    };
    // handle call graphql
    const res: DtDatastoreUpdateCommentItem = await this.request(POST_UPDATE_ITEM_HISTORY, { payload });
    return !res.postUpdateItemHistory.error;
  }

  /**
   * function deleteComment: delete comment item in datastore
   * @params projectId, datastoreId, itemId , historyId
   * @returns ResponseErrorNull
   */
  async delete(): Promise<boolean> {
    const payload: ArchiveCommentItemsParameters = {
      p_id: this.item.datastore.project.id,
      d_id: this.item.datastore.id,
      i_id: this.item.id,
      h_id: this.id,
    };
    // handle call graphql
    const res: DtDatastoreDeleteCommentItem = await this.request(POST_DELETE_ITEM_HISTORY, { payload });
    return !res.archiveItemHistory.error;
  }
}
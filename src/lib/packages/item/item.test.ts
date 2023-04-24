require('dotenv').config();
import Item from '.';
import Auth from '../auth';
import Datastore from '../datastore/index';
import Workspace from '../workspace';
import Project from '../project';
import { CreateDatastoreFromSeedReq, DsAction } from '../../types/datastore';
import User from '../user';
import { ArchiveCommentItemsParameters, CreateCommentItemsParameters, UpdateCommentItemsParameters } from '../../types/item';
import HexabaseClient from '../../../HexabaseClient';

require('dotenv').config();
/**
 * Test with class Datastore
 * @cmdruntest yarn jest src/lib/packages/datastore/datastore.test.ts
 */
let userId = '';
let token = process.env.TOKEN || '';
let tokenDs = process.env.TOKEN || '';
const client = new HexabaseClient;
const datastoreId = process.env.DATASTORE_ID || '';
const projectId = process.env.PROJECT_ID || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';

const templateName = process.env.TEMPLATE_NAME || '';
const linkDsId = process.env.LINK_DATASTORE_ID || '';
const linkItemId = process.env.LINK_ITEM_ID || '';
const linkDsIdUpdate = process.env.LINK_DATASTORE_ID_UPDATE || '';
const linkItemIdUpdate = process.env.LINK_ITEM_ID_UPDATE || '';

// local variable in file for testing
const params = {
  page: 1,
  per_page: 0,
};

const historyParams = {
  from_index: 0,
  to_index: 1,
};

const createWorkSpaceInput = {
  name: 'new Workspace',
};

const createProjectParams = {
  name: {
    en: 'EN Project',
    ja: 'JA Project',
  },
};

let itemId: string;

beforeAll(async () => {
  await client.login({ email, password, token });
});

describe('Item', () => {
  describe('#get()', () => {
    it('should get items in Ds', async () => {
      jest.useFakeTimers('legacy');
      const workspace = client.currentWorkspace!;
      const project = workspace.project(projectId);
      const datastore = project.datastore(datastoreId);
      const { totalCount } = await datastore.itemsWithCount();
      expect(typeof totalCount).toBe('number');
    });
  });
  
  describe('#createItemId()', () => {
    it('should create new item id', async () => {
      jest.useFakeTimers('legacy');
      const project = client.currentWorkspace!.project(projectId);
      const datastore = project.datastore(datastoreId);
      const itemId = await datastore.createItemId();
      expect(typeof itemId).toBe('string');
    });
  });
  
  describe('#create()', () => {
    it('should create new items', async () => {
      jest.useFakeTimers('legacy');
      const project = client.currentWorkspace!.project(projectId);
      const datastore = project.datastore(datastoreId);
      const item = datastore.item();
      const bol = await item.save();
      // Save item id for next test
      itemId = item.id;
      expect(bol).toBe(true);
      expect(typeof item.id).toBe('string');
    });
  });

  describe('#getHistories()', () => {
    it('should get items histories', async () => {
      jest.useFakeTimers('legacy');
      const project = client.currentWorkspace!.project(projectId);
      const datastore = project.datastore(datastoreId);
      const item = datastore.item(itemId);
      const histories = await item.histories();
      expect(typeof histories[0].id).toBe('string');
      const { unread } = await item.historiesWithUnread();
      expect(typeof unread).toBe('number');
    });
  });

  /*
  describe('#getItemRelated()', () => {
    it('should get item related in datastore', async () => {
      jest.useFakeTimers('legacy');
      const item = new Item(url, tokenItem);
      // get items list
      const itemS = await item.get(params, datastoreID, projectId);
      const i = itemS.dsItems?.items?.[0];
      const itemID = i?.i_id;
      const { itemLinked, error } = await item.getItemRelated(datastoreID, itemID, datastoreID);
      // expect response
      if (itemLinked) {

        expect(typeof itemLinked.datastore_id).toBe('string');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });
  */

  describe('#getItemDetail()', () => {
    it('should get item detail', async () => {
      jest.useFakeTimers('legacy');
      const project = client.currentWorkspace!.project(projectId);
      const datastore = project.datastore(datastoreId);
      const item = datastore.item(itemId);
      await item.getDetail();
      expect(typeof item.title).toBe('string');
    });
  });

  
  describe('#update()', () => {
    it('should update item in datastore', async () => {
      jest.useFakeTimers('legacy');
      const project = client.currentWorkspace!.project(projectId);
      const datastore = project.datastore(datastoreId);
      const item = datastore.item(itemId);
      await item.getDetail();
      item.set('price', 100);
      const bol = await item.save();
      expect(bol).toBe(true);
      expect(item.revNo).toBe(2);
    });
  });
  /*
  // describe('#execute()', () => {
  //   it('should execute action for item in datastore', async () => {
  //     jest.useFakeTimers('legacy');
  //     const item = new Item(url, tokenItem);
  //     const itemS = await item.get(params, datastoreID, projectId);
  //     const i = itemS.dsItems?.items?.[0];
  //     const itemID = i?.i_id;
  //     const itemDetail = await item.getItemDetail(datastoreID, itemID);
  //     const { itemDetails } = itemDetail;
  //     let actionIdUpdate = '';

  //     if (itemDetails && itemDetails.item_actions) {
  //       for (let i = 0; i < itemDetails.item_actions.length; i++) {
  //         if (itemDetails.item_actions[i].action_name == '内容を更新する ' || itemDetails.item_actions[i].action_name?.trim().toLowerCase() == 'update') {
  //           actionIdUpdate = itemDetails.item_actions[i].action_id;
  //         }
  //       }
  //     }

  //     const revNo = itemDetails?.rev_no;
  //     const itemActionParameters = {
  //       'rev_no': revNo,
  //       'datastore_id': datastoreID,
  //       'action_id': actionIdUpdate,
  //       'history': {
  //         'comment': 'unitest update item command',
  //         'datastore_id': datastoreID
  //       }
  //     };
  //     const actionId = 'BackToInProgress';
  //     const { data, error } = await item.execute(projectId, datastoreID, itemID, actionId, itemActionParameters);
  //     // expect response
  //     if (data) {
  //       expect(typeof data).toBe('object');
  //     } else {
  //       throw new Error(`Error: ${error}`);
  //     }
  //   });
  // });

  describe('#createComment()', () => {
    it('should create comment items histories', async () => {
      jest.useFakeTimers('legacy');
      const item = new Item(url, tokenItem);
      const itemS = await item.get(params, datastoreID, projectId);
      const i = itemS.dsItems?.items?.[0];
      const itemID = i?.i_id;
      const { postNewItemHistory, error } = await item.createComment(
        projectId,
        datastoreID,
        itemID,
        { comment: 'create comment', is_send_item_unread: false }
      );

      // expect response
      if (postNewItemHistory) {
        expect(typeof postNewItemHistory).toBe('object');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#updateComment()', () => {
    it('should update comment items histories', async () => {
      jest.useFakeTimers('legacy');
      let historyId = '';
      const item = new Item(url, tokenItem);
      const itemS = await item.get(params, datastoreID, projectId);
      const itemID = itemS.dsItems?.items?.[0]?.i_id;
      const { error: errorHistoryItem, itemHistories } = await item.getHistories(projectId, datastoreID, itemID);
      if (errorHistoryItem) {
        throw new Error(`Error: ${errorHistoryItem}`);
      }
      if (itemHistories) {
        historyId = itemHistories?.histories[0]?.history_id;
      }
      const { error } = await item.updateComment(
        projectId,
        datastoreID,
        itemID,
        historyId,
        { 'comment': 'update comment' }
      );

      // expect response
      if (error) {
        return error;
      }
    });
  });

  describe('#deleteComment()', () => {
    it('should delete comment items histories', async () => {
      jest.useFakeTimers('legacy');
      let historyId = '';
      const item = new Item(url, tokenItem);
      const itemS = await item.get(params, datastoreID, projectId);
      const itemID = itemS.dsItems?.items?.[0]?.i_id;
      const { error: errorHistoryItem, itemHistories } = await item.getHistories(projectId, datastoreID, itemID);
      if (errorHistoryItem) {
        throw new Error(`Error: ${errorHistoryItem}`);
      }
      if (itemHistories) {
        historyId = itemHistories?.histories[0]?.history_id;
      }
      const { error } = await item.deleteComment(
        projectId,
        datastoreID,
        itemID,
        datastoreID
      );

      // expect response
      if (error) {
        return error;
      }
    });
  });

  describe('#createLink()', () => {
    it('should create item link in datastore', async () => {
      jest.useFakeTimers('legacy');
      const item = new Item(url, tokenItem);
      let itemId = '';
      const { dsItems, error: errorItem } = await item.get(params, datastoreID);

      if (dsItems) {
        itemId = dsItems.items[0].i_id;
      } else {
        throw new Error(`Error: ${errorItem}`);
      }
      const itemLinkRequestInput = {
        link_datastore_id: linkDsId,
        link_item_id: linkItemId,
      };
      const { data, error } = await item.createLink(
        projectId,
        datastoreID,
        itemId,
        itemLinkRequestInput
      );
      if (data) {
        expect(typeof data).toBe('object');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#updateLink()', () => {
    it('should update item link in datastore', async () => {
      jest.useFakeTimers('legacy');
      const item = new Item(url, tokenItem);
      let itemId = '';
      const { dsItems, error: errorItem } = await item.get(params, datastoreID);

      if (dsItems) {
        itemId = dsItems.items[0].i_id;
      } else {
        throw new Error(`Error: ${errorItem}`);
      }
      const updateItemLinkInput = {
        old_link_datastore_id: linkDsId,
        old_link_item_id: linkItemId,
        new_link_datastore_id: linkDsIdUpdate,
        new_link_item_id: linkItemIdUpdate,
      };
      const { data, error } = await item.updateLink(
        projectId,
        datastoreID,
        itemId,
        updateItemLinkInput
      );
      if (data) {
        expect(typeof data).toBe('object');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#deleteLink()', () => {
    it('should delete item link in datastore', async () => {
      jest.useFakeTimers('legacy');
      const item = new Item(url, tokenItem);
      let itemId = '';
      const { dsItems, error: errorItem } = await item.get(params, datastoreID);

      if (dsItems) {
        itemId = dsItems.items[0].i_id;
      } else {
        throw new Error(`Error: ${errorItem}`);
      }
      const itemLinkRequestInput = {
        link_datastore_id: linkDsIdUpdate,
        link_item_id: linkItemIdUpdate,
      };
      const { data, error } = await item.deleteLink(
        projectId,
        datastoreID,
        itemId,
        itemLinkRequestInput
      );
      if (data) {
        expect(typeof data).toBe('object');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });
  */

  describe('#delete()', () => {
    it('should delete item in datastore', async () => {
      jest.useFakeTimers('legacy');
      const project = client.currentWorkspace!.project(projectId);
      const datastore = project.datastore(datastoreId);
      const item = datastore.item(itemId);
      const bol = await item.delete();
      expect(bol).toBe(true);
    });
  });
});

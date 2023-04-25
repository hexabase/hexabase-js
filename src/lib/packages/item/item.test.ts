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

let linkedItemId: string;

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
      const item = await datastore.item(itemId);
      expect(typeof item.title).toBe('string');
    });
  });

  
  describe('#update()', () => {
    it('should update item in datastore', async () => {
      jest.useFakeTimers('legacy');
      const project = client.currentWorkspace!.project(projectId);
      const datastore = project.datastore(datastoreId);
      const item = datastore.item(itemId);
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
  */

  describe('#createComment()', () => {
    it('should create comment items histories', async () => {
      jest.useFakeTimers('legacy');
      const project = client.currentWorkspace!.project(projectId);
      const datastore = project.datastore(datastoreId);
      const item = datastore.item(itemId);
      const comment = item.comment();
      comment.comment = 'create comment';
      const bol = await comment.save();
      expect(bol).toBe(true);
    });
  });

  describe('#updateComment()', () => {
    it('should update comment items histories', async () => {
      jest.useFakeTimers('legacy');
      const newComment = 'update comment message';
      const project = client.currentWorkspace!.project(projectId);
      const datastore = project.datastore(datastoreId);
      const item = datastore.item(itemId);
      const histories = await item.histories();
      const comment = histories[0];
      comment.comment = newComment;
      const bol = await comment.save();
      expect(bol).toBe(true);
      const histories2 = await item.histories();
      expect(histories2[0].comment).toBe(newComment);
      expect(histories2[0].id).toBe(histories[0].id);
    });
  });

  describe('#deleteComment()', () => {
    it('should delete comment items histories', async () => {
      jest.useFakeTimers('legacy');
      const newComment = 'update comment message';
      const project = client.currentWorkspace!.project(projectId);
      const datastore = project.datastore(datastoreId);
      const item = datastore.item(itemId);
      const histories = await item.histories();
      const bol = await histories[0].delete();
      expect(bol).toBe(true);
      const histories2 = await item.histories();
      expect(histories2.length + 1).toBe(histories.length);
    });
  });

  describe('#createLink()', () => {
    it('should create item link in datastore', async () => {
      jest.useFakeTimers('legacy');
      const project = client.currentWorkspace!.project(projectId);
      const datastore1 = project.datastore(datastoreId);
      const datastore2 = project.datastore('64462a7dc8333e0ab63ac772');
      const item1 = datastore1.item();
      const item2 = datastore2.item();
      await item2
        .set('name', (new Date).toISOString())
        .save();
      const item3 = await datastore2.item();
      await item3
        .set('name', (new Date).toISOString())
        .save();
      const bol = await item1
        .set('name', 'item1')
        .set('price', 100)
        .set('Linkeditem', item2)
        .link(item2)
        .link(item3)
        .save();
      expect(bol).toBe(true);
    });
  });

  
  describe('#deleteLink()', () => {
    it('should delete item link in datastore', async () => {
      jest.useFakeTimers('legacy');
      const project = client.currentWorkspace!.project(projectId);
      const datastore1 = project.datastore(datastoreId);
      const datastore2 = project.datastore('64462a7dc8333e0ab63ac772');
      const item1 = datastore1.item();
      const item2 = datastore2.item();
      await item2
        .set('name', (new Date).toISOString())
        .save();
      const item3 = datastore2.item();
      await item3
        .set('name', (new Date).toISOString())
        .save();
      await item1
        .set('name', 'item1')
        .set('price', 100)
        .set('Linkeditem', item2)
        .link(item2)
        .link(item3)
        .save();
      const bol = await item1
        .unlink(item2)
        .save();
      expect(bol).toBe(true);
    });
  });

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

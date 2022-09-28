import Item from '.';
import Auth from '../auth';
import AuthMw from '../middlware/auth';
import Datastore from '../datastore/index';

require('dotenv').config();
/**
 * Test with class Datastore
 * @cmdruntest yarn jest src/lib/packages/datastore/datastore.test.ts
 */

const url = process.env.URL || '';
let tokenDs = process.env.TOKEN || '';
const workspaceId = process.env.WORKSPACEID || '';
const applicationId = process.env.APPLICATIONID || '';
// const projectId = process.env.APPLICATIONID || '';
const datastoreId = process.env.DATASTOREID || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';

// local variable in file for testing
const params = {
  'page': 1,
  'per_page': 0
};

const historyParams = {
  'from_index': 0,
  'to_index': 1
};


beforeAll( async () => {
  if (email && password) {
    const auth = new Auth(url);
    const {token, error} = await auth.login({email, password});
    if (token) {
      return tokenDs = token;
    } else {
      throw Error(`Login to initialize sdk: ${error}`);
    }
  }
});

describe('Item', () => {
  describe('#get()', () => {
    it('should get items in Ds', async () => {
      jest.useFakeTimers('legacy');
      const item = new Item(url, tokenDs);

      const {dsItems, error} = await item.get(params, datastoreId, applicationId);
      // expect response
      if (dsItems) {

        expect(typeof dsItems.totalItems).toBe('number');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#getHistories()', () => {
    it('should get items histories', async () => {
      jest.useFakeTimers('legacy');
      const item = new Item(url, tokenDs);

      // get items list
      const itemS = await item.get(params, datastoreId, applicationId);
      const i = itemS.dsItems?.items?.[0];
      const itemID = i?.i_id;

      const {itemHistories, error} = await item.getHistories(applicationId, datastoreId, itemID, historyParams);

      // expect response
      if (itemHistories) {

        expect(typeof itemHistories.unread).toBe('number');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#createItemId()', () => {
    it('should create new item id', async () => {
      jest.useFakeTimers('legacy');
      const item = new Item(url, tokenDs);
      const {item_id, error} = await item.createItemId(datastoreId);

      // expect response
      if (item_id) {

        expect(typeof item_id).toBe('string');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#create()', () => {
    it('should create new items', async () => {
      jest.useFakeTimers('legacy');
      let actionCreate;
      const datastore = new Datastore(url, tokenDs);
      const dsA = await datastore.getActions(datastoreId);
      const actions = dsA?.dsActions;
      if (actions) {
        for (let i = 0; i < actions.length; i++) {
          if (actions[i].operation == 'create' || actions[i].operation == 'new') {
            actionCreate = actions[i].action_id;
          }
        }
      } else {
        throw new Error(`Error: ${dsA.error}`);
      }
      const item = new Item(url, tokenDs);
      const newItemActionParameters = {
        'action_id': `${actionCreate}`,
        'use_display_id': true,
        'return_item_result': true,
        'ensure_transaction': false,
        'exec_children_post_procs': true,
        'access_key_updates': {
          'overwrite': true,
          'ignore_action_settings': true
        },
        'item': {
          'param1' : 'field_id' ,
          'param2': 'TITLE test',
          'param3' : 'person in charge'
        }
      };

      const {itemNew, error} = await item.create(applicationId, datastoreId, newItemActionParameters);

      // expect response
      if (itemNew) {

        expect(typeof itemNew.history_id).toBe('string');
        expect(typeof itemNew.item_id).toBe('string');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#getItemRelated()', () => {
    it('should get item related in datastore', async () => {
      jest.useFakeTimers('legacy');
      const item = new Item(url, tokenDs);

      // get items list
      const itemS = await item.get(params, datastoreId, applicationId);
      const i = itemS.dsItems?.items?.[0];
      const itemID = i?.i_id;

      const {itemLinked, error} = await item.getItemRelated(datastoreId, itemID, datastoreId);

      // expect response
      if (itemLinked) {

        expect(typeof itemLinked.datastore_id).toBe('string');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#delete()', () => {
    it('should delete item in datastore', async () => {
      jest.useFakeTimers('legacy');

      let actionDelete;
      const datastore = new Datastore(url, tokenDs);
      const dsA = await datastore.getActions(datastoreId);
      const actions = dsA?.dsActions;
      if (actions) {
        for (let i = 0; i < actions.length; i++) {
          if (actions[i].operation == 'delete') {
            actionDelete = actions[i].action_id;
          }
        }
      } else {
        throw new Error(`Error: ${dsA.error}`);
      }

      const item = new Item(url, tokenDs);
      // get items list
      const itemS = await item.get(params, datastoreId, applicationId);
      const indexLastItem = itemS.dsItems?.items.length;
      const i = itemS.dsItems?.items?.[indexLastItem - 1];
      const itemID = i?.i_id;

      const deleteItemReq = {
        a_id: `${actionDelete}`
      };

      const { data, error} = await item.delete(applicationId, datastoreId, itemID, deleteItemReq);
      // expect response
      if (data) {
        expect(typeof data).toBe('object');
      }
    });
  });

  describe('#getItemDetail()', () => {
    it('should get item detail', async () => {
      jest.useFakeTimers('legacy');
      const item = new Item(url, tokenDs);

      // get items list
      const itemS = await item.get(params, datastoreId, applicationId);
      const i = itemS.dsItems?.items?.[0];
      const itemID = i?.i_id;

      const {itemDetails, error} = await item.getItemDetail(datastoreId, itemID);

      // expect response
      if (itemDetails) {

        expect(typeof itemDetails.title).toBe('string');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#update()', () => {
    it('should update item in datastore', async () => {
      jest.useFakeTimers('legacy');
      const item = new Item(url, tokenDs);

      // get items list
      const itemS = await item.get(params, datastoreId, applicationId);
      const i = itemS.dsItems?.items?.[0];
      const itemID = i?.i_id;

      const itemDetail = await item.getItemDetail(datastoreId, itemID);
      const { itemDetails } = itemDetail;
      let actionIdUpdate = '';

      if (itemDetails && itemDetails.item_actions) {
        for (let i = 0; i < itemDetails.item_actions.length; i++) {
          if (itemDetails.item_actions[i].action_name == '内容を更新する ' || itemDetails.item_actions[i].action_name == 'update') {
            actionIdUpdate = itemDetails.item_actions[i].action_id;
          }
        }
      }

      const revNo = itemDetails?.rev_no;
      const itemActionParameters = {
        'rev_no': revNo,
        'datastore_id': datastoreId,
        'action_id': actionIdUpdate,
        'history': {
          'comment': 'unitest update item command',
          'datastore_id':  datastoreId
        }
      };

      const { data, error} = await item.update(applicationId, datastoreId, itemID, itemActionParameters);
      // expect response
      if (data) {
        expect(typeof data).toBe('object');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#execute()', () => {
    it('should execute action for item in datastore', async () => {
      jest.useFakeTimers('legacy');
      const item = new Item(url, tokenDs);
      const actionId = 'BackToInProgress';
      const { data, error} = await item.execute(applicationId, datastoreId, itemId, actionId, itemActionParameters);
      // expect response
      if (data) {
        expect(typeof data).toBe('object');
      }
    });
  });
});

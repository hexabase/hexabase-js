import Item from '.';
import Auth from '../auth';
import AuthMw from '../middlware/auth';
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
const fieldId = process.env.FIELDID || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';
const itemId = process.env.ITEMID || '';
const actionId = process.env.ACTIONID || '';
const revNoItem = process.env.REV_NO_ITEM || '';

// local variable in file for testing
const getItemsParameters = {
  'page': 1,
  'per_page': 0
};

const historyParams = {
  'from_index': 0,
  'to_index': 1
};

const itemUpdatePayload = {
  rev_no: parseInt(revNoItem)
}

const newItemActionParameters = {
  'action_id': `${actionId}`,
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

      const {dsItems, error} = await item.get(getItemsParameters, datastoreId, applicationId);

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

      const {itemHistories, error} = await item.getHistories(applicationId, datastoreId, itemId, historyParams);

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
      const item = new Item(url, tokenDs);
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
      const {itemLinked, error} = await item.getItemRelated(datastoreId, itemId, datastoreId);

      // expect response
      if (itemLinked) {

        expect(typeof itemLinked.datastore_id).toBe('string');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#getItemDetail()', () => {
    it('should get item detail', async () => {
      jest.useFakeTimers('legacy');
      const item = new Item(url, tokenDs);
      const {itemDetails, error} = await item.getItemDetail(datastoreId, itemId);

      // expect response
      if (itemDetails) {

        expect(typeof itemDetails.title).toBe('string');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });


  describe('#update()', () => {
    it('should update item', async () => {
      jest.useFakeTimers('legacy');
      const itemClass = new Item(url, tokenDs);

      const { item, error} = await itemClass.update(applicationId, datastoreId, itemId, itemUpdatePayload);

      // expect response
      if (item) {

        expect(typeof item).toBe('object');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });
});

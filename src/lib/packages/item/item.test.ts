import Item from '.';
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
const datastoreId = process.env.DATASTOREID || '';
const fieldId = process.env.FIELDID || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';
const itemId = process.env.ITEMID || '';
const actionId = process.env.ACTIONID || '';

// local variable in file for testing
const getItemsParameters = {
  'page': 1,
  'per_page': 0
};

const historyParams = {
  'from_index': 0,
  'to_index': 1
};

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
    const authMw = new AuthMw(url);
    const {token, error} = await authMw.loginAsync({email, password});
    if (token) {
      return tokenDs = token;
    } else {
      throw Error(`Need login faild to initialize sdk: ${error}`);
    }
  }
});

describe('Item', () => {
  describe('#getItemsAsync()', () => {
    it('should get items in Ds', async () => {
      jest.useFakeTimers('legacy');
      const item = new Item(url, tokenDs);

      const {dsItems, error} = await item.getItemsAsync(getItemsParameters, datastoreId, applicationId);

      // expect response
      if (dsItems) {

        expect(typeof dsItems.totalItems).toBe('number');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#getItemsHistories()', () => {
    it('should get items histories', async () => {
      jest.useFakeTimers('legacy');
      const item = new Item(url, tokenDs);

      const {itemHistories, error} = await item.getItemsHistories(applicationId, datastoreId, itemId, historyParams);

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

  describe('#createItemId()', () => {
    it('should create new items', async () => {
      jest.useFakeTimers('legacy');
      const item = new Item(url, tokenDs);
      const {itemNew, error} = await item.createNewItem(applicationId, datastoreId, newItemActionParameters);

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

});

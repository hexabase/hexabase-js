import Item from '.';
import Auth from '../auth';
import AuthMw from '../middlware/auth';
import Datastore from '../datastore/index';
import Workspace from '../workspace';
import Application from '../application';
import { CreateDatastoreFromSeedReq } from '../../types/datastore';
import User from '../user';

require('dotenv').config();
/**
 * Test with class Datastore
 * @cmdruntest yarn jest src/lib/packages/datastore/datastore.test.ts
 */

let userId = '';
let tokenDs = process.env.TOKEN || '';
let workspaceId = process.env.WORKSPACEID || '';
let applicationId = process.env.APPLICATIONID || '';
let datastoreID = process.env.datastoreID || '';
const url = process.env.URL || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';
const templateName = process.env.TEMPLATE_NAME || '';

// local variable in file for testing
const params = {
  'page': 1,
  'per_page': 0
};

const historyParams = {
  'from_index': 0,
  'to_index': 1
};

const createWorkSpaceInput = {
  name: 'new Workspace'
};

const createProjectParams = {
  name: {
    en: 'EN Project',
    ja: 'JA Project',
  },
};

beforeAll(async () => {
  if (email && password) {
    const auth = new Auth(url);
    const { token, error } = await auth.login({ email, password });
    if (token) {
      //
      const user = new User(url, token);
      const { userInfo } = await user.get(token);
      userInfo?.u_id ? userId = userInfo?.u_id : '';
      //
      const workspace = new Workspace(url, token);
      const { workspaces } = await workspace.get();

      if (workspaces && workspaces?.workspaces && workspaces?.workspaces[0]?.workspace_id) {
        workspaceId = workspaces?.workspaces[0]?.workspace_id;
      } else {
        const workspace = new Workspace(url, token);
        const { w_id } = await workspace.create(createWorkSpaceInput);

        if (w_id) {
          workspaceId = w_id;
        }
      }
      //
      const appAndDsGetApp = new Application(url, token);
      const { appAndDs } = await appAndDsGetApp.getProjectsAndDatastores(workspaceId);

      if (appAndDs && appAndDs[0] && appAndDs[0].application_id) {
        applicationId = appAndDs[0].application_id;
      } else {
        const application = new Application(url, token);
        const { app } = await application.create(createProjectParams);

        if (app) {
          applicationId = app?.project_id;
        }
      }

      //
      if (appAndDs && appAndDs[0] && appAndDs[0]?.datastores && appAndDs[0]?.datastores[0]?.datastore_id) {
        datastoreID = appAndDs[0]?.datastores[0]?.datastore_id;
      } else {
        const payload: CreateDatastoreFromSeedReq = {
          payload: {
            lang_cd: 'en',
            project_id: applicationId,
            template_name: templateName,
            workspace_id: workspaceId,
            user_id: userId,
          },
        };
        const datastore = new Datastore(url, token);
        const { datastoreId } = await datastore.create(payload);

        if (datastoreId) {
          datastoreID = datastoreId;
        }
      }
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

      const { dsItems, error } = await item.get(params, datastoreID, applicationId);
      // expect response
      if (dsItems) {

        expect(typeof dsItems.totalItems).toBe('number');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#createItemId()', () => {
    it('should create new item id', async () => {
      jest.useFakeTimers('legacy');
      const item = new Item(url, tokenDs);
      const { item_id, error } = await item.createItemId(datastoreID);

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
      const dsA = await datastore.getActions(datastoreID);
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
          'param1': 'field_id',
          'param2': 'TITLE test',
          'param3': 'person in charge'
        }
      };

      const { itemNew, error } = await item.create(applicationId, datastoreID, newItemActionParameters);

      // expect response
      if (itemNew) {
        expect(typeof itemNew.history_id).toBe('string');
        expect(typeof itemNew.item_id).toBe('string');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#getHistories()', () => {
    it('should get items histories', async () => {
      jest.useFakeTimers('legacy');
      const item = new Item(url, tokenDs);
      const itemS = await item.get(params, datastoreID, applicationId);
      const i = itemS.dsItems?.items?.[0];
      const itemID = i?.i_id;
      const { itemHistories, error } = await item.getHistories(applicationId, datastoreID, itemID, historyParams);

      // expect response
      if (itemHistories) {
        expect(typeof itemHistories.unread).toBe('number');
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
      const itemS = await item.get(params, datastoreID, applicationId);
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

  describe('#getItemDetail()', () => {
    it('should get item detail', async () => {
      jest.useFakeTimers('legacy');
      const item = new Item(url, tokenDs);

      // get items list
      const itemS = await item.get(params, datastoreID, applicationId);
      const i = itemS.dsItems?.items?.[0];
      const itemID = i?.i_id;

      const { itemDetails, error } = await item.getItemDetail(datastoreID, itemID);

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
      const itemS = await item.get(params, datastoreID, applicationId);
      const i = itemS.dsItems?.items?.[0];
      const itemID = i?.i_id;

      const itemDetail = await item.getItemDetail(datastoreID, itemID);
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
        'datastore_id': datastoreID,
        'action_id': actionIdUpdate,
        'history': {
          'comment': 'unitest update item command',
          'datastore_id': datastoreID
        }
      };

      const { data, error } = await item.update(applicationId, datastoreID, itemID, itemActionParameters);
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
      const itemS = await item.get(params, datastoreID, applicationId);
      const i = itemS.dsItems?.items?.[0];
      const itemID = i?.i_id;

      const itemDetail = await item.getItemDetail(datastoreID, itemID);
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
        'datastore_id': datastoreID,
        'action_id': actionIdUpdate,
        'history': {
          'comment': 'unitest update item command',
          'datastore_id': datastoreID
        }
      };
      const actionId = 'BackToInProgress';
      const { data, error } = await item.execute(applicationId, datastoreID, itemID, actionId, itemActionParameters);
      // expect response
      if (data) {
        expect(typeof data).toBe('object');
      }
    });
  });

  describe('#delete()', () => {
    it('should delete item in datastore', async () => {
      jest.useFakeTimers('legacy');

      let actionDelete;
      const datastore = new Datastore(url, tokenDs);
      const dsA = await datastore.getActions(datastoreID);
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
      const itemS = await item.get(params, datastoreID, applicationId);
      const indexLastItem = itemS.dsItems?.items.length;
      const i = itemS.dsItems?.items?.[indexLastItem - 1];
      const itemID = i?.i_id;

      const deleteItemReq = {
        a_id: `${actionDelete}`
      };

      const { data, error } = await item.delete(applicationId, datastoreID, itemID, deleteItemReq);
      // expect response
      if (data) {
        expect(typeof data).toBe('object');
      }
    });
  });
});

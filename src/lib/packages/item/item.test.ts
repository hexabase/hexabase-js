require('dotenv').config();
import Item from '.';
import Auth from '../auth';
import Datastore from '../datastore/index';
import Workspace from '../workspace';
import Project from '../project';
import { CreateDatastoreFromSeedReq, DsAction } from '../../types/datastore';
import User from '../user';
import { ArchiveCommentItemsParameters, CreateCommentItemsParameters, UpdateCommentItemsParameters } from '../../types/item';

require('dotenv').config();
/**
 * Test with class Datastore
 * @cmdruntest yarn jest src/lib/packages/datastore/datastore.test.ts
 */

let userId = '';
let tokenItem = process.env.TOKEN || '';
let workspaceId = process.env.WORKSPACEID || '';
let projectId = process.env.projectId || '';
let datastoreID: string = process.env.DATASTOREID || '';
let actions: DsAction[] | undefined = [];
const url = process.env.URL || '';
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

beforeAll(async () => {
  if (email && password && !tokenItem) {
    const auth = new Auth(url);
    const { token, error } = await auth.login({ email, password });
    if (token) {
      //
      const user = new User(url, token);
      const { userInfo } = await user.get(token);
      userInfo?.u_id ? (userId = userInfo?.u_id) : '';
      //
      const workspace = new Workspace(url, token);
      const { wsCurrent, error } = await workspace.getCurrent();

      if (wsCurrent && wsCurrent?.workspace_id) {
        workspaceId = wsCurrent?.workspace_id;
      } else {
        throw Error(`Errors: ${error}`);
      }
      //
      const appAndDsGetApp = new Project(url, token);
      const { appAndDs } = await appAndDsGetApp.getProjectsAndDatastores(
        workspaceId
      );

      if (appAndDs && appAndDs[0] && appAndDs[0].application_id) {
        projectId = appAndDs[0].application_id;
      } else {
        const application = new Project(url, token);
        const { app } = await application.create(createProjectParams);

        if (app) {
          projectId = app?.project_id;
        }
      }

      //
      const datastore = new Datastore(url, token);
      if (
        appAndDs &&
        appAndDs[0] &&
        appAndDs[0]?.datastores &&
        appAndDs[0]?.datastores[0]?.datastore_id
      ) {
        datastoreID = appAndDs[0]?.datastores[0]?.datastore_id;
      } else {
        const payload: CreateDatastoreFromSeedReq = {
          payload: {
            lang_cd: 'en',
            project_id: projectId,
            template_name: templateName,
            workspace_id: workspaceId,
            user_id: userId,
          },
        };
        const { datastoreId } = await datastore.create(payload);
        if (datastoreId) {
          datastoreID = datastoreId;
        } else {
          throw Error(`Dont't have datastore: ${error}`);
        }
      }
      if (datastoreID) {
        datastoreID = datastoreID;
        const { dsActions } = await datastore.getActions(datastoreID);
        actions = dsActions;
      }
      return (tokenItem = token);
    } else {
      throw Error(`Login to initialize sdk: ${error}`);
    }
  } else if ((tokenItem && !email) || !password) {
    const user = new User(url, tokenItem);
    const { userInfo } = await user.get(tokenItem);
    userInfo?.u_id ? (userId = userInfo?.u_id) : '';
    //
    const workspace = new Workspace(url, tokenItem);
    const { wsCurrent, error } = await workspace.getCurrent();

    if (wsCurrent && wsCurrent?.workspace_id) {
      workspaceId = wsCurrent?.workspace_id;
    } else {
      throw Error(`Errors: ${error}`);
    }
    //
    const appAndDsGetApp = new Project(url, tokenItem);
    const { appAndDs } = await appAndDsGetApp.getProjectsAndDatastores(
      workspaceId
    );

    if (appAndDs && appAndDs[0] && appAndDs[0].application_id) {
      projectId = appAndDs[0].application_id;
    } else {
      const application = new Project(url, tokenItem);
      const { app } = await application.create(createProjectParams);

      if (app) {
        projectId = app?.project_id;
      }
    }

    //
    const datastore = new Datastore(url, tokenItem);
    if (
      appAndDs &&
      appAndDs[0] &&
      appAndDs[0]?.datastores &&
      appAndDs[0]?.datastores[0]?.datastore_id
    ) {
      datastoreID = appAndDs[0]?.datastores[0]?.datastore_id;
    } else {
      const payload: CreateDatastoreFromSeedReq = {
        payload: {
          lang_cd: 'en',
          project_id: projectId,
          template_name: templateName,
          workspace_id: workspaceId,
          user_id: userId,
        },
      };
      const { datastoreId } = await datastore.create(payload);
      if (datastoreId) {
        datastoreID = datastoreId;
      } else {
        throw Error(`Dont't have datastore: ${error}`);
      }
    }
    if (datastoreID) {
      datastoreID = datastoreID;
      const { dsActions } = await datastore.getActions(datastoreID);
      actions = dsActions;
    }
  } else {
    throw Error('Need pass token or email and password parameter');
  }
});

describe('Item', () => {
  describe('#get()', () => {
    it('should get items in Ds', async () => {
      jest.useFakeTimers('legacy');
      const item = new Item(url, tokenItem);

      const { dsItems, error } = await item.get(params, datastoreID, projectId);
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
      const item = new Item(url, tokenItem);
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
      if (actions && actions.length > 0) {
        for (const action of actions) {
          if (action?.operation?.trim().toLowerCase() == 'new') {
            actionCreate = action?.action_id;
          }
        }
      } else {
        throw new Error(`Error: actions empty`);
      }
      const item = new Item(url, tokenItem);
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

      const { itemNew, error } = await item.create(projectId, datastoreID, newItemActionParameters);

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
      const item = new Item(url, tokenItem);
      const itemS = await item.get(params, datastoreID, projectId);
      const i = itemS.dsItems?.items?.[0];
      const itemID = i?.i_id;
      const { itemHistories, error } = await item.getHistories(projectId, datastoreID, itemID, historyParams);

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

  describe('#getItemDetail()', () => {
    it('should get item detail', async () => {
      jest.useFakeTimers('legacy');
      const item = new Item(url, tokenItem);
      // get items list
      const itemS = await item.get(params, datastoreID, projectId);
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
      const item = new Item(url, tokenItem);
      // get items list
      const itemS = await item.get(params, datastoreID, projectId);
      const i = itemS.dsItems?.items?.[0];
      const itemID = i?.i_id;
      const itemDetail = await item.getItemDetail(datastoreID, itemID);
      const { itemDetails } = itemDetail;
      let actionIdUpdate = '';

      if (itemDetails && itemDetails.item_actions) {
        for (let i = 0; i < itemDetails.item_actions.length; i++) {
          if (itemDetails.item_actions[i].action_name == '内容を更新する ' || itemDetails.item_actions[i].action_name?.trim().toLowerCase() == 'update') {
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

      const { data, error } = await item.update(projectId, datastoreID, itemID, itemActionParameters);
      // expect response
      if (data) {
        expect(typeof data).toBe('object');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

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

  describe('#delete()', () => {
    it('should delete item in datastore', async () => {
      jest.useFakeTimers('legacy');

      let actionDelete;
      if (actions) {
        for (const action of actions) {
          if (action?.operation?.trim().toLowerCase() == 'delete') {
            actionDelete = action?.action_id;
          }
        }
      } else {
        throw new Error(`Error: actions is empty`);
      }

      const item = new Item(url, tokenItem);
      // get items list
      const itemS = await item.get(params, datastoreID, projectId);
      const indexLastItem = itemS.dsItems?.items.length;
      const i = itemS.dsItems?.items?.[indexLastItem - 1];
      const itemID = i?.i_id;
      const deleteItemReq = {
        a_id: `${actionDelete}`
      };
      const { data, error } = await item.delete(projectId, datastoreID, itemID, deleteItemReq);
      // expect response
      if (data) {
        expect(typeof data).toBe('object');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });
});

import { CreateDatastoreFromSeedReq, DatastoreUpdateSetting, IsExistsDSDisplayIDExcludeOwnReq } from '../../types/datastore';
import Datastore from '.';
import Auth from '../auth';
import AuthMw from '../middlware/auth';
import Application from '../application';
import User from '../user';
import Workspace from '../workspace';
require('dotenv').config();
/**
 * Test with class Datastore
 * @cmdruntest yarn jest src/lib/packages/datastore/datastore.test.ts
 */

let tokenDs = process.env.TOKEN || '';
let userId = '';
let newDatastoreId = process.env.DATASTOREID || '';;
let workspaceId = process.env.WORKSPACEID || '';
let projectID = process.env.PROJECT_ID || '';
const url = process.env.URL || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';
const templateName = process.env.TEMPLATE_NAME || '';

const createWorkSpaceInput = {
  name: 'new Workspace'
};

beforeAll(async () => {
  if (email && password) {
    console.log('[email, password]: ', email, password);
    const auth = new Auth(url);
    const { token, error } = await auth.login({ email, password });

    if (token) {
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
      const dataApp = await appAndDsGetApp.getProjectsAndDatastores(workspaceId);

      if (dataApp && dataApp?.appAndDs && dataApp?.appAndDs[0] && dataApp?.appAndDs[0].application_id) {
        projectID = dataApp?.appAndDs[0].application_id;
      } else {
        const application = new Application(url, token);
        const createProjectParams = {
          name: {
            en: 'EN Project',
            ja: 'JA Project',
          },
        };
        const { app } = await application.create(createProjectParams);

        if (app) {
          projectID = app?.project_id;
        }
      }

      return (tokenDs = token);
    } else {
      throw Error(`Need login faild to initialize sdk: ${error}`);
    }
  }
});

describe('Datastore', () => {
  describe('#create()', () => {
    it('should create datastore without error', async () => {
      jest.useFakeTimers('legacy');
      try {
        const datastore = new Datastore(url, tokenDs);
        const payload: CreateDatastoreFromSeedReq = {
          payload: {
            lang_cd: 'en',
            project_id: projectID,
            template_name: templateName,
            workspace_id: workspaceId,
            user_id: userId,
          },
        };
        const { datastoreId } = await datastore.create(payload);

        if (datastoreId) {
          newDatastoreId = datastoreId;
          expect(typeof datastoreId).toBe('string');
        } else {
          throw new Error('Invalid datastoreId');
        }
      } catch (e) {
        throw new Error(`Error: ${e}`);
      }
    });
  });

  describe('#getField()', () => {
    it('should get field setting in Ds', async () => {
      jest.useFakeTimers('legacy');
      try {
        if (newDatastoreId) {
          const datastore = new Datastore(url, tokenDs);
          const { dsField } = await datastore.getField('', newDatastoreId);
          // expect response
          if (dsField) {
            expect(typeof dsField).toBe('object');
          }
        }
      } catch (e) {
        throw new Error(`Error: ${e}`);
      }
    });
  });

  describe('#getActions()', () => {
    it('should get actions in Ds', async () => {
      jest.useFakeTimers('legacy');
      try {
        if (newDatastoreId) {
          const datastore = new Datastore(url, tokenDs);

          const { dsActions } = await datastore.getActions(newDatastoreId);

          // expect response
          if (
            dsActions &&
            dsActions[0] &&
            dsActions[0].name &&
            dsActions[0].workspace_id
          ) {
            expect(typeof dsActions[0].name).toBe('string');
            expect(typeof dsActions[0].workspace_id).toBe('string');
          }
        }
      } catch (e) {
        throw new Error(`Error: ${e}`);
      }
    });
  });

  describe('#getStatuses()', () => {
    it('should get status in Ds', async () => {
      jest.useFakeTimers('legacy');
      const datastore = new Datastore(url, tokenDs);

      const { dsStatuses, error } = await datastore.getStatuses(newDatastoreId);

      // expect response
      if (dsStatuses) {
        expect(typeof dsStatuses).toBe('object');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#getAction()', () => {
    it('should get action by Id in Ds', async () => {
      jest.useFakeTimers('legacy');

      let actionId;

      const datastore = new Datastore(url, tokenDs);
      const dsA = await datastore.getActions(newDatastoreId);
      const actions = dsA?.dsActions;
      if (actions) {
        for (let i = 0; i < actions.length; i++) {
          if (actions[i].operation == 'create') {
            actionId = actions[i].action_id;
          }
        }
      } else {
        throw new Error(`Error: ${dsA.error}`);
      }

      if (actionId) {
        const { dsAction, error } = await datastore.getAction(
          newDatastoreId,
          actionId
        );

        // expect response
        if (dsAction) {
          expect(typeof dsAction.workspace_id).toBe('string');
          expect(typeof dsAction.name).toBe('string');
        } else {
          throw new Error(`Error: ${error}`);
        }
      }
    });
  });

  describe('#validateDatastoreDisplayID()', () => {
    it('should validate display id datastore current without error', async () => {
      jest.useFakeTimers('legacy');
      try {
        if (newDatastoreId) {
          const datastore = new Datastore(url, tokenDs);
          const payload: IsExistsDSDisplayIDExcludeOwnReq = {
            payload: {
              datastoreId: newDatastoreId,
              displayId: 'dsId_update_001',
              projectId: projectID,
            }
          };
          const { exits, error } = await datastore.validateDatastoreDisplayID(payload);
          if (typeof exits === 'boolean') expect(typeof exits).toBe('boolean');
          else throw new Error(`Error: ${error}`);
        }
      } catch (e) {
        throw new Error(`Error: ${e}`);
      }
    });
  });

  describe('#updateDatastore()', () => {
    it('should update datastore current without error', async () => {
      jest.useFakeTimers('legacy');
      try {
        if (newDatastoreId) {
          const datastore = new Datastore(url, tokenDs);
          const payload: DatastoreUpdateSetting = {
            payload: {
              datastore_id: newDatastoreId,
              display_id: "dsId_update_001",
              name: {
                en: "EN name update",
                ja: "JA name update"
              },
            }
          };
          const { data, error } = await datastore.updateDatastoreSetting(payload);
          if (data) expect(typeof data).toBe('object');
          else throw new Error(`Error: ${error}`);
        }
      } catch (e) {
        throw new Error(`Error: ${e}`);
      }
    });
  });

  describe('#deleteDatastore()', () => {
    it('should delete datastore current without error', async () => {
      jest.useFakeTimers('legacy');
      try {
        if (newDatastoreId) {
          const datastore = new Datastore(url, tokenDs);
          const { data, error } = await datastore.deleteDatastore(newDatastoreId);

          if (data) {
            expect(typeof data).toBe('object');
          } else {
            throw new Error(`Error: ${error}`);
          }
        }
      } catch (e) {
        throw new Error(`Error: ${e}`);
      }
    });
  });

});

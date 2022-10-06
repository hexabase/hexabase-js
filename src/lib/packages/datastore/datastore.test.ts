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
let datastoreId = process.env.DATASTOREID || '';
let workspaceId = process.env.WORKSPACEID || '';
let projectID = process.env.PROJECT_ID || '';
const url = process.env.URL || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';
const templateName = process.env.TEMPLATE_NAME || '';

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
      }
      //
      const appAndDsGetApp = new Application(url, token);
      const dataApp = await appAndDsGetApp.getProjectsAndDatastores(workspaceId);

      if (dataApp && dataApp?.appAndDs && dataApp?.appAndDs[0] && dataApp?.appAndDs[0].application_id) {
        projectID = dataApp?.appAndDs[0].application_id;
      }
      //
      const appAndDsGetDs = new Application(url, tokenDs);
      const dataDs = await appAndDsGetDs.getProjectsAndDatastores(workspaceId);

      if (dataDs && dataDs?.appAndDs && dataDs?.appAndDs[0] && dataDs?.appAndDs[0].datastores && dataDs?.appAndDs[0].datastores[0].datastore_id) {
        datastoreId = dataDs?.appAndDs[0].datastores[0].datastore_id;
      }
      return (tokenDs = token);
    } else {
      throw Error(`Need login faild to initialize sdk: ${error}`);
    }
  }
});

describe('Datastore', () => {
  describe('#getField()', () => {
    it('should get field setting in Ds', async () => {
      jest.useFakeTimers('legacy');
      try {
        if (datastoreId) {
          const datastore = new Datastore(url, tokenDs);
          const { dsField } = await datastore.getField('', datastoreId);
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
        if (datastoreId) {
          const datastore = new Datastore(url, tokenDs);

          const { dsActions } = await datastore.getActions(datastoreId);

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

      const { dsStatuses, error } = await datastore.getStatuses(datastoreId);

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
      const dsA = await datastore.getActions(datastoreId);
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
          datastoreId,
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

  describe('#createDatastoreFromTemplate()', () => {
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
        const { datastoreId } = await datastore.createDatastoreFromTemplate(payload);

        if (datastoreId) {
          expect(typeof datastoreId).toBe('string');
        } else {
          throw new Error('Invalid datastoreId');
        }
      } catch (e) {
        throw new Error(`Error: ${e}`);
      }
    });
  });

  describe('#validateDatastoreDisplayID()', () => {
    it('should validate display id datastore current without error', async () => {
      jest.useFakeTimers('legacy');
      try {
        if (datastoreId) {
          const datastore = new Datastore(url, tokenDs);
          const payload: IsExistsDSDisplayIDExcludeOwnReq = {
            payload: {
              datastoreId: datastoreId,
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
        if (datastoreId) {
          const datastore = new Datastore(url, tokenDs);
          const payload: DatastoreUpdateSetting = {
            payload: {
              datastore_id: "633e7ae71aa038e877b3eb0a",
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
        if (datastoreId) {
          const datastore = new Datastore(url, tokenDs);
          const { data, error } = await datastore.deleteDatastore(datastoreId);

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

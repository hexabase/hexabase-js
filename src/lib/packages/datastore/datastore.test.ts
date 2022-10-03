import { CreateDatastoreFromSeedReq, DatastoreUpdateSetting, IsExistsDSDisplayIDExcludeOwnReq } from '../../types/datastore';
import Datastore from '.';
import Auth from '../auth';
import AuthMw from '../middlware/auth';
import Application from '../application';
import User from '../user';
require('dotenv').config();
/**
 * Test with class Datastore
 * @cmdruntest yarn jest src/lib/packages/datastore/datastore.test.ts
 */

const url = process.env.URL || '';
let tokenDs = process.env.TOKEN || '';
const workspaceId = process.env.WORKSPACEID || '';
let datastoreId = process.env.DATASTOREID || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';
const projectID = process.env.PROJECT_ID || '';
const templateName = process.env.TEMPLATE_NAME || '';
let datastoreIdAfterCreate = '';
let u_id = '';

beforeAll(async () => {
  if (email && password) {
    console.log('[email, password]: ', email, password);
    const auth = new Auth(url);
    const { token, error } = await auth.login({ email, password });

    if (token) {
      const user = new User(url, token);
      const { userInfo } = await user.get(token);
      userInfo?.u_id ? u_id = userInfo?.u_id : '';
      return (tokenDs = token);
    } else {
      throw Error(`Need login faild to initialize sdk: ${error}`);
    }
  }
});

beforeAll(async () => {
  jest.useFakeTimers('legacy');
  const application = new Application(url, tokenDs);

  const { appAndDs } = await application.getProjectsAndDatastores(workspaceId);
  if (
    appAndDs &&
    appAndDs[0] &&
    appAndDs[0].datastores &&
    appAndDs[0].datastores[0].datastore_id
  ) {
    datastoreId = appAndDs[0].datastores[0].datastore_id;
  }
});

describe('Datastore', () => {
  // describe('#getField()', () => {
  //   it('should get field setting in Ds', async () => {
  //     jest.useFakeTimers('legacy');
  //     try {
  //       if (datastoreId) {
  //         const datastore = new Datastore(url, tokenDs);
  //         const { dsField } = await datastore.getField('', datastoreId);
  //         // expect response
  //         if (dsField) {
  //           expect(typeof dsField).toBe('object');
  //         }
  //       }
  //     } catch (e) {
  //       throw new Error(`Error: ${e}`);
  //     }
  //   });
  // });

  // describe('#getActions()', () => {
  //   it('should get actions in Ds', async () => {
  //     jest.useFakeTimers('legacy');
  //     try {
  //       if (datastoreId) {
  //         const datastore = new Datastore(url, tokenDs);

  //         const { dsActions } = await datastore.getActions(datastoreId);

  //         // expect response
  //         if (
  //           dsActions &&
  //           dsActions[0] &&
  //           dsActions[0].name &&
  //           dsActions[0].workspace_id
  //         ) {
  //           expect(typeof dsActions[0].name).toBe('string');
  //           expect(typeof dsActions[0].workspace_id).toBe('string');
  //         }
  //       }
  //     } catch (e) {
  //       throw new Error(`Error: ${e}`);
  //     }
  //   });
  // });

  // describe('#getStatuses()', () => {
  //   it('should get status in Ds', async () => {
  //     jest.useFakeTimers('legacy');
  //     const datastore = new Datastore(url, tokenDs);

  //     const { dsStatuses, error } = await datastore.getStatuses(datastoreId);

  //     // expect response
  //     if (dsStatuses) {
  //       expect(typeof dsStatuses).toBe('object');
  //     } else {
  //       throw new Error(`Error: ${error}`);
  //     }
  //   });
  // });

  // describe('#getAction()', () => {
  //   it('should get action by Id in Ds', async () => {
  //     jest.useFakeTimers('legacy');

  //     let actionId;

  //     const datastore = new Datastore(url, tokenDs);
  //     const dsA = await datastore.getActions(datastoreId);
  //     const actions = dsA?.dsActions;
  //     if (actions) {
  //       for (let i = 0; i < actions.length; i++) {
  //         if (actions[i].operation == 'create') {
  //           actionId = actions[i].action_id;
  //         }
  //       }
  //     } else {
  //       throw new Error(`Error: ${dsA.error}`);
  //     }

  //     if (actionId) {
  //       const { dsAction, error } = await datastore.getAction(
  //         datastoreId,
  //         actionId
  //       );

  //       // expect response
  //       if (dsAction) {
  //         expect(typeof dsAction.workspace_id).toBe('string');
  //         expect(typeof dsAction.name).toBe('string');
  //       } else {
  //         throw new Error(`Error: ${error}`);
  //       }
  //     }
  //   });
  // });

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
            user_id: u_id,
          },
        };
        const { datastoreId } = await datastore.createDatastoreFromTemplate(payload);

        if (datastoreId) {
          datastoreIdAfterCreate = datastoreId;
          expect(typeof datastoreId).toBe('string');
        } else {
          throw new Error('Invalid datastoreId');
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
              datastore_id: datastoreIdAfterCreate,
              name: {
                en: 'DSN_001',
                ja: 'DSN_001',
              },
              display_id: 'display_id_001',
            },
          };
          const validate: IsExistsDSDisplayIDExcludeOwnReq = {
            validate: {
              datastoreId: datastoreIdAfterCreate,
              displayId: 'displayId_001',
              projectId: projectID,
            }
          };
          const { data, error } = await datastore.updateDatastoreSetting(payload, validate);
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
          const { data, error } = await datastore.deleteDatastore(datastoreIdAfterCreate);

          if (data) {
            expect(typeof datastoreId).toBe('string');
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

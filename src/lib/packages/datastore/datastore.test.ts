import { CreateDatastoreFromSeedReq, DatastoreUpdateSetting, IsExistsDSDisplayIDExcludeOwnReq } from '../../types/datastore';
import Datastore from '.';
import Auth from '../auth';
import AuthMw from '../middleware/auth';
import Project from '../project';
import User from '../user';
import Workspace from '../workspace';
import HexabaseClient from '../../../HexabaseClient';
require('dotenv').config();
/**
 * Test with class Datastore
 * @cmdruntest yarn jest src/lib/packages/datastore/datastore.test.ts
 */

let tokenDs = process.env.TOKEN || '';
let userId = '';
let newDatastoreId: string | undefined = process.env.DATASTOREID || '';
let workspaceId = process.env.WORKSPACEID || '';
let projectID = '';
let client: HexabaseClient;
let workspace: Workspace;
const datastoreId = process.env.DATASTOREID || '';
const projectIDAutoNum = process.env.PROJECT_ID || '';
const fieldIdAutoNum = process.env.FIELDID || '';
const url = process.env.URL || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';
const templateName = process.env.TEMPLATE_NAME || '';

const createWorkSpaceInput = {
  name: 'new Workspace'
};

let project: Project;

beforeAll(async () => {
  client = new HexabaseClient;
  await client.login({ email, password, token: tokenDs });
  const workspace = await client.workspaces.getCurrent();
  project = workspace.project();
  project.name = {
    en: 'EN Project',
    ja: 'JA Project',
  };
  await project.save();

  const datastore = project.datastore();
  datastore.name = 'new datastore';
  await datastore.save();
});

describe('Datastore', () => {
  describe('#get()', () => {
    it('should get all datastore without error', async () => {
      jest.useFakeTimers('legacy');
      try {
        if (newDatastoreId) {
          const project = new Project();
          project.id = projectID;
          const datastore = new Datastore();
          datastore.project = project;
          const datastores = await project.datastores();
          expect(typeof datastores).toBe(Array);
        }
      } catch (e) {
        throw new Error(`Error: ${e}`);
      }
    });
  });
  /*
  describe('#getDetail()', () => {
    it('should get fields without error', async () => {
      jest.useFakeTimers('legacy');
      try {
        if (newDatastoreId) {
          const datastore = new Datastore(url, tokenDs);
          const { datastoreSetting, error } = await datastore.getDetail(newDatastoreId);
          // expect response
          if (datastoreSetting) {
            expect(typeof datastoreSetting).toBe('object');
          } else {
            throw new Error(`Error: ${error}`);
          }
        }
      } catch (e) {
        throw new Error(`Error: ${e}`);
      }
    });
  });

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

        if (!datastoreId) newDatastoreId = datastoreId;
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

  describe('#getFields()', () => {
    it('should get fields in Ds', async () => {
      jest.useFakeTimers('legacy');
      try {
        if (newDatastoreId) {
          const datastore = new Datastore(url, tokenDs);
          const { dsFields, error } = await datastore.getFields(newDatastoreId, projectID);
          // expect response
          if (dsFields) {
            expect(typeof dsFields).toBe('object');
          } else {
            throw new Error(`Error: ${error}`);
          }
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
      if (newDatastoreId) {
        const { dsStatuses, error } = await datastore.getStatuses(newDatastoreId);
        // expect response
        if (dsStatuses) {
          expect(typeof dsStatuses).toBe('object');
        } else {
          throw new Error(`Error: ${error}`);
        }
      }
    });
  });

  describe('#getAction()', () => {
    it('should get action by Id in Ds', async () => {
      jest.useFakeTimers('legacy');

      let actionId;

      const datastore = new Datastore(url, tokenDs);
      if (newDatastoreId) {
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
              display_id: 'dsId_update_001',
              name: {
                en: 'EN name update',
                ja: 'JA name update'
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

  describe('#getAutoNumber()', () => {
    it('should datastore get field auto number without error', async () => {
      jest.useFakeTimers('legacy');
      try {
        if (datastoreId && projectIDAutoNum && fieldIdAutoNum) {
          const datastore = new Datastore(url, tokenDs);
          const { dsGetFieldAutoNum, error } = await datastore.getAutoNumber(projectIDAutoNum, datastoreId, fieldIdAutoNum);

          if (dsGetFieldAutoNum) expect(typeof dsGetFieldAutoNum?.result).toBe('object');
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
  */
});

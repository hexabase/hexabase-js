import { CreateDatastoreFromSeedReq, DatastoreUpdateSetting, IsExistsDSDisplayIDExcludeOwnReq } from '../../types/datastore';
import Workspace from '../workspace';
import Datastore from '.';
import Project from '../project';
import HexabaseClient from '../../../HexabaseClient';
import Field from '../field';
import { FieldNameENJP } from '../../util/type';
require('dotenv').config();
/**
 * Test with class Datastore
 * @cmdruntest yarn jest src/lib/packages/datastore/datastore.test.ts
 */
let tokenDs = process.env.TOKEN || '';
const client = new HexabaseClient;
const workspaceId = process.env.DEV_WORKSPACE_ID;
const datastoreId = process.env.DEV_DATASOTRE_ID || '';
const projectId = process.env.DEV_PROJECT_ID || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';


let project: Project;
let datastore: Datastore;

beforeAll(async () => {
  await client.login({ email, password, token: tokenDs });
  client.setWorkspace(workspaceId!)
  const ary = await client.currentWorkspace!.projects();
  const p = ary.map((project) => {
    const name = project.name as FieldNameENJP;
    if (name.ja === 'JA Project' || name.ja === '新しいプロジェクト') {
      return project.delete();
    }
  });
  await Promise.all(p);
  project = await client.currentWorkspace!.project();
  project.name = {
    en: 'EN Project',
    ja: 'JA Project',
  };
  await project.save();
  datastore = await project.datastore();
  await datastore.save();
  await new Promise(resolve => setTimeout(resolve, 5000));
});

afterAll(async () => {
  await project.delete();
});

describe('Datastore', () => {
  describe('#create()', () => {
    it('should create datastore without error', async () => {
      // jest.useFakeTimers('legacy');
      try {
        const datastore = await project.datastore();
        const bol = await datastore.save();
        expect(bol).toBe(true);
      } catch (e) {
        throw new Error(`Error: ${e}`);
      }
    });
  });

  describe('#get()', () => {
    it('should get all datastore without error', async () => {
      // jest.useFakeTimers('legacy');
      try {
        const datastores = await project.datastores();
        expect(typeof datastores.length).toBe('number');
      } catch (e) {
        throw new Error(`Error: ${e}`);
      }
    });
  });
  
  describe('#getDetail()', () => {
    it('should get fields without error', async () => {
      // jest.useFakeTimers('legacy');
      try {
        const project = await client.currentWorkspace!.project(projectId);
        const datastore = await project.datastore(datastoreId);
        const bol = await datastore.fetch();
        expect(bol).toBe(true);
      } catch (e) {
        throw new Error(`Error: ${e}`);
      }
    });
  });
  
  describe('#getFields()', () => {
    it('should get fields in Ds', async () => {
      jest.useFakeTimers('legacy');
      try {
        const project = await client.currentWorkspace!.project(projectId);
        const datastore = await project.datastore(datastoreId);
        const fields = await datastore.fields();
        expect(fields[0] instanceof Field).toBe(true);
      } catch (e) {
        throw new Error(`Error: ${e}`);
      }
    });
  });
  
  describe('#getField()', () => {
    it('should get field setting in Ds', async () => {
      jest.useFakeTimers('legacy');
      try {
        const project = await client.currentWorkspace!.project(projectId);
        const datastore = await project.datastore(datastoreId);
        const fields = await datastore.fields();
        const field = await datastore.field(fields[0].id);
        expect(field instanceof Field).toBe(true);
      } catch (e) {
        throw new Error(`Error: ${e}`);
      }
    });
  });
  
  describe('#getActions()', () => {
    it('should get actions in Ds', async () => {
      jest.useFakeTimers('legacy');
      try {
        const project = await client.currentWorkspace!.project(projectId);
        const datastore = await project.datastore(datastoreId);
        const actions = await datastore.actions();
        const action = actions[0];
        expect(typeof action.name).toBe('string');
        expect(typeof action.datastore.id).toBe('string');
      } catch (e) {
        throw new Error(`Error: ${e}`);
      }
    });
  });
  
  describe('#getStatuses()', () => {
    it('should get status in Ds', async () => {
      jest.useFakeTimers('legacy');
      const project = await client.currentWorkspace!.project(projectId);
      const datastore = await project.datastore(datastoreId);
      const status = await datastore.statuses();
      expect(typeof status[0].displayId).toBe('string');
      expect(typeof status[0].id).toBe('string');
    });
  });
  
  describe('#getAction()', () => {
    it('should get action by Id in Ds', async () => {
      jest.useFakeTimers('legacy');
      const project = await client.currentWorkspace!.project(projectId);
      const datastore = await project.datastore(datastoreId);
      const action = await datastore.action('new');
      expect(typeof action!.id).toBe('string');
      expect(typeof action!.name).toBe('string');
    });
  });
  
  describe('#validateDatastoreDisplayID()', () => {
    it('should validate display id datastore current without error', async () => {
      jest.useFakeTimers('legacy');
      try {
        const project = await client.currentWorkspace!.project(projectId);
        const datastore = await project.datastore(datastoreId);
        const bol = await datastore.validateDisplayId('dsId_update_001');
        expect(typeof bol).toBe('boolean');
        expect(bol).toBe(false);
        // if (typeof exits === 'boolean') expect(typeof exits).toBe('boolean');
        //  else throw new Error(`Error: ${error}`);
      } catch (e) {
        throw new Error(`Error: ${e}`);
      }
    });
  });
  
  describe('#updateDatastore()', () => {
    it('should update datastore current without error', async () => {
      jest.useFakeTimers('legacy');
      datastore.displayId = 'dsId_update_002';
      datastore.name = {
        en: 'EN name update',
        ja: 'JA name update',
      };
      try {
        const bol = await datastore.save();
        expect(bol).toBe(true);
      } catch (e) {
        throw new Error(`Error: ${e}`);
      }
    });
  });

  describe('#getAutoNumber()', () => {
    it('should datastore get field auto number without error', async () => {
      jest.useFakeTimers('legacy');
      try {
        const project = await client.currentWorkspace!.project(projectId);
        const datastore = await project.datastore(datastoreId);
        const number = await datastore.autoNumber('autoNum');
        expect(typeof number).toBe('number');
      } catch (e) {
        throw new Error(`Error: ${e}`);
      }
    });
  });

  describe('#deleteDatastore()', () => {
    it('should delete datastore current without error', async () => {
      jest.useFakeTimers('legacy');
      try {
        const bol = await datastore.delete();
        expect(bol).toBe(true);
      } catch (e) {
        throw new Error(`Error: ${e}`);
      }
    });
  });
});

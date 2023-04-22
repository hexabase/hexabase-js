import { CreateDatastoreFromSeedReq, DatastoreUpdateSetting, IsExistsDSDisplayIDExcludeOwnReq } from '../../types/datastore';
import Workspace from '../workspace';
import Datastore from '.';
// import Auth from '../auth';
// import AuthMw from '../middleware/auth';
import Project from '../project';
// import User from '../user';
import HexabaseClient from '../../../HexabaseClient';
import Field from '../field';
import { FieldNameENJP } from '../../util/type';
import Action from '../action';
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
let datastore: Datastore;

beforeAll(async () => {
  client = new HexabaseClient;
  await client.login({ email, password, token: tokenDs });
  const workspace = await client.workspaces.getCurrent();
  const ary = await workspace.projects();
  const p = ary.map((project) => {
    const name = project.name as FieldNameENJP;
    if (name.ja === 'JA Project 3' || name.ja === '新しいプロジェクト') {
      return project.delete();
    }
  });
  await Promise.all(p);
  project = workspace.project();
  project.name = {
    en: 'EN Project',
    ja: 'JA Project',
  };
  await project.save();
});

afterAll(async () => {
  await project.delete();
});

describe('Datastore', () => {
  describe('#create()', () => {
    it('should create datastore without error', async () => {
      // jest.useFakeTimers('legacy');
      try {
        datastore = await project.datastore();
        const bol = await datastore.save();
        expect(bol).toBe(true);
        await new Promise(resolve => setTimeout(resolve, 5000));
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
        const bol = await datastore.getDetail();
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
        const workspace = await client.workspaces.getCurrent();
        const project = workspace.project('6442397a31136e9dd84dc0de');
        const datastore = project.datastore('6442398d3a92ee71b4301204');
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
        const workspace = await client.workspaces.getCurrent();
        const project = workspace.project('6442397a31136e9dd84dc0de');
        const datastore = project.datastore('6442398d3a92ee71b4301204');
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
        const workspace = await client.workspaces.getCurrent();
        const project = workspace.project('6442397a31136e9dd84dc0de');
        const datastore = project.datastore('6442398d3a92ee71b4301204');
        
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
      const workspace = await client.workspaces.getCurrent();
      const project = workspace.project('6442397a31136e9dd84dc0de');
      const datastore = project.datastore('6442398d3a92ee71b4301204');
      const status = await datastore.statuses();
      expect(typeof status[0].displayId).toBe('string');
      expect(typeof status[0].id).toBe('string');
    });
  });
  
  describe('#getAction()', () => {
    it('should get action by Id in Ds', async () => {
      jest.useFakeTimers('legacy');
      const workspace = await client.workspaces.getCurrent();
      const project = workspace.project('6442397a31136e9dd84dc0de');
      const datastore = project.datastore('6442398d3a92ee71b4301204');
      const actions = await datastore.actions();
      const createAction = actions
        .find((action) => action.operation === 'new');
      const action = await datastore.action(createAction!.id);
      expect(typeof action.id).toBe('string');
      const name = action.name as FieldNameENJP;
      expect(typeof name.ja).toBe('string');
    });
  });
  
  describe('#validateDatastoreDisplayID()', () => {
    it('should validate display id datastore current without error', async () => {
      jest.useFakeTimers('legacy');
      try {
        const workspace = await client.workspaces.getCurrent();
        const project = workspace.project('6442397a31136e9dd84dc0de');
        const datastore = project.datastore('6442398d3a92ee71b4301204');
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
      const workspace = await client.workspaces.getCurrent();
      const project = workspace.project('6442397a31136e9dd84dc0de');
      const datastore = project.datastore('6442398d3a92ee71b4301204');
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
        const workspace = await client.workspaces.getCurrent();
        const project = workspace.project('6442397a31136e9dd84dc0de');
        const datastore = project.datastore('6442398d3a92ee71b4301204');
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

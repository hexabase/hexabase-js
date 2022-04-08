import Datastore from '.';
import AuthMw from '../middlware/auth';
require('dotenv').config();
/**
 * Test with class Datastore
 * @cmdruntest yarn jest src/lib/packages/datastore/datastore.test.ts
 */

const url = process.env.URL || '';
let tokenDs = process.env.TOKEN || '';
const workspaceId = process.env.WORKSPACEID || '';
const fieldId = process.env.FIELDID || '';
const datastoreId = process.env.DATASTOREID || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';

beforeAll( async () => {
  if (email && password) {
    console.log('[email, password]: ', email, password);
    const authMw = new AuthMw(url);
    const {token, error} = await authMw.loginAsync({email, password});
    if (token) {
      return tokenDs = token;
    } else {
      throw Error(`Need login faild to initialize sdk: ${error}`);
    }
  }
});

describe('Datastore', () => {
  describe('#dsFieldSettingsAsync()', () => {
    it('should get field setting in Ds', async () => {
      jest.useFakeTimers('legacy');
      const datastore = new Datastore(url, tokenDs);

      const {dsFieldSettings, error} = await datastore.dsFieldSettingsAsync('', datastoreId);

      // expect response
      if(dsFieldSettings && dsFieldSettings.workspace_id) {
        console.log('dsFieldSettings: ', dsFieldSettings);

        expect(typeof dsFieldSettings.workspace_id).toBe('string');
        expect(typeof dsFieldSettings.project_id).toBe('string');
        expect(typeof dsFieldSettings.datastore_id).toBe('string');
        expect(typeof dsFieldSettings.field_id).toBe('string');
        expect(typeof dsFieldSettings.display_id).toBe('string');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#dsActions()', () => {
    it('should get actions in Ds', async () => {
      jest.useFakeTimers('legacy');
      const datastore = new Datastore(url, tokenDs);

      const {dsActions, error} = await datastore.dsActionsAsync(datastoreId);

      // expect response
      if (dsActions) {
        // console.log('dsActions: ', dsActions);

        expect(typeof dsActions[0].name).toBe('string');
        expect(typeof dsActions[0].workspace_id).toBe('string');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });
  describe('#dsStatusAsync()', () => {
    it('should get status in Ds', async () => {
      jest.useFakeTimers('legacy');
      const datastore = new Datastore(url, tokenDs);

      const {dsStatuses, error} = await datastore.dsStatusAsync(datastoreId);

      // expect response
      if (dsStatuses) {
        // console.log('dsStatus: ', dsStatuses);

        expect(typeof dsStatuses[0].display_id).toBe('string');
        expect(typeof dsStatuses[0].sort_id).toBe('number');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });
});

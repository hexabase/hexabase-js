import Datastore from '.';
import Auth from '../auth';
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
    const auth = new Auth(url);
    const {token, error} = await auth.loginAsync({email, password});
    if (token) {
      return tokenDs = token;
    } else {
      throw Error(`Need login faild to initialize sdk: ${error}`);
    }
  }
});

describe('Datastore', () => {
  describe('#getFieldSettingsAsync()', () => {
    it('should get field setting in Ds', async () => {
      jest.useFakeTimers('legacy');
      const datastore = new Datastore(url, tokenDs);

      const {dsFieldSettings, error} = await datastore.getFieldSettingsAsync('', datastoreId);

      // expect response
      if (dsFieldSettings && dsFieldSettings.workspace_id) {

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

  describe('#getActionsAsync()', () => {
    it('should get actions in Ds', async () => {
      jest.useFakeTimers('legacy');
      const datastore = new Datastore(url, tokenDs);

      const {dsActions, error} = await datastore.getActionsAsync(datastoreId);

      // expect response
      if (dsActions) {

        expect(typeof dsActions[0].name).toBe('string');
        expect(typeof dsActions[0].workspace_id).toBe('string');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#getStatusesAsync()', () => {
    it('should get status in Ds', async () => {
      jest.useFakeTimers('legacy');
      const datastore = new Datastore(url, tokenDs);

      const {dsStatuses, error} = await datastore.getStatusesAsync(datastoreId);

      // expect response
      if (dsStatuses) {

        expect(typeof dsStatuses[0].display_id).toBe('string');
        expect(typeof dsStatuses[0].sort_id).toBe('number');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });
});

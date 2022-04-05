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
const email = process.env.EMAIL || ''
const password = process.env.PASSWORD || ''

beforeAll( async () => {
  if(email && password) {
    console.log('[email, password]: ', email, password);
    const authMw = new AuthMw(url);
    const {token, error} = await authMw.loginAsync({email, password});
    if(token){
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

      const {dsFieldSettings, error} = await datastore.dsFieldSettingsAsync(fieldId, datastoreId);

      // expect response
      if(dsFieldSettings) {
        console.log('dsFieldSettings: ', dsFieldSettings);

        expect(typeof dsFieldSettings.workspace_id).toBe('string');
        expect(typeof dsFieldSettings.project_id).toBe('string');
        expect(typeof dsFieldSettings.datastore_id).toBe('string');
        expect(typeof dsFieldSettings.field_id).toBe('string');
        expect(typeof dsFieldSettings.display_id).toBe('string');
      }else{
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
      if(dsActions) {
        console.log('dsActions: ', dsActions);

        expect(typeof dsActions.name).toBe('string');
        expect(typeof dsActions.workspace_id).toBe('string');
      }else{
        throw new Error(`Error: ${error}`);
      }
    });
  });
});

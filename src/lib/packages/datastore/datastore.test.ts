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
const actionId = process.env.ACTIONID || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';

beforeAll( async () => {
  if (email && password) {
    console.log('[email, password]: ', email, password);
    const auth = new Auth(url);
    const {token, error} = await auth.login({email, password});
    if (token) {
      return tokenDs = token;
    } else {
      throw Error(`Need login faild to initialize sdk: ${error}`);
    }
  }
});

describe('Datastore', () => {
  describe('#getField()', () => {
    it('should get field setting in Ds', async () => {
      jest.useFakeTimers('legacy');
      const datastore = new Datastore(url, tokenDs);

      const {dsField, error} = await datastore.getField('', datastoreId);

      // expect response
      if (dsField && dsField.workspace_id) {

        expect(typeof dsField.workspace_id).toBe('string');
        expect(typeof dsField.project_id).toBe('string');
        expect(typeof dsField.datastore_id).toBe('string');
        expect(typeof dsField.field_id).toBe('string');
        expect(typeof dsField.display_id).toBe('string');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#getActions()', () => {
    it('should get actions in Ds', async () => {
      jest.useFakeTimers('legacy');
      const datastore = new Datastore(url, tokenDs);

      const {dsActions, error} = await datastore.getActions(datastoreId);

      // expect response
      if (dsActions) {

        expect(typeof dsActions[0].name).toBe('string');
        expect(typeof dsActions[0].workspace_id).toBe('string');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#getStatuses()', () => {
    it('should get status in Ds', async () => {
      jest.useFakeTimers('legacy');
      const datastore = new Datastore(url, tokenDs);

      const {dsStatuses, error} = await datastore.getStatuses(datastoreId);

      // expect response
      if (dsStatuses) {

        expect(typeof dsStatuses[0].display_id).toBe('string');
        expect(typeof dsStatuses[0].sort_id).toBe('number');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#getAction()', () => {
    it('should get action by Id in Ds', async () => {
      jest.useFakeTimers('legacy');
      const datastore = new Datastore(url, tokenDs);

      const {dsAction, error} = await datastore.getAction(datastoreId, actionId);

      // expect response
      if (dsAction) {

        expect(typeof dsAction.workspace_id).toBe('string');
        expect(typeof dsAction.name).toBe('string');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });
});

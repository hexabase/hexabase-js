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
const datastoreId = process.env.DATASTOREID || '';
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
      if (dsField) {
        expect(typeof dsField).toBe('object');
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
      const actions = dsA?.dsActions
      if (actions) {
        for (let i=0; i < actions.length; i++) {
          if (actions[i].operation == 'create') {
            actionId = actions[i].action_id;
          }
        }
      } else {
        throw new Error(`Error: ${dsA.error}`);
      }

      if (actionId) {
        const {dsAction, error} = await datastore.getAction(datastoreId, actionId);
        
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
});
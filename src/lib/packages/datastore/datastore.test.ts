import Datastore from '.';
require('dotenv').config();
/**
 * Test with class Datastore
 * @cmdruntest yarn jest src/lib/packages/datastore/datastore.test.ts
 */

const url = process.env.URL || '';
const token = process.env.TOKEN || '';
const workspaceId = process.env.WORKSPACEID || '';
const fieldId = process.env.FIELDID || '';
const datastoreId = process.env.DATASTOREID || '';

describe('Datastore', () => {
  describe('#dsFieldSettingsAsync()', () => {
    it('should get field setting in Ds', async () => {
      jest.useFakeTimers('legacy');
      const datastore = new Datastore(
        url,
        token
      );

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
        console.log('error: ', error)
      
        expect(typeof error).toBe('string');
      }
    });
  });

  describe('#dsActions()', () => {
    it('should get actions in Ds', async () => {
      jest.useFakeTimers('legacy');
      const datastore = new Datastore(
        url,
        token
      );

      const {dsActions, error} = await datastore.dsActions(datastoreId);

      // expect response
      if(dsActions) {
        console.log('dsActions: ', dsActions);

        expect(typeof dsActions.name).toBe('string');
        expect(typeof dsActions.workspace_id).toBe('string');
      }else{
        console.log('error: ', error)
      
        expect(typeof error).toBe('string');
      }
    });
  });
});

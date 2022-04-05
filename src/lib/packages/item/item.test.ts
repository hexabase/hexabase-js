import Item from '.';
import AuthMw from '../middlware/auth';
require('dotenv').config();
/**
 * Test with class Datastore
 * @cmdruntest yarn jest src/lib/packages/datastore/datastore.test.ts
 */

const url = process.env.URL || '';
let tokenDs = process.env.TOKEN || '';
const workspaceId = process.env.WORKSPACEID || '';
const applicationId = process.env.APPLICATIONID || ''
const datastoreId = process.env.DATASTOREID || '';
const fieldId = process.env.FIELDID || '';
const email = process.env.EMAIL || ''
const password = process.env.PASSWORD || ''

// local variable in file for testing
const getItemsParameters = {
  "page": 1,
  "per_page": 0
}


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

describe('Item', () => {
  describe('#getItemsAsync()', () => {
    it('should get items in Ds', async () => {
      jest.useFakeTimers('legacy');
      const item = new Item(url, tokenDs);

      const {dsItems, error} = await item.getItemsAsync(getItemsParameters, datastoreId, applicationId);

      // expect response
      if(dsItems) {
        console.log('Items in Datastore: ', dsItems);

        expect(typeof dsItems.totalItems).toBe('number');
      }else{
        throw new Error(`Error: ${error}`);
      }
    });
  });

});

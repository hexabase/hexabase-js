import Storage from '.';
import Auth from '../auth';
require('dotenv').config();
/**
 * Test with class Storage
 * @cmdruntest yarn jest src/lib/packages/storage/storage.test.ts
 */

let tokenStr = process.env.TOKEN || '';
const fileID = process.env.FILE_ID || '';
const url = process.env.URL || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';
const datastoreId = process.env.DATASTOREID || '';
const projectId = process.env.APPLICATIONID || '';
const itemId = process.env.ITEMID || '';
const fieldId = process.env.FIELDID || '';
const content = process.env.CONTENTFILE || '';
const contentTypeFile = process.env.CONTENTTYPEFILE || '';
const nameFile = process.env.NAMEFILE || '';

const payload = {
  contentTypeFile: contentTypeFile,
  filename: nameFile,
  filepath: `${datastoreId}/${itemId}/${fieldId}/${nameFile}`,
  d_id: datastoreId,
  p_id: projectId,
  item_id: itemId,
  display_order: 0,
  field_id: fieldId,
  content: content
};

beforeAll(async () => {
  if (email && password) {
    console.log('[email, password]: ', email, password);
    const auth = new Auth(url);
    const { token, error } = await auth.login({ email, password });
    if (token) {
      return tokenStr = token;
    } else {
      throw Error(`Need login fail to initialize sdk: ${error}`);
    }
  }
});
// testing storage
describe('User', () => {
  describe('#createFile()', () => {
    it('should get download file without error', async () => {
      jest.useFakeTimers('legacy');
      const storage = new Storage(url, tokenStr);
      const { data, error } = await storage.createFile(payload);
      if (data && data.file_id) {
        console.log('data.file_id', data.file_id);
        expect(typeof data.file_id).toBe('string');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#getFile()', () => {
    it('should get download file without error', async () => {
      jest.useFakeTimers('legacy');
      const storage = new Storage(url, tokenStr);
      const { file, error } = await storage.getFile(fileID);
      if (file) {
        expect(typeof file.data).toBe('string');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#delete()', () => {
    it('should delete file without error', async () => {
      jest.useFakeTimers('legacy');
      const storage = new Storage(url, tokenStr);
      const { data, error } = await storage.delete(fileID);
      if (data) {
        expect(typeof data).toBe('object');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

});

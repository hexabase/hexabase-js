require('dotenv').config();
import HexabaseClient from '../../../HexabaseClient';
import { Blob } from 'buffer';
import FileObject from '../fileObject';

const client = new HexabaseClient();
const workspaceId = process.env.PROD_WORKSPACE_ID;
const datastoreId = process.env.PROD_DATASOTRE_ID || '';
const projectId = process.env.PROD_PROJECT_ID || '';
const email = process.env.PROD_EMAIL || '';
const password = process.env.PROD_PASSWORD || '';


beforeAll(async () => {
  await client.login({ email, password });
  client.setWorkspace(workspaceId!);
});

describe('Item', () => {

  describe('#update()', () => {
    it('should update item in datastore with notify', async () => {
      jest.useFakeTimers('legacy');
      const project = await client.currentWorkspace!.project(projectId);
      const datastore = await project.datastore(datastoreId);
      const item = await datastore.item();
      item.set('name', name());
      const bol = await item.save();
      expect(bol).toBe(true);
      console.log(item.id);
      item.subscribe('update', data => {
        console.log(data);
        item.unsubscribe();
      });
      item.set('name', name());
      await item.save({ comment: 'notify'});
      expect(item.revNo).toBe(2);
    });
  });
});

const name = () => {
  return (new Date).toISOString() + Math.random().toString(32).substring(2);
};
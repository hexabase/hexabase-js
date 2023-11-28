require('dotenv').config();
import HexabaseClient from '../../../HexabaseClient';
import { Blob } from 'buffer';
import FileObject from '../fileObject';

const token = process.env.TOKEN || '';
const client = new HexabaseClient();
const workspaceId = process.env.DEV_WORKSPACE_ID;
const datastoreId = process.env.DEV_DATASOTRE_ID || '';
const linkedDatastoreId = process.env.DEV_RELATED_DATASOTRE_ID || '';
const projectId = process.env.DEV_PROJECT_ID || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';


beforeAll(async () => {
  await client.login({ email, password, token });
});

describe('ItemLink', () => {
  describe('#createLink()', () => {
    it('should create item link in datastore', async () => {
      jest.useFakeTimers('legacy');
      const project = await client.currentWorkspace!.project(projectId);
      const datastore1 = await project.datastore(datastoreId);
      const datastore2 = await project.datastore(linkedDatastoreId);
      const item1 = await datastore1.item();
      const item2 = await datastore2.item();
      await item2
        .set('title', (new Date).toISOString() + Math.random().toString(32).substring(2))
        .save();
      const item3 = await datastore2.item();
      await item3
        .set('title', (new Date).toISOString() + Math.random().toString(32).substring(2))
        .save();
      const randomString = Math.random().toString(36).substring(7);
      const bol = await item1
        .set('test_text', `${(new Date).toISOString()}-${randomString}`)
        .set('test_dslookup', item2)
        .link(item2)
        .link(item3)
        .save();
      expect(bol).toBe(true);
    });
  });


  describe('#deleteLink()', () => {
    it('should delete item link in datastore', async () => {
      jest.useFakeTimers('legacy');
      const project = await client.currentWorkspace!.project(projectId);
      const datastore1 = await project.datastore(datastoreId);
      const datastore2 = await project.datastore(linkedDatastoreId);
      const item1 = await datastore1.item();
      const item2 = await datastore2.item();
      const item3 = await datastore2.item();
      await item2
        .set('title', name())
        .save();
      await item3
        .set('title', name())
        .save();
      await item1
        .set('test_text', name())
        .set('test_dslookup', item2)
        .link(item2)
        .link(item3)
        .save();
      const ary = await item1.links(item2.datastore.id);
      console.log({ ary });
      const bol = await item1
        .unlink(item2)
        .save();
      expect(bol).toBe(true);
    });
  });

  describe('#getRelated()', () => {
    it('should get related items', async () => {
      jest.useFakeTimers('legacy');
      const project = await client.currentWorkspace!.project(projectId);
      const datastore1 = await project.datastore(datastoreId);
      const datastore2 = await project.datastore(linkedDatastoreId);
      const item1 = await datastore1.item();
      const item2 = await datastore2.item();
      await item2
        .set('title', (new Date).toISOString() + Math.random().toString(32).substring(2))
        .save();
      const item3 = await datastore2.item();
      await item3
        .set('title', (new Date).toISOString() + Math.random().toString(32).substring(2))
        .save();
      const randomString = Math.random().toString(36).substring(7);
      const bol = await item1
        .set('test_text', `${(new Date).toISOString()}-${randomString}`)
        .set('test_dslookup', item2)
        .link(item2)
        .link(item3)
        .save();
      expect(bol).toBe(true);

      const items = await item1.links(linkedDatastoreId);
      expect(items[0].datastore.id).toBe(linkedDatastoreId);
    });
  });
});

const name = () => {
  return (new Date).toISOString() + Math.random().toString(32).substring(2);
};
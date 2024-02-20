require('dotenv').config();
import HexabaseClient from '../../../HexabaseClient';


const token = process.env.TOKEN || '';
const client = new HexabaseClient();
const workspaceId = process.env.WORKSPACE_ID;
const datastoreId = process.env.DATASTORE_MAIN || '';
const linkedDatastoreId = process.env.DATASTORE_TEST_RELATED_CHILD1 || '';
const projectId = process.env.PROJECT_ID || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';


beforeAll(async () => {
  await client.login({ email, password, token });
  await client.setWorkspace(workspaceId);
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
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

describe('Item', () => {
  describe('#get()', () => {
    it('should get items in Ds', async () => {
      jest.useFakeTimers('legacy');
      await client.setWorkspace(workspaceId!);
      const project = await client.currentWorkspace!.project(projectId);
      const datastore = await project.datastore(datastoreId);
      const { totalCount } = await datastore.itemsWithCount();
      expect(typeof totalCount).toBe('number');
    });
  });

  describe('#createItemId()', () => {
    it('should create new item id', async () => {
      jest.useFakeTimers('legacy');
      const project = await client.currentWorkspace!.project(projectId);
      const datastore = await project.datastore(datastoreId);
      const itemId = await datastore.createItemId();
      expect(typeof itemId).toBe('string');
    });
  });

  describe('#create()', () => {
    it('should create new items', async () => {
      jest.useFakeTimers('legacy');
      const project = await client.currentWorkspace!.project(projectId);
      const datastore = await project.datastore(datastoreId);
      const item = await datastore.item();
      item.set('test_text_unique', name());
      const bol = await item.save();
      // Save item id for next test
      // itemId = item.id;
      expect(bol).toBe(true);
      expect(typeof item.id).toBe('string');
      await item.delete();
    });
  });

  describe('#getHistories()', () => {
    it('should get items histories', async () => {
      jest.useFakeTimers('legacy');
      const project = await client.currentWorkspace!.project(projectId);
      const datastore = await project.datastore(datastoreId);
      const item = await datastore.item();
      item.set('test_text_unique', name());
      await item.save();
      item.set('test_text_unique', name());
      await item.save();
      const histories = await item.histories();
      expect(typeof histories[0].id).toBe('string');
      const { unread } = await item.historiesWithUnread();
      expect(typeof unread).toBe('number');
      await item.delete();
    });
  });

  describe('#getItemDetail()', () => {
    it('should get item detail', async () => {
      jest.useFakeTimers('legacy');
      const project = await client.currentWorkspace!.project(projectId);
      const datastore = await project.datastore(datastoreId);
      const item = await datastore.item();
      item.set('test_text_unique', name());
      await item.save();
      expect(typeof item.title).toBe('string');
    });
  });


  describe('#update()', () => {
    it('should update item in datastore', async () => {
      jest.useFakeTimers('legacy');
      const project = await client.currentWorkspace!.project(projectId);
      const datastore = await project.datastore(datastoreId);
      const item = await datastore.item();
      item.set('test_text_unique', name());
      item.set('test_number', 100);
      const bol = await item.save();
      expect(bol).toBe(true);
      item.set('test_text_unique', name());
      item.set('test_number', 200);
      await item.save();
      expect(item.revNo).toBe(2);
    });
  });

  describe('#execute()', () => {
    it('should execute action for item in datastore', async () => {
      jest.useFakeTimers('legacy');
      const project = await client.currentWorkspace!.project(projectId);
      const datastore = await project.datastore(datastoreId);
      const item = await datastore.item();
      await item.save();
      await item.execute('TestItemActionWithNoAS');
      const item2 = await datastore.item(item.id);
      expect(item.status).toBe(item2.status);
      await item.delete();
    });
  });
});

const name = () => {
  return (new Date).toISOString() + Math.random().toString(32).substring(2);
};
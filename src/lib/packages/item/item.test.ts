require('dotenv').config();
import Item from '.';
import Auth from '../auth';
import Datastore from '../datastore/index';
import Workspace from '../workspace';
import Project from '../project';
import { CreateDatastoreFromSeedReq, DsAction } from '../../types/datastore';
import User from '../user';
import { ArchiveCommentItemsParameters, CreateCommentItemsParameters, UpdateCommentItemsParameters } from '../../types/item';
import HexabaseClient from '../../../HexabaseClient';
import { Blob } from 'buffer';

require('dotenv').config();
/**
 * Test with class Datastore
 * @cmdruntest yarn jest src/lib/packages/datastore/datastore.test.ts
 */
const token = process.env.TOKEN || '';
const client = new HexabaseClient;
const workspaceId = process.env.DEV_WORKSPACE_ID;
const datastoreId = process.env.DEV_DATASOTRE_ID || '';
const linkedDatastoreId = process.env.DEV_RELATED_DATASOTRE_ID || '';
const projectId = process.env.DEV_PROJECT_ID || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';

let linkedItemId: string;

let itemId: string;

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
      const bol = await item.save();
      // Save item id for next test
      itemId = item.id;
      expect(bol).toBe(true);
      expect(typeof item.id).toBe('string');
    });
  });

  describe('#getHistories()', () => {
    it('should get items histories', async () => {
      jest.useFakeTimers('legacy');
      const project = await client.currentWorkspace!.project(projectId);
      const datastore = await project.datastore(datastoreId);
      const item = await datastore.item(itemId);
      const histories = await item.histories();
      expect(typeof histories[0].id).toBe('string');
      const { unread } = await item.historiesWithUnread();
      expect(typeof unread).toBe('number');
    });
  });

  /*
  describe('#getItemRelated()', () => {
    it('should get item related in datastore', async () => {
      jest.useFakeTimers('legacy');
      const item = new Item(url, tokenItem);
      // get items list
      const itemS = await item.get(params, datastoreID, projectId);
      const i = itemS.dsItems?.items?.[0];
      const itemID = i?.i_id;
      const { itemLinked, error } = await item.getItemRelated(datastoreID, itemID, datastoreID);
      // expect response
      if (itemLinked) {

        expect(typeof itemLinked.datastore_id).toBe('string');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });
  */

  describe('#getItemDetail()', () => {
    it('should get item detail', async () => {
      jest.useFakeTimers('legacy');
      const project = await client.currentWorkspace!.project(projectId);
      const datastore = await project.datastore(datastoreId);
      const item = await datastore.item(itemId);
      expect(typeof item.title).toBe('string');
    });
  });

  
  describe('#update()', () => {
    it('should update item in datastore', async () => {
      jest.useFakeTimers('legacy');
      const project = await client.currentWorkspace!.project(projectId);
      const datastore = await project.datastore(datastoreId);
      const item = await datastore.item(itemId);
      // Generate random string
      const randomString = Math.random().toString(36).substring(7);
      item.set('textInputUnique', `${(new Date).toISOString()}-${randomString}`);
      item.set('number', 100);
      const bol = await item.save();
      expect(bol).toBe(true);
      expect(item.revNo).toBe(2);
    });
  });
  
  describe('#execute()', () => {
    it('should execute action for item in datastore', async () => {
      jest.useFakeTimers('legacy');
      const project = await client.currentWorkspace!.project(projectId);
      const datastore = await project.datastore(datastoreId);
      const item = await datastore.item(itemId);
      item.status('MoveToStatus2');
      await item.save();
      const item2 = datastore.item(itemId);
    });
  });
  

  describe('#createComment()', () => {
    it('should create comment items histories', async () => {
      jest.useFakeTimers('legacy');
      const project = await client.currentWorkspace!.project(projectId);
      const datastore = await project.datastore(datastoreId);
      const item = await datastore.item(itemId);
      const comment = item.comment();
      comment.comment = 'create comment';
      const bol = await comment.save();
      expect(bol).toBe(true);
    });
  });

  describe('#updateComment()', () => {
    it('should update comment items histories', async () => {
      jest.useFakeTimers('legacy');
      const newComment = 'update comment message';
      const project = await client.currentWorkspace!.project(projectId);
      const datastore = await project.datastore(datastoreId);
      const item = await datastore.item(itemId);
      const histories = await item.histories();
      const comment = histories[0];
      comment.comment = newComment;
      const bol = await comment.save();
      expect(bol).toBe(true);
      const histories2 = await item.histories();
      expect(histories2[0].comment).toBe(newComment);
      expect(histories2[0].id).toBe(histories[0].id);
    });
  });

  describe('#deleteComment()', () => {
    it('should delete comment items histories', async () => {
      jest.useFakeTimers('legacy');
      const newComment = 'update comment message';
      const project = await client.currentWorkspace!.project(projectId);
      const datastore = await project.datastore(datastoreId);
      const item = await datastore.item(itemId);
      const histories = await item.histories();
      const bol = await histories[0].delete();
      expect(bol).toBe(true);
      const histories2 = await item.histories();
      expect(histories2.length + 1).toBe(histories.length);
    });
  });

  describe('#createLink()', () => {
    it('should create item link in datastore', async () => {
      jest.useFakeTimers('legacy');
      const project = await client.currentWorkspace!.project(projectId);
      const datastore1 = await project.datastore(datastoreId);
      const datastore2 = await project.datastore(linkedDatastoreId);
      const item1 = await datastore1.item();
      const item2 = await datastore2.item();
      await item2
        .set('name', (new Date).toISOString() + Math.random().toString(32).substring(2))
        .save();
      const item3 = await datastore2.item();
      await item3
        .set('name', (new Date).toISOString() + Math.random().toString(32).substring(2))
        .save();
      const randomString = Math.random().toString(36).substring(7);
      const bol = await item1
        .set('textInputUnique', `${(new Date).toISOString()}-${randomString}`)
        .set('database', item2)
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
      await item2
        .set('name', (new Date).toISOString() + Math.random().toString(32).substring(2))
        .save();
      const item3 = await datastore2.item();
      await item3
        .set('name', (new Date).toISOString() + Math.random().toString(32).substring(2))
        .save();
      const randomString = Math.random().toString(36).substring(7);
      await item1
        .set('textInputUnique', `${(new Date).toISOString()}-${randomString}`)
        .set('database', item2)
        .link(item2)
        .link(item3)
        .save();
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
        .set('name', (new Date).toISOString() + Math.random().toString(32).substring(2))
        .save();
      const item3 = await datastore2.item();
      await item3
        .set('name', (new Date).toISOString() + Math.random().toString(32).substring(2))
        .save();
      const randomString = Math.random().toString(36).substring(7);
      const bol = await item1
        .set('textInputUnique', `${(new Date).toISOString()}-${randomString}`)
        .set('database', item2)
        .link(item2)
        .link(item3)
        .save();
      expect(bol).toBe(true);
      
      const items = await item1.links(linkedDatastoreId);
      expect(items[0].datastore.id).toBe(linkedDatastoreId);
    });
  });

  describe('#uploadFile()', () => {
    it('should upload the file', async () => {
      const project = await client.currentWorkspace!.project(projectId);
      const datastore = await project.datastore(datastoreId);
      const item = await datastore.item();
      await item
        .set('file', new Blob(['hello world'], { type: 'text/plain' }))
        .save();
    });
  });
  describe('#delete()', () => {
    it('should delete item in datastore', async () => {
      jest.useFakeTimers('legacy');
      const project = await client.currentWorkspace!.project(projectId);
      const datastore = await project.datastore(datastoreId);
      const item = await datastore.item(itemId);
      const bol = await item.delete();
      expect(bol).toBe(true);
    });
  });
});

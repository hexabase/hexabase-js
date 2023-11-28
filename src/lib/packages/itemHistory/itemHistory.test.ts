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
  describe('#createComment()', () => {
    it('should create comment items histories', async () => {
      jest.useFakeTimers('legacy');
      const project = await client.currentWorkspace!.project(projectId);
      const datastore = await project.datastore(datastoreId);
      const item = await datastore.item();
      item.set('test_text_unique', name());
      await item.save();
      item.set('test_number', 100);
      await item.save();
      const comment = item.comment();
      comment.comment = 'create comment';
      const bol = await comment.save();
      expect(bol).toBe(true);
      await item.delete();
    });
  });

  describe('#updateComment()', () => {
    it('should update comment items histories', async () => {
      jest.useFakeTimers('legacy');
      const newComment = 'update comment message';
      const project = await client.currentWorkspace!.project(projectId);
      const datastore = await project.datastore(datastoreId);
      const item = await datastore.item();
      item.set('test_text_unique', name());
      await item.save();
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
      const item = await datastore.item();
      item.set('test_text_unique', name());
      await item.save();
      const histories = await item.histories();
      const bol = await histories[0].delete();
      expect(bol).toBe(true);
      const histories2 = await item.histories();
      expect(histories2.length + 1).toBe(histories.length);
    });
  });
});

const name = () => {
  return (new Date).toISOString() + Math.random().toString(32).substring(2);
};
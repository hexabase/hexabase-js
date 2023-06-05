require('dotenv').config();
import HexabaseClient from '../../../HexabaseClient';
import FileObject from '.';
import { Blob } from 'buffer';

/**
 * Test with class Datastore
 * @cmdruntest yarn jest src/lib/packages/datastore/datastore.test.ts
 */
const token = process.env.TOKEN || '';
const client = new HexabaseClient('dev');
const workspaceId = process.env.DEV_WORKSPACE_ID;
const datastoreId = process.env.DEV_DATASOTRE_ID || '';
const projectId = process.env.DEV_PROJECT_ID || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';

beforeAll(async () => {
  await client.login({ email, password, token });
});

describe('File', () => {
  describe('#upload()', () => {
    it('should upload the text file', async () => {
      jest.useFakeTimers('legacy');
      await client.setWorkspace(workspaceId!);
			const attachment = new Blob(['Hello, world!'], { type: 'text/plain' });
      const file = await client.upload('test.txt', attachment);
      expect(typeof file.id).toBe('string');
    });
  });

  describe('#download()', () => {
    it('should download the text file', async () => {
      jest.useFakeTimers('legacy');
      await client.setWorkspace(workspaceId!);
      const str = 'Hello, world!';
      const type = 'text/plain';
			const attachment = new Blob([str], { type });
      const file = await client.upload('test.txt', attachment);
      expect(typeof file.id).toBe('string');
      const f = await client.download(file.id);
      expect(f instanceof FileObject).toBe(true);
      const text = await f.data.text();
      expect(text).toEqual(str);
      // TODO:
      // expect(blob.type).toEqual(type);
    });
  });

  describe('#delete()', () => {
    it('should delete the text file', async () => {
      jest.useFakeTimers('legacy');
      await client.setWorkspace(workspaceId!);
      const str = 'Hello, world!';
      const type = 'text/plain';
			const attachment = new Blob([str], { type });
      const f = await client.upload('test.txt', attachment);
      expect(typeof f.id).toBe('string');
      const file = await client.file(f.id);
      expect(file.id).toBe(f.id);
      const bol = await file.delete();
      expect(bol).toBe(true);
    });
  });

  describe('#uploadFile()', () => {
    it('should upload the file', async () => {
      const project = await client.currentWorkspace!.project(projectId);
      const datastore = await project.datastore(datastoreId);
      const item = await datastore.item();
      const file = item.file();
      const message = 'hello world';
      const blob = new Blob([message], { type: 'text/plain' });
      file
        .set('name', 'test_file.txt')
        .set('data', blob);
      const bol = await item
        .set('test_file', [file])
        .save();
      expect(bol).toBe(true);
      const ary = item.get('test_file') as FileObject[];
      expect(ary.length).toBe(1);
      expect(ary[0].name).toBe('test_file.txt');
      await ary[0].download();
      const text = await ary[0].data.text();
      expect(text).toBe(message);
      await item.delete();
    });

    it('should upload the files', async () => {
      const project = await client.currentWorkspace!.project(projectId);
      const datastore = await project.datastore(datastoreId);
      const item = await datastore.item();
      const file = item.file();
      const message = 'hello world';
      const blob = new Blob([message], { type: 'text/plain' });
      file
        .set('name', 'test_file.txt')
        .set('data', blob);
      const file2 = item.file();
      await file2
        .set('name', 'test_file2.txt')
        .set('data', blob);
      await item
        .set('test_file', [file])
        .save();
      const bol = await item
        .add('test_file', file2)
        .save();
      expect(bol).toBe(true);
      await item.delete();
    });
  });
});

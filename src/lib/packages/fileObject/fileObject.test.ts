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
import FileObject from '.';
import { Blob } from 'buffer';
import fs from 'fs';

require('dotenv').config();
/**
 * Test with class Datastore
 * @cmdruntest yarn jest src/lib/packages/datastore/datastore.test.ts
 */
const token = process.env.TOKEN || '';
const client = new HexabaseClient;
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
});

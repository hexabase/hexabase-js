require('dotenv').config();
import HexabaseClient from '../../../HexabaseClient';
import { Blob } from 'buffer';

/**
 * Test with class Datastore
 * @cmdruntest yarn jest src/lib/packages/datastore/datastore.test.ts
 */
const token = process.env.TOKEN || '';
const client = new HexabaseClient();
const workspaceId = process.env.WORKSPACE_ID;
const datastoreId = process.env.DATASTORE_MAIN || '';
const projectId = process.env.PROJECT_ID || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';

// const allFieldItemId = process.env.DEV_ALL_FIELD_ITEM_ID || '';

beforeAll(async () => {
  await client.login({ email, password, token });
});

describe('Field', () => {
  describe('#create()', () => {
    it('create field option', async () => {
      await client.setWorkspace(workspaceId!);
      const project = await client.currentWorkspace!.project(projectId);
      const datastore = await project.datastore();
      datastore.name = { en: 'test', ja: 'test' };
      datastore.displayId = 'test';
      await datastore.save();
      await new Promise(resolve => setTimeout(resolve, 3000));
      const field = await datastore.field();
      try {
        await field!
          .set('name', 'test')
          .set('displayId', 'test')
          .set('dataType', 'select')
          .save();
        const option = field!.option();
        option!
          .set('value', {en: 'test', ja: 'test'})
          .set('displayId', 'test')
          .save();
        // sleep 3 sec
        await new Promise(resolve => setTimeout(resolve, 3000));
        const options = await field!.options(true);
        expect(options![0].displayId).toBe('test');
        expect(options![0].value.en).toBe('test');
      } catch (e) {
        console.log(e);
      }
      await datastore.delete();
    });
  });

  describe('#update()', () => {
    it('update field option', async () => {
      await client.setWorkspace(workspaceId!);
      const project = await client.currentWorkspace!.project(projectId);
      const datastore = await project.datastore();
      datastore.name = { en: 'test', ja: 'test' };
      datastore.displayId = 'test';
      await datastore.save();
      await new Promise(resolve => setTimeout(resolve, 3000));
      const field = await datastore.field();
      try {
        await field!
          .set('name', 'test')
          .set('displayId', 'test')
          .set('dataType', 'select')
          .save();
        const option = field!.option();
        option!
          .set('value', {en: 'test', ja: 'test'})
          .set('displayId', 'test')
          .save();
        // sleep 3 sec
        await new Promise(resolve => setTimeout(resolve, 3000));
        const options = await field!.options(true);
        await options![0].set('value', {en: 'test2', ja: 'test2'}).save();
        await new Promise(resolve => setTimeout(resolve, 3000));
        const options2 = await field!.options(true);
        console.log(options2);
        expect(options2![0].value.en).toBe('test2');
      } catch (e) {
        console.log(e);
      }
      await datastore.delete();
    });
  });

  describe('#delete()', () => {
    it('delete field option', async () => {
      await client.setWorkspace(workspaceId!);
      const project = await client.currentWorkspace!.project(projectId);
      const datastore = await project.datastore();
      datastore.name = { en: 'test', ja: 'test' };
      datastore.displayId = 'test';
      await datastore.save();
      await new Promise(resolve => setTimeout(resolve, 3000));
      const field = await datastore.field();
      try {
        await field!
          .set('name', 'test')
          .set('displayId', 'test')
          .set('dataType', 'select')
          .save();
        const option = field!.option();
        option!
          .set('value', {en: 'test', ja: 'test'})
          .set('displayId', 'test')
          .save();
        // sleep 3 sec
        await new Promise(resolve => setTimeout(resolve, 3000));
        const options = await field!.options(true);
        await options![0].delete();
        await new Promise(resolve => setTimeout(resolve, 3000));
        const options2 = await field!.options(true);
        console.log(options2);
        expect(options2?.length).toBe(0);
      } catch (e) {
        console.log(e);
      }
      await datastore.delete();
    });
  });
});

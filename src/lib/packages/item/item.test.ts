require('dotenv').config();
import HexabaseClient from '../../../HexabaseClient';
import { Blob } from 'buffer';
import FileObject from '../fileObject';
import { FieldNameENJP } from '../../util/type';
import Datastore from '../datastore';
import Project from '../project';
import Item from '.';

const token = process.env.TOKEN || '';
const client = new HexabaseClient();
const workspaceId = process.env.WORKSPACE_ID;
const datastoreId = process.env.DATASTORE_MAIN || '';
const projectId = process.env.PROJECT_ID || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';

const params: {
  datastore?: Datastore;
  project?: Project;
} = {
  datastore: undefined,
  project: undefined,
};

beforeAll(async () => {
  await client.login({ email, password, token });
  await client.setWorkspace(workspaceId!);
  params.project = await client.currentWorkspace!.project(projectId);
  params.datastore = await params.project.datastore(datastoreId);
});

describe('Item', () => {
  describe('#get()', () => {
    it('should get items in Ds', async () => {
      jest.useFakeTimers('legacy');
      const { project, datastore } = params;
      const { totalCount } = await datastore!.itemsWithCount();
      expect(typeof totalCount).toBe('number');
    });

    it('should get item with related in Ds', async () => {
      jest.useFakeTimers('legacy');
      const { project, datastore } = params;
      const query = client.query(project!.id);
      const [item] = await query
        .from(datastore!.id)
        .where(query.condition.equalTo('test_text_unique', 'テストテキストユニーク'))
        .select('*', {deep: true});
      expect(item.get('test_dslookup') instanceof Item).toBe(true);
    });
  });

  describe('#createItemId()', () => {
    it('should create new item id', async () => {
      jest.useFakeTimers('legacy');
      const { datastore } = params;
      const itemId = await datastore!.createItemId();
      expect(typeof itemId).toBe('string');
    });
  });

  describe('#create()', () => {
    it('should create new items', async () => {
      jest.useFakeTimers('legacy');
      const { datastore } = params;
      const item = await datastore!.item();
      item.set('test_text_unique', name());
      const bol = await item.save();
      // Save item id for next test
      // itemId = item.id;
      expect(bol).toBe(true);
      expect(typeof item.id).toBe('string');
      await item.delete();
    });

    it('should create item with link in datastore', async () => {
      jest.useFakeTimers('legacy');
      const { datastore } = params;
      const master = await params.project?.datastore(process.env.DATASTORE_TEST_MASTER1!);
      const masterItems = await master?.items();
      const item = await datastore!.item();
      item.set('test_text_unique', name());
      item.set('test_number', 100);
      item.set('test_dslookup', masterItems![0]);
      const bol = await item.save();
      expect(bol).toBe(true);
      const item2 = await datastore!.item(item.id);
      const masterItem2 = item2.get<Item>('test_dslookup');
      expect(masterItem2?.id).toBe(masterItems![0].id);
      await item.delete();
    });
  });

  describe('#getHistories()', () => {
    it('should get items histories', async () => {
      jest.useFakeTimers('legacy');
      const { datastore } = params;
      const item = await datastore!.item();
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
      const { datastore } = params;
      const item = await datastore!.item();
      item.set('test_text_unique', name());
      await item.save();
      expect(typeof item.title).toBe('string');
      await item.delete();
    });
  });


  describe('#update()', () => {
    it('should update item in datastore', async () => {
      jest.useFakeTimers('legacy');
      const { datastore } = params;
      const item = await datastore!.item();
      item.set('test_text_unique', name());
      item.set('test_number', 100);
      const bol = await item.save();
      expect(bol).toBe(true);
      item.set('test_text_unique', name());
      item.set('test_number', 200);
      await item.save();
      expect(item.revNo).toBe(2);
      await item.delete();
    });

    it('should update item with link in datastore', async () => {
      jest.useFakeTimers('legacy');
      const { datastore } = params;
      const master = await params.project?.datastore(process.env.DATASTORE_TEST_MASTER1!);
      const masterItems = await master?.items();
      const item = await datastore!.item();
      item.set('test_text_unique', name());
      item.set('test_number', 100);
      item.set('test_dslookup', masterItems![0]);
      const bol = await item.save();
      expect(bol).toBe(true);
      const item2 = await datastore!.item(item.id);
      const masterItem2 = item2.get<Item>('test_dslookup');
      expect(masterItem2?.id).toBe(masterItems![0].id);
      item2.set('test_dslookup', masterItems![1]);
      await item2.save();
      const item3 = await datastore!.item(item.id);
      const masterItem3 = item3.get<Item>('test_dslookup');
      expect(masterItem3?.id).toBe(masterItems![1].id);
      await item.delete();
    });

    it('should update select item in datastore', async () => {
      jest.useFakeTimers('legacy');
      const { datastore } = params;
      const item = await datastore!.item();
      item.set('test_text_unique', name());
      const field = await datastore!.field('test_select');
      const options = await field!.options();
      const original = options![1];
      item.set('test_select', original.id);
      const bol = await item.save();
      expect(bol).toBe(true);
      await item.fetch();
      const option = item.get('test_select') as FieldNameENJP;
      expect(option.ja).toBe(original.value.ja);
      item.set('test_select', options![2].id);
      const bol2 = await item.save();
      expect(bol2).toBe(true);
      await item.fetch();
      const option2 = item.get('test_select') as FieldNameENJP;
      expect(option2.ja).toBe(options![2].value.ja);
      await item.delete();
    });

    it('should update select items in datastore', async () => {
      jest.useFakeTimers('legacy');
      const { datastore } = params;
      const item = await datastore!.item();
      item.set('test_text_unique', name());
      const field = await datastore!.field('test_checkbox');
      const options = await field!.options();
      const o1 = [options![0], options![1]];
      item.set('test_checkbox', o1.map(o => o.id));
      const bol = await item.save();
      expect(bol).toBe(true);
      await item.fetch();
      const values = item.get('test_checkbox') as FieldNameENJP[];
      expect(values.map(v => v.ja)).toStrictEqual(o1.map(o => o.value.ja));
      const o2 = [options![1], options![2]];
      item.set('test_checkbox', o2.map(o => o.id));
      const bol2 = await item.save();
      expect(bol2).toBe(true);
      await item.fetch();
      const values2 = item.get('test_checkbox') as FieldNameENJP[];
      expect(values2.map(v => v.ja)).toStrictEqual(o2.map(o => o.value.ja));
      await item.delete();
    });
  });

  describe('#execute()', () => {
    it('should execute action for item in datastore', async () => {
      jest.useFakeTimers('legacy');
      const { datastore } = params;
      const item = await datastore!.item();
      await item.save();
      await item.execute('TestItemActionWithNoAS');
      const item2 = await datastore!.item(item.id);
      expect(item.status).toBe(item2.status);
      await item.delete();
    });
  });

  describe('#delete()', () => {
    it('should delete link in datastore', async () => {
      jest.useFakeTimers('legacy');
      const { datastore } = params;
      const master = await params.project?.datastore(process.env.DATASTORE_TEST_MASTER1!);
      const masterItems = await master?.items();
      const item = await datastore!.item();
      item.set('test_text_unique', name());
      item.set('test_number', 100);
      item.set('test_dslookup', masterItems![0]);
      const bol = await item.save();
      expect(bol).toBe(true);
      const item2 = await datastore!.item(item.id);
      const masterItem2 = item2.get<Item>('test_dslookup');
      expect(masterItem2?.id).toBe(masterItems![0].id);
      item2.set('test_dslookup', null);
      await item2.save();
      const item3 = await datastore!.item(item.id);
      const masterItem3 = item3.get<Item>('test_dslookup');
      expect(null).toBe(masterItem3);
      await item.delete();
    });
  });

});

const name = () => {
  return (new Date).toISOString() + Math.random().toString(32).substring(2);
};
import { createClient, HexabaseClient } from '../..';
import Item from '../packages/item';
import { NewItems, UpdateItemRes } from '../types/item';

require('dotenv').config();
jest.useRealTimers();

const token = process.env.TOKEN || '';
const client = new HexabaseClient();
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';
const datastoreID = process.env.DEV_DATASOTRE_ID || '';
const projectID = process.env.DEV_PROJECT_ID || '';

const params = {
  page: 1,
  per_page: 0,
};

/**
 * Test with class Hexabase
 * @cmdruntest yarn jest src/hexabase.test.ts
 */

beforeAll(async () => {
  await client.login({email, password, token});
  const project = await client.currentWorkspace!.project(projectID);
  const datastore = await project.datastore(datastoreID);
  for (let i = 0; i < 10; i++) {
    const item = await datastore.item();
    await item
      .set('textInputUnique', name())
      .set('number', i)
      .set('number2', i * i)
      .save();
  }
});

afterAll(async () => {
  const query = client.query(projectID);
  await query
    .from(datastoreID)
    .delete();
});

describe('Hexabase SQL', () => {
  it('Select all fields', async () => {
    const query = client.query(projectID);
    const res = await query
      .from(datastoreID)
      .select('*');
    const project = await client.currentWorkspace!.project(projectID);
    const datastore = await project.datastore(datastoreID);
    const items = await datastore.items({per_page: 0, page: 1});
    expect(res.length).toEqual(items.length);
    expect(res[0].fields.length).toEqual(items[0].fields.length);
  });

  it('Select limited fields', async () => {
    const query = client.query(projectID);
    const res = await query
      .from(datastoreID)
      .select('textInputUnique, autoNum');
    expect(Object.keys(res[0].fields).length).toEqual(2);
    const res2 = await query
      .from(datastoreID)
      .select('textInputUnique, autoNum, calc');
    expect(Object.keys(res2[0].fields).length).toEqual(3);
  });

  it('Change limit rows', async () => {
    const LIMIT = 5;
    const query = client.query(projectID);
    const res = await query
      .from(datastoreID)
      .limit(LIMIT)
      .select('*');
    expect(res.length).toEqual(LIMIT);
  });

  it('Change page', async () => {
    const LIMIT = 5;
    const query = client.query(projectID);
    const res = await query
      .from(datastoreID)
      .limit(LIMIT)
      .select('*');
    expect(res.length).toEqual(LIMIT);
    const item = res[LIMIT - 3];
    const res2 = await query
      .from(datastoreID)
      .limit(LIMIT - 3)
      .page(2)
      .select('*');
    expect(item.id !== '').toBeTruthy();
    expect(res2[0].id).toEqual(item.id);
  });

  it('Where equalTo', async () => {
    const query = client.query(projectID);
    const c = query.condition;
    const res = await query
      .from(datastoreID)
      .limit(6)
      .select('*');
    const item = res[5];
    const res2 = await query
      .from(datastoreID)
      .where(c.equalTo('i_id', item.id))
      .limit(6)
      .select('*');
    expect(res2.length).toEqual(1);
    expect(res2[0].id).toEqual(item.id);
  });

  it('Count', async () => {
    const query = client.query(projectID);
    const res = await query
      .from(datastoreID)
      .limit(0)
      .select('*');
    const res2 = await query
      .from(datastoreID)
      .limit(1)
      .count();
    expect(res.length).toEqual(res2);
  });

  it('Insert one', async () => {
    const query = client.query(projectID);
    // get randam string
    const randamString = Math.random().toString(36).substring(7);
    const textInputUnique = `${(new Date).toISOString()}-${randamString}`;
    const item = await query
      .from(datastoreID)
      .insert(
        {
          textInputUnique,
          number: 100,
          number2: 200,
        }
      ) as Item;
    expect(item.id !== '').toBeTruthy();
    expect(item.get('textInputUnique')).toEqual(textInputUnique);
  });

  it('Insert multi', async () => {
    const query = client.query(projectID);
    // get randam string
    const textInputUnique = name();
    const items = await query
      .from(datastoreID)
      .insert([
        {
          textInputUnique: name(),
          number: 100,
          number2: 200,
        },
        {
          textInputUnique: textInputUnique,
          number: 100,
          number2: 200,
        },
        {
          textInputUnique: name(),
          number: 100,
          number2: 200,
        },
      ]) as Item[];
    expect(items.length).toEqual(3);
    expect(items[1].id !== '').toBeTruthy();
    expect(items[1].get('textInputUnique')).toEqual(textInputUnique);
  });

  it('Update one', async () => {
    const query = client.query(projectID);
    // get randam string
    const NUMBER1 = 200;
    const NUMBER2 = 300;
    const randamString = Math.random().toString(36).substring(7);
    const textInputUnique = `${(new Date).toISOString()}-${randamString}`;
    const item = await query
      .from(datastoreID)
      .insert(
        {
          textInputUnique,
          number: 100,
          number2: 200,
        }
      ) as Item;
    const newName = name();
    const updatedItems = await query
      .from(datastoreID)
      .where(query.condition.equalTo('i_id', item.id))
      .update({
        textInputUnique: newName,
        number: NUMBER1,
        number2: NUMBER2,
      });
    expect(item.id).toEqual(updatedItems[0].id);
    expect(updatedItems[0].get('textInputUnique')).toEqual(newName);
    expect(updatedItems[0].get('number')).toEqual(NUMBER1);
    expect(updatedItems[0].get('number2')).toEqual(NUMBER2);
  });

  it('Update multiple', async () => {
    const query = client.query(projectID);
    // get randam string
    const NUMBER1 = 510;
    const NUMBER2 = 610;
    const params = [1, 2, 3].map(count => {
      return {
        textInputUnique: name(),
        number: NUMBER1,
        number2: NUMBER2,
      };
    });
    await query
      .from(datastoreID)
      .insert(params) as Item[];
    const items = await query
      .from(datastoreID)
      .where([
        query.condition.equalTo('number', NUMBER1),
        query.condition.equalTo('number2', NUMBER2)
      ])
      .select() as Item[];
    expect(items.length).toEqual(3);
    await query
      .from(datastoreID)
      .where([
        query.condition.equalTo('number', NUMBER1),
        query.condition.equalTo('number2', NUMBER2)
      ])
      .update({
        number: NUMBER1 + 10,
        number2: NUMBER2 + 10,
      });
    const updateItems = await query
      .from(datastoreID)
      .where([
        query.condition.equalTo('number', NUMBER1 + 10),
        query.condition.equalTo('number2', NUMBER2 + 10)
      ])
      .select('*') as Item[];
    expect(updateItems.length).toEqual(items.length);
    expect(updateItems[0].get('number')).toEqual(NUMBER1 + 10);
    for (const item of updateItems) {
      await item.delete();
    }
  });

  it('delete one', async () => {
    const query = client.query(projectID);
    // get randam string
    const NUMBER1 = 220;
    const NUMBER2 = 330;
    const randamString = Math.random().toString(36).substring(7);
    const textInputUnique = `${(new Date).toISOString()}-${randamString}`;
    await query
      .from(datastoreID)
      .insert([
        {
          textInputUnique,
          number: NUMBER1,
          number2: NUMBER2,
        },
        {
          textInputUnique: name(),
          number: NUMBER1,
          number2: NUMBER2,
        },
        {
          textInputUnique: name(),
          number: NUMBER1 + 1,
          number2: NUMBER2,
        },
      ]) as Item;
    const res = await query
      .from(datastoreID)
      .where(query.condition.equalTo('number', NUMBER1))
      .delete();
    expect(res).toEqual(true);
    const num = await query
      .from(datastoreID)
      .where(query.condition.equalTo('number2', NUMBER2))
      .count();
    expect(num).toEqual(1);
  });

  /*
  describe('Hexabase SQL', () => {
    it(`Test function execute`, async () => {
      jest.useFakeTimers();
      const q = hexabase.query();
      const dataDeleteItem = await hexabase.from('6360deb505cc9cb016fbc53f')
        .select('*')
        .where(
          // q.equalTo("datastore_id", "6360deb505cc9cb016fbc53f"),
          q.equalTo("project_id", "632ad81082bd898623884d2e")
        ).deleteOne("63f31714a417d97eb502380d")
      console.log('delete Item', JSON.stringify(dataDeleteItem));
    });
  });
  */
  // describe('Hexabase SQL', () => {
  //   it(`Test function execute delete use display id`, async () => {
  //     jest.useFakeTimers();
  //     const q = hexabase.query();
  //     hexabase.useProject("632ad81082bd898623884d2e")
  //     const dataDeleteItem = await hexabase.from('Db-EPIPmEac')
  //       .select('*')
  //       .where()
  //       .deleteOne("63f465f1a432e29f253d9ecb", {
  //         deleteLinkedItems: true,
  //         useDisplayId: true,
  //       })
  //     console.log('delete Item', JSON.stringify(dataDeleteItem));
  //   });
  // });

  // describe('Hexabase SQL', () => {
  //   it(` // select(['member_id', 'name', 'email']).where(q.equalTo('member_id', 123))`, async () => {
  //     jest.useFakeTimers();
  //     // const hexabase = new Hexabase();
  //     const q = await hexabase.query();
  //     const query = await hexabase.from('database').select(['member_id', 'name', 'email']).where(q.equalTo('member_id', 123));
  //     console.log('query', query);
  //   });
  // });

  // describe('Hexabase SQL', () => {
  //   it(` //  select('project.members').where(
  //     q.equalTo('member_id', 123),
  //     q.greaterThanOrEqualTo('age', 30),
  //     q.lessThan('age', 40),
  //   )`, async () => {
  //     jest.useFakeTimers();
  //     // const hexabase = new Hexabase();
  //     const q = await hexabase.query();
  //     const query = await hexabase.from('database').select('project.members').where(
  //       q.equalTo('department', 'Marketing'),
  //       q.greaterThanOrEqualTo('age', 30),
  //       q.lessThan('age', 40),
  //     );
  //     console.log('query', query);
  //   });
  // });

  // describe('Hexabase SQL', () => {
  //   it(` //  select('project.members').where(
  //     q.or(
  //       q.equalTo('FieldA', 'X'),
  //       q.include('FieldB', 'Y')
  //     ),
  //     q.and(
  //       q.include('FieldA', 'ABC'),
  //       q.notInclude('FieldC', 'Z')
  //     )
  //   );`, async () => {
  //     jest.useFakeTimers();
  //     // const hexabase = new Hexabase();
  //     const q = await hexabase.query();
  //     const query = await hexabase.from('database').select('project.members').where(
  //       q.or(
  //         q.equalTo('FieldA', 'X'),
  //         q.include('FieldB', 'Y')
  //       ),
  //       q.and(
  //         q.include('FieldA', 'ABC'),
  //         q.notInclude('FieldC', 'Z')
  //       )
  //     );
  //     console.log('query', query);
  //   });
  // });

  // describe('Hexabase SQL', () => {
  //   it(` //  select('*').where(
  //     q.inArray('department', ['Marketing', 'Sales']),
  //     q.greaterThanOrEqualTo('age', 30)
  //   );`, async () => {
  //     jest.useFakeTimers();
  //     // const hexabase = new Hexabase();
  //     const q = await hexabase.query();
  //     const query = await hexabase.from('project.members').select('*').where(
  //       q.inArray('department', ['Marketing', 'Sales']),
  //       q.greaterThanOrEqualTo('age', 30)
  //     );
  //     console.log('query', query);
  //   });
  // });

  // describe('Hexabase SQL', () => {
  //   it(` //  select('*').where(
  //     q.inArray('department', ['Marketing', 'Sales']),
  //     q.greaterThanOrEqualTo('age', 30)
  //   );`, async () => {
  //     jest.useFakeTimers();
  //     // const hexabase = new Hexabase();
  //     const q = await hexabase.query();
  //     const query = await hexabase.from('project.members').select('*').where(
  //       q.notInArray('department', ['Marketing', 'Sales']),
  //       q.greaterThanOrEqualTo('age', 30)
  //     );
  //     console.log('query', query);
  //   });
  // });

  // describe('Hexabase SQL', () => {
  //   it(` //  select('*')
  //   .where(q.greaterThanOrEqualTo('age', 30))
  //   .orderBy({ age: 'asc' });;`, async () => {
  //     jest.useFakeTimers();
  //     // const hexabase = new Hexabase();
  //     const q = await hexabase.query();
  //     const query = await hexabase
  //       .from('project.members')
  //       .select('*')
  //       .where(q.greaterThanOrEqualTo('age', 30))
  //       .orderBy({ age: 'asc' });
  //     console.log('query', query);
  //   });
  // });

  // describe('Hexabase SQL', () => {
  //   it(` //  select('*')
  //   .where(q.greaterThanOrEqualTo('age', 30))
  //   .orderBy({ age: 'asc' });;`, async () => {
  //     jest.useFakeTimers();
  //     // const hexabase = new Hexabase();
  //     const q = await hexabase.query();
  //     const query = await hexabase
  //       .from('project.members')
  //       .select('*')
  //       .where(q.greaterThanOrEqualTo('age', 30))
  //       .orderBy({ age: 'desc' });
  //     console.log('query', query);
  //   });
  // });

  // describe('Hexabase SQL', () => {
  //   it(` //  select('*')
  //   .where(q.greaterThanOrEqualTo('age', 30))
  //   .orderBy({ age: 'asc' });;`, async () => {
  //     jest.useFakeTimers();
  //     // const hexabase = new Hexabase();
  //     const q = await hexabase.query();
  //     const query = await hexabase
  //       .from('project.members')
  //       .select('*')
  //       .where(q.greaterThanOrEqualTo('age', 30))
  //       .orderBy({ age: 'desc', score: 'asc' });
  //     console.log('query', query);
  //   });
  // });

  // describe('Hexabase SQL', () => {
  //   it(` //  select('*')
  //   .where(q.greaterThanOrEqualTo('age', 30))
  //   .limit(10);`, async () => {
  //     jest.useFakeTimers();
  //     // const hexabase = new Hexabase();
  //     const q = await hexabase.query();
  //     const query = await hexabase
  //       .from('project.members')
  //       .select('*')
  //       .where(q.greaterThanOrEqualTo('age', 30))
  //       .limit(10);
  //     console.log('query', query);
  //   });
  // });

  // describe('Hexabase SQL', () => {
  //   it(` //  select('*')
  //   .where(q.greaterThanOrEqualTo('age', 30))
  //   .limit(10)
  //   .offset(200);`, async () => {
  //     jest.useFakeTimers();
  //     // const hexabase = new Hexabase();
  //     const q = await hexabase.query();
  //     const query = await hexabase
  //       .from('project.members')
  //       .select('*')
  //       .where(q.greaterThanOrEqualTo('age', 30))
  //       .limit(10)
  //       .offset(200);
  //     console.log('query', query);
  //   });
  // });

  // describe('Hexabase SQL', () => {
  //   it(` //  select('*')
  //   .where(q.greaterThanOrEqualTo('age', 30))
  //   .perPage(10);`, async () => {
  //     jest.useFakeTimers();
  //     // const hexabase = new Hexabase();
  //     const q = await hexabase.query();
  //     const query = await hexabase
  //       .from('project.members')
  //       .select('*')
  //       .where(q.greaterThanOrEqualTo('age', 30))
  //       .perPage(10);
  //     console.log('query', query);
  //   });
  // });

  // describe('Hexabase SQL', () => {
  //   it(` //  select('*')
  //   .where(q.greaterThanOrEqualTo('age', 30))
  //   .perPage(10)
  //   .page(2);`, async () => {
  //     jest.useFakeTimers();
  //     // const hexabase = new Hexabase();
  //     const q = await hexabase.query();
  //     const query = await hexabase
  //       .from('project.members')
  //       .select('*')
  //       .where(q.greaterThanOrEqualTo('age', 30))
  //       .perPage(10)
  //       .page(2);
  //     console.log('query', query);
  //   });
  // });

});

const name = () => {
  const randamString = Math.random().toString(36).substring(7);
  const textInputUnique = `${(new Date).toISOString()}-${randamString}`;
  return textInputUnique;
};
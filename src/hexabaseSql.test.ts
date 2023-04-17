import { createClient, HexabaseClient } from './';
import Item from './lib/packages/item';
import { NewItems, UpdateItemRes } from './lib/types/item';

require('dotenv').config();
jest.useRealTimers();

let token = process.env.TOKEN || '';
const hexabase = new HexabaseClient();
const url = process.env.URL || '';
const taskId = process.env.TASKID || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';
const datastoreID = process.env.DATASTORE_ID || '';
const projectID = process.env.PROJECT_ID || '';

const params = {
  page: 1,
  per_page: 0,
};

/**
 * Test with class Hexabase
 * @cmdruntest yarn jest src/hexabase.test.ts
 */

beforeAll(async () => {
  await hexabase.login({email, password, token});
  /*
  if (email && password && !token) {
    const hxbClient = await createClient({ url: url, token: '', email, password });
    token = hxbClient?.tokenHxb;
    hexabase = hxbClient;
  }
  if (token && !email && !password) {
    const hxbClient = await createClient({ url: url, token, email: '', password: '' });
    token = hxbClient?.tokenHxb;
    hexabase = hxbClient;
  }
  */
});

describe('Hexabase SQL', () => {
  it('Select all fields', async () => {
    const query = hexabase.query(projectID);
    const res = await query.from(datastoreID).select('Title').then();
    console.log(res);
  });
  // describe('Hexabase SQL', () => {
  //   it(`await hexabase.from('project.members').select('name'); // select_fields: ['name'],  `, async () => {
  //     jest.useFakeTimers();
  //     // const hexabase = new Hexabase();
  //     const query = await hexabase.from('database').select('name');
  //     console.log('query: ', query);
  //   });
  // });

  // describe('Hexabase SQL', () => {
  //   it(` //  select_fields: ['member_id', 'name', 'email']`, async () => {
  //     jest.useFakeTimers();
  //     // const hexabase = new Hexabase()
  //     const query = await hexabase.from('database').select('member_id, name, email').execute()
  //     console.log('query', query);
  //   });
  // });

  // describe('Hexabase SQL', () => {
  //   it(`Test function execute`, async () => {
  //     jest.useFakeTimers();
  //     const q = hexabase.query();
  //     const dataItemWithSearch = await hexabase.from('database')
  //       .select('*')
  //       .where(
  //         q.equalTo("datastore_id", "6360deb505cc9cb016fbc53f"),
  //         q.equalTo("project_id", "632ad81082bd898623884d2e"),
  //         q.equalTo("include_fields_data", true),
  //         q.equalTo("omit_total_items", true),
  //         q.equalTo("return_count_only", false),
  //       );
  //     console.log('dataItemWithSearch', JSON.stringify(dataItemWithSearch));
  //   });
  // });


  // describe('Hexabase SQL', () => {
  //   it(`Test function execute insert item`, async () => {
  //     jest.useFakeTimers();
  //     const q = hexabase.query();
  //     hexabase.useProject("632ad81082bd898623884d2e")
  //     const itemInserted = await hexabase.from('6360deb505cc9cb016fbc53f')
  //       .insertOne({
  //         "636343dbeb4e1e3bd91c4a72": [],
  //         "63633c6feb4e1e3bd918b5a4": "nguyen",
  //         "6360deb5990afe5d523ba6b7": "nguyen title"
  //       })

  //     console.log('itemInserted', JSON.stringify(itemInserted));
  //   });
  // });

  // describe('Hexabase SQL', () => {
  //   it(`Test function execute insert item`, async () => {
  //     jest.useFakeTimers();
  //     await hexabase.useProject("632ad81082bd898623884d2e")
  //     const itemInserted: NewItems = await hexabase.from('6360deb505cc9cb016fbc53f')
  //       .insertMany([
  //         {
  //           "636343dbeb4e1e3bd91c4a72": [],
  //           "63633c6feb4e1e3bd918b5a4": "[Fld-YPv5JDm4] nguyên mõm",
  //           "6360deb5990afe5d523ba6b7": "[Title] nguyên mõm"
  //         },
  //       ]);
  //     // const raws = await Promise.all(itemInserted)
  //     console.log('itemInserted', itemInserted)
  //   });
  // });

  // describe('Hexabase SQL', () => {
  //   it(`Test function execute update one item`, async () => {
  //     jest.useFakeTimers();
  //     const item = new Item(url, token);
  //     const itemDetail = await item.getItemDetail("6360deb505cc9cb016fbc53f", "63fdd6bf46841e3c4b859448");
  //     const { itemDetails } = itemDetail;
  //     const rev_no = itemDetails?.rev_no;
  //     await hexabase.useProject("632ad81082bd898623884d2e")
  //     const itemUpdated: UpdateItemRes = await hexabase.from('6360deb505cc9cb016fbc53f')
  //       .updateOne(
  //         {
  //           itemId: "63fdd6bf46841e3c4b859448",
  //           rev_no,
  //           item: {
  //             "636343dbeb4e1e3bd91c4a72": [],
  //             "63633c6feb4e1e3bd918b5a4": "[Fld-YPv5JDm4] nguyên mõm update 3",
  //             "6360deb5990afe5d523ba6b7": "[Title] nguyên mõm update 3"
  //           },
  //         }
  //       );
  //     console.log('itemUpdated', itemUpdated)
  //   });
  // });
  /*
  describe('Hexabase SQL', () => {
    it(`Test function execute update many item`, async () => {
      jest.useFakeTimers();

      const item = new Item(url, token);
      const { dsItems, error } = await item.get(params, "6360deb505cc9cb016fbc53f", "632ad81082bd898623884d2e");
      await hexabase.useProject("632ad81082bd898623884d2e")
      const itemUpdated: UpdateItemRes[] = await hexabase.from('6360deb505cc9cb016fbc53f')
        .updateMany([
          {
            itemId: dsItems?.items?.[0]?.i_id,
            rev_no: parseInt(dsItems?.items?.[0]?.rev_no),
            item: {
              "636343dbeb4e1e3bd91c4a72": [],
              "63633c6feb4e1e3bd918b5a4": "[Fld-YPv5JDm4]1 nguyên mõm update 1",
              "6360deb5990afe5d523ba6b7": "[Title]1 nguyên mõm update 1"
            },
          },
          {
            itemId: dsItems?.items?.[1]?.i_id,
            rev_no: parseInt(dsItems?.items?.[1]?.rev_no),
            item: {
              "636343dbeb4e1e3bd91c4a72": [],
              "63633c6feb4e1e3bd918b5a4": "[Fld-YPv5JDm4]2 nguyên mõm update 2",
              "6360deb5990afe5d523ba6b7": "[Title]2 nguyên mõm update 2"
            },
          }
        ]);
      console.log('itemUpdated', itemUpdated)
    });
  });
  */
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

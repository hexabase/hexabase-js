import { createClient, HexabaseClient } from './';

require('dotenv').config();
jest.useRealTimers();

let token = process.env.TOKEN || '';
let hexabase: HexabaseClient;
const url = process.env.URL || '';
const taskId = process.env.TASKID || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';

/**
 * Test with class Hexabase
 * @cmdruntest yarn jest src/hexabase.test.ts
 */

beforeAll(async () => {
  if (email && password && !token) {
    const hxbClient = await createClient({ url: url, token: '', email, password });
    hexabase = hxbClient;
  }
  if (token && !email && !password) {
    const hxbClient = await createClient({ url: url, token, email: '', password: '' });
    hexabase = hxbClient;
  }
});

describe('Hexabase SQL', () => {

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
  
  describe('Hexabase SQL', () => {
    it(` //  select_fields: ['member_id', 'name', 'email']`, async () => {
      jest.useFakeTimers();
      const q = await hexabase.query();
      // const hexabase = new Hexabase()
      console.log("hexabase", hexabase)
      const query = await hexabase.from('database')
      .select('*')
      .where(
        q.equalTo("datastore_id", "6360dffc05cc9cb016fbc560"),
        q.equalTo("project_id", "632ad81082bd898623884d2e"),
        q.equalTo("include_fields_data", true),
        q.equalTo("omit_total_items", true),
        q.equalTo("return_count_only", false),
      )
      .execute()
      console.log('query', query);
    });
  });

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

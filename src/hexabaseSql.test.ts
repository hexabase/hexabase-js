import { Hexabase } from "./HexabaseSql";

require('dotenv').config();
jest.useRealTimers();
/**
 * Test with class Hexabase
 * @cmdruntest yarn jest src/hexabase.test.ts
 */

// const stagUrl = process.env.STAG_URL || '';
describe('Hexabase SQL', () => {

  describe('Hexabase SQL', () => {
    it(`await hexabase.from('project.members').select('name'); // select_fields: ['name'],  `, async () => {
      jest.useFakeTimers();
      const hexabase = new Hexabase()
      const query = await hexabase.from('database').select('name')
      console.log("query: ", query)
    });
  });
  // describe('Hexabase SQL', () => {
  describe('Hexabase SQL', () => {
    it(` //  select_fields: ['member_id', 'name', 'email']`, async () => {
      jest.useFakeTimers();
      const hexabase = new Hexabase()
      const query = await hexabase.from('database').select('member_id, name, email')
      console.log("query", query)
    });
  });
  // });
  describe('Hexabase SQL', () => {
    it(` // select(['member_id', 'name', 'email']).where(q.equalTo('member_id', 123))`, async () => {
      jest.useFakeTimers();
      const hexabase = new Hexabase()
      const q = await hexabase.datastore.query();
      const query = await hexabase.from('database').select(['member_id', 'name', 'email']).where(q.equalTo('member_id', 123));
      console.log("query", query)
    });
  });
  describe('Hexabase SQL', () => {
    it(` //  select('project.members').where(
      q.equalTo('member_id', 123),
      q.greaterThanOrEqualTo('age', 30),
      q.lessThan('age', 40),
    )`, async () => {
      jest.useFakeTimers();
      const hexabase = new Hexabase()
      const q = await hexabase.datastore.query();
      const query = await hexabase.from('database').select('project.members').where(
        q.equalTo('member_id', 123),
        q.greaterThanOrEqualTo('age', 30),
        q.lessThan('age', 40),
      );
      console.log("query", query)
    });
  });
});

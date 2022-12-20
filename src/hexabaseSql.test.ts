import {Hexabase} from "./HexabaseSql";

require('dotenv').config();
jest.useRealTimers();
/**
 * Test with class Hexabase
 * @cmdruntest yarn jest src/hexabase.test.ts
 */

const stagUrl = process.env.STAG_URL || '';
describe('Hexabase SQL', () => {

describe('Hexabase SQL', () => {
  it(`await hexabase.from('project.members').select('name'); // select_fields: ['name'],  `, async () => {
    jest.useFakeTimers();
    const hexabase = await new Hexabase('url')
    const query  = hexabase.from('database').select('name')
    console.log("query: ", query )
  });
});
// describe('Hexabase SQL', () => {
  describe('Hexabase SQL', () => {
   it(` //  select_fields: ['member_id', 'name', 'email']`, async () => {
    jest.useFakeTimers();
    const hexabase = await new Hexabase('url')
    const query  = hexabase.from('database').select('member_id, name, email')
    console.log("query",query )
    });
  });
  // });
  describe('Hexabase SQL', () => {
   it(` //  select_fields: ['member_id', 'name', 'email']`, async () => {
    jest.useFakeTimers();
    const hexabase = await new Hexabase('url')
    const query  = hexabase.from('database').select(['member_id', 'name', 'email']).where("whererre")
    console.log("query",query )
    });
  });
});

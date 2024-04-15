import { FieldType } from '.';
import Datastore from '../datastore';
import Item from '../item';
import Project from '../project';

export class DslookupField extends FieldType {
  valid(value: any): boolean {
    if (value === null) return true;
    if (value instanceof Item) return true;
    if (typeof value === 'string') return true;
    if (typeof value !== 'object') return false;
    if (value.item_id && value.title) return true;
    return false;
  }
  async convert(value: any): Promise<any> {
    if (value === null) return value;
    if (value instanceof Item) {
      if (!value.id) await value.save();
      return value.id;
    }
    throw new Error(`Value is not Item (${value})`);
  }
  value(value: any, options: {[key: string]: any}): any {
    if (typeof value === 'string') {
      return value;
    }
    return this.valueDsLookup(value, options);
  }

  valueDsLookup(value: any, options: {[key: string]: any}): Item {
    if (value instanceof Item) return value;
    const project = new Project({workspace: options.item.datastore.project.workspace, id: value.p_id});
    const datastore = new Datastore({project, id: value.d_id});
    return new Item({datastore, id: value.i_id});
  }
}

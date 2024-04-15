import { GetFieldSettingsRes } from '../../types/fieldOption';
import { HxbAbstract } from '../../../HxbAbstract';
import Field from '../field';
import { FieldNameENJP } from '../../../lib/util/type';

export default class FieldOption extends HxbAbstract {
  public field: Field;
  public id: string;
  public name: string;
  public color: string;
  public createdAt: Date;
  public displayId: string;
  public enabled: boolean = true;
  public selected: boolean;
  public sortId: number;
  public updatedAt: Date;
  public value: FieldNameENJP;

  set(key: string, value: any): FieldOption {
    if (value === null) return this;
    switch (key) {
      case 'field':
        this.field = value as Field;
        break;
      case 'name':
        this.name = value;
        break;
      case '_id':
      case 'o_id':
        this.id = value;
        break;
      case 'color':
        this.color = value;
        break;
      case 'created_at':
        this.createdAt = new Date(value);
        break;
      case 'display_id':
      case 'displayId':
        this.displayId = value;
        break;
      case 'enabled':
        this.enabled = value;
        break;
      case 'selected':
        this.selected = value;
        break;
      case 'sort_id':
        this.sortId = value;
        break;
      case 'updated_at':
        this.updatedAt = new Date(value);
        break;
      case 'value':
        this.value = value;
        break;
    }
    return this;
  }

  static async all(field: Field): Promise<FieldOption[]> {
    const { datastore } = field;
    const path = `/api/v0/applications/${datastore.project.id}/datastores/${datastore.id}/fields/${field.id}`;
    const res: GetFieldSettingsRes = await this.rest('GET', path, {with_options: 'true'});
    if (!res.options) return [];
    return res.options
      .map(params => FieldOption.fromJson({...{ field }, ...params}) as FieldOption);
  }

  async save(): Promise<boolean> {
    if (!this.id) return this.create();
    return this.update();
  }

  async create(): Promise<boolean> {
    const path = `/api/v0/applications/${this.field.datastore.project.id}/datastores/${this.field.datastore.id}/fields/${this.field.id}/options`;
    const option: {[key: string]: any} = {
      enabled: this.enabled,
      display_id: this.displayId,
    };
    if (this.value) {
      option.value = this.value;
    } else {
      option.name = this.name;
    }
    const res = await FieldOption.rest('POST', path, {}, { options: [option]});
    // this.sets(res);
    return true;
  }

  async update(): Promise<boolean> {
    const path = `/api/v0/applications/${this.field.datastore.project.id}/datastores/${this.field.datastore.id}/fields/${this.field.id}/options`;
    const option: {[key: string]: any} = {
      o_id: this.id,
      display_id: this.displayId,
      enabled: this.enabled,
      sort_id: this.sortId,
    };
    if (this.value) {
      option.value = this.value;
    } else {
      option.name = this.name;
    }
    await FieldOption.rest('PUT', path, {}, { options: [option]});
    return true;
  }

  async delete(): Promise<boolean> {
    const path = `/api/v0/applications/${this.field.datastore.project.id}/datastores/${this.field.datastore.id}/fields/${this.field.id}/options`;
    const o_ids: string[] = [this.id];
    await FieldOption.rest('DELETE', path, {}, { o_ids });
    return true;
  }
}

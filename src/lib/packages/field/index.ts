import { DtDatastoreGetFieldsRes, DtDsFieldSettings } from '../datastore/type';
import { HxbAbstract } from '../../../HxbAbstract';
import Datastore from '../datastore';
import FieldLayout from '../fieldLayout';
import { DS_FIELDS, DS_FIELD_SETTING } from '../../graphql/datastore';
import { FieldNameENJP } from '../../util/type';
import UserRole from '../userRole';
import Project from '../project';
import Item from '../item';
import FileObject from '../fileObject';
import FieldOption from '../fieldOption';
import User from '../user';
import { DataType, datastoreCreateFieldRequest } from '../../../lib/types/field';
import { FieldType } from '../fieldType';
import { datastoreCreateFieldResponse } from '../../../lib/types/field/response';
import { DATASTORE_CREATE_FIELD } from '../../../lib/graphql/field';

export default class Field extends HxbAbstract {
  datastore: Datastore;
  id: string;
  name: FieldNameENJP | string;
  displayId: string;
  dataType: string;
  fieldType: FieldType;
  search: boolean;
  showList: boolean;
  asTitle: boolean;
  status: boolean;
  fieldIndex: number;
  titleOrder: number;
  fullText: boolean;
  unique: boolean;
  hideFromApi: boolean;
  hasIndex: boolean;
  minValue: string;
  maxValue: string;
  layout: FieldLayout;
  hideOnInput: boolean;
  roles: UserRole[] = [];
  sizeX: number;
  sizeY: number;
  col: number;
  row: number;
  _options: FieldOption[] = [];

  set(key: string, value: any): Field {
    switch (key) {
      case 'datastore':
        this.datastore = value;
        break;
      case 'field_id':
      case 'fieldId':
      case 'id':
        this.id = value;
        break;
      case 'field_name':
      case 'fieldName':
      case 'name':
        this.name = value;
        break;
      case 'display_id':
      case 'displayId':
        this.displayId = value;
        break;
      case 'data_type':
      case 'dataType':
        this.dataType = value;
        this.fieldType = FieldType.set(value);
        break;
      case 'search':
        this.search = value;
        break;
      case 'show_list':
      case 'showList':
        this.showList = value;
        break;
      case 'as_title':
      case 'asTitle':
        this.asTitle = value;
        break;
      case 'status':
        this.status = value;
        break;
      case 'fieldIndex':
      case 'field_index':
        this.fieldIndex = value;
        break;
      case 'title_order':
      case 'titleOrder':
        this.titleOrder = value;
        break;
      case 'full_text':
      case 'fullText':
        this.fullText = value;
        break;
      case 'unique':
        this.unique = value;
        break;
      case 'hide_from_api':
      case 'hideFromApi':
        this.hideFromApi = value;
        break;
      case 'has_index':
      case 'hasIndex':
        this.hasIndex = value;
        break;
      case 'min_value':
      case 'minValue':
        this.minValue = value;
        break;
      case 'max_value':
      case 'maxValue':
        this.maxValue = value;
        break;
      case 'hideOnInput':
        this.hideOnInput = value;
        break;
      case 'sizeX':
      case 'size_x':
        this.sizeX = value;
        break;
      case 'sizeY':
      case 'size_y':
        this.sizeY = value;
        break;
      case 'col':
        this.col = value;
        break;
      case 'row':
        this.row = value;
        break;
      case 'roles':
        this.roles = (value as any[])
          .map(role => UserRole.fromJson({...{ project: this.datastore.project}, ...role}) as UserRole);
        break;
    }
    return this;
  }

  static async all(datastore: Datastore): Promise<Field[]> {
    const params = {
      projectId: datastore.project.id,
      datastoreId: datastore.id,
    };
    // handle call graphql
    const res: DtDatastoreGetFieldsRes = await this.request(DS_FIELDS, params);
    const data = res.datastoreGetFields!;
    const fields = Object.keys(data.fields).map(id => Field.fromJson({...{ datastore }, ...data.fields[id]}) as Field);
    Object.keys(data.field_layout).forEach((key: string) => {
      const field = fields.find(f => f.id === key)!;
      const fieldLayout = FieldLayout.fromJson({...{ field }, ...data.field_layout[key]}) as FieldLayout;
      field.layout = fieldLayout;
    });
    await Promise.all(fields.map(field => field.options()));
    return fields;
  }

  valid(value: any): boolean {
    if (value === null) return true;
    return this.fieldType.valid(value, this._options);
  }

  option(value?: any): FieldOption | undefined {
    if (typeof value === 'undefined') return new FieldOption({ field: this });
    if (typeof value === 'string') {
      return this._options.find(o => o.id === value || o.displayId === value || o.value.en === value || o.value.ja === value);
    } else {
      return this._options.find(o => o.value === value);
    }
  }

  value(value: any, options: {[key: string]: any}): any {
    if (value === null) return null;
    return this.fieldType.value(value, options, this);
  }

  async convert(value: any): Promise<any> {
    if (value === null) return null;
    try {
      return this.fieldType.convert(value, this._options, this);
    } catch (e) {
      throw new Error(`Field ${this.name} convert error: ${(e as Error).message}`);
    }
  }

  static async get(datastore: Datastore, fieldId: string): Promise<Field> {
    const res: DtDsFieldSettings = await this.request(DS_FIELD_SETTING, { fieldId, datastoreId: datastore.id });
    return Field.fromJson({...{datastore}, ...res.datastoreGetFieldSettings}) as Field;
  }

  async options(refresh?: boolean): Promise<FieldOption[] | null> {
    if (this.dataType !== DataType.SELECT &&
      this.dataType !== DataType.RADIO &&
      this.dataType !== DataType.CHECKBOX
    ) return null;
    if (refresh) this._options = [];
    if (this._options.length > 0) return this._options;
    this._options = await FieldOption.all(this);
    return this._options;
  }

  async save(): Promise<boolean> {
    if (!this.id) return this.create();
    return this.update();
  }

  async create(): Promise<boolean> {
    const roles = this.roles.length === 0 ?
      await this.datastore.project.roles() :
      this.roles;
    const payload = {
      dataType: this.dataType,
      display_id: this.displayId,
      name: this.name,
      search: this.search,
      show_list: this.showList,
      as_title: this.asTitle,
      full_text: this.fullText,
      unique: this.unique,
      hideOnInput: this.hideOnInput,
      hide_from_api: this.hideFromApi,
      has_index: this.hasIndex,
      roles: roles.map(role => role.id),
    };
    const path = `/api/v0/applications/${this.datastore.project.id}/datastores/${this.datastore.id}/fields`;
    const res: datastoreCreateFieldResponse = await Field.rest('POST', path, {}, payload);
    this.sets(res);
    return true;
  }

  async update(): Promise<boolean> {
    const roles = this.roles.length === 0 ?
      await this.datastore.project.roles() :
      this.roles;
    const payload = {
      name: this.name,
      search: this.search,
      show_list: this.showList,
      as_title: this.asTitle,
      full_text: this.fullText,
      hideOnInput: this.hideOnInput,
      hide_from_api: this.hideFromApi,
      has_index: this.hasIndex,
      roles: roles.map(role => role.id),
    };
    const path = `/api/v0/applications/${this.datastore.project.id}/datastores/${this.datastore.id}/fields/${this.id}`;
    await Field.rest('PUT', path, {}, payload);
    return true;
  }

  async delete(): Promise<boolean> {
    const path = `/api/v0/applications/${this.datastore.project.id}/datastores/${this.datastore.id}/fields/${this.id}`;
    await Field.rest('DELETE', path);
    return true;
  }
}
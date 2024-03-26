import { DtDatastoreGetFieldsRes, DtDsFieldSettings } from '../../types/datastore';
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
import { DataType } from '../../../lib/types/field';

export default class Field extends HxbAbstract {
  datastore: Datastore;
  id: string;
  name: FieldNameENJP | string;
  displayId: string;
  dataType: string;
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
        this.id = value;
        break;
      case 'field_name':
      case 'name':
        this.name = value;
        break;
      case 'display_id':
        this.displayId = value;
        break;
      case 'data_type':
      case 'dataType':
        this.dataType = value;
        break;
      case 'search':
        this.search = value;
        break;
      case 'show_list':
        this.showList = value;
        break;
      case 'as_title':
        this.asTitle = value;
        break;
      case 'status':
        this.status = value;
        break;
      case 'fieldIndex':
        this.fieldIndex = value;
        break;
      case 'title_order':
        this.titleOrder = value;
        break;
      case 'full_text':
        this.fullText = value;
        break;
      case 'unique':
        this.unique = value;
        break;
      case 'hide_from_api':
        this.hideFromApi = value;
        break;
      case 'has_index':
        this.hasIndex = value;
        break;
      case 'min_value':
        this.minValue = value;
        break;
      case 'max_value':
        this.maxValue = value;
        break;
      case 'hideOnInput':
        this.hideOnInput = value;
        break;
      case 'sizeX':
        this.sizeX = value;
        break;
      case 'sizeY':
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
    switch (this.dataType.toLocaleLowerCase()) {
      case DataType.TEXT:
      case DataType.TEXTAREA:
        return typeof value === 'string';
      case DataType.NUMBER:
        return typeof value === 'number';
      case DataType.FILE:
        if (value === '') return true;
        if (typeof value === 'undefined' || value === null) return true;
        if (value instanceof FileObject) return true;
        if (Array.isArray(value)) return true;
        if (typeof value === 'string') return true;
        return false;
      case DataType.DATETIME:
        if (typeof value === 'string' && value.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z/)) {
          return true;
        }
        // For yyyy-mm-ddThh:mm:ss.286Z
        if (typeof value === 'string' && value.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}Z/)) {
          return true;
        }
        return value instanceof Date;
      case DataType.SELECT:
      case DataType.RADIO:
        if (typeof value !== 'string') return false;
        return !!this.option(value);
      case DataType.CHECKBOX:
        if (typeof value === 'string') {
          value = value.split(',');
        }
        return (value as any[])
          .every((v: any) => this.option(v));
      case DataType.USERS:
        if (typeof value === 'string') return true;
        return (value as any[])
          .every(v => v instanceof User || (v.email && v.user_id));
      case DataType.DSLOOKUP:
        if (value === null) return true;
        if (value instanceof Item) return true;
        if (typeof value === 'string') return true;
        if (typeof value !== 'object') return false;
        if (value.item_id && value.title) return true;
        return false;
      case DataType.AUTONUM:
      case DataType.CALC:
      case DataType.LABEL:
      case DataType.SEPARATOR:
      case DataType.STATUS:
      default:
    }
    return true;
  }

  option(value: any): FieldOption | undefined {
    if (value === null) return undefined;
    if (typeof value === 'string') {
      return this._options.find(o => o.id === value || o.displayId === value || o.value.en === value || o.value.ja === value);
    } else {
      return this._options.find(o => o.value === value);
    }
  }

  value(value: any, options: {[key: string]: any}): any {
    if (value === null) return null;
    switch (this.dataType.toLocaleLowerCase()) {
      case DataType.DSLOOKUP:
        // ignore the value if value is only string
        if (typeof value === 'string') {
          return value;
        }
        return this._valueDsLookup(value, options);
      case DataType.FILE:
        if (value === '') return value;
        if (value instanceof FileObject) return [value];
        if (!Array.isArray(value) && typeof value === 'string') {
          value = value.split(',');
        }
        return (value as any[]).map((file: any) => {
          if (file instanceof FileObject) return file;
          if (typeof file === 'object') return FileObject.fromJson(file);
          if (file.match(/^[a-zA-Z0-9]+$/)) return new FileObject({ id: file });
        });
      case DataType.DATETIME:
        if (value instanceof Date) return value;
        return new Date(value);
      case DataType.CHECKBOX:
        if (!Array.isArray(value)) {
          value = [value];
        }
        return value.map((v: any) => {
          const option = this.option(v);
          return option ? option.value : null;
        });
      case DataType.SELECT:
      case DataType.RADIO:
        const option = this.option(value);
        return option ? option.value : null;
      case DataType.USERS:
        if (!Array.isArray(value)) {
          value = [value];
        }
        return (value as any[])
          .map((params: any) => (params instanceof User) ? params : (User.fromJson(params) as User));
      case DataType.FILE:
        if (!Array.isArray(value)) {
          value = [value];
        }
        return (value as any[])
          .map((params: any) => FileObject.fromJson(params) as FileObject);
      default:
    }
    return value;
  }

  _valueDsLookup(value: any, options: {[key: string]: any}): Item {
    if (value instanceof Item) return value;
    const project = new Project({workspace: options.item.datastore.project.workspace, id: value.p_id});
    const datastore = new Datastore({project, id: value.d_id});
    return new Item({datastore, id: value.i_id});
  }

  async convert(value: any): Promise<any> {
    switch (this.dataType.toLocaleLowerCase()) {
      case DataType.TEXT:
      case DataType.TEXTAREA:
        if (value === null) return '';
        if (typeof value === 'string') return value;
        throw new Error(`Field ${this.name} is not string (${value})`);
      case DataType.DSLOOKUP:
        if (value === null) return value;
        if (value instanceof Item) {
          if (!value.id) await value.save();
          return value.id;
        }
        throw new Error(`Field ${this.name} is not Item (${value})`);
      case DataType.NUMBER:
        if (value === null) return null;
        if (typeof value === 'number') return value;
        throw new Error(`Field ${this.name} is not number (${value})`);
      case DataType.FILE:
        if (value === null) return null;
        if (value instanceof FileObject) {
          value = [value];
        }
        if (Array.isArray(value)) {
          const res = await Promise.all(value.map((file: FileObject) => {
            return file.id ? file : file.save(this);
          }));
          const ids = res.map((file: FileObject) => file.id);
          return ids;
        } else {
          throw new Error(`Field ${this.name} is not FileObject (${value})`);
        }
      case DataType.CHECKBOX: {
        if (!value) return null;
        if (!Array.isArray(value)) {
          value = [value];
        }
        return value.map((v: any) => {
          const option = this.option(v);
          if (!option) throw new Error(`Field ${this.name} has not option (${v})`);
          return option.id;
        });
      }
      case DataType.SELECT:
      case DataType.RADIO: {
        if (value === null) return null;
        const option = this.option(value);
        if (!option) throw new Error(`Field ${this.name} has not option (${value})`);
        return option.id;
      }
      case DataType.USERS:
        if (value === null) return null;
        return value;
      case DataType.DATETIME:
        if (value === null) return null;
        return (value as Date).toISOString();
      case DataType.AUTONUM:
      case DataType.CALC:
      case DataType.LABEL:
      case DataType.SEPARATOR:
      case DataType.STATUS:
        return undefined;
      default:
        throw new Error(`Field ${this.name} doesn't support (${value})`);
    }
  }

  static async get(datastore: Datastore, fieldId: string): Promise<Field> {
    const res: DtDsFieldSettings = await this.request(DS_FIELD_SETTING, { fieldId, datastoreId: datastore.id });
    return Field.fromJson({...{datastore}, ...res.datastoreGetFieldSettings}) as Field;
  }

  async options(): Promise<FieldOption[] | null> {
    if (this.dataType !== DataType.SELECT &&
      this.dataType !== DataType.RADIO &&
      this.dataType !== DataType.CHECKBOX
    ) return null;
    if (this._options.length > 0) return this._options;
    this._options = await FieldOption.all(this);
    return this._options;
  }
}
import { DtDatastoreGetFieldsRes, DtDsFieldSettings } from "../../types/datastore";
import { HxbAbstract } from "../../../HxbAbstract";
import Datastore from "../datastore";
import FieldLayout from "../fieldLayout";
import { DS_FIELDS, DS_FIELD_SETTING } from "../../graphql/datastore";
import { FieldNameENJP } from "../../util/type";
import UserRole from "../userRole";
import Project from "../project";
import Item from "../item";
import ItemStatus from "../itemStatus";

enum DataType {
	TEXT = 'text',
	NUMBER = 'number',
	STATUS = 'status',
	AUTONUM = 'autonum',
	TEXTAREA = 'textarea',
	SELECT = 'select',
	FILE = 'file',
	RADIO = 'radio',
	CHECKBOX = 'checkbox',
	CALC = 'calc',
	DATETIME = 'datetime',
	USERS = 'users',
	DSLOOKUP = 'dslookup',
	LABEL = 'label',
	SEPARATOR = 'separator',
};

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
				this.roles = (value as any[]).map(role => UserRole.fromJson({...{ project: this.datastore.project}, ...role}) as UserRole);
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
    const fields = Object.keys(data.fields).map(id => Field.fromJson({...{datastore: this}, ...data.fields[id]}) as Field);
    Object.keys(data.field_layout).forEach((key: string) => {
      const field = fields.find(f => f.id === key)!;
      const fieldLayout = FieldLayout.fromJson({...{ field }, ...data.field_layout[key]}) as FieldLayout;
      field.layout = fieldLayout;
    });
		return fields;
	}

	valid(value: any): boolean {
		if (this.dataType === 'text') {
			return typeof value === 'string' || value === null;
		}
		return true;
	}

	value(value: any, options: {[key: string]: any}): any {
		if (this.dataType === 'dslookup' && value) {
			value = this._valueDsLookup(value, options);
		}
		return value;
	}

	_valueDsLookup(value: any, options: {[key: string]: any}): any {
		const project = new Project({workspace: options.item.datastore.project.workspace, id: value.p_id});
		const datastore = new Datastore({project, id: value.d_id});
		return new Item({datastore, id: value.i_id});
	}

	convert(value: any): any {
    switch (this.dataType.toLocaleLowerCase()) {
      case DataType.TEXT:
			case DataType.TEXTAREA:
        if (value === null) return '';
        if (typeof value === 'string') return value;
        throw new Error(`Field ${this.name} is not string (${value})`);
      case DataType.DSLOOKUP:
				if (value === null) return value;
        if (value instanceof Item) {
          return value.id;
        }
				throw new Error(`Field ${this.name} is not Item (${value})`);
			case DataType.NUMBER:
				if (value === null) return null;
				if (typeof value === 'number') return value;
				throw new Error(`Field ${this.name} is not number (${value})`);
			case DataType.AUTONUM:
			case DataType.CHECKBOX:
			case DataType.SELECT:
			case DataType.RADIO:
			case DataType.USERS:
			case DataType.FILE:
			case DataType.DATETIME:
				return value;
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
		console.log({...{datastore}, ...res.datastoreGetFieldSettings});
		return Field.fromJson({...{datastore}, ...res.datastoreGetFieldSettings}) as Field;
	}
}
import { GetFieldSettingsRes } from "../../../lib/types/filedOption";
import { HxbAbstract } from "../../../HxbAbstract";
import Field from "../field";
import { FieldNameENJP } from "../../../lib/util/type";

export default class FieldOption extends HxbAbstract {
	public field: Field;
	public id: string;
	public color: string;
	public createdAt: Date;
	public displayId: string;
	public enabled: boolean;
	public selected: boolean;
	public sortId: number;
	public updatedAt: Date;
	public value: FieldNameENJP;

	set(key: string, value: any): FieldOption {
		if (value === null) return this;
		switch (key) {
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
		const res: GetFieldSettingsRes = await this.rest('GET', path, {with_options: "true"});
		return res.options
			.map(params => FieldOption.fromJson({...{ field }, ...params}) as FieldOption);
	}
}

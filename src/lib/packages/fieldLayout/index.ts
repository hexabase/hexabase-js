import { HxbAbstract } from "../../../HxbAbstract";
import Field from "../field";

export default class FieldLayout extends HxbAbstract {
	sizeX: number;
	sizeY: number;
	col: number;
	row: number;
	field: Field;

  set(key: string, value: any): FieldLayout {
    switch (key) {
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
			case 'field':
				this.field = value;
				break;
		}
		return this;
	}
}
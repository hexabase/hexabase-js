import { HxbAbstract } from "../../../HxbAbstract";
import Workspace from "../workspace";

export default class Group extends HxbAbstract {
	index: number
	name: string;
	group_id: string;
	id: string;
	children: Group[];
	workspace: Workspace;

  set(key: string, value: any): Group {
    switch (key) {
			case 'index':
				this.index = value;
				break;
			case 'name':
				this.name = value;
				break;
			case 'group_id':
				this.group_id = value;
				break;
			case 'id':
				this.id = value;
				break;
		}
		return this;
	}
}
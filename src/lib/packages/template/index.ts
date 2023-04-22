import { HxbAbstract } from "../../../HxbAbstract";
import TemplateCategory from "../templateCategory";

export default class Template extends HxbAbstract {
	id: string;
  name: string;
  description: string;
	category: TemplateCategory;

	constructor(category: TemplateCategory) {
		super();
		this.category = category;
	}
	
  set(key: string, value: any): Template {
    switch (key) {
			case 'tp_id':
				this.id = value;
				break;
			case 'name':
				this.name = value;
				break;
			case 'description':
				this.description = value;
				break;
		}
		return this;
	}
}
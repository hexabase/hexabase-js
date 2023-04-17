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
	
	static fromJson(category: TemplateCategory, json: {[key: string]: any}): Template {
		const template = new Template(category);
		template.sets(json);
		return template;
	}

  sets(params: {[key: string]: any}): Template {
    Object.keys(params).forEach(key => {
      this.set(key, params[key]);
    });
    return this;
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
import { HxbAbstract } from "../../../HxbAbstract";
import Project from "../project";
import Template from "../template";

export default class TemplateCategory extends HxbAbstract {
	name: string;
	templates: Template[];
	project: Project;

	constructor(project: Project) {
		super();
		this.project = project;
	}

	static fromJson(project: Project, json: {[key: string]: any}): TemplateCategory {
		const templateCategory = new TemplateCategory(project);
		templateCategory.sets(json);
		return templateCategory;
	}

  sets(params: {[key: string]: any}): TemplateCategory {
    Object.keys(params).forEach(key => {
      this.set(key, params[key]);
    });
    return this;
  }

  set(key: string, value: any): TemplateCategory {
    switch (key) {
			case 'category':
				this.name = value;
				break;
			case 'templates':
				this.templates = (value as any[]).map((template: any) => Template.fromJson(this, template));
				break;
		}
		return this;
	}
}
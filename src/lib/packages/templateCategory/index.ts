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

  set(key: string, value: any): TemplateCategory {
    switch (key) {
			case 'category':
				this.name = value;
				break;
			case 'templates':
				this.templates = (value as any[]).map((template: any) => Template.fromJson({...{project: this.project}, ...template}) as Template);
				break;
		}
		return this;
	}
}
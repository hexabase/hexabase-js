import { HxbAbstract } from '../../../HxbAbstract';
import Project from '../project';
import Template from '../template';
export default class TemplateCategory extends HxbAbstract {
    name: string;
    templates: Template[];
    project: Project;
    constructor(project: Project);
    set(key: string, value: any): TemplateCategory;
}

import { HxbAbstract } from '../../../HxbAbstract';
import TemplateCategory from '../templateCategory';
export default class Template extends HxbAbstract {
    id: string;
    name: string;
    description: string;
    category: TemplateCategory;
    constructor(category: TemplateCategory);
    set(key: string, value: any): Template;
    static all(): Promise<TemplateCategory[]>;
}

import { DtTemplates } from '../../types/project';
import { HxbAbstract } from '../../../HxbAbstract';
import TemplateCategory from '../templateCategory';
import { GET_TEMPLATES } from '../../graphql/project';

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

  /**
   * function getTemplates: get templates
   * @returns TemplateRes
   */
  static async all(): Promise<TemplateCategory[]> {
    // handle call graphql
    const res: DtTemplates = await this.request(GET_TEMPLATES);
    return res.getTemplates.categories.map(category => TemplateCategory.fromJson({...{project: this}, ...category}) as TemplateCategory);
	}
}
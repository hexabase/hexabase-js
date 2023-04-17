import { HxbAbstract } from "../../../HxbAbstract";

export default class Language extends HxbAbstract {
	default?: boolean;
	langCd: string;
	use: boolean;

	static fromJson(json: {[key: string]: any}): Language {
		const language = new Language();
		language.sets(json);
		return language;
	}

  sets(params: {[key: string]: any}): Language {
    Object.keys(params).forEach(key => {
      this.set(key, params[key]);
    });
    return this;
  }

  set(key: string, value: any): Language {
    switch (key) {
			case 'default':
				this.default = value;
				break;
			case 'lang_cd':
				this.langCd = value;
				break;
			case 'use':
				this.use = value;
				break;
		}
		return this;
	}
}
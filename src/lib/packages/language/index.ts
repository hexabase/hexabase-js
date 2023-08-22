import { HxbAbstract } from '../../../HxbAbstract';

export default class Language extends HxbAbstract {
  default?: boolean;
  langCd: string;
  use: boolean;

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
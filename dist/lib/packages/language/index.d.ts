import { HxbAbstract } from '../../../HxbAbstract';
export default class Language extends HxbAbstract {
    default?: boolean;
    langCd: string;
    use: boolean;
    set(key: string, value: any): Language;
}

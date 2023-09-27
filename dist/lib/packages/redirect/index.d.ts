import { HxbAbstract } from '../../../HxbAbstract';
export default class Redirect extends HxbAbstract {
    redirectUrl: string;
    isApplyRedirectUrlForDisabledUsers: boolean;
    set(key: string, value: any): Redirect;
}

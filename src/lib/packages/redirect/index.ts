import { HxbAbstract } from '../../../HxbAbstract';

export default class Redirect extends HxbAbstract {
	redirectUrl: string;
	isApplyRedirectUrlForDisabledUsers: boolean;

  set(key: string, value: any): Redirect {
    switch (key) {
			case 'redirect_url':
				this.redirectUrl = value;
				break;
			case 'is_apply_redirect_url_for_disabled_users':
				this.isApplyRedirectUrlForDisabledUsers = value;
				break;
		}
		return this;
	}
}
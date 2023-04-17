import { HxbAbstract } from "../../../HxbAbstract";

export default class Redirect extends HxbAbstract {
	redirectUrl: string;
	isApplyRedirectUrlForDisabledUsers: boolean;

	static fromJson(json: {[key: string]: any}): Redirect {
		const redirect = new Redirect();
		redirect.sets(json);
		return redirect;
	}

  sets(params: {[key: string]: any}): Redirect {
    Object.keys(params).forEach(key => {
      this.set(key, params[key]);
    });
    return this;
  }

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
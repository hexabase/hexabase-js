import { HxbAbstract } from "../../../HxbAbstract";

export default class UserSession extends HxbAbstract {
	use: boolean;
	default: boolean;
	sessionTimeoutSec: number;

	static fromJson(json: {[key: string]: any}): UserSession {
		const userSession = new UserSession();
		userSession.sets(json);
		return userSession;
	}

  sets(params: {[key: string]: any}): UserSession {
    Object.keys(params).forEach(key => {
      this.set(key, params[key]);
    });
    return this;
  }

  set(key: string, value: any): UserSession {
    switch (key) {
			case 'use':
				this.use = value;
				break;
			case 'default':
				this.default = value;
				break;
			case 'session_timeout_sec':
				this.sessionTimeoutSec = value;
				break;
		}
		return this;
	}
}
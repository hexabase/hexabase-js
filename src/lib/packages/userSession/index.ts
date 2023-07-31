import { HxbAbstract } from '../../../HxbAbstract';

export default class UserSession extends HxbAbstract {
  use: boolean;
  default: boolean;
  sessionTimeoutSec: number;

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
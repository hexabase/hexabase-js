import { HxbAbstract } from '../../../HxbAbstract';
export default class UserSession extends HxbAbstract {
    use: boolean;
    default: boolean;
    sessionTimeoutSec: number;
    set(key: string, value: any): UserSession;
}

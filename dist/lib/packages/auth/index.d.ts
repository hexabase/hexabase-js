import { GraphQLClient } from 'graphql-request';
import { LoginPayload } from '../../types/user';
import { AuthChangeEvent, Session } from '../../types/auth/input';
import { Subscription } from '../../types/auth/response';
export default class Auth {
    protected urlGraphql: string;
    protected stateChangeEmitters: Map<string, Subscription>;
    client: GraphQLClient;
    constructor(urlGraphql: string);
    login(loginInput: LoginPayload): Promise<string>;
    logout(): Promise<boolean>;
    onAuthStateChange(callback: (event: AuthChangeEvent, session: Session) => void): Subscription;
}

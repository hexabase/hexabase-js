import { GraphQLClient } from 'graphql-request';
import { LOG_OUT } from '../../graphql/user';
import { LoginPayload } from '../../types/user';
import { DtLogin, DtLogOut } from '../../types/auth';
import { LOGIN } from '../../graphql/auth';
import { AuthChangeEvent, AuthStorage, Session } from '../../types/auth/input';
import { Subscription } from '../../types/auth/response';
import { uuid } from '../../util/helper';
import { Persistence } from './persistence';
import Cookies from 'js-cookie';

export default class Auth {
  public client: GraphQLClient;
  private _storage?: Storage | string;
  public tokenName: string = 'HexabaseToken';
  public persistence?: Persistence;
  protected stateChangeEmitters: Map<string, Subscription> = new Map();

  constructor(protected urlGraphql: string) {
    this.client = new GraphQLClient(urlGraphql);
  }

  /**
   * function login: get user info by token
   * @returns TokenModel
   */
  async login(loginInput: LoginPayload): Promise<string> {
    // handle call graphql
    const res: DtLogin = await this.client.request(LOGIN, { loginInput });
    await this.persistence?.set(this.tokenName, res.login.token);
    return res.login.token;
  }

  /**
   * function logout: log out user
   * @returns ModelRes
   */
  async logout(): Promise<boolean> {
    await this.persistence?.remove(this.tokenName);
    // handle call graphql
    const res: DtLogOut = await this.client.request(LOG_OUT);
    return res.logout.success;
  }

  async getToken(): Promise<string | null | undefined> {
    return await this.persistence?.get(this.tokenName);
  }

  setPersistence(storage: AuthStorage | typeof Cookies): void {
    // set storage
    this.persistence = new Persistence(storage);
  }

  /**
   * Receive a notification every time an auth event happens.
   * @returns {Subscription} A subscription object which can be used to unsubscribe itself.
   */
  onAuthStateChange(callback: (event: AuthChangeEvent, session: Session) => void): Subscription {
    const id: string = uuid();
    const subscription: Subscription = {
      id,
      callback,
      unsubscribe: () => {
        this.stateChangeEmitters.delete(id);
      },
    };
    this.stateChangeEmitters.set(id, subscription);
    return subscription;
  }
}
import { GraphQLClient } from 'graphql-request';
import { LOG_OUT, USER_INFO } from '../../graphql/user';
import { DtUserInfo, LoginPayload, UserInfoRes } from '../../types/user';
import { HxbAbstract } from '../../../HxbAbstract';
import { DtLogin, DtLogOut, LoginRes } from '../../types/auth';
import { LOGIN } from '../../graphql/auth';
import { ModelRes } from '../../util/type';
import { AuthChangeEvent, Session } from '../../types/auth/input';
import { Subscription } from '../../types/auth/response';
import { ApiError } from '../../types/auth/response';
import { uuid } from '../../util/helper';

export default class Auth {
  protected stateChangeEmitters: Map<string, Subscription> = new Map();

  // public urlGr: string;
  public client: GraphQLClient;

  constructor(
    protected urlGraphql: string,
  ) {
    // this.urlGr = urlGraphql;
    this.client = new GraphQLClient(urlGraphql);
  }

  /**
   * function login: get user info by token
   * @returns TokenModel
   */
  async login(loginInput: LoginPayload): Promise<string> {
    // handle call graphql
    const res: DtLogin = await this.client.request(LOGIN, { loginInput });
    return res.login.token;
  }

  /**
   * function logout: log out user
   * @returns ModelRes
   */
  async logout(token: string): Promise<boolean> {
    // handle call graphql
    const res: DtLogOut = await this.client.request(LOG_OUT);
    return res.logout.success;
  }

  /**
   * Receive a notification every time an auth event happens.
   * @returns {Subscription} A subscription object which can be used to unsubscribe itself.
   */
  onAuthStateChange(callback: (event: AuthChangeEvent, session: Session) => void): {
    data: Subscription | undefined,
    error: ApiError | undefined
  } {
    try {
      const id: string = uuid();
      const subscription: Subscription = {
        id,
        callback,
        unsubscribe: () => {
          this.stateChangeEmitters.delete(id);
        },
      };
      this.stateChangeEmitters.set(id, subscription);
      return { data: subscription, error: undefined };
    } catch (e) {
      return { data: undefined, error: e as ApiError };
    }
  }
}
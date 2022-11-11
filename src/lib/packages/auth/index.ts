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

  public urlGr: string;
  public client: GraphQLClient;

  constructor(
    protected urlGraphql: string,
  ) {
    this.urlGr = urlGraphql;
    this.client = new GraphQLClient(this.urlGr);
  }

  /**
   * function login: get user info by token
   * @returns TokenModel
   */
  async login(loginInput: LoginPayload): Promise<LoginRes> {
    const data: LoginRes = {
      token: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtLogin = await this.client.request(LOGIN, { loginInput });
      data.token = res.login.token;
    } catch (error: any) {

      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function logout: log out user
   * @returns ModelRes
   */
  async logout(token: string): Promise<ModelRes> {
    const data: ModelRes = {
      data: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      this.client.setHeader(
        'authorization', `Bearer ${token}`
      );
      const res: DtLogOut = await this.client.request(LOG_OUT);

      data.data = res.logout;
    } catch (error: any) {

      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * Receive a notification every time an auth event happens.
   * @returns {Subscription} A subscription object which can be used to unsubscribe itself.
   */
  onAuthStateChange(callback: (event: AuthChangeEvent, session: Session) => void): {
    data: Subscription | null,
    error: ApiError | null
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
      return { data: subscription, error: null };
    } catch (e) {
      return { data: null, error: e as ApiError };
    }
  }

}
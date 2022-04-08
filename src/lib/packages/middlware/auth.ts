import { GraphQLClient } from 'graphql-request';
import { DtUserInfo, LoginInputPayload } from '../../types/user';
import { LOGIN } from '../../graphql/auth';
import { USER_INFO } from '../../graphql/user';
import { DtLogin, LoginRes } from '../../types/auth';
import { UserInfoRes } from '../../types/user';

export default class AuthMw {

  public urlGr: string;
  public client: GraphQLClient;

  constructor(
    protected urlGraphql: string,
  ) {
    this.urlGr = urlGraphql;
    this.client = new GraphQLClient(this.urlGr);
  }

  /**
   * function loginAsync: get user info by token
   * @returns TokenModel
   */
  async loginAsync(loginInput: LoginInputPayload): Promise<LoginRes> {
    let data: LoginRes = {
      token: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtLogin = await this.client.request(LOGIN, { loginInput });
      data.token = res.login.token;
    } catch(error: any) {

      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  async userInfoAsync(token: string): Promise<UserInfoRes> {
    let data: UserInfoRes = {
      userInfo: undefined,
      error: undefined,
    };

    this.client.setHeader('authorization', `Bearer ${token}`);
    try {
      const res: DtUserInfo = await this.client.request(USER_INFO);

      data.userInfo = res.userInfo;
    } catch (error: any) {
      
      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }
}

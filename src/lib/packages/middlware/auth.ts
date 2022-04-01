import { GraphQLClient } from 'graphql-request';
import { LoginInputPayload } from '../../types/user';
import { LOGIN } from '../../graphql/auth';
import { USER_INFO } from '../../graphql/user';
import { LoginRes } from '../../types/auth';
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
    return await this.client.request(LOGIN, { loginInput });

  }
  async userInfoAsync(token: string): Promise<UserInfoRes> {
    this.client.setHeader('authorization', `Bearer ${token}`);
    const data = await this.client.request(USER_INFO);

    return data;
  }
}

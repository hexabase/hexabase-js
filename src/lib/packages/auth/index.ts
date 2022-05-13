import { GraphQLClient } from 'graphql-request';
import { USER_INFO } from '../../graphql/user';
import { DtUserInfo, LoginInputPayload, UserInfoRes } from '../../types/user';
import { HxbAbstract } from '../../../HxbAbstract';
import { DtLogin, LoginRes } from '../../types/auth';
import { LOGIN } from '../../graphql/auth';

export default class Auth {
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
   async login(loginInput: LoginInputPayload): Promise<LoginRes> {
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


}
import { GraphQLClient } from 'graphql-request';
import { DtUserInfo } from '../user/type';
import { LOGIN } from '../../graphql/auth';
import { USER_INFO } from '../user/graphql';
import { DtLogin, LoginRes } from '../../types/auth';
import { UserInfoRes } from '../user/type';

export default class AuthMw {

  public urlGr: string;
  public client: GraphQLClient;

  constructor(
    protected urlGraphql: string,
  ) {
    this.urlGr = urlGraphql;
    this.client = new GraphQLClient(this.urlGr);
  }

  async userInfoAsync(token: string): Promise<UserInfoRes> {
    const data: UserInfoRes = {
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

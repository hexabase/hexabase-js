import { GraphQLClient } from 'graphql-request';
import { UserInfoRes } from '../../types/user';
export default class AuthMw {
    protected urlGraphql: string;
    urlGr: string;
    client: GraphQLClient;
    constructor(urlGraphql: string);
    userInfoAsync(token: string): Promise<UserInfoRes>;
}

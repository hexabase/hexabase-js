import { GraphQLClient } from 'graphql-request';
import HexabaseClient from './HexabaseClient';

export class HxbAbstract {
  static client: HexabaseClient;

  static request(query: string, variables?: any, _client?: HexabaseClient) {
    return new HxbAbstract().request(query, variables, _client);
  }

  request(query: string, variables?: any, _client?: HexabaseClient) {
    const client = _client instanceof HexabaseClient ? _client : HxbAbstract.client;
    const gqClient = new GraphQLClient(client.urlHxb, {
      timeout: 50000,
      headers: {
        authorization: `Bearer ${client.tokenHxb}`,
      },
    });
    try {
      return gqClient.request(query, variables);
    } catch (error: any) {
      throw JSON.stringify(error?.response?.errors);
    }
  }
}

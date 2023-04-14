import { GraphQLClient } from 'graphql-request';
import HexabaseClient from './HexabaseClient';

export class HxbAbstract {
  protected gqClient: GraphQLClient;
  constructor(protected client: HexabaseClient) {
    this.gqClient = new GraphQLClient(client.urlHxb, {
      timeout: 50000,
      headers: {
        authorization: `Bearer ${client.tokenHxb}`,
      },
    });
  }
}

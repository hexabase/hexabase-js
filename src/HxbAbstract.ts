import { GraphQLClient } from 'graphql-request';

export class HxbAbstract {
  public urlGr: string;
  public token: string;
  public client: GraphQLClient;

  constructor(
    protected urlGraphql: string,
    protected tokenHxb: string
  ) {
    this.urlGr = urlGraphql;
    this.token = tokenHxb;
    this.client = new GraphQLClient(this.urlGr, {
      timeout: 50000,
      headers: {
        authorization: `Bearer ${this.token}`,
      },
    });
  }
}

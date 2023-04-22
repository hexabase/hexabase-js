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

  static fromJson(json: {[key: string]: any}): HxbAbstract {
		const obj = new this;
		obj.sets(json);
		return obj;
	}

  sets(params: {[key: string]: any}): HxbAbstract {
    if (params.workspace) this.set('workspace', params.workspace);
    if (params.project) this.set('project', params.project);
    if (params.datastore) this.set('datastore', params.datastore);
    Object.keys(params).forEach(key => {
      this.set(key, params[key]);
    });
    return this;
  }

  set(key: string, value: any): HxbAbstract {
    return this;
  }
}

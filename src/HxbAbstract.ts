import { GraphQLClient } from 'graphql-request';
import HexabaseClient from './HexabaseClient';
// import axios, { Axios, AxiosError, AxiosResponse } from 'axios';
import { Buffer, Blob } from 'buffer';
import fetch, { Response, RequestInit } from 'node-fetch';
import FormData from 'form-data';

export class HxbAbstract {
  static client: HexabaseClient;

  constructor(params?: {[key: string]: any}) {
    if (params) this.sets(params);
  }

  static request(query: string, variables?: any, _client?: HexabaseClient): Promise<any> {
    return new HxbAbstract().request(query, variables, _client);
  }

  request(query: string, variables?: any, _client?: HexabaseClient): Promise<any> {
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

  static rest(method: string, path: string, query?: {[key: string]: string}, body?: {[key: string]: any}, options: {[key: string]: any} = {}): Promise<any> {
    return new HxbAbstract().rest(method, path, query, body, options);
  }

  async rest(method: string, path: string, queries?: {[key: string]: string}, bodies?: {[key: string]: any}, options: {[key: string]: any} = {}): Promise<any> {
    const query = queries ? new URLSearchParams(queries).toString() : '';
    const url = `${HxbAbstract.client.restHxb}${path}${query !== '' ? `?${query}` : ''}`;
    try {
      const res = await this.exec(method, url, bodies, options);
      if (options.response === 'blob') return await res.blob();
      if (options.binary) return JSON.parse(await res.text());
      return await res.json();
    } catch (error: any) {
      console.log(error);
      throw error.response.data;
    }
  }

  async exec(method: string, url: string, bodies?: {[key: string]: any}, options: {[key: string]: any} = {}): Promise<Response> {
    const params: RequestInit = {
      method,
      headers: {
        Authorization: `Bearer ${HxbAbstract.client.tokenHxb}`,
      }
    };
    if (!options.binary) {
      params.headers = {...params.headers, ...{
        'Content-Type': 'application/json',
      }}; 
    }
    if (['get', 'delete'].indexOf(method.toLocaleLowerCase()) > -1) {
      return fetch(url, params);
    }
    if (['post', 'put'].indexOf(method.toLocaleLowerCase()) > -1) {
      params.body = await this._makeBody(bodies, options.binary) as any;
      return fetch(url, params);
    }
    throw new Error(`Method ${method} is not supported`);
  }

  async _makeBody(bodies: {[key: string]: any} = {}, binary = false) {
    if (!binary) return bodies;
    const form = new FormData;
    const { fileName, file } = bodies;
    const buffer = Buffer.from(await file.arrayBuffer());
    form.append('file', buffer, {
      filename: fileName,
      contentType: file.type,
      knownLength: buffer.length,
    });
    form.append('fileName', fileName);
    return form;
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
    if (params.item) this.set('item', params.item);
    Object.keys(params).forEach(key => {
      this.set(key, params[key]);
    });
    return this;
  }

  set(key: string, value: any): HxbAbstract {
    return this;
  }
}

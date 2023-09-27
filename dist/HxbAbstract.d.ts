import HexabaseClient from './HexabaseClient';
import { Response } from 'node-fetch';
import FormData from 'form-data';
export declare class HxbAbstract {
    static client: HexabaseClient;
    constructor(params?: {
        [key: string]: any;
    });
    static request(query: string, variables?: any, _client?: HexabaseClient): Promise<any>;
    request(query: string, variables?: any, _client?: HexabaseClient): Promise<any>;
    static rest(method: string, path: string, query?: {
        [key: string]: string;
    }, body?: {
        [key: string]: any;
    }, options?: {
        [key: string]: any;
    }): Promise<any>;
    rest(method: string, path: string, queries?: {
        [key: string]: string;
    }, bodies?: {
        [key: string]: any;
    }, options?: {
        [key: string]: any;
    }): Promise<any>;
    exec(method: string, url: string, bodies?: {
        [key: string]: any;
    }, options?: {
        [key: string]: any;
    }): Promise<Response>;
    _makeBody(bodies?: {
        [key: string]: any;
    }, binary?: boolean): Promise<string | FormData>;
    static fromJson(json: {
        [key: string]: any;
    }): HxbAbstract;
    sets(params: {
        [key: string]: any;
    }): HxbAbstract;
    set(key: string, value: any): HxbAbstract;
}

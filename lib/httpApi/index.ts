import axios, { AxiosResponse } from 'axios';
import { resolve } from 'dns';
import { HxbSessionStorage } from '../storage/sessionStorage';

const baseURL = "/api";

// axios.defaults.baseURL = '/api';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

interface APIURLBuilderParams {
    apiUrl: string;
    method: string;
    printApiURL: boolean;
}

export default class HttpAPI {
    
    /**
     * build http headers including user token
     * @returns object
     */
    private static commonHttpHeaders(): object {
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${HxbSessionStorage.Read('token')}`
        };

        return headers;
    }

    /**
     * @param  {string} apiUrl
     * @param  {any=null} payload
     * @param  {boolean=true} printApiURL
     * @returns Promise
     */
    public static Post<T>(apiUrl: string, payload: any = null, printApiURL: boolean = false): Promise<T> 
    {
        return new Promise((resolve, reject) =>
        {
            axios.post(this.APIurlBuilder({ apiUrl, method: 'POST', printApiURL: printApiURL }), 
            payload,
            {
                headers: this.commonHttpHeaders()
            })
            .then(response => resolve(response.data as T))
            .catch(err => reject(err));
        })
    }

    /**
     * @param  {string} apiUrl
     * @param  {any=null} payload
     * @param  {boolean=true} printApiURL
     * @returns Promise
     */
    public static Get<T>(apiUrl: string, payload: any = null, printApiURL: boolean = false): Promise<T> 
    {
        return new Promise((resolve, reject) =>
        {
            axios.get(this.APIurlBuilder({ apiUrl, method: 'GET', printApiURL }), 
            { 
                params: payload, 
                headers: this.commonHttpHeaders()
            })
            .then(response => resolve(response.data as T))
            .catch(err => reject(err));
        });
    }

    public static APIurlBuilder(params: APIURLBuilderParams): string
    public static APIurlBuilder(x: {apiUrl: string, method: string, printApiURL: boolean}): string {
        // if(x.printApiURL) console.log(`[info:${x.method}]\t -->>\t https://az-api.hexabase.com/api/v0/${x.apiUrl}`);

        // return `https://az-api.hexabase.com/api/v0/${x.apiUrl}`;
        if(process.env.ENV && process.env.ENV === 'test')
        {
            if(x.printApiURL) console.log(`[info:${x.method}]\t -->>\t https://az-api.hexabase.com${baseURL}/v0/${x.apiUrl}`);
            return `https://az-api.hexabase.com${baseURL}/v0/${x.apiUrl}`
        }

        if(x.printApiURL) console.log(`[info:${x.method}]\t -->>\t ${baseURL}/${x.apiUrl}`);

        return `${baseURL}/${x.apiUrl}`;

    }
}
import axios, { AxiosResponse } from 'axios';
import { resolve } from 'dns';
import { HxbSessionStorage } from '../storage/sessionStorage';

const baseURL = "/api";

// axios.defaults.baseURL = '/api';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

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
        console.log(this.APIurlBuilder({ apiUrl, method: 'POST', printApiURL: printApiURL }))
        return new Promise((resolve, reject) =>
        {
            if(process.env.URL === 'true') printApiURL = true;
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
            if(process.env.URL === 'true') printApiURL = true;
            axios.get(this.APIurlBuilder({ apiUrl, method: 'GET', printApiURL }), 
            { 
                params: payload, 
                headers: this.commonHttpHeaders()
            })
            .then(response => resolve(response.data as T))
            .catch(err => reject(err));
        });
    }

    /**
     * @param  {APIURLBuilderParams} params
     * @returns string
     */
    public static APIurlBuilder(params: APIURLBuilderParams): string
    /**
     * @param  {{apiUrl:string} x
     * @param  {string} method
     * @param  {boolean}} printApiURL
     * @returns string
     */
    public static APIurlBuilder(x: {apiUrl: string, method: string, printApiURL: boolean}): string {
        let url = `/linker-api/${x.apiUrl}`;
        // let url = `https://az-api.hexabase.com${baseURL}/v0/${x.apiUrl}`;
        // if(process.env.ENV && process.env.ENV === 'test' || process.env.NODE_ENV === 'development')
        // {
        //     let nUrl = `${baseURL}/${x.apiUrl}`;
        //     if(x.printApiURL) console.log(`[info:${x.method}]\t -->>\t ${nUrl}`);
        //     return nUrl;
        // }

        return url
    }
}
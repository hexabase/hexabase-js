import axios, { AxiosResponse } from 'axios';
import { resolve } from 'dns';
import { HxbSessionStorage } from '../storage/sessionStorage';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

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
     * @param  {any} payload
     * @returns Promise
     */
    public static Post<T>(apiUrl: string, payload: any = null): Promise<T> 
    {
        return new Promise((resolve, reject) =>
        {
            axios.post(this.APIurlBuilder(apiUrl, 'POST'), 
            payload,
            {
                headers: this.commonHttpHeaders()
            })
            .then(response => resolve(response.data as T))
            .catch(err => reject(err));
        })
    }

    public static Get<T>(apiUrl: string, payload: any = null): Promise<T> {
        return new Promise((resolve, reject) =>
        {
            axios.get(this.APIurlBuilder(apiUrl, 'GET'), 
            { 
                params: payload, 
                headers: this.commonHttpHeaders()
            })
            .then(response => resolve(response.data as T))
            .catch(err => reject(err));
        });
    }

    public static APIurlBuilder(apiUrl: string, method: string): string {
        // console.log(`[info:${method}] -->> https://az-api.hexabase.com/api/v0/${apiUrl}`)
        return `https://az-api.hexabase.com/api/v0/${apiUrl}`;
    }
}
import axios, { AxiosResponse } from 'axios';
import { resolve } from 'dns';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default class HttpAPI {
    
    private static commonHttpHeaders(): object {
        return {
            'Content-Type': 'application/json'
        };
    }

    /**
     * @param  {string} apiUrl
     * @param  {any} payload
     * @returns Promise
     */
    public static Post<T>(apiUrl: string, payload: any): Promise<T> 
    {
        return new Promise((resolve, reject) =>
        {
            axios.post(`/api/${apiUrl}`, 
            payload,
            {
                headers: this.commonHttpHeaders()
            })
            .then(response => resolve(response.data as T))
            .catch(err => reject(err));
        })
    }
}
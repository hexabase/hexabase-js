export default class HttpAPI {
    /**
     * @param  {string} apiUrl
     * @param  {any} payload
     * @returns Promise
     */
    static Post<T>(apiUrl: string, payload: any): Promise<T>;
}

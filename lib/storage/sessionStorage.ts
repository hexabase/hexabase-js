import jwt_decode from 'jwt-decode';
import { JWTToken } from '../models/index';
export class HxbSessionStorage 
{
    /**
     * @param  {string} key
     * @param  {string} value
     */
    public static Write(key: string, value: string) 
    {
        localStorage.setItem(key, value);
    }

    /**
     * @param  {string} key
     * @returns string
     */
    public static Read(key: string): string | null
    {
        return localStorage.getItem(key);
    }

    public static ParseJWT(tokenKey: string = 'token'): JWTToken {
        let token = jwt_decode(this.Read(tokenKey)!);
        if(token) return token  as JWTToken;

        return {} as JWTToken;
    }
}
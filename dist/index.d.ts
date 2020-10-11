import Auth from './auth/auth';
import { UsersLoginReq } from './models/users';
declare class BaseError extends Error {
    constructor(e?: string);
}
export declare class HexabaseSdkError extends BaseError {
    constructor(e: string);
}
export interface HexabaseSdkOptions {
    protocol?: string;
    host?: string;
    port?: number;
    path?: string;
    debug?: boolean;
}
export declare class Hexabase {
    static auth: Auth;
    private options;
    constructor(options?: HexabaseSdkOptions);
    /**
     * @param  {UsersLoginReq} userReq
     */
    static initializeApp(userReq: UsersLoginReq): Promise<void>;
}
export {};

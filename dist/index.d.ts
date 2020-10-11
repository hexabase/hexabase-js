import Auth from '../lib/auth/auth';
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
    auth: Auth;
    private options;
    constructor(options?: HexabaseSdkOptions);
    testFunction(msg?: string): void;
    anotherFn(msg?: string): void;
    login(email: string, password: string): Promise<string>;
    private console;
}
export {};

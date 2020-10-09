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
    private options;
    constructor(options?: HexabaseSdkOptions);
    login(email: string, password: string): Promise<string>;
    private console;
}
export {};

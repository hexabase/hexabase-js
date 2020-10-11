export declare class HxbSessionStorage {
    /**
     * @param  {string} key
     * @param  {string} value
     */
    static Write(key: string, value: string): void;
    /**
     * @param  {string} key
     * @returns string
     */
    static Read(key: string): string | null;
}

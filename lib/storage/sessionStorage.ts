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
}
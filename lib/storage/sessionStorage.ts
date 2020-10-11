export class HxbSessionStorage 
{
    /**
     * @param  {string} key
     * @param  {string} value
     */
    public static Write(key: string, value: string) 
    {
        sessionStorage.setItem(key, value);
    }
    
    /**
     * @param  {string} key
     * @returns string
     */
    public static Read(key: string): string | null
    {
        return sessionStorage.getItem(key);
    }
}
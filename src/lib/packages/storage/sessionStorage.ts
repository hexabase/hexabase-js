export class HxbSessionStorage {
    /**
     * @param  {string} key
     * @param  {string} value
     */
    public static Write(key: string, value: string) {
      localStorage.setItem(key, value);
    }
}
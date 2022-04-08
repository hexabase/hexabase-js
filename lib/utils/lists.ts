type ResultAsyncCallback = <T>(cb: Promise<T>) => void;

export class Lists 
{
    public targetResultPromise: Promise<any | undefined> = new Promise<any | undefined>(() => {});
    public targetNonAsync: any;

    public firstOrDefault(): object 
    {
        return {} as object
    }

    public testFunc(): void {
        console.log('called from list!');
    }

    /**
     * function to return targetResultPromise
     * @param  {<T>(cb:Promise<T>} cb?
     * @param  {any} cb?
     * @returns Promise
     */
    public async ResultAsync<T>(cb?: <T>(cb: Promise<T>) => () => void): Promise<T>
    public async ResultAsync<T>(cb?: any): Promise<T>
    {

        if(typeof cb == 'function') return cb(this.targetResultPromise);
        return this.targetResultPromise;
    }

    public async Result<T>(): Promise<T>
    {
        // return new Promise(() => this.targetNonAsync);
        return this.targetResultPromise;
    }
}
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
     * targetResultPromise values are for every chain stage
     * @returns Promise
     */
    public async ResultAsync<T>(): Promise<T>
    {
        return this.targetResultPromise;
    }

    public async Result<T>(): Promise<T>
    {
        // return new Promise(() => this.targetNonAsync);
        return this.targetResultPromise;
    }
}
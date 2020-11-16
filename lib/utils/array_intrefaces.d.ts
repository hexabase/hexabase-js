export {}
declare global {
    interface Array<T> {
        FindDatastore(dID: string): void;
    }
    
}
Array.prototype.FindDatastore = function(dID: string) {
    console.log(`d_id ${dID}`)
}
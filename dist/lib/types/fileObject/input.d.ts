/// <reference types="node" />
import { Blob } from 'buffer';
export interface UploadFileParameters {
    file: Blob;
    fileName: string;
}
export interface UploadItemFileParameters {
    file: Blob;
    filename: string;
    datastore_id: string;
    application_id: string;
}

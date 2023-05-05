import { Blob } from 'buffer';

export interface UploadFileParameters {
	file: Blob;
	fileName: string;
}

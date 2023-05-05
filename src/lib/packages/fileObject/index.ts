import { HxbAbstract } from "../../../HxbAbstract";
import { Blob } from 'buffer';

import { UploadFileParameters, UploadFileRes, DeleteFileRes } from '../../types/fileObject/';
import { DELETE_STORAGE } from '../../graphql/fileObject';

export default class FileObject extends HxbAbstract {
	public id: string;
	public data: Blob;

  set(key: string, value: any): FileObject {
    switch (key) {
			case 'file_id':
			case 'id':
				this.id = value;
				break;
			case 'data':
				this.data = value;
				break;
		}
		return this;
	}

	static async upload(fileName: string, file: Blob): Promise<FileObject> {
		const params: UploadFileParameters = {
			fileName, file
		}
		const res = await this.rest('post', '/api/v0/files', {}, params, {binary: true}) as UploadFileRes;
		return FileObject.fromJson({ id: res.file_id }) as FileObject;
	}

	static async download(fileId: string): Promise<FileObject> {
		const file = new FileObject({ id: fileId });
		await file.download();
		return file;
	}

	async download(): Promise<FileObject> {
		const res = await this.rest('get', `/api/v0/files/${this.id}`, {}, {}, {response: 'blob'});
		this.set('data', res as Blob);
		return this;
	}

	async delete(): Promise<boolean> {
    const res: DeleteFileRes = await this.request(DELETE_STORAGE, { fileId: this.id });
		return res.deleteStorage.success;
	}
}
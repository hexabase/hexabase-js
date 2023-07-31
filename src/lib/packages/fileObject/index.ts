import { HxbAbstract } from '../../../HxbAbstract';
import { Blob } from 'buffer';

import { UploadFileParameters, UploadFileRes, DeleteFileRes, UploadItemFileParameters } from '../../types/fileObject/';
import { DELETE_STORAGE } from '../../graphql/fileObject';
import Datastore from '../datastore';
import Item from '../item';
import Field from '../field';

export default class FileObject extends HxbAbstract {
  public item: Item;
  public datastore: Datastore;
  public id: string;
  public name: string;
  public data: Blob;
  public contentType: string;
  public createdAt: Date;
  public deleted: boolean;
  public displayOrder: number;
  public filepath: string;
  public mediaLink: string;
  public selfLink: string;
  public size: number;
  public updated: Date;
  public temporary: boolean;
  public timeCreated: Date;
  public userId: string;

  set(key: string, value: any): FileObject {
    switch (key) {
      case 'file_id':
      case 'id':
      case '_id':
        this.id = value;
        break;
      case 'item':
        this.item = value;
        break;
      case 'datastore':
        this.datastore = value;
        break;
      case 'name':
      case 'filename':
        this.name = value;
        break;
      case 'data':
        this.data = value;
        break;
      case 'contentType':
        this.contentType = value;
        break;
      case 'created_at':
        this.createdAt = new Date(value);
        break;
      case 'deleted':
        this.deleted = value;
        break;
      case 'display_order':
        this.displayOrder = value;
        break;
      case 'filepath':
        this.filepath = value;
        break;
      case 'mediaLink':
        this.mediaLink = value;
        break;
      case 'selfLink':
        this.selfLink = value;
        break;
      case 'size':
        this.size = value;
        break;
      case 'temporary':
        this.temporary = value;
        break;
      case 'timeCreated':
        this.timeCreated = new Date(value);
        break;
      case 'updated':
        this.updated = new Date(value);
        break;
      case 'user_id':
        this.userId = value;
        break;
    }
    return this;
  }

  async save(field?: Field): Promise<FileObject> {
    if (field) {
      return this._saveItem(field);
    } else {
      return this._save();
    }
  }

  async _saveItem(field: Field): Promise<FileObject> {
    if (this.id) return this;
    const params: UploadItemFileParameters = {
      filename: this.name,
      file: this.data,
      application_id: this.item.datastore.project.id,
      datastore_id: this.item.datastore.id,
    };
    const path = `/api/v0/items/${this.item.id}/fields/${field.id}/attachments`;
    const res = await this.rest('post', path, {}, params, {binary: true}) as UploadFileRes;
    this.set('id', res.file_id);
    return this;
  }

  async _save(): Promise<FileObject> {
    if (this.id) return this;
    const params: UploadFileParameters = {
      fileName: this.name, file: this.data
    };
    const path = '/api/v0/files';
    const res = await this.rest('post', path, {}, params, {binary: true}) as UploadFileRes;
    this.set('id', res.file_id);
    return this;
  }

  static async upload(fileName: string, file: Blob): Promise<FileObject> {
    const fileObject = new FileObject({ name: fileName, data: file });
    await fileObject.save();
    return fileObject;
  }

  static async download(fileId: string): Promise<FileObject> {
    const file = new FileObject({ id: fileId });
    await file.download();
    return file;
  }

  async download(): Promise<Blob> {
    if (this.data) return this.data;
    const res = await this.rest('get', `/api/v0/files/${this.id}`, {}, {}, {response: 'blob'});
    this.set('data', res as Blob);
    return res;
  }

  async delete(): Promise<boolean> {
    const res: DeleteFileRes = await this.request(DELETE_STORAGE, { fileId: this.id });
    return res.deleteStorage.success;
  }
}
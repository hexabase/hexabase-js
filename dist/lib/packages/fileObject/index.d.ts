/// <reference types="node" />
import { HxbAbstract } from '../../../HxbAbstract';
import { Blob } from 'buffer';
import Datastore from '../datastore';
import Item from '../item';
import Field from '../field';
export default class FileObject extends HxbAbstract {
    item: Item;
    datastore: Datastore;
    id: string;
    name: string;
    data: Blob;
    contentType: string;
    createdAt: Date;
    deleted: boolean;
    displayOrder: number;
    filepath: string;
    mediaLink: string;
    selfLink: string;
    size: number;
    updated: Date;
    temporary: boolean;
    timeCreated: Date;
    userId: string;
    set(key: string, value: any): FileObject;
    save(field?: Field): Promise<FileObject>;
    _saveItem(field: Field): Promise<FileObject>;
    _save(): Promise<FileObject>;
    static upload(fileName: string, file: Blob): Promise<FileObject>;
    static download(fileId: string): Promise<FileObject>;
    download(): Promise<Blob>;
    delete(): Promise<boolean>;
}

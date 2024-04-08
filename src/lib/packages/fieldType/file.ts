import { FieldType } from '.';
import Field from '../field';
import FieldOption from '../fieldOption';
import FileObject from '../fileObject';

export class FileField extends FieldType {
  valid(value: any): boolean {
    if (value === '') return true;
    if (typeof value === 'undefined' || value === null) return true;
    if (value instanceof FileObject) return true;
    if (Array.isArray(value)) return true;
    if (typeof value === 'string') return true;
    return false;
  }

  async convert(value: any, options: FieldOption[], field: Field): Promise<any> {
    if (value === null) return null;
    if (value instanceof FileObject) {
      value = [value];
    }
    if (Array.isArray(value)) {
      const res = await Promise.all(value.map((file: FileObject) => {
        return file.id ? file : file.save(field);
      }));
      const ids = res.map((file: FileObject) => file.id);
      return ids;
    } else {
      throw new Error(`Value is not FileObject (${value})`);
    }
  }
  value(value: any, options: {[key: string]: any}): any {
    if (value === '') return value;
    if (value instanceof FileObject) return [value];
    if (!Array.isArray(value) && typeof value === 'string') {
      value = value.split(',');
    }
    return (value as any[]).map((file: any) => {
      if (file instanceof FileObject) return file;
      if (typeof file === 'object') return FileObject.fromJson(file);
      if (file.match(/^[a-zA-Z0-9]+$/)) return new FileObject({ id: file });
    });
  }
}

import { FieldType } from '.';

export class TextField extends FieldType {
  valid(value: any): boolean {
    return typeof value === 'string';
  }
  async convert(value: any): Promise<any> {
    if (value === null) return '';
    if (typeof value === 'string') return value;
    throw new Error(`Value is not string (${value})`);
  }
}

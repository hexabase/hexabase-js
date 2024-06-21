import { FieldType } from '.';

export class NumberField extends FieldType {
  valid(value: any): boolean {
    if (typeof value === 'string' && !isNaN(Number(value))) return true;
    return typeof value === 'number';
  }
  async convert(value: any): Promise<any> {
    if (value === null) return null;
    if (typeof value === 'number') return value;
    throw new Error(`Value is not number (${value})`);
  }
}

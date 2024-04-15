import { FieldType } from '.';
import Field from '../field';

export class DatetimeField extends FieldType {
  valid(value: any): boolean {
    if (typeof value === 'string' && value.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z/)) {
      return true;
    }
    // For yyyy-mm-ddThh:mm:ss.286Z
    if (typeof value === 'string' && value.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}Z/)) {
      return true;
    }
    return value instanceof Date;
  }

  async convert(value: any): Promise<any> {
    if (value === null) return null;
    return (value as Date).toISOString();
  }
  value(value: any, options: {[key: string]: any}, field: Field): any {
    if (value instanceof Date) return value;
    return new Date(value);
  }
}

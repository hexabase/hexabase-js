import { FieldType } from '.';
import Field from '../field';
import FieldOption from '../fieldOption';

export class SelectField extends FieldType {
  valid(value: any, options: FieldOption[]): boolean {
    if (typeof value !== 'string') return false;
    return !!this.option(value, options);
  }
  async convert(value: any, options: FieldOption[]): Promise<any> {
    if (value === null) return null;
    const option = this.option(value, options);
    if (!option) throw new Error(`Value has not option (${value})`);
    return option.id;
  }
  value(value: any, options: {[key: string]: any}, field: Field): any {
    const option = this.option(value, field._options);
    return option ? option.value : null;
  }
}

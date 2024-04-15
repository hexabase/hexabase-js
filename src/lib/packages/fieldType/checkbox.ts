import { FieldType } from '.';
import Field from '../field';
import FieldOption from '../fieldOption';

export class CheckboxField extends FieldType {
  valid(value: any, options: FieldOption[]): boolean {
    if (typeof value === 'string') {
      value = value.split(',');
    }
    return (value as any[])
      .every((v: any) => this.option(v, options));
  }
  async convert(value: any, options: FieldOption[]): Promise<any> {
    if (!value) return null;
    if (!Array.isArray(value)) {
      value = [value];
    }
    return value.map((v: any) => {
      const option = this.option(v, options);
      if (!option) throw new Error(`Value has not option (${v})`);
      return option.id;
    });
  }
  value(value: any, options: {[key: string]: any}, field: Field): any {
    if (!Array.isArray(value)) {
      value = [value];
    }
    return value.map((v: any) => {
      const option = this.option(v, field._options);
      return option ? option.value : null;
    });
  }
}

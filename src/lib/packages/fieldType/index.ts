import Field from '../field';
import FieldOption from '../fieldOption';

export class FieldType {
  static set(dataType: string): FieldType {
    if (dataType === 'text') return new TextField();
    if (dataType === 'textarea') return new TextAreaField();
    if (dataType === 'number') return new NumberField();
    if (dataType === 'select') return new SelectField();
    if (dataType === 'radio') return new RadioField();
    if (dataType === 'checkbox') return new CheckboxField();
    if (dataType === 'datetime') return new DatetimeField();
    if (dataType === 'file') return new FileField();
    if (dataType === 'users') return new UsersField();
    if (dataType === 'dslookup') return new DslookupField();
    if (dataType === 'status') return new FieldType();
    if (dataType === 'label') return new FieldType();
    if (dataType === 'separator') return new FieldType();
    if (dataType === 'autonum') return new FieldType();
    if (dataType === 'calc') return new FieldType();
    throw new Error(`Unknown data type: ${dataType}`);
  }

  valid(value: any, options?: FieldOption[]): boolean {
    return true;
  }

  option(value: any, options: FieldOption[]): FieldOption | undefined {
    if (value === null) return undefined;
    if (typeof value === 'string') {
      return options.find(o => o.id === value || o.displayId === value || o.value.en === value || o.value.ja === value);
    } else {
      return options.find(o => o.value === value);
    }
  }

  async convert(value: any, options: FieldOption[], field: Field): Promise<any> {
    return undefined;
  }

  value(value: any, options: {[key: string]: any}, field: Field): any {
    return value;
  }
}

import { CheckboxField } from './checkbox';
import { DatetimeField } from './datetime';
import { DslookupField } from './dslookup';
import { FileField } from './file';
import { NumberField } from './number';
import { RadioField } from './radio';
import { SelectField } from './select';
import { TextField } from './text';
import { TextAreaField } from './textarea';
import { UsersField } from './users';

import { FieldType } from '.';
import Field from '../field';
import User from '../user';

export class UsersField extends FieldType {
  valid(value: any): boolean {
    if (typeof value === 'string') return true;
    if (value instanceof User) return true;
    return (value as any[])
      .every(v => v instanceof User || (v.email && v.user_id));
  }
  async convert(value: any): Promise<any> {
    if (value === null) return null;
    return value.map((user: User) => user.id);
  }
  value(value: any, options: {[key: string]: any}, field: Field): any {
    if (!Array.isArray(value)) {
      value = [value];
    }
    return (value as any[])
      .map((params: any) => (params instanceof User) ? params : (User.fromJson(params) as User));
  }
}


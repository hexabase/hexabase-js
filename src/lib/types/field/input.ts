export enum DataType {
  TEXT = 'text',
  NUMBER = 'number',
  STATUS = 'status',
  AUTONUM = 'autonum',
  TEXTAREA = 'textarea',
  SELECT = 'select',
  FILE = 'file',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
  CALC = 'calc',
  DATETIME = 'datetime',
  USERS = 'users',
  DSLOOKUP = 'dslookup',
  LABEL = 'label',
  SEPARATOR = 'separator',
}


export interface datastoreCreateFieldRequest {
  payload: {
    dataType: string;
    display_id: string;
    name: {
      ja: string;
      en: string;
    };
    unique: boolean;
    search: boolean;
    show_list: boolean;
    as_title: boolean;
    full_text: boolean;
    hide_from_api: boolean;
    has_index: boolean;
    roles: any;
  };
  datastoreId: string;
}

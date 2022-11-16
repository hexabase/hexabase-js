import { ResponseOkModel } from '../../util/type';

export class ItemFileAttachment {
  _id?: string;
  file_id?: string;
  display_order?: number;
  d_id?: string;
  datastore_id?: string;
  w_id?: string;
  p_id?: string;
  i_id?: string;
  temporary?: boolean;
  deleted?: boolean;
  filename?: string;
  filepath?: string;
  item_id?: string;
  contentType?: string;
  selfLink?: string;
  mediaLink?: string;
  size?: number;
  field_id?: string;
  created_at?: string;
  name?: string;
  timeCreated?: string;
  updated?: string;
  user_id?: string;
}

export class FileAttachment {
  filename?: string;
  data?: string;
}
// export data from graphql
export interface DtStorage {
  deleteStorage: ResponseOkModel;
}

export interface DtGetDownloadFile {
  getDownloadFile?: FileAttachment;
}
export interface DtItemFileAttachment {
  createItemFileAttachment?: ItemFileAttachment;
}

// export data SDK
export interface GetDownloadFileRes {
  file?: FileAttachment;
  error?: string;
}

export interface ItemFileAttachmentRes {
  data?: ItemFileAttachment;
  error?: string;
}



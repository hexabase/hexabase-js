import { ResponseOkModel } from '../../util/type';

// export data from graphql
export interface DtStorageResp {
  deleteStorage: ResponseOkModel;
}

export interface DtGetDownloadFile {
  getDownloadFile?: any;
}

// export data SDK
export interface GetDownloadFileRes {
  getDownloadFile?: any;
  error?: string;
}
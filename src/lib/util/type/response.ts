export interface TokenModel {
  token: string;
}
export interface FieldRoles {
  role_id: string;
  display_id: string;
  name: string;
  type: string;
  project_id: string;
  can_use: boolean;
  can_execute: boolean;
}

export interface FieldNameENJP {
  en: string;
  ja: string;
}

export interface ResponseOkModel {
  success: boolean;
  data: string;
}

export interface ModelRes {
  data?: ResponseOkModel;
  error?: string;
}

export interface GenericAPIError {
  error_level?: string;
  error_code?: string;
  error?: string;
  description?: string;
  reference_id?: string;
}


export class ResponseErrorNull {
  error?: any;
}
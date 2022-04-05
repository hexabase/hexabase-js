export interface QueryTaskList {
  all?: string;
  category?: string;
  stream_id?: string
}
export interface CreateWsInput {
  name: string;
}
export interface SetWsInput {
  workspace_id: string;
}
export interface GetFieldSettingsRes {
  workspace_id: string
  project_id: string
  datastore_id: string
  field_id: string
  name: {
		en: string
		ja: string
	}
  display_id: string
  dataType: string
  search: boolean
  show_list: boolean
  as_title: boolean
  status: boolean
  full_text: boolean
  unique: boolean
  hideOnInput: boolean
  hide_from_api: boolean
  has_index: boolean
  roles: Role[]
  options: FieldOption[]
}

export interface Role {
  role_id: string
  display_id: string
  name: string
  type: string
  project_id: string
  can_use: boolean
}

export interface FieldOption {
  _id: string
  color: string
  created_at: string
  d_id: string
  display_id: string
  enabled: boolean
  o_id: string
  selected: boolean
  sort_id: number
  updated_at: string
  value: {
		en: string
		ja: string
	}
}

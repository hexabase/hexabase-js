interface User {
  u_id: string;
  username: string;
  email: string;
}

interface Role {
  _key: string;
  access_key: string;
  created_at: string;
  display_id: string;
  id: string;
  members: User[];
  name: string;
  project_id: string;
  r_id: string;
  type: string;
}

export interface RoleResponse {
  getProjectRolesAndMember: Role[];
}
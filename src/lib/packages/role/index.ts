import { PROJECT_ROLES_AND_MEMBER } from '../../../lib/graphql/project';
import { HxbAbstract } from '../../../HxbAbstract';
import Field from '../field';
import Project from '../project';
import User from '../user';
import { RoleResponse } from '../../../lib/types';

export default class Role extends HxbAbstract {
  id: string;
  displayId: string;
  project: Project;
  name: string;
  type: string;
  members: User[];
  createdAt: Date;
  accessKey: string;

  static async all(project: Project): Promise<Role[]> {
    const payload = {
      project_id: project.id,
      workspace_id: project.workspace.id,
    };
    const res = await Role.request(PROJECT_ROLES_AND_MEMBER, payload) as RoleResponse;
    return res.getProjectRolesAndMember
      .map(params => Role.fromJson({...{ project }, ...params }) as Role);
  }

  set(key: string, value: any): Role {
    switch (key) {
      case '_key':
      case 'id':
      case 'r_id':
        this.id = value;
        break;
      case 'display_id':
        this.displayId = value;
        break;
      case 'name':
        this.name = value;
        break;
      case 'type':
        this.type = value;
        break;
      case 'members':
        this.members = (value as any[])
          .map(params => User.fromJson(params) as User);
        break;
      case 'project':
        this.project = value as Project;
        break;
      case 'created_at':
        this.createdAt = new Date(value);
        break;
      case 'access_key':
        this.accessKey = value;
        break;
      case 'project_id':
        break;
      default:
        throw new Error(`Unknown key: ${key}`);
    }
    return this;
  }
}
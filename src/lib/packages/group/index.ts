import { WORKSPACE_GROUP_CHILDREN, WORKSPACE_GROUP_TREE } from '../../../lib/graphql/workspace';
import { HxbAbstract } from '../../../HxbAbstract';
import Workspace from '../workspace';
import { DtWsGroupChildren, DtWsGroupTree } from '../../../lib/types/workspace';
import { MapType } from '../../../lib/util/type';
import { AddUserResponse, addGroupTreeRequest, addGroupTreeResponse, addUserInGroupRequest, addUserInGroupResponse, deleteGroupRequest, deleteGroupResponse, getUsersInGroupRequest, getUsersInGroupResponse, removeUserFromGroupRequest, removeUserFromGroupResponse, updateGroupRequest, updateGroupeResponse } from '../../../lib/types/group';
import { ADD_GROUP_TREE, ADD_USER_IN_GROUP, DELETE_GROUP, GET_USERS_IN_GROUP, REMOVE_USER_FROM_GROUP, UPDATE_GROUP } from '../../../lib/graphql/group';
import User from '../user';

export default class Group extends HxbAbstract {
  index: number;
  name: string;
  id: string;
  groupId: string;
  displayId: string;
  showChild: boolean;
  disableUiAccess: boolean = false;
  workspace: Workspace;
  isRoot: boolean;
  accessKey: string;
  createdAt: Date;

  _children: Group[] = [];
  _parent: Group;
  _users: User[] = [];

  set(key: string, value: any): Group {
    switch (key) {
      case 'index':
        this.index = value;
        break;
      case 'name':
        this.name = value;
        break;
      case 'group_id':
        this.groupId = value;
        break;
      case 'g_id':
      case 'id':
        this.id = value;
        break;
      case 'display_id':
        this.displayId = value;
        break;
      case 'show_child':
        this.showChild = value;
        break;
      case 'disable_ui_access':
        this.disableUiAccess = value;
        break;
      case 'workspace':
        this.workspace = value;
        break;
      case 'parent':
        this._parent = value;
        break;
      case 'is_root':
        this.isRoot = value;
        break;
      case 'access_key':
        this.accessKey = value;
        break;
      case 'created_at':
        this.createdAt = new Date(value);
        break;
    }
    return this;
  }

  static async all(workspace: Workspace): Promise<Group[]> {
    const res: DtWsGroupTree = await this.request(WORKSPACE_GROUP_TREE, { workspaceId: workspace.id });
    const groups = res.getGroupTree.result.map((group: any) => Group.fromJson({...{workspace}, ...group}) as Group);
    await Promise.all(groups.map(group => group.fetch()));
    return groups;
  }

  public async fetch(): Promise<boolean> {
    const res: DtWsGroupChildren = await this.request(WORKSPACE_GROUP_CHILDREN, { groupId: this.id });
    const { group, children } = res.workspaceGetGroupChildren;
    this.sets(group as MapType);
    if (children) {
      this._children = children
        .map(child => Group.fromJson({...{ workspace: this.workspace}, ...child }) as Group);
    }
    await this.users();
    return true;
  }

  async users(): Promise<User[]> {
    if (this._users.length > 0) return this._users;
    const payload: getUsersInGroupRequest = {
      groupId: this.id,
    };
    const res: getUsersInGroupResponse = await Group.request(GET_USERS_IN_GROUP, payload);
    this._users = res.getUsersInGroup.members.map((user: any) => User.fromJson(user) as User);
    return this._users;
  }

  async addByEmail(email: string): Promise<AddUserResponse> {
    const res = await this.rest('post', '/api/v0/users', {}, {
      email,
      g_id: this.id,
    }) as AddUserResponse;
    return res;
  }

  async groups(): Promise<Group[]> {
    if (this._children.length > 0) return this._children;
    await this.fetch();
    return this._children;
  }

  async group(id?: string): Promise<Group> {
    if (!id) {
      const g = new Group({ workspace: this.workspace, parent: this});
      return g;
    }
    if (this._children.length === 0) await this.fetch();
    const group = this._children.find(group => group.id === id || group.name === id);
    if (!group) throw new Error(`No group ${id}`);
    await group.fetch();
    return group;
  }

  async save(): Promise<boolean> {
    if (!this.id) return this.create();
    return this.update();
  }

  async create(): Promise<boolean> {
    const payload: addGroupTreeRequest = {
      name: this.name,
      display_id: this.displayId,
      disable_ui_access: this.disableUiAccess,
      user_id: Group.client.currentUser?.id,
      workspace_id: this.workspace.id,
    };
    if (this._parent) {
      payload.parent_g_id = this._parent.id;
    }
    const res: addGroupTreeResponse = await Group.request(ADD_GROUP_TREE, { payload });
    this.sets(res.addGroupTree.group);
    await this.fetch();
    return true;
  }

  async update(): Promise<boolean> {
    /*
    const payload: updateGroupRequest = {
      groupId: this.groupId,
      payload: {
        name: this.name,
        display_id: this.displayId,
        id: this.id,
      },
    };
    // console.log(payload);
    const res = await Group.rest('put', `/api/v0/groups/${this.groupId}`, {}, {
      name: this.name,
      display_id: this.displayId,
    });
    const res: updateGroupeResponse = await Group.request(UPDATE_GROUP, payload );
    // this.sets(res.updateGroup.);
    console.log(res);
    await this.fetch();
    */
    return true;
  }

  async delete(): Promise<boolean> {
    if (this.name === 'WORKSPACE.DEFAULT_GROUP_NAME') throw new Error('Cannot delete default group');
    await this.users();
    await Promise.all(this._users.map(user => this.remove(user)));
    const payload: deleteGroupRequest = {
      groupId: this.id,
    };
    const res: deleteGroupResponse = await Group.request(DELETE_GROUP, payload);
    return res.deleteGroup.error == null;
  }

  async add(user: User | {email: string; code?: string; userName: string}): Promise<boolean> {
    const payload: addUserInGroupRequest = {
      current_workspace_id: this.workspace.id,
      email: user.email,
      group_id: this.id,
      user_code: user.code,
      username: user.userName,
    };
    const res: addUserInGroupResponse = await Group.request(ADD_USER_IN_GROUP, { payload });
    if (res.addUserInGroup.added) {
      this._users.push(User.fromJson(res.addUserInGroup.user_profile as MapType) as User);
    }
    return true;
  }

  async remove(user: User | {id: string}): Promise<boolean> {
    const payload: removeUserFromGroupRequest = {
      group_id: this.id,
      user_id: user.id,
      workspace_id: this.workspace.id,
    };
    const res: removeUserFromGroupResponse = await Group.request(REMOVE_USER_FROM_GROUP, { payload });
    return res.removeUserFromGroup.error == null;
  }
}

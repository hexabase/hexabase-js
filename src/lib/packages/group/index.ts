import { WORKSPACE_GROUP_CHILDREN } from "../../../lib/graphql/workspace";
import { HxbAbstract } from "../../../HxbAbstract";
import Workspace from "../workspace";
import { DtWsGroupChildren } from "../../../lib/types/workspace";
import { MapType } from "../../../lib/util/type";
import { AddUserResponse } from "../../../lib/types/group";

export default class Group extends HxbAbstract {
	index: number
	name: string;
	group_id: string;
	id: string;
	children: Group[];
	workspace: Workspace;

  set(key: string, value: any): Group {
    switch (key) {
			case 'index':
				this.index = value;
				break;
			case 'name':
				this.name = value;
				break;
			case 'group_id':
				this.group_id = value;
				break;
			case 'id':
				this.id = value;
				break;
		}
		return this;
	}

	public async fetch(): Promise<boolean> {
    const res: DtWsGroupChildren = await this.request(WORKSPACE_GROUP_CHILDREN, { groupId: this.id });
    const { group, children }= res.workspaceGetGroupChildren;
		this.sets(group as MapType);
    if (children) {
      this.children = children.map((child: any) => Group.fromJson(child) as Group);
    }
		return true;
	}

	async addByEmail(email: string): Promise<AddUserResponse> {
		const res = await this.rest('post', '/api/v0/users', {}, {
			email,
			g_id: this.id,
		}) as AddUserResponse;
		return res;
	}
}
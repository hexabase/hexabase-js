import { PostInviteUsersPl, PostInviteUsersResp, ConfirmationsFullInfo, ConfirmRegisterUserPl } from '../../types/user';
import { HxbAbstract } from '../../../HxbAbstract';
import Workspace from '../workspace';
export default class User extends HxbAbstract {
    id: string;
    userName: string;
    accessKey: string;
    email: string;
    profilePicture: string;
    currentWorkspace: Workspace;
    isWorkspaceAdmin: boolean;
    mediaLink: string;
    set(key: string, value: any): User;
    static register(confirmationId: string): Promise<User>;
    static registerConfirm(params: ConfirmRegisterUserPl): Promise<string>;
    passwordExpired(): Promise<boolean>;
    static confirm(confirmationId: string): Promise<ConfirmationsFullInfo>;
    static current(): Promise<User>;
    invite(payload: PostInviteUsersPl): Promise<PostInviteUsersResp>;
}

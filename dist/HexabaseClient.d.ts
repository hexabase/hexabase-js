/// <reference types="node" />
import Auth from './lib/packages/auth';
import Workspace from './lib/packages/workspace';
import User from './lib/packages/user';
import HexabaseSQL from './lib/sql';
import FileObject from './lib/packages/fileObject';
import { Blob } from 'buffer';
import { UserInviteOptions, UserInviteResponse } from './lib/types/workspace';
type LoginParams = {
    email?: string;
    password?: string;
    token?: string;
};
type InitializeOptions = {
    env?: string;
    url?: string;
    rest?: string;
    sse?: string;
};
export default class HexabaseClient {
    auth: Auth;
    users: typeof User;
    tokenHxb: string;
    currentWorkspace?: Workspace;
    currentUser?: User;
    urlHxb: string;
    restHxb: string;
    sseHxb: string;
    private _workspaces;
    constructor(options?: InitializeOptions);
    _init(): Promise<void>;
    setToken(token: string): Promise<void>;
    login({ email, password, token }: LoginParams): Promise<boolean>;
    logout(): Promise<boolean>;
    setWorkspace(workspace?: Workspace | string): Promise<boolean>;
    sseUrl(): string;
    _initAuth(): Auth;
    workspaces(): Promise<Workspace[]>;
    workspacesWithCurrent(): Promise<{
        workspaces: Workspace[];
        workspace: Workspace;
    }>;
    workspace(id?: string): Workspace;
    query(projectId: string): HexabaseSQL;
    upload(fileName: string, file: Blob): Promise<FileObject>;
    download(fileId: string): Promise<FileObject>;
    file(id?: string): FileObject;
    invite(emails: string[], domain: string, options?: UserInviteOptions, workspace?: Workspace): Promise<UserInviteResponse[]>;
}
export {};

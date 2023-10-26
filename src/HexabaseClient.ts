import Auth from './lib/packages/auth';
import Workspace from './lib/packages/workspace';
import User from './lib/packages/user';
// import Project from './lib/packages/project';
// import Datastore from './lib/packages/datastore';
// import Item from './lib/packages/item';
// import DataReport from './lib/packages/dataReport';
// import Storage from './lib/packages/storage';
import HexabaseSQL from './lib/sql';
import { HxbAbstract } from './HxbAbstract';
import FileObject from './lib/packages/fileObject';
import { Blob } from 'buffer';
import { UserInviteOptions, UserInvitePl, UserInviteResponse } from './lib/types/workspace';
import * as signalR from '@microsoft/signalr';

/**
 * ログインパラメータを表すオブジェクトの型
 * email, password, token のいずれか、またはすべてが含まれる
 * email, password, token はすべてオプションのため、省略可能
 */
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
  public auth: Auth;
  public users: typeof User;
  public tokenHxb: string;
  public currentWorkspace?: Workspace;
  public currentUser?: User;
  public urlHxb: string;
  public restHxb: string;
  public sseHxb: string;
  public connection?: signalR.HubConnection;
  private _workspaces: Workspace[];

  constructor(
    options: InitializeOptions = {},
  ) {
    switch (options.env) {
      case 'dev':
        this.urlHxb = 'https://stg-hxb-graph.hexabase.com/graphql';
        this.restHxb = 'https://stg-api.hexabase.com';
        this.sseHxb = 'https://stg-pubsub.hexabase.com/hub';
        break;
      default:
        this.urlHxb = 'https://graphql.hexabase.com/graphql';
        this.restHxb = 'https://api.hexabase.com';
        this.sseHxb = 'https://pubsub.hexabase.com/hub';
        break;
    }
    const { url, sse, rest } = options;
    if (url && url.trim() !== '') {
      this.urlHxb = url;
    }
    if (rest && rest.trim() !== '') {
      this.restHxb = rest;
    }
    if (sse && sse.trim() !== '') {
      this.sseHxb = sse;
    }
    this.auth = this._initAuth();
  }

  /**
   * initialize classes
   */
  public async _init() {
    this.users = User;
    HxbAbstract.client = this;
    this.currentWorkspace = await Workspace.get();
    this.currentUser = await this.users.current();
  }

  /**
   * set token
   */
  public async setToken(token: string) {
    this.tokenHxb = token;
    await this._init();
  }

  /**
   * login to Hexabase
   */
  public async login({ email, password, token }: LoginParams): Promise<boolean> {
    if (token) {
      await this.setToken(token);
      return true;
    }
    if (!email || !password) {
      throw Error('Need token or email and password to initialize sdk');
    }
    const res = await this.auth.login({ email, password });
    if (!res) {
      throw Error('Need login failed to initialize sdk');
    }
    await this.setToken(res);
    return true;
  }

  public async logout(): Promise<boolean> {
    this.auth.client.setHeaders({ authorization: `Bearer ${this.tokenHxb}` });
    return await this.auth.logout();
  }

  public async setWorkspace(workspace?: Workspace | string): Promise<boolean> {
    const id = workspace ? (typeof workspace === 'string' ? workspace : workspace.id) : undefined;
    if (id) {
      this.currentWorkspace = await Workspace.current(id);
    }
    if (!this.currentWorkspace!.id) {
      this.currentWorkspace = Workspace.fromJson({ w_id: id }) as Workspace;
    }
    return true;
  }

  public sseUrl(): string {
    return `${this.sseHxb}?token=${this.tokenHxb}`;
  }

  /**
   * initialize class Auth
   * @returns new Auth
   */
  public _initAuth() {
    return new Auth(this.urlHxb);
  }

  public async workspaces(): Promise<Workspace[]> {
    if (this._workspaces.length > 0) return this._workspaces;
    this._workspaces = await Workspace.all();
    return this._workspaces;
  }

  public async workspacesWithCurrent(): Promise<{workspaces: Workspace[]; workspace: Workspace}> {
    if (this._workspaces.length > 0 && this.currentWorkspace) {
      return { workspaces: this._workspaces, workspace: this.currentWorkspace };
    }
    const res = await Workspace.allWithCurrent();
    this._workspaces = res.workspaces;
    this.currentWorkspace = res.workspace;
    return res;
  }

  public workspace(id?: string): Workspace {
    return new Workspace({ id });
  }

  /**
   * initialize query method
   * @returns new Storage
   */
  public query(projectId: string): HexabaseSQL {
    return new HexabaseSQL({ projectId });
  }

  public upload(fileName: string, file: Blob): Promise<FileObject> {
    return FileObject.upload(fileName, file);
  }
  public download(fileId: string): Promise<FileObject> {
    return FileObject.download(fileId);
  }

  public file(id?: string): FileObject {
    const f = new FileObject({ id });
    return f;
  }

  async invite(emails: string[], domain: string, options?: UserInviteOptions, workspace?: Workspace): Promise<UserInviteResponse[]> {
    const params: UserInvitePl = {domain, ...{
      users: emails.map(email => {
        if (workspace) {
          return { email, exclusive_w_id: workspace.id };
        } else {
          return { email };
        }
      }),
    }, ...options};
    const res = this.currentWorkspace!.rest('post', '/api/v0/userinvite', {}, params) as unknown;
    return res as UserInviteResponse[];
  }

  async connectSse(): Promise<boolean> {
    if (this.connection) {
      return true;
    }
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(this.sseUrl(), {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();
    await this.connection.start();
    return true;
  }

  async closeSse(): Promise<boolean> {
    if (!this.connection) return true;
    await this.connection.stop();
    this.connection = undefined;
    return true;
  }
}

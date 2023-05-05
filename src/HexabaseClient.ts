import Auth from './lib/packages/auth';
import Workspace from './lib/packages/workspace';
import User from './lib/packages/user';
import Project from './lib/packages/project';
import Datastore from './lib/packages/datastore';
import Item from './lib/packages/item';
import DataReport from './lib/packages/dataReport';
import Storage from './lib/packages/storage';
import QueryClient from './lib/sql/queryClient';
import QueryBuilder from './lib/sql/query';
import Query from './lib/sql/query';
import { HxbAbstract } from './HxbAbstract';
import { QueryParameter } from './lib/types/sql/input';
import FileObject from './lib/packages/fileObject';
import { Blob } from 'buffer';

type LoginParams = {
  email?: string;
  password?: string;
  token?: string;
};

export default class HexabaseClient {
  public auth: Auth;
  public users: typeof User;
  public project: Project;
  // public workspace: Workspace;
  public item: Item;
  public datastore: Datastore;
  public storage: Storage;
  public dataReport: DataReport;
  public tokenHxb: string;
  protected rest: QueryClient;
  protected projectId: string;
  public currentWorkspace?: Workspace;
  public currentUser?: User;
  public urlHxb: string;
  public restHxb: string;
  public Project: typeof Project;
  public Datastore: typeof Datastore;
  public Storage: typeof Storage;
  public Item: typeof Item;
  public DataReport: typeof DataReport;
  public User: typeof User;
  // public Rest: typeof QueryClient;

  private _workspaces: Workspace[];

  constructor(
    urlHxb = 'https://graphql.hexabase.com/graphql',
    restHxb = 'https://api.hexabase.com',
    tokenHxb?: string
  ) {
    // if (!urlHxb) throw new Error('urlHxb is required.');
    this.urlHxb = urlHxb;
    this.restHxb = restHxb;
    if (tokenHxb) {
      this.tokenHxb = tokenHxb;
      this._init();
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
    if (!res.token) {
      throw Error(`Need login failed to initialize sdk: ${res.error}`);
    }
    await this.setToken(res.token);
    return true;
  }

  public async setWorkspace(workspace?: Workspace | string): Promise<boolean> {
    if (workspace) {
      await Workspace.current(typeof workspace === 'string' ? workspace : workspace.id);
    }
    this.currentWorkspace = await Workspace.get();
    return true;
  }

  public sseUrl(): string {
    const user = this.currentUser!;
    const workspace = this.currentWorkspace!;
    return `https://app.hexabase.com/sse?channel=user_${user.id}_${workspace.id}`;
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

  public async workspacesWithCurrent(): Promise<{workspaces: Workspace[], workspace: Workspace}> {
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
   * initialize class User
   * @returns new User
   */
  public _initUser() {
    return new User();
  }

  /**
   * initialize from method
   * @param dataStoreId string
   * @returns new Storage
   */
  /*
  public from(dataStoreId: string): QueryBuilder {
    return this.rest.from(dataStoreId);
  }
  */
  /**
   * initialize query method
   * @returns new Storage
   */
  /*
  public query(projectId: string): QueryClient {
    this.rest.useProject(projectId);
    return this.rest;
  }
  */

  public upload(fileName: string, file: Blob): Promise<FileObject> {
    return FileObject.upload(fileName, file);
  }
  public download(fileId: string): Promise<FileObject> {
    return FileObject.download(fileId);
  }

  public file(id?: string): FileObject {
    const f = new FileObject({ id });
    console.log(f, { id });
    return f;
  }
}

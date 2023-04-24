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
  public Project: typeof Project;
  public Datastore: typeof Datastore;
  public Storage: typeof Storage;
  public Item: typeof Item;
  public DataReport: typeof DataReport;
  public User: typeof User;
  public Rest: typeof QueryClient;

  private _workspaces: Workspace[];

  constructor(
    urlHxb: string = 'https://graphql.hexabase.com/graphql',
    tokenHxb?: string
  ) {
    // if (!urlHxb) throw new Error('urlHxb is required.');
    this.urlHxb = urlHxb;
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
    /*
    this.user = this._initUser();
    this.project = this._initProject();
    this.workspace = this._initWorkspace();
    this.item = this._initItem();
    this.datastore = this._initDatastore();
    this.dataReport = this._initDataReport();
    this.storage = this._initStorage();
    this.rest = this._initQueryClient();
    this._initQuery();
    */
    this.Project = Project;
    this.Datastore = Datastore;
    this.Storage = Storage;
    this.Item = Item;
    this.DataReport = DataReport;
    this.users = User;
    this.Rest = QueryClient;
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

  /**
   * initialize class Auth
   * @returns new Auth
   */
  public _initAuth() {
    return new Auth(this.urlHxb);
  }

  public workspaces(): Promise<Workspace[]> {
    return Workspace.all();
  }

  public workspacesWithCurrent(): Promise<{workspaces: Workspace[], workspace: Workspace}> {
    return Workspace.allWithCurrent();
  }

  public workspace(id?: string) {
    return new Workspace(id);
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
  public from(dataStoreId: string): QueryBuilder {
    return this.rest.from(dataStoreId);
  }

  /**
   * initialize query method
   * @returns new Storage
   */
  public query(projectId: string): QueryClient {
    this.rest.useProject(projectId);
    return this.rest;
  }
}

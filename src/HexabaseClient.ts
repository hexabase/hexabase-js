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
import { QueryParameter } from './lib/types/sql/input';

type LoginParams = {
  email?: string;
  password?: string;
  token?: string;
};

export default class HexabaseClient {
  public auth: Auth;
  public user: User;
  public project: Project;
  public workspace: Workspace;
  public item: Item;
  public datastore: Datastore;
  public storage: Storage;
  public dataReport: DataReport;
  public tokenHxb: string;
  protected rest: QueryClient;
  protected projectId: string;
  public urlHxb: string;
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
  public _init() {
    this.user = this._initUser();
    this.project = this._initProject();
    this.workspace = this._initWorkspace();
    this.item = this._initItem();
    this.datastore = this._initDatastore();
    this.dataReport = this._initDataReport();
    this.storage = this._initStorage();
    this.rest = this._initQueryClient();
    this._initQuery();
  }

  /**
   * set token
   */
  public setToken(token: string) {
    this.tokenHxb = token;
    this._init();
  }

  /**
   * login to Hexabase
   */
  public async login({ email, password, token }: LoginParams) {
    if (token) {
      this.setToken(token);
    } else if (email && password) {
      const res = await this.auth.login({ email, password });
      if (res.token) {
        this.setToken(res.token);
      } else {
        throw Error(`Need login failed to initialize sdk: ${res.error}`);
      }
    } else {
      throw Error('Need token or email and password to initialize sdk');
    }
  }

  /**
   * initialize class Auth
   * @returns new Auth
   */
  public _initAuth() {
    return new Auth(this.urlHxb);
  }

  /**
   * initialize class Workspace
   * @returns new Workspace
   */
  public _initWorkspace() {
    return new Workspace(this);
  }

  /**
   * initialize class User
   * @returns new User
   */
  public _initUser() {
    return new User(this);
  }

  /**
   * initialize class Project
   * @returns new Project
   */
  public _initProject() {
    return new Project(this);
  }

  /**
   * initialize class Datastore
   * @returns new Datastore
   */
  public _initDatastore() {
    return new Datastore(this);
  }

  /**
   * initialize class Item
   * @returns new Item
   */
  public _initItem() {
    return new Item(this);
  }

  /**
   * Check login status
   * @returns boolean
   */
  public isLogin() {
    return !!this.tokenHxb;
  }

  /**
   * initialize class DataReport
   * @returns new DataReport
   */
  public _initDataReport() {
    return new DataReport(this);
  }

  /**
   * initialize class Storage
   * @returns new Storage
   */
  public _initStorage() {
    return new Storage(this);
  }

    /**
   * initialize class Query
   * @returns new Query
   */
  public _initQuery() {
    const params: QueryParameter = {
      client: this,
    };
    return new Query(params);
  }

  public _initQueryClient() {
    return new QueryClient(this);
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

import Auth from './lib/packages/auth';
import Workspace from './lib/packages/workspace';
import User from './lib/packages/user';
import Project from './lib/packages/project';
import Datastore from './lib/packages/datastore';
import Item from './lib/packages/item';
import DataReport from './lib/packages/dataReport';
import Storage from './lib/packages/storage';
import QueryClient from './lib/sql/client';
import QueryBuilder from './lib/sql/query';

export default class HexabaseClient {
  public auth: Auth;
  public user: User;
  public project: Project;
  public workspace: Workspace;
  public item: Item;
  public datastore: Datastore;
  public storage: Storage;
  public dataReport: DataReport;
  public tokenHxb?: string;
  protected rest: QueryClient;

  constructor(
    protected urlHxb: string,
    tokenHxb?: string
  ) {
    if (!urlHxb) throw new Error('urlHxb is required.');

    this.urlHxb = urlHxb;
    this.tokenHxb = tokenHxb;

    this.auth = this._initAuth();
    this._init();

    this.rest = new QueryClient();
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
  }

  /**
   * set token
   */
  public setToken(token: string) {
    this.tokenHxb = token;
    this._init();
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
    return new Workspace(this.urlHxb, this.tokenHxb!);
  }

  /**
   * initialize class User
   * @returns new User
   */
  public _initUser() {
    return new User(this.urlHxb, this.tokenHxb!);
  }

  /**
   * initialize class Project
   * @returns new Project
   */
  public _initProject() {
    return new Project(this.urlHxb, this.tokenHxb!);
  }

  /**
   * initialize class Datastore
   * @returns new Datastore
   */
  public _initDatastore() {
    return new Datastore(this.urlHxb, this.tokenHxb!);
  }

  /**
   * initialize class Item
   * @returns new Item
   */
  public _initItem() {
    return new Item(this.urlHxb, this.tokenHxb!);
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
    return new DataReport(this.urlHxb, this.tokenHxb!);
  }

  /**
   * initialize class Storage
   * @returns new Storage
   */
  public _initStorage() {
    return new Storage(this.urlHxb, this.tokenHxb!);
  }

  /**
   * initialize from method
   * @returns new Storage
   */
  public from(relation: string): QueryBuilder {
    return this.rest.from(relation);
  }

  /**
   * initialize query method
   * @returns new Storage
   */
  public query(): QueryBuilder {
    return this.rest.query();
  }
}

import Auth from './lib/packages/auth';
import Workspace from './lib/packages/workspace';
import User from './lib/packages/user';
import Application from './lib/packages/application';
import Datastore from './lib/packages/datastore';
import Item from './lib/packages/item';

export default class HexabaseClient  {
  public auth: Auth;
  public users: User;
  public applications: Application;
  public workspaces: Workspace;
  public items: Item;
  public datastores: Datastore;
  public tokenHxb?: string;

  constructor(
    protected urlHxb: string,
    tokenHxb: string
  ) {
    if (!urlHxb) throw new Error('urlHxb is required.');

    this.urlHxb = urlHxb;
    this.tokenHxb = tokenHxb;

    this.auth = this._initAuth();
    this._init();
  }

  /**
   * initialize classes
   */
  public _init() {
    this.users = this._initUser();
    this.applications = this._initApplication();
    this.workspaces = this._initWorkspace();
    this.items = this._initItem();
    this.datastores = this._initDatastore();
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
   * initialize class Application
   * @returns new Application
   */
  public _initApplication() {
    return new Application(this.urlHxb, this.tokenHxb!);
  }

  /**
   * initialize class Application
   * @returns new Application
   */
  public _initDatastore() {
    return new Datastore(this.urlHxb, this.tokenHxb!);
  }

  /**
   * initialize class Application
   * @returns new Application
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
}

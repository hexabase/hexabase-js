import Auth from './lib/packages/auth';
import Workspace from './lib/packages/workspace';
import User from './lib/packages/user';
import Application from './lib/packages/application';
import Datastore from './lib/packages/datastore';
import Item from './lib/packages/item';

export default class HexabaseClient  {
  public auth: Auth;
  public user: User;
  public application: Application;
  public workspace: Workspace;
  public item: Item;
  public datastore: Datastore;
  constructor(
    protected urlHxb: string,
    protected tokenHxb: string
  ) {
    if (!urlHxb) throw new Error('urlHxb is required.');
    if (!tokenHxb) throw new Error('tokenHxb is required.');

    this.urlHxb = urlHxb;
    this.tokenHxb = tokenHxb;

    this.auth = this._initAuth();
    this.user = this._initUser();
    this.application = this._initApplication();
    this.workspace = this._initWorkspace();
    this.item = this._initItem();
    this.datastore = this._initDatastore();
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
    return new Workspace(this.urlHxb, this.tokenHxb);
  }

  /**
   * initialize class User
   * @returns new User
   */
  public _initUser() {
    return new User(this.urlHxb, this.tokenHxb);
  }

  /**
   * initialize class Application
   * @returns new Application
   */
  public _initApplication() {
    return new Application(this.urlHxb, this.tokenHxb);
  }

  /**
   * initialize class Application
   * @returns new Application
   */
  public _initDatastore() {
    return new Datastore(this.urlHxb, this.tokenHxb);
  }

  /**
   * initialize class Application
   * @returns new Application
   */
  public _initItem() {
    return new Item(this.urlHxb, this.tokenHxb);
  }

}

import { ModelRes, ResponseErrorNull } from '../../util/type';
import { HxbAbstract } from '../../../HxbAbstract';
import Project from '../project';
import Datastore from '../datastore';
import {
  WORKSPACES,
  WORKSPACE_PASSWORD_POLICY,
  WORKSPACE_FUNCTIONALITY,
  WORKSPACE_USAGE,
  WORKSPACE_GROUP_CHILDREN,
  TASK_QUEUE_LIST,
  TASK_QUEUE_STATUS,
  CREATE_WORKSPACE,
  SET_CURRENT_WORKSPACE,
  UPDATE_WORKSPACE_SETTINGS,
  WORKSPACE_DETAIL,
  ARCHIVE_WORKSPACE,
  WORKSPACE_CURRENT
} from '../../graphql/workspace';
import {
  QueryTaskList,
  WsAdminUser,
  WsFunctionalityRes,
  TaskQueueListRes,
  TaskQueueStatusRes,
  DtWorkspaces,
  DtWorkspaceCurrent,
  DtWsPasswordPolicy,
  DtWsFunctionality,
  DtWsUsage,
  DtWsGroupChildren,
  DtTaskQueueList,
  DtTaskQueueStatus,
  CreateWsInput,
  DtWorkspaceID,
  DtCurrentWs,
  SetWsInput,
  WorkspaceSettingPl,
  WorkspaceDetailRes,
  UserInviteOptions,
  UserInvitePl,
  UserInviteResponse,
} from '../../types/workspace';
import Language from '../language';
import PasswordPolicy from '../passwordPolicy';
import Redirect from '../redirect';
import WorkspaceFunction from '../workspaceFunction';
import WorkspaceUsage from '../workspaceUsage';
import User from '../user';
import UserSession from '../userSession';
import Group from '../group';
import AppFunction from '../appFunction';
import Template from '../template';
import TemplateCategory from '../templateCategory';

export default class Workspace extends HxbAbstract {
  public id: string;
  public workspaceId: string;
  public wsKey: string;
  public name: string;
  public appFunctions: AppFunction;
  public createdAt: Date;
  public updatedAt: Date;
  public planName: string;
  public planId: string;
  public userId: string;
  public languages: Language[];
  public wsAdmin: string[];
  public passwordPolicy: PasswordPolicy;
  public redirect: Redirect;
  public workspaceFunction: WorkspaceFunction;
  public workspaceUsage: WorkspaceUsage;
  public workspaceAdminUsers: User[];
  public userSession: UserSession;
  public _groups: Group[] = [];
  // public projects = Project;

  /**
   * static function all: get workspaces
   * @returns Workspace[]
   */
  static async all(): Promise<Workspace[]> {
    // handle call graphql
    const res = await Workspace.allWithCurrent();
    return res.workspaces;
  }

  /**
   * static function get: get a workspace
   * @returns Workspace
   */
  static async get(id?: string): Promise<Workspace | undefined> {
    if (id) await this._current(id);
    const res = await this.request(WORKSPACE_DETAIL);
    // if (!res.workspace.id) throw new Error('Workspace not found');
    return Workspace.fromJson(res.workspace) as Workspace;
  }

  /**
   * static function setCurrent: set workspace current with id
   * @param: option: workspaceId: workspace id
   * @returns boolean
   */
  static async current(workspaceId?: string): Promise<Workspace | undefined> {
    if (workspaceId) {
      const bol = await this._current(workspaceId);
      if (!bol) throw new Error('Set current workspace failed');
    }
    return this.get();
  }

  static async _current(workspaceId: string): Promise<boolean> {
    // handle call graphql
    const res: DtCurrentWs = await this.request(SET_CURRENT_WORKSPACE, {
      setCurrentWorkSpaceInput: {
        workspace_id: workspaceId,
      }
    });
    return res.setCurrentWorkSpace!.success;
  }

  /**
   * static function all: get workspaces and current workspace id
   * @returns workspaces: Workspace[], workspace: Workspace
   */
  static async allWithCurrent(): Promise<{ workspaces: Workspace[], workspace: Workspace}> {
    // handle call graphql
    const res: DtWorkspaces = await this.request(WORKSPACES);
    const { workspaces, current_workspace_id } = res.workspaces;
    const ary = workspaces
      .map((params: any) => Workspace.fromJson(params) as Workspace);
    return { workspaces: ary, workspace: ary.find(w => w.id === current_workspace_id!)! };
  }

  /**
   * function set: set value for Workspace
   * @returns Workspace
   */
  set(key: string, value: any): Workspace {
    if (!value) return this;
    switch (key) {
      case 'w_id':
      case 'workspace_id':
          this.id = value;
        break;
      case 'ws_key':
        this.wsKey = value;
        break;
      case 'workspace_name':
        this.name = value;
        break;
      case 'app_functions':
        this.appFunctions = AppFunction.fromJson(value) as AppFunction;
        break;
      case 'created_at':
        this.createdAt = new Date(value);
        break;
      case 'updated_at':
        this.updatedAt = new Date(value);
        break;
      case 'name':
        this.name = value;
        break;
      case 'plan_name':
        this.planName = value;
        break;
      case 'plan_id':
        this.planId = value;
        break;
      case 'languages':
        this.languages = (value as any[])
          .map((lang: any) => Language.fromJson(lang) as Language);
        break;
      case 'pwd_policy':
        this.passwordPolicy = PasswordPolicy.fromJson(value) as PasswordPolicy;
        break;
      case 'redirect':
        this.redirect = Redirect.fromJson(value) as Redirect;
        break;
      case 'user_id':
        this.userId = value;
        break;
      case 'ws_admin':
        this.wsAdmin = value;
        break;
      case 'user_sessions':
        this.userSession = UserSession.fromJson(value) as UserSession;
        break;
      case 'ws_admin_users':
        value = value as WsAdminUser[];
        this.workspaceAdminUsers = value.map((user: WsAdminUser) => User.fromJson(user));
        break;
      case 'ws_functions':
        this.workspaceFunction = WorkspaceFunction.fromJson(value) as WorkspaceFunction;
        this.workspaceFunction.workspace = this;
        break;
      case 'ws_usage':
        this.workspaceUsage = WorkspaceUsage.fromJson(value) as WorkspaceUsage;
        this.workspaceUsage.workspace = this;
        break;
      }
    return this;
  }

  /**
   * function getDetail: get and set workspace detail
   * @returns Workspace
   */
  async fetch(): Promise<boolean> {
    // handle call graphql
    await Workspace.current(this.id);
    const res: WorkspaceDetailRes = await this.request(WORKSPACE_DETAIL);
    this.sets(res.workspace as {[key: string]: any});
    return true;
  }

  /**
   * function getPasswordPolicy: get workspace password policy
   * @returns PasswordPolicy
   */
  async getPasswordPolicy(): Promise<PasswordPolicy> {
    const res: DtWsPasswordPolicy = await this.request(WORKSPACE_PASSWORD_POLICY, { workingspaceId: this.id });
    this.passwordPolicy = PasswordPolicy.fromJson(res.workspacePasswordPolicy) as PasswordPolicy;
    return this.passwordPolicy;
  }

  /**
   * function getFunctionality: get workspace functionlity
   * @returns WorkspaceFunction
   */
  async getFunctionality(): Promise<WorkspaceFunction> {
    const data: WsFunctionalityRes = {
      wsFunctionality: undefined,
      error: undefined,
    };
    // handle call graphql
    const res: DtWsFunctionality = await this.request(WORKSPACE_FUNCTIONALITY, { workingspaceId: this.id });
    if (!this.workspaceFunction) {
      this.workspaceFunction = new WorkspaceFunction(this);
    }
    this.workspaceFunction = WorkspaceFunction.fromJson({...{workspace: this}, ...res.workspaceFunctionality}) as WorkspaceFunction;
    return this.workspaceFunction;
  }

  /**
   * function getUsage: get workspace usage
   * @returns WorkspaceUsage
   */
  async getUsage(): Promise<WorkspaceUsage> {
    // handle call graphql
    const res: DtWsUsage = await this.request(WORKSPACE_USAGE, { workingspaceId: this.id });
    this.workspaceUsage = WorkspaceUsage.fromJson({ ...{workspace: this}, ...res.workspaceUsage}) as WorkspaceUsage;
    return this.workspaceUsage;
  }

  /**
   * function getGroup: get workspace group and their children
   * @returns Group
   */
  async group(id?: string): Promise<Group> {
    if (id) {
      const g = this._groups.find(g => g.id === id);
      if (g) return g;
    }
    const group = new Group({ workspace: this, id });
    await group.fetch();
    this._groups.push(group);
    return group;
  }

  /**
   * function save: create or update workspace
   * @returns boolean
   */
  async save(): Promise<boolean> {
    if (this.id) throw new Error('Currently, workspace updating is not support.');
    return this.create(); // : this.update();
  }

  /**
   * function create: create workspace
   * @returns boolean
   */
  async create(): Promise<boolean> {
    const createWorkSpaceInput: CreateWsInput = {
      name: this.name,
    };
    // handle call graphql
    const res: DtWorkspaceID = await this.request(CREATE_WORKSPACE, { createWorkSpaceInput });
    if (res.createWorkspace?.w_id) {
      this.id = res.createWorkspace?.w_id;
      return true;
    } else {
      return false;
    }
  }

  /**
   * TODO: Update settings that want to change
   * function update: update workspace settings
   * @returns boolean
   */
  /*
  async update(): Promise<boolean> {
    const payload: WorkspaceSettingPl = this.toJson();
    const res: ResponseErrorNull = await this.request(UPDATE_WORKSPACE_SETTINGS, { payload });
    return !res.error;
  }
  */

  /**
   * function toJson: convert workspace to json
   * @returns WorkspaceSettingPl
   */
  toJson(): WorkspaceSettingPl {
    const params: WorkspaceSettingPl = {
      w_id: this.id,
      id: this.id,
    };
    if (this.name) params.name = this.name;
    if (this.planId) params.plan_id = this.planId;
    if (this.planName) params.plan_name = this.planName;
    if (this.userId) params.user_id = this.userId;
    return params;
  }

  /**
   * function archive: archive workspace
   * @returns boolean
   */
  async archive(): Promise<boolean> {
    const payload = {
      w_id: this.id,
      archived: true,
    }
    const res: ResponseErrorNull = await this.request(ARCHIVE_WORKSPACE, { payload });
    return !res.error;
  }

  async project(id?: string): Promise<Project> {
    const project = new Project({workspace: this, id });
    if (id) await project.fetch();
    return project;
  }

  projects(): Promise<Project[]> {
    return Project.all(this);
  }

  projectsAndDatastores(): Promise<{ projects: Project[], datastores: Datastore[]}> {
    return Project.allWithDatastores(this);
  }

  projectTemplates(): Promise<TemplateCategory[]> {
    return Template.all();
  }

  async invite(emails: string[], domain: string, options?: UserInviteOptions): Promise<UserInviteResponse[]> {
    return Workspace.client.invite(emails, domain, options, this);
  }
}
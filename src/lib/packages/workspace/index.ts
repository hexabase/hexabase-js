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
  public group: Group;
  // public projects = Project;

  constructor(id?: string) {
    super();
    if (id) this.id = id;
  }

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
  static async get(id: string): Promise<Workspace> {
    this.setCurrent(id);
    const res = await this.request(WORKSPACE_DETAIL);
    return Workspace.fromJson(res.workspace) as Workspace;
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
  async getDetail(): Promise<boolean> {
    // handle call graphql
    await Workspace.setCurrent(this.id);
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
    this.workspaceFunction.sets(res.workspaceFunctionality);
    return this.workspaceFunction;
  }

  /**
   * function getUsage: get workspace usage
   * @returns WorkspaceUsage
   */
  async getUsage(): Promise<WorkspaceUsage> {
    // handle call graphql
    const res: DtWsUsage = await this.request(WORKSPACE_USAGE, { workingspaceId: this.id });
    if (!this.workspaceUsage) {
      this.workspaceUsage = new WorkspaceUsage(this);
    }
    this.workspaceUsage.sets(res.workspaceUsage.usage!);
    return this.workspaceUsage;
  }

  /**
   * function getGroup: get workspace group and their children
   * @returns Group
   */
  async getGroup(): Promise<Group> {
    // handle call graphql
    const res: DtWsGroupChildren = await this.request(WORKSPACE_GROUP_CHILDREN, { workingspaceId: this.id });
    const { group, children }= res.workspaceGetGroupChildren;
    if (group) {
      this.group = Group.fromJson(group) as Group;
    }
    if (this.group && children) {
      this.group.children = children.map((child: any) => Group.fromJson(child) as Group);
    }
    return this.group;
  }

  /**
   * function getTaskQueueList: get queue list
   * TODO: Need definition type of queryTaskList
   * @param: option: workspaceId or none, queryTaskList or none
   * @returns TaskQueueListRes
   */
  /*
  async getTaskQueueList(workspaceId?: string, queryTaskList?: QueryTaskList): Promise<TaskQueueListRes> {
    const data: TaskQueueListRes = {
      taskQueueList: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtTaskQueueList = await this.request(TASK_QUEUE_LIST, { workspaceId, queryTaskList });
      console.log(res.taskGetQueueList);
      data.taskQueueList = res.taskGetQueueList;
    } catch (error: any) {
      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }
  */

  /**
   * function getTaskQueueStatus: get task queue status
   * @param: option: taskId and workspaceId are required
   * @returns TaskQueueStatusRes
   */
  /*
  async getTaskQueueStatus(taskId: string, workspaceId: string): Promise<TaskQueueStatusRes> {
    const data: TaskQueueStatusRes = {
      taskQueueStatus: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtTaskQueueStatus = await this.request(TASK_QUEUE_STATUS, { taskId, workspaceId });
      console.log(res);
      data.taskQueueStatus = res.taskGetQueueTaskStatus;
    } catch (error: any) {
      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }
  */

  /**
   * function save: create or update workspace
   * @returns boolean
   */
  async save(): Promise<boolean> {
    return !this.id ? this.create() : this.update();
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
   * function update: update workspace settings
   * @returns boolean
   */
  async update(): Promise<boolean> {
    const payload: WorkspaceSettingPl = this.toJson();
    const res: ResponseErrorNull = await this.request(UPDATE_WORKSPACE_SETTINGS, { payload });
    return !res.error;
  }

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


  /**
   * static function setCurrent: set workspace current with id
   * @param: option: workspaceId: workspace id
   * @returns boolean
   */
  static async setCurrent(workspaceId: string): Promise<boolean> {
    const setCurrentWorkSpaceInput: SetWsInput = {
      workspace_id: workspaceId,
    };
    // handle call graphql
    const res: DtCurrentWs = await this.request(SET_CURRENT_WORKSPACE, { setCurrentWorkSpaceInput });
    return res.setCurrentWorkSpace!.success;
  }

  /**
   * static function getCurrent: get current workspace
   * @returns WorkspaceCurrentRes
   */
  static async getCurrent(): Promise<Workspace> {
    const res: DtWorkspaceCurrent = await this.request(WORKSPACE_CURRENT);
    const workspace = new Workspace;
    workspace.id = res.workspaceCurrent!.workspace_id!;
    return workspace;
  }

  project(id?: string): Project {
    return new Project(this, { id });
  }

  projects(): Promise<Project[]> {
    return Project.all(this);
  }

  getProjectsAndDatastores(): Promise<{ projects: Project[], datastores: Datastore[]}> {
    return Project.getProjectsAndDatastores(this);
  }
}
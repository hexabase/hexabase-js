import { FieldNameENJP, ModelRes } from '../../util/type';
import { HxbAbstract } from '../../../HxbAbstract';
import Workspace from '../workspace';
import {
  GET_APPLICATION_AND_DATASTORE,
  APPLICATION_CREATE_PROJECT,
  GET_INFO_PROJECT,
  DELETE_PROJECT,
  UPDATE_PROJECT_THEME,
  UPDATE_PROJECT_NAME,
  GET_APPLICATIONS,
  GET_TEMPLATES
} from '../../graphql/project';
import {
  AppAndDsRes,
  DtAppAndDs,
  CreateProjectPl,
  CreateAppRes,
  DtCreateApp,
  ProjectInfoRes,
  DtProjectInfo,
  DtDeleteProject,
  DeleteProjectPl,
  DtUpdateThemeProject,
  UpdateProjectThemePl,
  DtUpdateNameProject,
  UpdateProjectNamePl,
  ApplicationRes,
  DtApplicationRes,
  TemplateRes,
  DtTemplates,
  UpdateProjectNameParamsProject,
  DeleteParamsProject
} from '../../types/project';
import Datastore from '../datastore';
import TemplateCategory from '../templateCategory';
import Language from '../language';
import Report from '../report';

export default class Project extends HxbAbstract {
  workspace: Workspace;
  id: string;
  name: FieldNameENJP | string;
  displayId: string;
  theme?: 'blue' | 'white' | 'gray' | 'black';
  displayOrder: number;
  _datastores: Datastore[] = [];
  templateId: string;

  set(key: string, value: any): Project {
    switch (key) {
      case 'application_id':
      case 'p_id':
      case 'id':
        if (value) this.id = value;
        break;
      case 'name':
        this.name = value;
        break;
      case 'display_id':
        this.displayId = value;
        break;
      case 'theme':
        this.theme = value;
        break;
      case 'display_order':
        this.displayOrder = value;
        break;
      case 'workspace':
        this.workspace = value;
        break;
      case 'datastores':
        if (!value) break;
        this._datastores = (value as any[]).map(datastore => Datastore.fromJson({...{project: this}, ...datastore}) as Datastore);
        break;
      case 'template_id':
        this.templateId = value;
        break;
    }
    return this;
  }

  /**
   * function get: get list project in a workspace
   * @params workspaceId
   * @returns ApplicationRes
   */
  static async all(workspace: Workspace): Promise<Project[]> {
    // handle call graphql
    const res: DtApplicationRes = await this.request(GET_APPLICATIONS, { workspaceId: workspace!.id });
    return res.getApplications.map(params => Project.fromJson({...{ workspace }, ...params }) as Project);
  }

  async datastores(): Promise<Datastore[]> {
    if (this._datastores.length > 0) return this._datastores;
    this._datastores = await Datastore.all({
      project: this
    });
    return this._datastores;
  }

  async datastore(id?: string): Promise<Datastore> {
    if (!id) {
      return new Datastore({ project: this, id });
    }
    if (this._datastores.length === 0) await this.datastores();
    const datastore = this._datastores.find(datastore => datastore.id === id);
    if (!datastore) throw new Error(`Datastore ${id} not found`);
    await datastore.fetch();
    return datastore;
  }

  async reports(): Promise<Report[]> {
    return Report.all(this);
  }

  /**
   * function getProjectsAndDatastores: get list application and datastore in a workspace
   * @params workspaceId
   * @returns AppAndDsRes
   */
  static async allWithDatastores(workspace: Workspace): Promise<{ projects: Project[], datastores: Datastore[]}> {
    // handle call graphql
    const res: DtAppAndDs = await this.request(GET_APPLICATION_AND_DATASTORE, { workspaceId: workspace.id });
    // data.appAndDs = res.getApplicationAndDataStore;

    const projects = res.getApplicationAndDataStore.map(params => Project.fromJson({...{ workspace }, ...params}) as Project);
    const datastores: Datastore[] = [];
    projects.forEach(project => {
      datastores.push(...project._datastores);
    });
    return {
      projects,
      datastores,
    };
  }

  async save(): Promise<boolean> {
    if (this.id) {
      return this.update();
    }
    return this.create();
  }

  /**
   * function create: create new project
   * @params tp_id string | undefined
   * @returns boolean
   */
  async create(): Promise<boolean> {
    if (typeof this.name === 'string') {
      throw new Error('name Japanese and English are required');
    }
    const params: CreateProjectPl = {
      name: this.name,
    };
    if (this.templateId) params.tp_id = this.templateId;
    // handle call graphql
    const res: DtCreateApp = await this.request(APPLICATION_CREATE_PROJECT, { createProjectParams: params });
    this.id = res.applicationCreateProject.project_id;
    return true;
  }

  /**
   * function update: update project settings
   * @returns boolean
   */
  async update(): Promise<boolean> {
    if (typeof this.name === 'string') {
      throw new Error('name Japanese and English are required');
    }
    const payload: UpdateProjectNameParamsProject = {
      project_id: this.id,
      project_name: this.name,
      project_displayid: this.displayId,
      theme: this.theme,
    }
    // handle call graphql
    const res: DtUpdateNameProject = await this.request(UPDATE_PROJECT_NAME, { payload });
    return res.updateProjectName.success;
  }


  /**
   * function getDetail: get info project
   * @params projectId string
   * @returns ReportDataRes
   */
  async fetch(): Promise<boolean> {
    // handle call graphql
    const res: DtProjectInfo = await this.request(GET_INFO_PROJECT, { projectId: this.id });
    this.sets(res.getInfoProject);
    return true;
  }

  /**
   * function delete: delete project in workspace
   * @params {DeleteProjectPl} payload is requirement
   * @returns ModelRes
   */
  async delete(): Promise<boolean> {
    const payload: DeleteParamsProject = {
      project_id: this.id,
    }
    // handle call graphql
    const res: DtDeleteProject = await this.request(DELETE_PROJECT, { payload });
    return res.deleteProject.success;
  }
}

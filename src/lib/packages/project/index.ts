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

export default class Project extends HxbAbstract {
  workspace: Workspace;
  id: string;
  name: FieldNameENJP = {
    ja: '',
    en: ''
  };
  displayId: string;
  theme?: 'blue' | 'white' | 'gray' | 'black';
  displayOrder: number;
  _datastores: Datastore[] = [];
  templateId: string;

  constructor(workspace: Workspace) {
    super();
    this.workspace = workspace;
  }

	static fromJson(workspace: Workspace, json: {[key: string]: any}): Project {
		const project = new Project(workspace);
		project.sets(json);
		return project;
	}

  sets(params: {[key: string]: any}): Project {
    Object.keys(params).forEach(key => {
      this.set(key, params[key]);
    });
    return this;
  }

  set(key: string, value: any): Project {
    switch (key) {
      case 'application_id':
      case 'p_id':
        this.id = value;
        break;
      case 'name':
        if (typeof value === 'string') {
          const language = this.workspace.languages?.find(language => language.default);
          if (language) {
            switch (language.langCd) {
              case 'ja':
                this.name.ja = value;
                break;
              case 'en':
                this.name.en = value;
                break;
            }
          } else {
            this.name = {
              ja: value,
              en: value,
            };
          }
        } else {
          this.name = value;
        }
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
      case 'datastores':
        if (!value) break;
        this._datastores = (value as any[]).map(datastore => Datastore.fromJson(this, datastore));
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
    return res.getApplications.map(params => Project.fromJson(workspace, params));
  }

  async datastores(): Promise<Datastore[]> {
    return Project.client.Datastore.all({
      project: this
    });
  }

  /**
   * function getProjectsAndDatastores: get list application and datastore in a workspace
   * @params workspaceId
   * @returns AppAndDsRes
   */
  static async getProjectsAndDatastores(workspace: Workspace): Promise<{ projects: Project[], datastores: Datastore[]}> {
    // handle call graphql
    const res: DtAppAndDs = await this.request(GET_APPLICATION_AND_DATASTORE, { workspaceId: workspace.id });
    // data.appAndDs = res.getApplicationAndDataStore;

    const projects = res.getApplicationAndDataStore.map(params => Project.fromJson(workspace, params));
    const datastores: Datastore[] = [];
    projects.forEach(project => {
      datastores.push(...project._datastores);
    });
    return {
      projects,
      datastores,
    };
  }

  /**
   * function getTemplates: get templates
   * @returns TemplateRes
   */
  async getTemplates(): Promise<TemplateCategory[]> {
    // handle call graphql
    const res: DtTemplates = await this.request(GET_TEMPLATES);
    return res.getTemplates.categories.map(category => TemplateCategory.fromJson(this, category));
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
  async create(tp_id?: string): Promise<boolean> {
    if (this.name.en === '' || this.name.ja === '') {
      throw new Error('name Japanese and English are required');
    }
    const params: CreateProjectPl = {
      name: this.name,
      tp_id,
    }
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
  async getDetail(): Promise<boolean> {
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

import { ModelRes } from '../../util/type';
import { HxbAbstract } from '../../../HxbAbstract';
import {
  GET_APPLICATION_AND_DATASTORE,
  APPLICATION_CREATE_PROJECT,
  GET_REPORTS,
  REPORT_DEFAULT,
  GET_INFO_PROJECT,
  DELETE_PROJECT
} from '../../graphql/application';
import {
  AppAndDsRes,
  DtAppAndDs,
  CreateProjectPl,
  CreateAppRes,
  DtCreateApp,
  GetReportsRes,
  DtGetReports,
  ReportDataPayload,
  ReportDataRes,
  DtReportData,
  ProjectInfoRes,
  DtProjectInfo,
  DtDeleteProject,
  DeleteProjectPl
} from '../../types/application';

export default class Application extends HxbAbstract {

  /**
   * function getProjectsAndDatastores: get list application and datastore in a workspace
   * @params workspaceId
   * @returns AppAndDsRes
   */
  async getProjectsAndDatastores(workspaceId: string): Promise<AppAndDsRes> {
    const data: AppAndDsRes = {
      appAndDs: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtAppAndDs = await this.client.request(GET_APPLICATION_AND_DATASTORE, {workspaceId});

      data.appAndDs = res.getApplicationAndDataStore;
    } catch (error: any) {

      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function create: get list application and datastore in a workspace
   * @params workspaceId
   * @returns AppAndDsRes
   */
  async create(createProjectParams: CreateProjectPl): Promise<CreateAppRes> {
    const data: CreateAppRes = {
      app: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtCreateApp = await this.client.request(APPLICATION_CREATE_PROJECT, { createProjectParams });

      data.app = res.applicationCreateProject;
    } catch (error: any) {

      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function getReports: get reports list in project
   * @params projectId
   * @returns GetReportsRes
   */
  async getReports(projectId: string): Promise<GetReportsRes> {
    const data: GetReportsRes = {
      reports: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtGetReports = await this.client.request(GET_REPORTS, { projectId });

      data.reports = res.getReports;
    } catch (error: any) {

      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function getDataReport: get data report by report id in project
   * @params projectId, reportId, reportDataPayload
   * @returns ReportDataRes
   */
  async getDataReport(projectId: string, reportId: string, reportDataPayload?: ReportDataPayload): Promise<ReportDataRes> {
    const data: ReportDataRes = {
      dataReport: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtReportData = await this.client.request(REPORT_DEFAULT, { projectId, reportId, reportDataPayload });

      data.dataReport = res.reportData;
    } catch (error: any) {

      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function getInfoProject: get info project
   * @params projectId string
   * @returns ReportDataRes
   */
  async get(projectId: string): Promise<ProjectInfoRes> {
    const data: ProjectInfoRes = {
      project: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtProjectInfo = await this.client.request(GET_INFO_PROJECT, { projectId });

      data.project = res.getInfoProject;
    } catch (error: any) {

      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

    /**
     * function delete: delete project in workspace
     * @params {DeleteProjectPl} payload is requirement
     * @returns ModelRes
   */
     async delete(payload: DeleteProjectPl): Promise<ModelRes> {
      const data: ModelRes = {
        data: undefined,
        error: undefined,
      };

      // handle call graphql
      try {
        const res: DtDeleteProject = await this.client.request(DELETE_PROJECT, { payload });

        data.data = res.deleteProject;
      } catch (error: any) {
        data.error = JSON.stringify(error.response.errors);
      }
  
      return data;
    }

}

import { CreateProgram } from 'typescript';
import { Datastore } from '../datastore';

export interface ApplicationAndDataStore {
  application_id?: string;
  name?: string;
  display_id?: string;
  datastores?: [Datastore];
}

export interface CreateApp {
  project_id: string;
}

export interface ReportListItem {
  rp_id: string;
  title: string;
  display_order: number;
  hide_menu: boolean;
}

/** Data response from request graphql */

export interface DtAppAndDs {
  getApplicationAndDataStore: [ApplicationAndDataStore];
}

export interface DtCreateApp {
  applicationCreateProject: CreateApp;
}

export interface DtGetReports {
  getReports: [ReportListItem];
}

/** Response */
export interface AppAndDsRes {
  appAndDs?: [ApplicationAndDataStore];
  error?: string;
}

export interface CreateAppRes {
  app?: CreateApp;
  error?: string;
}

export interface GetReportsRes {
  reports?: [ReportListItem];
  error?: string;
}

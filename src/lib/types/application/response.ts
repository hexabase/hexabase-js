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

/** Data response from request graphql */

export interface DtAppAndDs {
  getApplicationAndDataStore: [ApplicationAndDataStore];
}

export interface DtCreateApp {
  applicationCreateProject: CreateApp;
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

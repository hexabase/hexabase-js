import { Datastore } from '../datastore';

export interface ApplicationAndDataStore {
  application_id: string;
  name: string;
  display_id: string;
  datastores: [Datastore];
  }

export interface ApplicationAndDataStoreRes {
  getApplicationAndDataStore: [ApplicationAndDataStore];
}
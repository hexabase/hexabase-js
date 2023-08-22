import HexabaseClient from './HexabaseClient';
import Hexabase from './HexabaseClient';
import Auth from './lib/packages/auth';
import Item from './lib/packages/item';
import Project from './lib/packages/project';
import Report from './lib/packages/report';
import HexabaseSQL from './lib/sql';
import User from './lib/packages/user';
import Workspace from './lib/packages/workspace';
import FileObject from './lib/packages/fileObject';

interface HexabaseConfig {
  url?: string;
  token?: string;
  email?: string;
  password?: string;
}
export interface Config {
  url_production: string;
}

/**
 * create client for hexabase-sdk
 */
const createClient = async ({
  url = 'https://graphql.hexabase.com/graphql',
  token,
  email,
  password,
}: HexabaseConfig): Promise<HexabaseClient> => {
  const auth = new Auth(url);
  if (!token || (!email && !password)) {
    throw Error('Need token or email and password to initialize sdk');
  }
  const tokenHx = (email && password) ? await auth.login({ email, password }) : token;
  return new HexabaseClient('', tokenHx, url);
};

export * from './lib/types';

export {
  createClient, HexabaseClient, Hexabase,
  Item, Project, Report, HexabaseSQL, User, Workspace, FileObject,
};

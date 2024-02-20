import HexabaseClient from './HexabaseClient';
import Item from './lib/packages/item';
import Project from './lib/packages/project';
import Report from './lib/packages/report';
import HexabaseSQL from './lib/sql';
import User from './lib/packages/user';
import Workspace from './lib/packages/workspace';
import FileObject from './lib/packages/fileObject';

type Config = {
  env?: string;
  email?: string;
  password?: string;
  token?: string;
};

/**
 * Creates a new Hexabase Client.
 * @param {string} env
 * @param {string} email
 * @param {string} password
 * @param {string} token
 * @returns HexabaseClient
 */
const createClient = async ({
  env,
  email,
  password,
  token,
}: Config = {}): Promise<HexabaseClient> => {
  const client = new HexabaseClient({ env: env });
  if (token) {
    await client.setToken(token);
    return client;
  }
  if (email && password) {
    await client.login({ email, password });
  }
  return client;
};

export * from './lib/types';

export {
  createClient, HexabaseClient,
  Item, Project, Report, HexabaseSQL, User, Workspace, FileObject,
};

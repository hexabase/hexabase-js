import HexabaseClient from './HexabaseClient';
import Hexabase from './HexabaseClient';
import Auth from './lib/packages/auth';

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

export { createClient, HexabaseClient, Hexabase };

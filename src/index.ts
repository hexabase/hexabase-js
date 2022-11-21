import HexabaseClient from './HexabaseClient';
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

const config: Config = require('./config/default.json');
const urlPro = config.url_production || 'https://graphql.hexabase.com/graphql';
/**
 * create client for hexabase-sdk
 */
const createClient = async ({
  url,
  token,
  email,
  password,
}: HexabaseConfig): Promise<HexabaseClient> => {
  const _url = url || urlPro;
  const auth = new Auth(_url);
  let tokenHx = '';
  if (email && password && !token) {
    const { token, error } = await auth.login({ email, password });
    if (token) {
      tokenHx = token;
    } else {
      throw Error(`Need login faild to initialize sdk: ${error}`);
    }
  } else if (!email && !password && token) {
    tokenHx = token;
  } else {
    throw Error('Need token or email and password to initialize sdk');
  }
  return new HexabaseClient(_url, tokenHx);
};

export { createClient, HexabaseClient };

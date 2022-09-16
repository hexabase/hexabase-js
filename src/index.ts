import HexabaseClient from './HexabaseClient';
import Auth from './lib/packages/auth';
import AuthMw from './lib/packages/middlware/auth';

interface HexabaseConfig {
  url: string;
  token?: string;
  email?: string;
  password?: string;
}

/**
 * create client for hexabase-sdk
 */
const createClient = async ({ url, token, email, password }: HexabaseConfig): Promise<HexabaseClient> => {
  const auth = new Auth(url);
  let tokenHx = '';

  if (email && password && !token) {
    const {token, error} = await auth.login({email, password});
    if (token) {
      tokenHx = token;
    } else {
      throw Error(`Need login faild to initialize sdk: ${error}`);
    }
  }
  else if (!email && !password && token) {
    tokenHx = token;
  }
  else {
    throw Error('Need token or email and password to initialize sdk');
  }
    return new HexabaseClient(url, tokenHx);
};

export {
  createClient,
  HexabaseClient,
};

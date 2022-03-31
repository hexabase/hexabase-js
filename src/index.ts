import HexabaseClient from './HexabaseClient';
import AuthMw from './lib/packages/middlware/auth';

interface HexabaseConfig {
  url: string;
  token?: string;
  email?: string
  password?: string
}
/**
 * create client for hexabase-sdk
 */
const createClient = async ({ url, token, email, password }: HexabaseConfig): Promise<HexabaseClient> => {
  const authMw = new AuthMw(url)
  let tokenHx = ''

  if (email && password && !token) {
    const user = await authMw.loginAsync({email, password})
    tokenHx = user.login.token
  }
  else if (!email && !password && token) {
    tokenHx = token
  }  
  else{
    throw Error("Need token or email and password to initialize sdk")
  }
    return new HexabaseClient(url, tokenHx);
};

export {
  createClient
};

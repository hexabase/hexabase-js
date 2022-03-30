import HexabaseClient from './HexabaseClient';

 interface HexabaseConfig {
  url: string;
  token: string;
  // email ?: string
  // password ?: string
}

/**
 * create client for hexabase-sdk
 */
// const createClient = ({url, token}: HexabaseConfig): HexabaseClient => {
//   if (token){
//     return new HexabaseClient(url, token);
//   }
// };
const createClient = ({url, token}: HexabaseConfig): HexabaseClient => {
  return new HexabaseClient(url, token);
};

export {
  createClient
};

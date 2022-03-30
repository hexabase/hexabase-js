import HexabaseClient from './HexabaseClient';

/**
 * create client for hexabase-sdk
 */
const createClient = (
  hxbUrlGraphql: string,
  hxbTokenGraphql: string,
): HexabaseClient => {
  return new HexabaseClient(hxbUrlGraphql, hxbTokenGraphql);
};

export {
  createClient
};

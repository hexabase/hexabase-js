import HexabaseClient from './HexabaseClient';
import Hexabase from './HexabaseClient';
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
declare const createClient: ({ url, token, email, password, }: HexabaseConfig) => Promise<HexabaseClient>;
export * from './lib/types';
export { createClient, HexabaseClient, Hexabase, Item, Project, Report, HexabaseSQL, User, Workspace, FileObject, };

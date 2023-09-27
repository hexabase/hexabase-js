import { FieldNameENJP } from '../../util/type';
import { HxbAbstract } from '../../../HxbAbstract';
import Workspace from '../workspace';
import Datastore from '../datastore';
import Report from '../report';
export default class Project extends HxbAbstract {
    workspace: Workspace;
    id: string;
    name: FieldNameENJP | string;
    displayId: string;
    theme?: 'blue' | 'white' | 'gray' | 'black';
    displayOrder: number;
    _datastores: Datastore[];
    templateId: string;
    set(key: string, value: any): Project;
    static all(workspace: Workspace): Promise<Project[]>;
    datastores(): Promise<Datastore[]>;
    datastore(id?: string): Promise<Datastore>;
    datastoreSync(id?: string): Datastore;
    reports(): Promise<Report[]>;
    static allWithDatastores(workspace: Workspace): Promise<{
        projects: Project[];
        datastores: Datastore[];
    }>;
    save(): Promise<boolean>;
    create(): Promise<boolean>;
    update(): Promise<boolean>;
    fetch(): Promise<boolean>;
    delete(): Promise<boolean>;
}

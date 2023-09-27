import { HxbAbstract } from '../../../HxbAbstract';
import Project from '../project';
type ReportDataRow = {
    [key: string]: string | number;
};
export default class Report extends HxbAbstract {
    project: Project;
    id: string;
    title: string;
    displayOrder: number;
    hideMenu: boolean;
    _data: ReportDataRow[];
    set(key: string, value: any): Report;
    static all(project: Project): Promise<Report[]>;
    data({ page, perPage, total }?: {
        page?: number | undefined;
        perPage?: number | undefined;
        total?: boolean | undefined;
    }): Promise<ReportDataRow[]>;
}
export {};

import { FieldNameENJP } from '../../util/type';
export interface CreateProjectPl {
    tp_id?: string;
    name: FieldNameENJP;
}
export interface DeleteParamsProject {
    project_id: string;
}
export interface UpdateProjectThemeParamsProject {
    project_id: string;
    theme: 'blue' | 'white' | 'gray' | 'black';
}
export interface ProjectName {
    en: string;
    ja: string;
}
export interface UpdateProjectNameParamsProject {
    project_id: string;
    project_name: ProjectName;
    project_displayid?: string;
    theme?: 'blue' | 'white' | 'gray' | 'black';
}
export interface DeleteProjectPl {
    payload: DeleteParamsProject;
}
export interface UpdateProjectThemePl {
    payload: UpdateProjectThemeParamsProject;
}
export interface UpdateProjectNamePl {
    payload: UpdateProjectNameParamsProject;
}

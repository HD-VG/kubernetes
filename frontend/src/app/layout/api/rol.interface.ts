import { AnswerQuery } from './answerQuery.interface'; // Ruta de AnswerQuery

export interface RolPermissions {
    id_aisgnacion?: number;
    id_permission?: number;
    name: string;
}

export interface Rol {
    id?: number;
    name?: string;
    created_at?: Date;
    permisos?: RolPermissions[];
}

export interface RolCreate {
    name: string;
    permisos: PermissionRol[]
}
export interface PermissionRol {
    id_permission: number
}

// Hacer que el rol extienda al padre con Rol[] como tipo
export interface RolQuery extends AnswerQuery<Rol[]> { }


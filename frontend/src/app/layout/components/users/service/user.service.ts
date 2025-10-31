import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment'
import { CommonService } from 'src/app/layout/common/service/common.service'
import { RolQuery, Rol, AnswerQueryResponse, UserQuery, User } from 'src/app/layout/api/index.interface';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UserRolService {

    constructor(
        private http: HttpClient,
        private readonly commonService: CommonService

    ) { }
    private readonly api = environment.apiUrl;

    getUsers() {
        const headers = this.commonService.getHeaders();
        const rol = this.commonService.getRol();
        const url = `${this.api}/v1/user/list?rol=${rol}`;
        return this.http.get<UserQuery>(url, { headers })
            .toPromise()
            .then(response => response.data as User[])
            .then(data => data);
    }

    async deleteUser(userData: User): Promise<AnswerQueryResponse> {
        const headers = this.commonService.getHeaders();
        const rol = this.commonService.getRol();
        const id = userData.id;
        const url = `${this.api}/v1/user/${id}?rol=${rol}&id=${id}`;

        try {
            const response = await lastValueFrom(
                this.http.delete<AnswerQueryResponse>(url, { headers })
            );
            if (!response) { return { message: 'Sin respuesta del servidor', status: false, data: null }; }
            return response;
        } catch (error: any) {
            console.error('Error deleting role:', error);
            throw new Error(
                error?.error?.message || 'Ocurrió un error al eliminar el rol.'
            );
        }
    }

    async deleteUsers(rolData: any): Promise<AnswerQueryResponse> {
        const headers = this.commonService.getHeaders();
        const rol = this.commonService.getRol();
        const url = `${this.api}/v1/user/removeMultiply?rol=${rol}`;

        try {
            const response = await lastValueFrom(
                this.http.post<AnswerQueryResponse>(url, rolData, { headers })
            );
            if (!response) { return { message: 'Sin respuesta del servidor', status: false, data: null }; }
            return response;
        } catch (error: any) {
            console.error('Error deleting role:', error);
            throw new Error(
                error?.error?.message || 'Ocurrió un error al eliminar el rol.'
            );
        }
    }
    async createUser(data: User): Promise<AnswerQueryResponse> {
        const headers = this.commonService.getHeaders();
        const rol = this.commonService.getRol();
        const url = `${this.api}/v1/user?rol=${rol}`;
        try {
            const response = await lastValueFrom(
                this.http.post<AnswerQueryResponse>(url, data, { headers })
            );
            if (!response) { return { message: 'Sin respuesta del servidor', status: false, data: null }; }
            return response;
        } catch (error: any) {
            console.error('Error deleting role:', error);
            throw new Error(
                error?.error?.message || 'Ocurrió un error al crear el rol.'
            );
        }
    }

    async updateUser(id: number, data: User): Promise<AnswerQueryResponse> {
        const headers = this.commonService.getHeaders();
        const rol = this.commonService.getRol();
        const url = `${this.api}/v1/user/${id}?rol=${rol}&id=${id}`;

        try {
            const response = await lastValueFrom(
                this.http.patch<AnswerQueryResponse>(url, data, { headers })
            );
            if (!response) {
                return { message: 'Sin respuesta del servidor', status: false, data: null };
            }
            return response;
        } catch (error: any) {
            console.error('Error al actualizar el rol:', error);
            throw new Error(
                error?.error?.message || 'Ocurrió un error al actualizar el rol.'
            );
        }
    }

    // getRoles(limit = 5, offset = 0) {
    //     const permission = 'leer'; // Permiso que deseas consultar
    //     const url = `${this.baseUrl}/rol?limit=${limit}&offset=${offset}&permission=${permission}`;
    //     const headers = this.commonService.getHeaders();
    //     return this.http.get<Rol_list[]>(url, { headers });
    // }

    getRoles() {
        const headers = this.commonService.getHeaders();
        const rol = this.commonService.getRol();
        const url = `${this.api}/v1/rol/listRol?rol=${rol}`;
        return this.http.get<RolQuery>(url, { headers })
            .toPromise()
            .then(response => response.data as Rol[])
            .then(data => data);
    }

    async deleteRol(rolData: Rol): Promise<AnswerQueryResponse> {
        const headers = this.commonService.getHeaders();
        const rol = this.commonService.getRol();
        const id = rolData.id;
        const url = `${this.api}/v1/rol/${id}?rol=${rol}&id=${id}`;

        try {
            const response = await lastValueFrom(
                this.http.delete<AnswerQueryResponse>(url, { headers })
            );
            if (!response) { return { message: 'Sin respuesta del servidor', status: false, data: null }; }
            return response;
        } catch (error: any) {
            console.error('Error deleting role:', error);
            throw new Error(
                error?.error?.message || 'Ocurrió un error al eliminar el rol.'
            );
        }
    }

    async deleteRols(rolData: any): Promise<AnswerQueryResponse> {
        const headers = this.commonService.getHeaders();
        const rol = this.commonService.getRol();
        const url = `${this.api}/v1/rol/removeMultiply?rol=${rol}`;

        try {
            const response = await lastValueFrom(
                this.http.post<AnswerQueryResponse>(url, rolData, { headers })
            );
            if (!response) { return { message: 'Sin respuesta del servidor', status: false, data: null }; }
            return response;
        } catch (error: any) {
            console.error('Error deleting role:', error);
            throw new Error(
                error?.error?.message || 'Ocurrió un error al eliminar el rol.'
            );
        }
    }

    async createRol(data: Rol): Promise<AnswerQueryResponse> {
        const headers = this.commonService.getHeaders();
        const rol = this.commonService.getRol();
        const url = `${this.api}/v1/rol?rol=${rol}`;
        try {
            const response = await lastValueFrom(
                this.http.post<AnswerQueryResponse>(url, data, { headers })
            );
            if (!response) { return { message: 'Sin respuesta del servidor', status: false, data: null }; }
            return response;
        } catch (error: any) {
            console.error('Error deleting role:', error);
            throw new Error(
                error?.error?.message || 'Ocurrió un error al crear el rol.'
            );
        }
    }

    async updateRol(id: number, data: Rol): Promise<AnswerQueryResponse> {
        const headers = this.commonService.getHeaders();
        const rol = this.commonService.getRol();
        const url = `${this.api}/v1/rol/${id}?rol=${rol}`;

        try {
            const response = await lastValueFrom(
                this.http.patch<AnswerQueryResponse>(url, data, { headers })
            );
            if (!response) {
                return { message: 'Sin respuesta del servidor', status: false, data: null };
            }
            return response;
        } catch (error: any) {
            console.error('Error al actualizar el rol:', error);
            throw new Error(
                error?.error?.message || 'Ocurrió un error al actualizar el rol.'
            );
        }
    }


}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment'
import { CommonService } from 'src/app/layout/common/service/common.service'
import { AnswerQueryResponse, ConfigurationsCustody, ConfigurationsCustodyQuery } from 'src/app/layout/api/index.interface';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ConfigurationsService {

    constructor(
        private http: HttpClient,
        private readonly commonService: CommonService

    ) { }
    private readonly api = environment.apiUrl;

    getAdminConfigurations() {
        const headers = this.commonService.getHeaders();
        const rol = this.commonService.getRol();
        const url = `${this.api}/v1/admin-configuration?rol=${rol}`;
        return this.http.get<ConfigurationsCustodyQuery>(url, { headers })
            .toPromise()
            .then(response => response.data as ConfigurationsCustody[])
            .then(data => data);
    }

    async deleteAdminConfiguration(userData: ConfigurationsCustody): Promise<AnswerQueryResponse> {
        const headers = this.commonService.getHeaders();
        const rol = this.commonService.getRol();
        const id = userData.id;
        const url = `${this.api}/v1/admin-configuration/${id}?rol=${rol}&id=${id}`;

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

    async createAdminConfiguration(data: ConfigurationsCustody): Promise<AnswerQueryResponse> {
            const headers = this.commonService.getHeaders();
            const rol = this.commonService.getRol();
            const url = `${this.api}/v1/admin-configuration?rol=${rol}`;
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

        async updateAdminConfiguration(id: number, data: ConfigurationsCustody): Promise<AnswerQueryResponse> {
            const headers = this.commonService.getHeaders();
            const rol = this.commonService.getRol();
            const url = `${this.api}/v1/admin-configuration/${id}?rol=${rol}&id=${id}`;

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

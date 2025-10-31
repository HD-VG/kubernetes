import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { CommonService } from 'src/app/layout/common/service/common.service';
import { AnswerQueryResponse, AnswerQuery } from 'src/app/layout/api/index.interface';
import { lastValueFrom } from 'rxjs';
import { Water } from 'src/app/layout/api/agravios_dtos/water.interface';

@Injectable()
export class WaterService {

    constructor(
        private http: HttpClient,
        private readonly commonService: CommonService
    ) { }
    private readonly api = environment.apiUrl;

    getAll(pagination?: { page?: number, limit?: number }) {
        const headers = this.commonService.getHeaders();
        const rol = this.commonService.getRol();
        let url = `${this.api}/v1/water?rol=${rol}`;
        if (pagination?.page) url += `&page=${pagination.page}`;
        if (pagination?.limit) url += `&limit=${pagination.limit}`;
        return this.http.get<AnswerQuery<Water[]>>(url, { headers })
            .toPromise()
            .then(response => response.data); 
    }

    getAllData() {
        const headers = this.commonService.getHeaders();
        const rol = this.commonService.getRol();
        const url = `${this.api}/v1/water?rol=${rol}`;
        return this.http.get<AnswerQuery<Water[]>>(url, { headers })
            .toPromise()
            .then(response => response.data); 
    }

    getByUuid(uuid: string) {
        const headers = this.commonService.getHeaders();
        const rol = this.commonService.getRol();
        const url = `${this.api}/v1/water/${uuid}?rol=${rol}`;
        return this.http.get<AnswerQuery<Water>>(url, { headers })
            .toPromise()
            .then(response => response.data);
    }

    async create(data: { name: string, basicCoste: number, height: number, cohefficientDischarge: number  }): Promise<AnswerQueryResponse> {
        console.log("el body",data)
        const headers = this.commonService.getHeaders();
        const rol = this.commonService.getRol();
        const url = `${this.api}/v1/water?rol=${rol}`;
        try {
            const response = await lastValueFrom(
                this.http.post<AnswerQueryResponse>(url, data, { headers })
            );
            if (!response) { return { message: 'Sin respuesta del servidor', status: false, data: null }; }
            return response;
        } catch (error: any) {
            console.error('Error al crear configuration type machine:', error);
            throw new Error(error?.error?.message || 'Ocurrió un error al crear el tipo de daño.');
        }
    }

    async update(uuid: string, data: { name: string, basicCoste: number, height: number, cohefficientDischarge: number  }): Promise<AnswerQueryResponse> {
        console.log("el body update",data)
        const headers = this.commonService.getHeaders();
        const rol = this.commonService.getRol();
        const url = `${this.api}/v1/water/${uuid}?rol=${rol}`;
        try {
            const response = await lastValueFrom(
                this.http.patch<AnswerQueryResponse>(url, data, { headers })
            );
            if (!response) { return { message: 'Sin respuesta del servidor', status: false, data: null }; }
            return response;
        } catch (error: any) {
            console.error('Error al actualizar configuration type machine:', error);
            throw new Error(error?.error?.message || 'Ocurrió un error al actualizar el tipo de daño.');
        }
    }

    async delete(uuid: string): Promise<AnswerQueryResponse> {
        const headers = this.commonService.getHeaders();
        const rol = this.commonService.getRol();
        const url = `${this.api}/v1/water/${uuid}?rol=${rol}`;
        try {
            const response = await lastValueFrom(
                this.http.delete<AnswerQueryResponse>(url, { headers })
            );
            if (!response) { return { message: 'Sin respuesta del servidor', status: false, data: null }; }
            return response;
        } catch (error: any) {
            console.error('Error al eliminar configuration type machine:', error);
            throw new Error(error?.error?.message || 'Ocurrió un error al eliminar el tipo de daño.');
        }
    }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment'
import { CommonService } from 'src/app/layout/common/service/common.service'
import { CustodyQuery, AnswerQueryResponse, ChainOfCustody, Sampling, SamplingQuery, Transport, TransportQuery, UserQuery, User, ApplicantQuery, Applicant } from 'src/app/layout/api/index.interface';
import { lastValueFrom } from 'rxjs';
import { DataMaps, MapsReportQuery } from 'src/app/layout/api/maps.interface';
import { CustodyPrintReportQuery, DataClass } from 'src/app/layout/api/printChainOfCustody.interface';

@Injectable()
export class CustodyService {

    constructor(
        private http: HttpClient,
        private readonly commonService: CommonService

    ) { }
    private readonly api = environment.apiUrl;

    getCustody() {
        const headers = this.commonService.getHeaders();
        const rol = this.commonService.getRol();
        const url = `${this.api}/v1/chain-of-custody?rol=${rol}`;
        return this.http.get<CustodyQuery>(url, { headers })
            .toPromise()
            .then(response => response.data as ChainOfCustody[])
            .then(data => data);
    }
    async deleteCustody(custodyData: ChainOfCustody): Promise<AnswerQueryResponse> {
        const headers = this.commonService.getHeaders();
        const rol = this.commonService.getRol();
        const id = custodyData.id;
        const url = `${this.api}/v1/chain-of-custody/${id}?rol=${rol}&id=${id}`;

        try {
            const response = await lastValueFrom(
                this.http.delete<AnswerQueryResponse>(url, { headers })
            );
            if (!response) { return { message: 'Sin respuesta del servidor', status: false, data: null }; }
            return response;
        } catch (error: any) {
            console.error('Error deleting custody:', error);
            throw new Error(
                error?.error?.message || 'Ocurrió un error al eliminar el custodio.'
            );
        }
    }
    async deleteCustodies(custodyData: any): Promise<AnswerQueryResponse> {
        const headers = this.commonService.getHeaders();
        const rol = this.commonService.getRol();
        const url = `${this.api}/v1/chain-of-custody/removeMultiply?rol=${rol}`;

        try {
            const response = await lastValueFrom(
                this.http.post<AnswerQueryResponse>(url, custodyData, { headers })
            );
            if (!response) { return { message: 'Sin respuesta del servidor', status: false, data: null }; }
            return response;
        } catch (error: any) {
            console.error('Error deleting Custodies:', error);
            throw new Error(
                error?.error?.message || 'Ocurrió un error al eliminar el Custodio.'
            );
        }
    }
    async createCustody(data: ChainOfCustody): Promise<AnswerQueryResponse> {
        const headers = this.commonService.getHeaders();
        const rol = this.commonService.getRol();
        const url = `${this.api}/v1/chain-of-custody?rol=${rol}`;
        try {
            const response = await lastValueFrom(
                this.http.post<AnswerQueryResponse>(url, data, { headers })
            );
            if (!response) { return { message: 'Sin respuesta del servidor', status: false, data: null }; }
            return response;
        } catch (error: any) {
            console.error('Error deleting custodio:', error);
            throw new Error(
                error?.error?.message || 'Ocurrió un error al crear el custodio.'
            );
        }
    }
    async updateCustody(id: number, data: ChainOfCustody): Promise<AnswerQueryResponse> {
        const headers = this.commonService.getHeaders();
        const rol = this.commonService.getRol();
        const url = `${this.api}/v1/chain-of-custody/${id}?rol=${rol}&id=${id}`;

        try {
            const response = await lastValueFrom(
                this.http.patch<AnswerQueryResponse>(url, data, { headers })
            );
            if (!response) {
                return { message: 'Sin respuesta del servidor', status: false, data: null };
            }
            return response;
        } catch (error: any) {
            console.error('Error al actualizar el custodio:', error);
            throw new Error(
                error?.error?.message || 'Ocurrió un error al actualizar el custodio.'
            );
        }
    }
    getCustodyById(id: number) {
        const headers = this.commonService.getHeaders();
        const rol = this.commonService.getRol();
        const url = `${this.api}/v1/chain-of-custody/findById?rol=${rol}&id=${id}`;
        return this.http.get<CustodyQuery>(url, { headers })
            .toPromise()
            .then(response => response.data as ChainOfCustody[])
            .then(data => data);
    }
    getSampling(id: number) {
        const headers = this.commonService.getHeaders();
        const rol = this.commonService.getRol();
        const url = `${this.api}/v1/sampling/list?rol=${rol}&id=${id}`;
        return this.http.get<SamplingQuery>(url, { headers })
            .toPromise()
            .then(response => response.data as Sampling[])
            .then(data => data);
    }
    async createSampling(samplingData: Sampling): Promise<AnswerQueryResponse> {
        const headers = this.commonService.getHeaders();
        const rol = this.commonService.getRol();
        const url = `${this.api}/v1/sampling?rol=${rol}`;
        try {
            const response = await lastValueFrom(
                this.http.post<AnswerQueryResponse>(url, samplingData, { headers })
            );
            if (!response) { return { message: 'Sin respuesta del servidor', status: false, data: null }; }
            return response;
        } catch (error: any) {
            console.error('Error deleting muestreo:', error);
            throw new Error(
                error?.error?.message || 'Ocurrió un error al crear el muestreo.'
            );
        }
    }
    async updateSampling(id: number, data: Sampling): Promise<AnswerQueryResponse> {
        const headers = this.commonService.getHeaders();
        const rol = this.commonService.getRol();
        const url = `${this.api}/v1/sampling/${id}?rol=${rol}&id=${id}`;

        try {
            const response = await lastValueFrom(
                this.http.patch<AnswerQueryResponse>(url, data, { headers })
            );
            if (!response) {
                return { message: 'Sin respuesta del servidor', status: false, data: null };
            }
            return response;
        } catch (error: any) {
            console.error('Error al actualizar el muestreo:', error);
            throw new Error(
                error?.error?.message || 'Ocurrió un error al actualizar el muestreo.'
            );
        }
    }
    async updateSamplingLaboratory(id: number, data: Sampling): Promise<AnswerQueryResponse> {
        const headers = this.commonService.getHeaders();
        const rol = this.commonService.getRol();
        const url = `${this.api}/v1/sampling/laboratory/${id}?rol=${rol}&id=${id}`;
        console.log(`${this.api}/v1/sampling/laboratory/${id}?rol=${rol}&id=${id}`);
        try {
            const response = await lastValueFrom(
                this.http.patch<AnswerQueryResponse>(url, data, { headers })
            );
            if (!response) {
                return { message: 'Sin respuesta del servidor', status: false, data: null };
            }
            return response;
        } catch (error: any) {
            console.error('Error al actualizar el muestreo:', error);
            throw new Error(
                error?.error?.message || 'Ocurrió un error al actualizar el muestreo.'
            );
        }
    }
    async deleteSampling(samplingData: Sampling): Promise<AnswerQueryResponse> {
        const headers = this.commonService.getHeaders();
        const rol = this.commonService.getRol();
        const id = samplingData.id;
        const url = `${this.api}/v1/sampling/${id}?rol=${rol}&id=${id}`;

        try {
            const response = await lastValueFrom(
                this.http.delete<AnswerQueryResponse>(url, { headers })
            );
            if (!response) { return { message: 'Sin respuesta del servidor', status: false, data: null }; }
            return response;
        } catch (error: any) {
            console.error('Error deleting sampling:', error);
            throw new Error(
                error?.error?.message || 'Ocurrió un error al eliminar el muestreo.'
            );
        }
    }
    async deleteSamplings(samplingData: any): Promise<AnswerQueryResponse> {
        const headers = this.commonService.getHeaders();
        const rol = this.commonService.getRol();
        const url = `${this.api}/v1/sampling/removeMultiply?rol=${rol}`;

        try {
            const response = await lastValueFrom(
                this.http.post<AnswerQueryResponse>(url, samplingData, { headers })
            );
            if (!response) { return { message: 'Sin respuesta del servidor', status: false, data: null }; }
            return response;
        } catch (error: any) {
            console.error('Error deleting Samplings:', error);
            throw new Error(
                error?.error?.message || 'Ocurrió un error al eliminar el muestreo.'
            );
        }
    }
    getTransport(id: number) {
        const headers = this.commonService.getHeaders();
        const rol = this.commonService.getRol();
        const url = `${this.api}/v1/transport/list?rol=${rol}&id=${id}`;
        return this.http.get<TransportQuery>(url, { headers })
            .toPromise()
            .then(response => response.data as Transport[])
            .then(data => data);
    }
    async createTransport(transportData: Transport): Promise<AnswerQueryResponse> {
        const headers = this.commonService.getHeaders();
        const rol = this.commonService.getRol();
        const url = `${this.api}/v1/transport?rol=${rol}`;
        try {
            const response = await lastValueFrom(
                this.http.post<AnswerQueryResponse>(url, transportData, { headers })
            );
            if (!response) { return { message: 'Sin respuesta del servidor', status: false, data: null }; }
            return response;
        } catch (error: any) {
            console.error('Error deleting transport:', error);
            throw new Error(
                error?.error?.message || 'Ocurrió un error al crear el transport.'
            );
        }
    }
    async updateTransport(id: number, data: Transport): Promise<AnswerQueryResponse> {
        const headers = this.commonService.getHeaders();
        const rol = this.commonService.getRol();
        const url = `${this.api}/v1/transport/${id}?rol=${rol}&id=${id}`;

        try {
            const response = await lastValueFrom(
                this.http.patch<AnswerQueryResponse>(url, data, { headers })
            );
            if (!response) {
                return { message: 'Sin respuesta del servidor', status: false, data: null };
            }
            return response;
        } catch (error: any) {
            console.error('Error al actualizar el transport:', error);
            throw new Error(
                error?.error?.message || 'Ocurrió un error al actualizar el transport.'
            );
        }
    }
    async deleteTransport(transportData: Transport): Promise<AnswerQueryResponse> {
        const headers = this.commonService.getHeaders();
        const rol = this.commonService.getRol();
        const id = transportData.id;
        const url = `${this.api}/v1/transport/${id}?rol=${rol}&id=${id}`;

        try {
            const response = await lastValueFrom(
                this.http.delete<AnswerQueryResponse>(url, { headers })
            );
            if (!response) { return { message: 'Sin respuesta del servidor', status: false, data: null }; }
            return response;
        } catch (error: any) {
            console.error('Error deleting transport:', error);
            throw new Error(
                error?.error?.message || 'Ocurrió un error al eliminar el transporte.'
            );
        }
    }
    async deleteTransports(transportData: any): Promise<AnswerQueryResponse> {
        const headers = this.commonService.getHeaders();
        const rol = this.commonService.getRol();
        const url = `${this.api}/v1/transport/removeMultiply?rol=${rol}`;

        try {
            const response = await lastValueFrom(
                this.http.post<AnswerQueryResponse>(url, transportData, { headers })
            );
            if (!response) { return { message: 'Sin respuesta del servidor', status: false, data: null }; }
            return response;
        } catch (error: any) {
            console.error('Error deleting Transports:', error);
            throw new Error(
                error?.error?.message || 'Ocurrió un error al eliminar el transporte.'
            );
        }
    }
    async getUser(): Promise<User> {
        const headers = this.commonService.getHeaders();
        const rol = this.commonService.getRol();
        const url = `${this.api}/v1/user/getUser/info?rol=${rol}`;
        return this.http.get<UserQuery>(url, { headers })
            .toPromise()
            .then(response => response.data as User)
            .then(data => data);
    }
    async getMaps() {
        const headers = this.commonService.getHeaders();
        const rol = this.commonService.getRol();
        const url = `${this.api}/v1/chain-of-custody/getMaps/layout?rol=${rol}`;

        return this.http.get<MapsReportQuery>(url, { headers })
            .toPromise()
            .then(response => response.data)  // Usar directamente `data` como un array de `DataMaps`
            .then(data => {
                // Recorremos los elementos y aseguramos que 'coordinates' está presente
                return data.map((item) => ({
                    ...item,
                    samplings: item.samplings?.map(sampling => ({
                        ...sampling,
                        coordinates: {
                            lat: sampling.coordinates?.lat || '0',  // Aseguramos que las coordenadas son válidas
                            lng: sampling.coordinates?.lng || '0',
                        }
                    }))
                }));
            });
    }
    getSamplingById(id: number) {
        const headers = this.commonService.getHeaders();
        const rol = this.commonService.getRol();
        const url = `${this.api}/v1/sampling/findById?rol=${rol}&id=${id}`;
        return this.http.get<SamplingQuery>(url, { headers })
            .toPromise()
            .then(response => response.data as Sampling)
            .then(data => data);
    }
    getApplicant(id: number) {
        const headers = this.commonService.getHeaders();
        const rol = this.commonService.getRol();
        const url = `${this.api}/v1/applicant/list?rol=${rol}&id=${id}`;
        return this.http.get<ApplicantQuery>(url, { headers })
            .toPromise()
            .then(response => response.data as Applicant[])
            .then(data => data);
    }
    async createApplicant(applicantData: Applicant): Promise<AnswerQueryResponse> {
        const headers = this.commonService.getHeaders();
        const rol = this.commonService.getRol();
        const url = `${this.api}/v1/applicant?rol=${rol}`;
        try {
            const response = await lastValueFrom(
                this.http.post<AnswerQueryResponse>(url, applicantData, { headers })
            );
            if (!response) { return { message: 'Sin respuesta del servidor', status: false, data: null }; }
            return response;
        } catch (error: any) {
            console.error('Error deleting transport:', error);
            throw new Error(
                error?.error?.message || 'Ocurrió un error al crear el transport.'
            );
        }
    }
    async updateApplicant(id: number, data: Applicant): Promise<AnswerQueryResponse> {
        const headers = this.commonService.getHeaders();
        const rol = this.commonService.getRol();
        const url = `${this.api}/v1/applicant/${id}?rol=${rol}&id=${id}`;

        try {
            const response = await lastValueFrom(
                this.http.patch<AnswerQueryResponse>(url, data, { headers })
            );
            if (!response) {
                return { message: 'Sin respuesta del servidor', status: false, data: null };
            }
            return response;
        } catch (error: any) {
            console.error('Error al actualizar el transport:', error);
            throw new Error(
                error?.error?.message || 'Ocurrió un error al actualizar el transport.'
            );
        }
    }
    async deleteApplicant(applicantData: Applicant): Promise<AnswerQueryResponse> {
        const headers = this.commonService.getHeaders();
        const rol = this.commonService.getRol();
        const id = applicantData.id;
        const url = `${this.api}/v1/applicant/${id}?rol=${rol}&id=${id}`;

        try {
            const response = await lastValueFrom(
                this.http.delete<AnswerQueryResponse>(url, { headers })
            );
            if (!response) { return { message: 'Sin respuesta del servidor', status: false, data: null }; }
            return response;
        } catch (error: any) {
            console.error('Error deleting transport:', error);
            throw new Error(
                error?.error?.message || 'Ocurrió un error al eliminar el transporte.'
            );
        }
    }
    async deleteApplicants(applicant: any): Promise<AnswerQueryResponse> {
        const headers = this.commonService.getHeaders();
        const rol = this.commonService.getRol();
        const url = `${this.api}/v1/applicant/removeMultiply?rol=${rol}`;

        try {
            const response = await lastValueFrom(
                this.http.post<AnswerQueryResponse>(url, applicant, { headers })
            );
            if (!response) { return { message: 'Sin respuesta del servidor', status: false, data: null }; }
            return response;
        } catch (error: any) {
            console.error('Error deleting Transports:', error);
            throw new Error(
                error?.error?.message || 'Ocurrió un error al eliminar el transporte.'
            );
        }
    }
}

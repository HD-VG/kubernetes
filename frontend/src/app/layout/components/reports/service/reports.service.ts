import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment'
import { CommonService } from 'src/app/layout/common/service/common.service'
import { CustodyQuery, AnswerQueryResponse, ChainOfCustody, Sampling, SamplingQuery, Transport, TransportQuery, UserQuery, User } from 'src/app/layout/api/index.interface';
import { lastValueFrom, Observable } from 'rxjs';
import { DataMaps, MapsReportQuery } from 'src/app/layout/api/maps.interface';
import { CustodyPrintReportQuery, DataClass } from 'src/app/layout/api/printChainOfCustody.interface';

@Injectable()
export class ReportService {

    constructor(
        private http: HttpClient,
        private readonly commonService: CommonService

    ) { }
    private readonly api = environment.apiUrl;
    async getUser(): Promise<User> {
        const headers = this.commonService.getHeaders();
        const rol = this.commonService.getRol();
        const url = `${this.api}/v1/user/getUser/info?rol=${rol}`;
        return this.http.get<UserQuery>(url, { headers })
            .toPromise()
            .then(response => response.data as User)
            .then(data => data);
    }
    getReport(id: number) {
        const headers = this.commonService.getHeaders();
        const rol = this.commonService.getRol();
        const url = `${this.api}/v1/chain-of-custody/print-chain-of-custody?rol=${rol}&id=${id}`;
        return this.http.get<CustodyPrintReportQuery>(url, { headers })
            .toPromise()
            .then(response => response.data as DataClass)
            .then(data => data);
    }
    getPdf(subtitle: string, pageSize: string, orientation: string, id: string, user: string): Observable<Blob> {
        const headers = this.commonService.getHeaders();
        const rol = this.commonService.getRol();
        const url = `${this.api}/v1/chain-of-custody/print/generateReportPDF?rol=${rol}&id=${id}&subtitle=${subtitle}&pageSize=${pageSize}&orientation=${orientation}&user=${user}`;
        return this.http.get(url, { headers, responseType: 'blob' });
    }
}

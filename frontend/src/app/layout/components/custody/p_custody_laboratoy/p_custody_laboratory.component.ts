import { MessageService } from 'primeng/api';
import { CustodyService } from '../service/custody.service';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/layout/common/service/common.service';
import { ChainOfCustody, AnswerQueryResponse } from 'src/app/layout/api/index.interface'
import { Router } from '@angular/router';

@Component({
    selector: 'app-p-custody',
    templateUrl: './p_custody_laboratory.component.html',
    styleUrl: './p_custody_laboratory.component.scss',
    providers: [MessageService]
})
export class PCustodyLaboratoryComponent implements OnInit {
    chainOfCustodyDialog: boolean = false;
    deleteChainOfCustodyDialog: boolean = false;
    deleteChainOfCustodyssDialog: boolean = false;
    chainOfCustodys: ChainOfCustody[] = [];
    chainOfCustody: ChainOfCustody = {};
    selectedChainOfCustodys: ChainOfCustody[] = [];
    submitted: boolean = false;
    cols: any[] = [];
    statuses: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    canCreate: boolean = false;
    canEdit: boolean = false;
    canDelete: boolean = false;
    constructor(
        private custodyService: CustodyService,
        private messageService: MessageService,
        private commonService: CommonService,
        private router: Router
    ) { }
    ngOnInit() {
        this.getCustodies();
        this.updatePermissions();
        this.cols = [
            { field: 'code_custody', header: 'Codigo' },
            { field: 'laboratoryMB', header: 'MB' },
            { field: 'laboratoryFQ', header: 'FQ' },
            { field: 'code_thermohygrometer', header: 'Código Termohigrómetro' },
            { field: 'code_thermometer_m_m', header: 'Código Termometro Max/Min' },
            { field: 'code_thermometer', header: 'Código Termómetro' },
            { field: 'code_colorimeter', header: 'Código Colorimetro' },
            { field: 'initial_conservative', header: 'T°C° Inicial Conservador' },
            { field: 'created_at', header: 'Fecha de Creacion' },
        ];
    }

    getCustodies() {
        this.custodyService.getCustody().then(data => {
            this.chainOfCustodys = data
        });
    }

    openNew() {
        this.chainOfCustody = {};
        this.submitted = false;
        this.chainOfCustodyDialog = true;
    }

    // editCustody(chainOfCustody: ChainOfCustody) {
    //     this.chainOfCustody = { ...chainOfCustody };
    //     this.chainOfCustodyDialog = true;
    // }

    // async saveCustody() {
    //     this.submitted = true;

    //     // Validar que los campos requeridos no estén vacíos
    //     if (this.chainOfCustody.code_thermohygrometer?.trim() && this.chainOfCustody.code_thermometer_m_m?.trim() && this.chainOfCustody.code_thermometer?.trim() && this.chainOfCustody.code_colorimeter?.trim()) {

    //         if (this.chainOfCustody.id) {

    //             const payload = {
    //                 id: this.chainOfCustody.id,
    //                 code_custody: '',
    //                 laboratoryMB: this.chainOfCustody.laboratoryMB,
    //                 laboratoryFQ: this.chainOfCustody.laboratoryFQ,
    //                 code_thermohygrometer: this.chainOfCustody.code_thermohygrometer,
    //                 code_thermometer_m_m: this.chainOfCustody.code_thermometer_m_m,
    //                 code_thermometer: this.chainOfCustody.code_thermometer,
    //                 code_colorimeter: this.chainOfCustody.code_colorimeter,
    //                 initial_conservative: this.chainOfCustody.initial_conservative
    //             };

    //             // console.log('Payload de edición listo:', payload);
    //             try {
    //                 const response = await this.custodyService.updateCustody(this.chainOfCustody.id, payload);
    //                 if (response.status) {
    //                     // this.rols = this.rols.map(rol => rol.id === this.rol.id ? { ...rol, ...response.data, permisos: permisosFinales } : rol);
    //                     this.getCustodies();
    //                     this.updatePermissions();
    //                     this.messageService.add({ severity: 'success', summary: 'Realizado', detail: response.message, life: 3000 });
    //                 } else {
    //                     this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message, life: 3000 });
    //                 }
    //             } catch (error) {
    //                 // console.error('Error al crear el rol:', error);
    //                 this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear/modificar el Usuario.', life: 3000 });
    //             }
    //         } else {
    //             const payload = {
    //                 laboratoryMB: this.chainOfCustody.laboratoryMB ?? false,
    //                 laboratoryFQ: this.chainOfCustody.laboratoryFQ ?? false,
    //                 code_thermohygrometer: this.chainOfCustody.code_thermohygrometer || '',
    //                 code_thermometer_m_m: this.chainOfCustody.code_thermometer_m_m || '',
    //                 code_thermometer: this.chainOfCustody.code_thermometer || '',
    //                 code_colorimeter: this.chainOfCustody.code_colorimeter || '',
    //                 initial_conservative: this.chainOfCustody.initial_conservative || ''
    //             };

    //             // console.log('Payload de creación listo:', payload);
    //             try {
    //                 const res = await this.custodyService.createCustody(payload);
    //                 if (res.status) {
    //                     this.getCustodies();
    //                     this.updatePermissions();
    //                     this.messageService.add({ severity: 'success', summary: 'Realizado', detail: res.message, life: 3000 });
    //                 } else {
    //                     this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message, life: 3000 });
    //                 }
    //             } catch (error) {
    //                 // console.error('Error al crear el rol:', error);
    //                 this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el rol.', life: 3000 });
    //             }
    //         }
    //         this.chainOfCustodys = [...this.chainOfCustodys];
    //         this.chainOfCustodyDialog = false;
    //         this.chainOfCustody = {};
    //     } else {
    //         this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Campos vacíos!', life: 3000 });
    //     }
    // }

    updatePermissions() {
        this.canCreate = this.commonService.hasPermission('create');
        this.canEdit = this.commonService.hasPermission('update');
        this.canDelete = this.commonService.hasPermission('delete');
    }

    onGlobalFilter(table: any, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    hideDialog() {
        this.chainOfCustodyDialog = false;
        this.submitted = false;
    }

    deleteSelectedCustodies() {
        this.deleteChainOfCustodyssDialog = true;
    }

    deleteCustody(chainOfCustody: ChainOfCustody) {
        this.deleteChainOfCustodyDialog = true;
        this.chainOfCustody = { ...chainOfCustody };
    }
    goToSamplingLaboratory(id: number) {
        this.router.navigate(['/dashboard/custodies/sampling-custodies-laboratory', id]);
    }
}

import { MessageService } from 'primeng/api';
import { CustodyService } from '../service/custody.service';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/layout/common/service/common.service';
import { Sampling, AnswerQueryResponse } from 'src/app/layout/api/index.interface'
import { ActivatedRoute, Router } from '@angular/router';
import { limitPrecision, parseDateFromFormattedString } from '../../../common/functions/index'

@Component({
    selector: 'app-p-sampling-laboratory',
    templateUrl: './p-sampling-laboratory.component.html',
    styleUrl: './p-sampling-laboratory.component.scss',
    providers: [MessageService]
})
export class PSamplingLaboratoryComponent implements OnInit {
    custody_id: number = 0;
    samplingDialog: boolean = false;
    deleteSamplingDialog: boolean = false;
    deleteSamplingssDialog: boolean = false;
    samplings: Sampling[] = [];
    sampling: Sampling = {};
    selectedSamplings: Sampling[] = [];
    submitted: boolean = false;
    cols: any[] = [];
    statuses: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    canCreate: boolean = false;
    canEdit: boolean = false;
    canDelete: boolean = false;
    samplingTechniques: { label: string, value: string }[] = [
        { label: 'SIMPLE', value: 'SIMPLE' },
        { label: 'COMPUESTO', value: 'COMPUESTO' }
    ];
    samplingConditions: { label: string, value: string }[] = [
        { label: 'ESTERILIDAD', value: 'ESTERILIDAD' },
        { label: 'CANTIDAD', value: 'CANTIDAD' },
        { label: 'C DE FRIO', value: 'C DE FRIO' },
        { label: 'ENVASE COMPLETO', value: 'ENVASE COMPLETO' },
    ];
    samplingAceptation: { label: string, value: string }[] = [
        { label: 'ACEPTADO', value: 'A' },
        { label: 'RECHAZADO', value: 'R' }
    ];

    constructor(
        private custodyService: CustodyService,
        private messageService: MessageService,
        private commonService: CommonService,
        private route: ActivatedRoute,
        private router: Router,
    ) { }
    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        this.custody_id = +id
        // console.log("Este ID: ", id);
        this.getSampling(+id)
        this.updatePermissions();
        this.cols = [
            { field: 'sample_code', header: 'Codigo' },
            { field: 'description', header: 'Descripcion' },
            { field: 'source_of_supply', header: 'Fuente de Abastecimiento' },
            { field: 'quantity', header: 'Cantidad' },
            { field: 'sample_location', header: 'Sitio de Muestreo' },
            { field: 'sample_point', header: 'Punto de Muestreo' },
            { field: 'coordinatesX', header: 'Coordenadas' },
            { field: 'sampling_technique', header: 'Técnica de Muestreo' },
            { field: 'sampling_technique_m', header: 'T°C Muestra' },
            { field: 'ci_res_a', header: 'CI Res A' },
            { field: 'ci_res_b', header: 'CI Res B' },
            { field: 'cond_amb_t', header: 'Cond. Amb. T°C' },
            { field: 'cond_amb_h', header: 'Cond. Amb. H%' },
            { field: 'sampling_day', header: 'Fecha' },
            { field: 'sampling_time', header: 'Hora' },
            { field: 'sampling_conditions', header: 'Condiciones' },
            { field: 'sampling_aceptation', header: 'Aceptacion' },
            { field: 'created_at', header: 'Fecha de Creacion' },
        ];
    }
    getSampling(id: number) {
        this.custodyService.getSampling(id).then(data => {
            // console.log(data);
            this.samplings = data
        })
    }
    goCustodies() {
        this.router.navigate(['/dashboard/custodies/custody-laboratory']);
    }
    openNew() {
        this.sampling = {
            sampling_day: new Date(),
            sampling_time: new Date(),
        };
        this.submitted = false;
        this.samplingDialog = true;
    }

    editSampling(sampling: Sampling) {
        const sampling_day = parseDateFromFormattedString(sampling.sampling_day.toString())
        this.sampling = {
            ...sampling,
            sampling_day: sampling_day ? sampling_day : sampling.sampling_day
        };
        this.samplingDialog = true;
    }

    async saveSampling() {
        this.submitted = true;

        // Validar que los campos requeridos no estén vacíos
        if (this.sampling.sample_code?.trim() && this.sampling.description?.trim() && this.sampling.source_of_supply?.trim() && this.sampling.sample_location?.trim()) {

            const payload = {
                id: this.sampling.id,
                sampling_conditions: this.sampling.sampling_conditions,
                sampling_aceptation: this.sampling.sampling_aceptation,
            };
            console.log('Payload de edición listo:', payload);
            try {
                const response = await this.custodyService.updateSamplingLaboratory(this.sampling.id, payload);
                if (response.status) {
                    this.getSampling(this.custody_id);
                    this.messageService.add({ severity: 'success', summary: 'Realizado', detail: response.message, life: 3000 });
                } else {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message, life: 3000 });
                }
            } catch (error) {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear/modificar el Usuario.', life: 3000 });
            }
            this.samplings = [...this.samplings];
            this.samplingDialog = false;
            this.sampling = {};
        } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Campos vacíos!', life: 3000 });
        }
    }

    updatePermissions() {
        this.canCreate = this.commonService.hasPermission('create');
        this.canEdit = this.commonService.hasPermission('update');
        this.canDelete = this.commonService.hasPermission('delete');
    }

    onGlobalFilter(table: any, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    hideDialog() {
        this.samplingDialog = false;
        this.submitted = false;
    }

    deleteSelectedCustodies() {
        this.deleteSamplingDialog = true;
    }

    deleteSampling(sampling: Sampling) {
        this.deleteSamplingDialog = true;
        this.sampling = { ...sampling };
    }

    async confirmDeleteSelected() {
        this.deleteSamplingDialog = false;
        try {
            const selectedIds = this.selectedSamplings.map(user => user.id);
            const requestPayload = { id: selectedIds };
            const response: AnswerQueryResponse = await this.custodyService.deleteSamplings(requestPayload);
            if (response.status) {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Realizado',
                    detail: response.message,
                    life: 3000,
                });
                this.getSampling(this.custody_id);
            } else {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message, life: 3000 });
            }
        } catch (error) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el rol.', life: 3000 });
        }

        this.selectedSamplings = [];
    }

    async confirmDelete() {
        this.deleteSamplingDialog = false;
        try {
            const response: AnswerQueryResponse = await this.custodyService.deleteSampling(this.sampling);
            if (response.status) {
                this.samplings = this.samplings.filter(val => val.id !== this.sampling.id);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: response.message || 'Rol eliminado correctamente.',
                    life: 3000
                });
            } else {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: response.message || 'No se pudo eliminar el rol.',
                    life: 3000
                });
            }
        } catch (error: any) {
            // console.error('Error en confirmDelete:', error);
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Ocurrió un error inesperado al eliminar el rol.',
                life: 3000
            });
        } finally {
            this.sampling = {};
        }
    }
}

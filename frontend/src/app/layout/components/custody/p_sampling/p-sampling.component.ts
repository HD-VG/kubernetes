import { MessageService } from 'primeng/api';
import { CustodyService } from './../service/custody.service';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/layout/common/service/common.service';
import { Sampling, AnswerQueryResponse } from 'src/app/layout/api/index.interface'
import { ActivatedRoute, Router } from '@angular/router';
import { limitPrecision, parseDateFromFormattedString } from '../../../common/functions/index'

@Component({
    selector: 'app-p-sampling',
    templateUrl: './p-sampling.component.html',
    styleUrl: './p-sampling.component.scss',
    providers: [MessageService]
})
export class PSamplingComponent implements OnInit {
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
    isCustomSite: boolean = false;
    samplingTechniques: { label: string, value: string }[] = [
        { label: 'SIMPLE', value: 'SIMPLE' },
        { label: 'COMPUESTO', value: 'COMPUESTO' }
    ];
    chainOfCustody = {
        samplePoint: '',
        description: '',
        coordinatesX: '',
        coordinatesY: '',
        sourceOfSupply: ''
    };

    waterData = {
        AGUA_TRATADA: [
            { sitio: 'Zona El Rollo 1', punto: 'TAP 1', descripcion: 'Agua Tratada 01 T', x: '-65,28506', y: '-19,02270', fuente: 'Ravelo' },
            { sitio: 'Zona El Rollo 2', punto: 'TAP 2', descripcion: 'Agua Tratada 01 T', x: '-65,28514', y: '-19,02298', fuente: 'Ravelo' },
            { sitio: 'Zona El Rollo 3', punto: 'TAP 3', descripcion: 'Agua Tratada 01 T', x: '-65,28504', y: '-19,02244', fuente: 'Ravelo' },
            { sitio: 'Zona Junín', punto: 'Tanque de Distribución', descripcion: 'Red de distribución 02 T', x: '-65,25488', y: '-19,03897', fuente: 'Ravelo' },
            { sitio: 'Zona Poconas', punto: 'Tanque de Distribución', descripcion: 'Red de distribución 03 T', x: '-65,25006', y: '-19,04677', fuente: 'Ravelo' },
            { sitio: 'Cajamarca', punto: 'Tanque de Distribución', descripcion: 'Red de distribución 04 T', x: '-65,32023', y: '-19,01247', fuente: 'Cajarmaca' },
            { sitio: 'Zona Munaypata', punto: 'Tanque de Distribución', descripcion: 'Red de distribución 05 T', x: '-65,26363', y: '-19,01373', fuente: 'Cajarmaca' },
            { sitio: 'Zona Villa Margarita', punto: 'Tanque de Distribución', descripcion: 'Red de distribución 06 T', x: '-65,24939', y: '-19,01360', fuente: 'Ravelo' },
            { sitio: 'Zona R-5', punto: 'Tanque de Distribución', descripcion: 'Red de distribución 07 T', x: '-65,25375', y: '-19,01721', fuente: 'Ravelo' },
            { sitio: 'Zona R-6', punto: 'Tanque de Distribución', descripcion: 'Red de distribución 08 T', x: '-65,24766', y: '-19,02515', fuente: 'Ravelo' },
            { sitio: 'Zona Mineros', punto: 'Tanque de Distribución', descripcion: 'Red de distribución 09 T', x: '-65,29051', y: '-19,03259', fuente: 'Ravelo' },
            { sitio: 'Zona Molle Mocko', punto: 'Tanque de Distribución', descripcion: 'Red de distribución 10 T', x: '-65,28831', y: '-19,06062', fuente: 'Cajamarca' },
            { sitio: 'Zona ENDE', punto: 'Tanque de Distribución', descripcion: 'Red de distribución 11 T', x: '-65,28374', y: '-19,05626', fuente: 'Ravelo' },
            { sitio: 'Zona Churuquella', punto: 'Tanque de Distribución', descripcion: 'Red de distribución 12 T', x: '-65,24745', y: '-19,06380', fuente: 'Ravelo' },
            { sitio: 'Zona Sica Sica', punto: 'Tanque de Distribución', descripcion: 'Red de distribución 13 T', x: '-65,24141', y: '-19,05470', fuente: 'Ravelo' },
            { sitio: 'Zona Libertadores', punto: 'Tanque de Distribución', descripcion: 'Red de distribución 14 T', x: '-65,24020', y: '-19,04163', fuente: 'Ravelo' },
            { sitio: 'Zona los Ángeles ', punto: 'TAP 4', descripcion: 'Red de distribución 15 T', x: '-65,303341', y: '-19,02397', fuente: 'Ravelo' },
        ],
        AGUA_CRUDA: [
            { sitio: 'Aducción Ravelo', punto: 'Predecantador', descripcion: 'Agua Cruda', x: '-65,28603', y: '-18,022524', fuente: 'Ravelo' },
            { sitio: 'Aducción Cajamarca', punto: 'Guerraloma', descripcion: 'Agua Cruda', x: '-65,343912', y: '-18,989329', fuente: 'Cajamarca' },
            { sitio: 'Aducción Potolo', punto: 'Río Potolo', descripcion: 'Agua Cruda', x: '-65,449593', y: '-18,995735', fuente: 'Potolo' }
        ],
        AGUA_RESIDUAL: [
            { sitio: 'Canal de Salida PTAR', punto: '20 m del canal de Salida PTAR', descripcion: 'Agua Residual Tratada (SP)', x: '-65,26644', y: '-19,10500', fuente: 'PTAR' },
            { sitio: 'Río Quirpinchaca Cuenco receptor', punto: '50 m aguas arriba PTAR', descripcion: 'Agua Residual (CRI)', x: '-65,267931', y: '-19,10359', fuente: 'PTAR' },
            { sitio: 'Río Quirpinchaca Cuenco receptor', punto: '500 m aguas abajo PTAR', descripcion: 'Agua Residual (CRII)', x: '-65,2672', y: '-19,10837', fuente: 'PTAR' },
            { sitio: 'Canal de entrada', punto: 'Canal de entrada', descripcion: 'Agua Residual (EP)', x: '-65,267364', y: '-19,09848', fuente: 'PTAR' }
        ],
        LODO: []
    };
    waterTypes: any[] = [];
    selectedWaterType: string = '';
    sites: any[] = [];
    points: any[] = [];
    filteredSites: any[] = [];
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
            { field: 'created_at', header: 'Fecha de Creacion' },
        ];
        this.waterTypes = Object.keys(this.waterData).map(key => ({ label: key, value: key }));
    }
    onWaterTypeChange() {
        this.isCustomSite = this.selectedWaterType === 'LODO';
        console.log(this.isCustomSite ? "LODO" : "NO LODO");
        // this.sites = this.waterData[this.selectedWaterType].map(item => ({ label: item.sitio, value: item.sitio }));
        // this.sampling.sample_location = this.sites[0]?.value;
        // this.updateSamplingData();
        if (!this.isCustomSite) {
            this.sites = this.waterData[this.selectedWaterType].map(item => ({
                label: item.sitio,
                value: item.sitio
            }));
            this.sampling.sample_location = this.sites[0]?.value;
            this.updateSamplingData();
        } else {
            // Limpia los campos para LODO si es necesario
            this.sampling.sample_location = '';
            this.sampling.sample_point = '';
            this.sampling.description = '';
            this.sampling.coordinatesX = '';
            this.sampling.coordinatesY = '';
            this.sampling.source_of_supply = '';
        }
    }

    onSiteChange() {
        this.updateSamplingData();
    }

    updateSamplingData() {
        const selectedData = this.waterData[this.selectedWaterType]
            .find(item => item.sitio === this.sampling.sample_location);
        if (selectedData) {
            this.sampling.sample_point = selectedData.punto;
            this.sampling.description = selectedData.descripcion;
            this.sampling.coordinatesX = selectedData.x;
            this.sampling.coordinatesY = selectedData.y;
            this.sampling.source_of_supply = selectedData.fuente;
        }
    }
    getSampling(id: number) {
        this.custodyService.getSampling(id).then(data => {
            // console.log(data);
            this.samplings = data
        })
    }
    goCustodies() {
        this.router.navigate(['/dashboard/custodies/custody']);
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
        const emptyFields: string[] = [];
        // Validar que los campos requeridos no estén vacíos
        // if (!this.selectedWaterType?.trim()) {
        //     emptyFields.push('Tipo de Agua'); // Cambiado a Tipo de agua
        //   }
        if (!this.sampling.description?.trim()) {
            emptyFields.push('Descripción');
        }
        if (!this.sampling.source_of_supply?.trim()) {
            emptyFields.push('Fuente');
        }
        // if (!this.sampling.sample_location?.trim()) {
        //     emptyFields.push('Sitio');
        // }
        if (!this.sampling.sample_point?.trim()) {
            emptyFields.push('Punto');
        }
        if (!this.sampling.coordinatesX?.trim()) {
            emptyFields.push('Coordenada X');
        }
        if (!this.sampling.coordinatesY?.trim()) {
            emptyFields.push('Coordenada Y');
        }
        if (!this.sampling.sampling_technique?.trim()) {
            emptyFields.push('Técnica de Muestreo');
        }
        if (!this.sampling.sampling_technique_m?.trim()) {
            emptyFields.push('T°C Muestreo');
        }
        if (!this.sampling.sampling_day) {
            emptyFields.push('Fecha');
        }
        if (!this.sampling.sampling_time) {
            emptyFields.push('Hora');
        }
        if (this.sampling.quantity === undefined || this.sampling.quantity === null) {
            emptyFields.push('Cantidad');
        }
        if (this.sampling.ci_res_a === undefined || this.sampling.ci_res_a === null) {
            emptyFields.push('CI Res. (mg/L) A');
        }
        if (this.sampling.ci_res_b === undefined || this.sampling.ci_res_b === null) {
            emptyFields.push('CI Res. (mg/L) B');
        }
        if (this.sampling.cond_amb_t === undefined || this.sampling.cond_amb_t === null) {
            emptyFields.push('Cond. Amb. T°C');
        }
        if (this.sampling.cond_amb_h === undefined || this.sampling.cond_amb_h === null) {
            emptyFields.push('Cond. Amb. H%');
        }
        if (this.sampling.description?.trim() && this.sampling.source_of_supply?.trim()) {

            if (this.sampling.id) {

                const payload = {
                    id: this.sampling.id,
                    quantity: this.sampling.quantity,
                    chainOfCustody: this.custody_id,
                    sample_code: this.selectedWaterType,
                    description: this.sampling.description,
                    source_of_supply: this.sampling.source_of_supply,
                    sample_location: this.sampling.sample_location !== "" ? this.sampling.sample_location : this.sampling.sample_location_t,
                    sample_point: this.sampling.sample_point,
                    coordinatesX: this.sampling.coordinatesX,
                    coordinatesY: this.sampling.coordinatesY,
                    sampling_technique: this.sampling.sampling_technique,
                    sampling_technique_m: this.sampling.sampling_technique_m,
                    ci_res_a: limitPrecision(this.sampling.ci_res_a, 5, 2) || 0,
                    ci_res_b: limitPrecision(this.sampling.ci_res_b, 5, 2) || 0,
                    cond_amb_t: limitPrecision(this.sampling.cond_amb_t, 5, 2) || 0,
                    cond_amb_h: limitPrecision(this.sampling.cond_amb_h, 5, 2) || 0,
                    sampling_day: this.sampling.sampling_day,
                    sampling_time: this.sampling.sampling_time,
                };
                // console.log('Payload de edición listo:', payload);
                try {
                    const response = await this.custodyService.updateSampling(this.sampling.id, payload);
                    if (response.status) {
                        // this.rols = this.rols.map(rol => rol.id === this.rol.id ? { ...rol, ...response.data, permisos: permisosFinales } : rol);
                        this.getSampling(this.custody_id);
                        this.messageService.add({ severity: 'success', summary: 'Realizado', detail: response.message, life: 3000 });
                    } else {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message, life: 3000 });
                    }
                } catch (error) {
                    // console.error('Error al crear el rol:', error);
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear/modificar el Usuario.', life: 3000 });
                }
            } else {
                const payload = {
                    quantity: this.sampling.quantity || 0,
                    chainOfCustody: this.custody_id || 0,
                    type_code: this.selectedWaterType || '',
                    sample_code: this.selectedWaterType || '',
                    description: this.sampling.description || '',
                    source_of_supply: this.sampling.source_of_supply || '',
                    sample_location: this.sampling.sample_location !== "" ? this.sampling.sample_location : this.sampling.sample_location_t,
                    sample_point: this.sampling.sample_point || '',
                    coordinatesX: this.sampling.coordinatesX || '',
                    coordinatesY: this.sampling.coordinatesY || '',
                    sampling_technique: this.sampling.sampling_technique || '',
                    sampling_technique_m: this.sampling.sampling_technique_m || '',
                    ci_res_a: limitPrecision(this.sampling.ci_res_a, 5, 2) || 0,
                    ci_res_b: limitPrecision(this.sampling.ci_res_b, 5, 2) || 0,
                    cond_amb_t: limitPrecision(this.sampling.cond_amb_t, 5, 2) || 0,
                    cond_amb_h: limitPrecision(this.sampling.cond_amb_h, 5, 2) || 0,
                    sampling_day: this.sampling.sampling_day || '',
                    sampling_time: this.sampling.sampling_time || '',
                };
                // console.log(JSON.stringify(payload));
                // console.log('Payload de creación listo:', payload);
                try {
                    const res = await this.custodyService.createSampling(payload);
                    if (res.status) {
                        this.getSampling(this.custody_id);
                        this.messageService.add({ severity: 'success', summary: 'Realizado', detail: res.message, life: 3000 });
                    } else {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message, life: 3000 });
                    }
                } catch (error) {
                    // console.error('Error al crear el rol:', error);
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el rol.', life: 3000 });
                }
            }
            this.samplings = [...this.samplings];
            this.samplingDialog = false;
            this.sampling = {};
        } else {
            // this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Campos vacíos!', life: 3000 });
            const errorMessage = 'Los siguientes campos son requeridos: ' + emptyFields.join(', ');
            this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
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
                // console.log(selectedIds);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Realizado',
                    detail: response.message,
                    life: 3000,
                });
                this.getSampling(this.custody_id);
                // this.rols = this.rols.filter((rol) => !this.selectedRols.includes(rol));
            } else {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message, life: 3000 });
            }
        } catch (error) {
            // console.error('Error al crear el rol:', error);
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

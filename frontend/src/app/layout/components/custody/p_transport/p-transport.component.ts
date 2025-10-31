import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CustodyService } from './../service/custody.service';
import { CommonService } from 'src/app/layout/common/service/common.service';
import { Transport, AnswerQueryResponse } from 'src/app/layout/api/index.interface'
import { ActivatedRoute, Router } from '@angular/router';
import { parseDateFromFormattedString } from 'src/app/layout/common/functions/index'

@Component({
    selector: 'app-p-transport',
    templateUrl: './p-transport.component.html',
    styleUrl: './p-transport.component.scss',
    providers: [MessageService]
})
export class PTransportComponent implements OnInit {
    custody_id: number = 0;
    user_name: string = '';
    transport_lenght: number = 0
    transportDialog: boolean = false;
    deleteTransportDialog: boolean = false;
    deleteTransportsDialog: boolean = false;
    transports: Transport[] = [];
    transport: Transport = {};
    selectedTransports: Transport[] = [];
    submitted: boolean = false;
    cols: any[] = [];
    statuses: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    canCreate: boolean = false;
    canEdit: boolean = false;
    canDelete: boolean = false;
    isCreateDisabled: boolean = false;
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
        this.getTransport(+id)
        this.updatePermissions();
        this.cols = [
            { field: 'responsable', header: 'Responsable' },
            { field: 'distance_traveled', header: 'Tramo Recorrido' },
            { field: 'conservative_arrival_stretch', header: '°T de Llegada Conservador' },
            { field: 'maximum_stretch', header: '°T Max' },
            { field: 'init_date', header: 'Inicio Transporte Fecha' },
            { field: 'init_time', header: 'Inicio Transporte Hora' },
            { field: 'end_date', header: 'Llegada Laboratorio Fecha' },
            { field: 'end_time', header: 'Llegada Laboratorio Hora' },
            { field: 'created_at', header: 'Fecha de Creacion' },
        ];
    }
    getTransport(id: number) {
        this.custodyService.getTransport(id).then(data => {
            // console.log(data);
            this.transports = data
            this.transport_lenght = data.length
            console.log("tamaño array ",this.transport_lenght);
            this.isCreateDisabled = this.transports.length > 0;

        })
    }
    getUser() {
        this.custodyService.getUser().then(data => {
            this.user_name = data.name
            this.transport.responsable = data.name
        })
        console.log(this.user_name);

    }
    goCustodies() {
        this.router.navigate(['/dashboard/custodies/custody']);
    }
    updatePermissions() {
        this.canCreate = this.commonService.hasPermission('create');
        this.canEdit = this.commonService.hasPermission('update');
        this.canDelete = this.commonService.hasPermission('delete');
    }
    openNew() {
        this.getUser();
        this.transport = {};
        this.submitted = false;
        this.transportDialog = true;
    }

    editTransport(transport: Transport) {
        console.log("Para editar", transport);
        const init_date = parseDateFromFormattedString(transport.init_date.toString());
        const end_date = parseDateFromFormattedString(transport.end_date.toString());
        this.transport = {
            ...transport,
            init_date: init_date ? init_date : transport.init_date,
            end_date: end_date ? end_date : transport.end_date,
        };
        this.transportDialog = true;
    }

    async saveTransport() {
        this.submitted = true;

        // Validar que los campos requeridos no estén vacíos
        if (this.transport.responsable?.trim() && this.transport.distance_traveled?.trim() && this.transport.conservative_arrival_stretch?.trim() && this.transport.maximum_stretch?.trim()) {

            if (this.transport.id) {

                const payload = {
                    id: this.transport.id,
                    chainOfCustody: this.custody_id,
                    responsable: this.transport.responsable,
                    distance_traveled: this.transport.distance_traveled,
                    conservative_arrival_stretch: this.transport.conservative_arrival_stretch,
                    maximum_stretch: this.transport.maximum_stretch,
                    init_date: this.transport.init_date,
                    end_date: this.transport.end_date,
                    init_time: this.transport.init_time,
                    end_time: this.transport.end_time
                };

                console.log('Payload de edición listo:', payload);
                try {
                    const response = await this.custodyService.updateTransport(this.transport.id, payload);
                    if (response.status) {
                        // this.rols = this.rols.map(rol => rol.id === this.rol.id ? { ...rol, ...response.data, permisos: permisosFinales } : rol);
                        this.getTransport(this.custody_id);
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
                    chainOfCustody: this.custody_id || 0,
                    responsable: this.transport.responsable || '',
                    distance_traveled: this.transport.distance_traveled || '',
                    conservative_arrival_stretch: this.transport.conservative_arrival_stretch || '',
                    maximum_stretch: this.transport.maximum_stretch || '',
                    init_date: this.transport.init_date || new Date,
                    end_date: this.transport.end_date || new Date,
                    init_time: this.transport.init_time || '',
                    end_time: this.transport.end_time || '',
                };
                console.log(JSON.stringify(payload));

                console.log('Payload de creación listo:', payload);
                try {
                    const res = await this.custodyService.createTransport(payload);
                    if (res.status) {
                        this.getTransport(this.custody_id);
                        this.messageService.add({ severity: 'success', summary: 'Realizado', detail: res.message, life: 3000 });
                    } else {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message, life: 3000 });
                    }
                } catch (error) {
                    // console.error('Error al crear el rol:', error);
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el rol.', life: 3000 });
                }
            }
            this.transports = [...this.transports];
            this.transportDialog = false;
            this.transport = {};
        } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Campos vacíos!', life: 3000 });
        }
    }
    onGlobalFilter(table: any, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    hideDialog() {
        this.transportDialog = false;
        this.submitted = false;
    }

    deleteSelectedTransports() {
        this.deleteTransportDialog = true;
    }

    deleteTransport(transport: Transport) {
        this.deleteTransportDialog = true;
        this.transport = { ...transport };
    }

    async confirmDeleteSelected() {
        this.deleteTransportDialog = false;
        try {
            const selectedIds = this.selectedTransports.map(user => user.id);
            const requestPayload = { id: selectedIds };
            const response: AnswerQueryResponse = await this.custodyService.deleteTransports(requestPayload);
            if (response.status) {
                // console.log(selectedIds);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Realizado',
                    detail: response.message,
                    life: 3000,
                });
                this.getTransport(this.custody_id);
                // this.rols = this.rols.filter((rol) => !this.selectedRols.includes(rol));
            } else {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message, life: 3000 });
            }
        } catch (error) {
            // console.error('Error al crear el rol:', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el rol.', life: 3000 });
        }

        this.selectedTransports = [];
    }

    async confirmDelete() {
        this.deleteTransportDialog = false;
        try {
            const response: AnswerQueryResponse = await this.custodyService.deleteTransport(this.transport);
            if (response.status) {
                this.isCreateDisabled = true;
                this.transports = this.transports.filter(val => val.id !== this.transport.id);
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
            this.transport = {};
        }
    }
}

import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CustodyService } from './../service/custody.service';
import { CommonService } from 'src/app/layout/common/service/common.service';
import { Applicant, AnswerQueryResponse } from 'src/app/layout/api/index.interface'
import { ActivatedRoute, Router } from '@angular/router';
import { parseDateFromFormattedString } from 'src/app/layout/common/functions/index'

@Component({
    selector: 'app-p-applicant',
    templateUrl: './p-applicant.component.html',
    styleUrl: './p-applicant.component.scss',
    providers: [MessageService]
})
export class PApplicantComponent implements OnInit {
    custody_id: number = 0;
    user_name: string = '';
    applicant_lenght: number = 0
    applicantDialog: boolean = false;
    deleteApplicantDialog: boolean = false;
    deleteApplicantsDialog: boolean = false;
    applicants: Applicant[] = [];
    applicant: Applicant = {};
    selectedApplicants: Applicant[] = [];
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
        this.getApplicant(+id)
        this.updatePermissions();
        this.cols = [
            { field: 'entity_name', header: 'Nombre Entidad' },
            { field: 'location', header: 'Direccion' },
            { field: 'reference_person', header: 'Persona de Referencia' },
            { field: 'phone', header: 'Telefono' },
            { field: 'created_at', header: 'Fecha de Creacion' },
        ];
    }
    getApplicant(id: number) {
        this.custodyService.getApplicant(id).then(data => {
            // console.log(data);
            this.applicants = data
            this.applicant_lenght = data.length
            console.log("tamaño array ",this.applicant_lenght);
            this.isCreateDisabled = this.applicants.length > 0;

        })
    }
    getUser() {
        this.custodyService.getUser().then(data => {
            this.user_name = data.name
            // this.applicant.entity_name = data.name
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
        this.applicant = {
            entity_name: "Gerencia Técnica - ELAPAS",
            location: "Av. Jaime Mendoza No 866",
            reference_person: "Ing. Enzo Porcel",
            phone: "64-62833"
        };
        this.submitted = false;
        this.applicantDialog = true;
    }

    editApplicant(applicant: Applicant) {
        console.log("Para editar", applicant);
        this.applicant = applicant
        this.applicantDialog = true;
    }

    async saveApplicant() {
        this.submitted = true;

        // Validar que los campos requeridos no estén vacíos
        if (this.applicant.entity_name?.trim() && this.applicant.location?.trim() && this.applicant.reference_person?.trim() && this.applicant.phone?.trim()) {

            if (this.applicant.id) {

                const payload = {
                    id: this.applicant.id,
                    chainOfCustody: this.custody_id,
                    entity_name: this.applicant.entity_name,
                    location: this.applicant.location,
                    reference_person: this.applicant.reference_person,
                    phone: this.applicant.phone
                };

                console.log('Payload de edición listo:', payload);
                try {
                    const response = await this.custodyService.updateApplicant(this.applicant.id, payload);
                    if (response.status) {
                        // this.rols = this.rols.map(rol => rol.id === this.rol.id ? { ...rol, ...response.data, permisos: permisosFinales } : rol);
                        this.getApplicant(this.custody_id);
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
                    entity_name: this.applicant.entity_name || '',
                    location: this.applicant.location || '',
                    reference_person: this.applicant.reference_person || '',
                    phone: this.applicant.phone || ''
                };
                try {
                    const res = await this.custodyService.createApplicant(payload);
                    if (res.status) {
                        this.getApplicant(this.custody_id);
                        this.messageService.add({ severity: 'success', summary: 'Realizado', detail: res.message, life: 3000 });
                    } else {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message, life: 3000 });
                    }
                } catch (error) {
                    // console.error('Error al crear el rol:', error);
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el rol.', life: 3000 });
                }
            }
            this.applicants = [...this.applicants];
            this.applicantDialog = false;
            this.applicant = {};
        } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Campos vacíos!', life: 3000 });
        }
    }
    onGlobalFilter(table: any, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    hideDialog() {
        this.applicantDialog = false;
        this.submitted = false;
    }

    deleteSelectedApplicants() {
        this.deleteApplicantDialog = true;
    }

    deleteApplicant(applicant: Applicant) {
        this.deleteApplicantDialog = true;
        this.applicant = { ...applicant };
    }

    async confirmDeleteSelected() {
        this.deleteApplicantDialog = false;
        try {
            const selectedIds = this.selectedApplicants.map(user => user.id);
            const requestPayload = { id: selectedIds };
            const response: AnswerQueryResponse = await this.custodyService.deleteApplicants(requestPayload);
            if (response.status) {
                // console.log(selectedIds);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Realizado',
                    detail: response.message,
                    life: 3000,
                });
                this.getApplicant(this.custody_id);
                // this.rols = this.rols.filter((rol) => !this.selectedRols.includes(rol));
            } else {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message, life: 3000 });
            }
        } catch (error) {
            // console.error('Error al crear el rol:', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el rol.', life: 3000 });
        }

        this.selectedApplicants = [];
    }

    async confirmDelete() {
        this.deleteApplicantDialog = false;
        try {
            const response: AnswerQueryResponse = await this.custodyService.deleteApplicant(this.applicant);
            if (response.status) {
                this.isCreateDisabled = true;
                this.applicants = this.applicants.filter(val => val.id !== this.applicant.id);
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
            this.applicant = {};
        }
    }
}

import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ConfigurationTypeWorkService} from '../service/a-confTypeWork.service';
import { CommonService } from 'src/app/layout/common/service/common.service';
import { AnswerQueryResponse } from 'src/app/layout/api/index.interface';
import { ConfigurationTypeWork } from 'src/app/layout/api/agravios_dtos/configurationTypeWork.interface';
import { Router } from '@angular/router';

@Component({
    selector: 'app-configuration-type-Work',
    templateUrl: '../view/a-confTypeWork.component.html',
    styleUrls: ['../view/a-confTypeWork.component.scss'],
    providers: [MessageService]
})
export class ConfigurationTypeWorkComponent implements OnInit {
    typeWorkDialog: boolean = false;
    deleteTypeWorkDialog: boolean = false;
    typeWorks: ConfigurationTypeWork[] = [];
    typeWork: ConfigurationTypeWork = { name: '' };
    submitted: boolean = false;
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    canCreate: boolean = false;
    canEdit: boolean = false;
    canDelete: boolean = false;

    constructor(
        private configurationTypeWorkService: ConfigurationTypeWorkService,
        private messageService: MessageService,
        private commonService: CommonService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.getTypeWorks();
        this.updatePermissions();
        this.cols = [
            { field: 'name', header: 'Nombre' },
        ];
    }

    getTypeWorks() {
        this.configurationTypeWorkService.getAll().then(data => {
            this.typeWorks = data;
        });
    }

    openNew() {
        this.typeWork = { name: '' };
        this.submitted = false;
        this.typeWorkDialog = true;
    }

    editTypeWork(typeWork: ConfigurationTypeWork) {
        this.typeWork = { ...typeWork }; 
        this.typeWorkDialog = true;
    }

    async saveTypeWork() {
        this.submitted = true;
        const emptyFields: string[] = [];
        if (!this.typeWork.name?.trim()) {
            emptyFields.push('Nombre');
        }
        if (emptyFields.length > 0) {
            const errorMessage = 'Los siguientes campos son requeridos: ' + emptyFields.join(', ');
            this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
            return;
        }

        const payload = { name: this.typeWork.name };

        if (this.typeWork.uuid) {//udpate revisa el uuid
            try {
                const response = await this.configurationTypeWorkService.update(this.typeWork.uuid, payload);
                if (response.status) {
                    this.getTypeWorks();
                    this.messageService.add({ severity: 'success', summary: 'Realizado', detail: response.message, life: 3000 });
                } else {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message, life: 3000 });
                }
            } catch (error) {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el tipo de Trabajo.', life: 3000 });
            }
        } else {
            // Create
            try {
                const response = await this.configurationTypeWorkService.create(payload);
                if (response.status) {
                    this.getTypeWorks();
                    this.messageService.add({ severity: 'success', summary: 'Realizado', detail: response.message, life: 3000 });
                } else {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message, life: 3000 });
                }
            } catch (error) {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el tipo de Trabajo.', life: 3000 });
            }
        }
        this.typeWorkDialog = false;
        this.typeWork = { name: '' };
    }

    deleteTypeWork(typeWork: ConfigurationTypeWork) {
        this.deleteTypeWorkDialog = true;
        this.typeWork = { ...typeWork };
    }

    async confirmDelete() {
        this.deleteTypeWorkDialog = false;
        try {
            const response: AnswerQueryResponse = await this.configurationTypeWorkService.delete(this.typeWork.uuid!);
            if (response.status) {
                this.typeWorks = this.typeWorks.filter(val => val.uuid !== this.typeWork.uuid);
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: response.message, life: 3000 });
            } else {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message, life: 3000 });
            }
        } catch (error: any) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al eliminar el tipo de Trabajo.', life: 3000 });
        } finally {
            this.typeWork = { name: '' };
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
}
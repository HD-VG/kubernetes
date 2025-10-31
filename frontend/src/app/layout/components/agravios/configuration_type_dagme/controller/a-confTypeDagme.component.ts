import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ConfigurationTypeDagmeService} from '../service/a-confTypeDagme.service';
import { CommonService } from 'src/app/layout/common/service/common.service';
import { AnswerQueryResponse } from 'src/app/layout/api/index.interface';
import { ConfigurationTypeDagme } from 'src/app/layout/api/agravios_dtos/configurationTypeDagme.interface';
import { Router } from '@angular/router';

@Component({
    selector: 'app-configuration-type-dagme',
    templateUrl: '../view/a-confTypeDagme.component.html',
    styleUrls: ['../view/a-confTypeDagme.component.scss'],
    providers: [MessageService]
})
export class ConfigurationTypeDagmeComponent implements OnInit {
    typeDagmeDialog: boolean = false;
    deleteTypeDagmeDialog: boolean = false;
    typeDagmes: ConfigurationTypeDagme[] = [];
    typeDagme: ConfigurationTypeDagme = { name: '' };
    submitted: boolean = false;
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    canCreate: boolean = false;
    canEdit: boolean = false;
    canDelete: boolean = false;

    constructor(
        private configurationTypeDagmeService: ConfigurationTypeDagmeService,
        private messageService: MessageService,
        private commonService: CommonService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.getTypeDagmes();
        this.updatePermissions();
        this.cols = [
            { field: 'name', header: 'Nombre' },
            { field: 'status', header: 'Estado' },
        ];
    }

    getTypeDagmes() {
        this.configurationTypeDagmeService.getAll().then(data => {
            this.typeDagmes = data;
        });
    }

    openNew() {
        this.typeDagme = { name: '' };
        this.submitted = false;
        this.typeDagmeDialog = true;
    }

    editTypeDagme(typeDagme: ConfigurationTypeDagme) {
        this.typeDagme = { ...typeDagme }; 
        this.typeDagmeDialog = true;
    }

    async saveTypeDagme() {
        this.submitted = true;
        const emptyFields: string[] = [];
        if (!this.typeDagme.name?.trim()) {
            emptyFields.push('Nombre');
        }
        if (emptyFields.length > 0) {
            const errorMessage = 'Los siguientes campos son requeridos: ' + emptyFields.join(', ');
            this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
            return;
        }

        const payload = { name: this.typeDagme.name };

        if (this.typeDagme.uuid) {//udpate revisa el uuid
            try {
                const response = await this.configurationTypeDagmeService.update(this.typeDagme.uuid, payload);
                if (response.status) {
                    this.getTypeDagmes();
                    this.messageService.add({ severity: 'success', summary: 'Realizado', detail: response.message, life: 3000 });
                } else {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message, life: 3000 });
                }
            } catch (error) {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el tipo de daño.', life: 3000 });
            }
        } else {
            // Create
            try {
                const response = await this.configurationTypeDagmeService.create(payload);
                if (response.status) {
                    this.getTypeDagmes();
                    this.messageService.add({ severity: 'success', summary: 'Realizado', detail: response.message, life: 3000 });
                } else {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message, life: 3000 });
                }
            } catch (error) {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el tipo de daño.', life: 3000 });
            }
        }
        this.typeDagmeDialog = false;
        this.typeDagme = { name: '' };
    }

    deleteTypeDagme(typeDagme: ConfigurationTypeDagme) {
        this.deleteTypeDagmeDialog = true;
        this.typeDagme = { ...typeDagme };
    }

    async confirmDelete() {
        this.deleteTypeDagmeDialog = false;
        try {
            const response: AnswerQueryResponse = await this.configurationTypeDagmeService.delete(this.typeDagme.uuid!);
            if (response.status) {
                this.typeDagmes = this.typeDagmes.filter(val => val.uuid !== this.typeDagme.uuid);
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: response.message, life: 3000 });
            } else {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message, life: 3000 });
            }
        } catch (error: any) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al eliminar el tipo de daño.', life: 3000 });
        } finally {
            this.typeDagme = { name: '' };
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
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ConfigurationUtilService} from '../service/a-confUtil.service';
import { CommonService } from 'src/app/layout/common/service/common.service';
import { AnswerQueryResponse } from 'src/app/layout/api/index.interface';
import { ConfigurationUtil } from 'src/app/layout/api/agravios_dtos/configurationUtil.interface';
import { Router } from '@angular/router';

@Component({
    selector: 'app-configuration-type-Machine',
    templateUrl: '../view/a-confUtil.component.html',
    styleUrls: ['../view/a-confUtil.component.scss'],
    providers: [MessageService]
})
export class ConfigurationUtilComponent implements OnInit {
    UtilDialog: boolean = false;
    deleteUtilDialog: boolean = false;
    Utils: ConfigurationUtil[] = [];
    Util: ConfigurationUtil = { name: '',basicCosteHour: 0 };
    submitted: boolean = false;
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    canCreate: boolean = false;
    canEdit: boolean = false;
    canDelete: boolean = false;

    constructor(
        private configurationUtilService: ConfigurationUtilService,
        private messageService: MessageService,
        private commonService: CommonService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.getUtils();
        this.updatePermissions();
        this.cols = [
            { field: 'name', header: 'Nombre' },
            { field: 'basicCosteHour', header: 'Costo Basico por Hora' },
        ];
    }

    getUtils() {
        this.configurationUtilService.getAll().then(data => {
            this.Utils = data;
        });
    }

    openNew() {
        this.Util = { name: '', basicCosteHour: 0 };
        this.submitted = false;
        this.UtilDialog = true;
    }

    editUtil(Util: ConfigurationUtil) {
        this.Util = { ...Util }; 
        this.UtilDialog = true;
    }

    async saveUtil() {
        this.submitted = true;
        const emptyFields: string[] = [];
        if (!this.Util.name?.trim()) {
            emptyFields.push('Nombre');
        }
        if (!this.Util.basicCosteHour) {
            emptyFields.push('Costo Basico');
        }
        if (emptyFields.length > 0) {
            const errorMessage = 'Los siguientes campos son requeridos: ' + emptyFields.join(', ');
            this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
            return;
        }

        const payload = {
            name: this.Util.name,
            basicCosteHour: typeof this.Util.basicCosteHour === 'number'
                ? this.Util.basicCosteHour
                : Number(this.Util.basicCosteHour)
        };
        console.log("el payload",payload)
        if (this.Util.uuid) {//udpate revisa el uuid
            try {
                const response = await this.configurationUtilService.update(this.Util.uuid, payload);
                if (response.status) {
                    this.getUtils();
                    this.messageService.add({ severity: 'success', summary: 'Realizado', detail: response.message, life: 3000 });
                } else {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message, life: 3000 });
                }
            } catch (error) {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el tipo de Maquina.', life: 3000 });
            }
        } else {
            // Create
            try {
                const response = await this.configurationUtilService.create(payload);
                if (response.status) {
                    this.getUtils();
                    this.messageService.add({ severity: 'success', summary: 'Realizado', detail: response.message, life: 3000 });
                } else {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message, life: 3000 });
                }
            } catch (error) {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el tipo de Maquina.', life: 3000 });
            }
        }
        this.UtilDialog = false;
        this.Util = { name: '', basicCosteHour: 0 };
    }

    deleteUtil(Util: ConfigurationUtil) {
        this.deleteUtilDialog = true;
        this.Util = { ...Util };
    }

    async confirmDelete() {
        this.deleteUtilDialog = false;
        try {
            const response: AnswerQueryResponse = await this.configurationUtilService.delete(this.Util.uuid!);
            if (response.status) {
                this.Utils = this.Utils.filter(val => val.uuid !== this.Util.uuid);
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: response.message, life: 3000 });
            } else {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message, life: 3000 });
            }
        } catch (error: any) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al eliminar el tipo de Maquina.', life: 3000 });
        } finally {
            this.Util = { name: '' };
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
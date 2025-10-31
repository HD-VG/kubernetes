import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ConfigurationTypeMachineService} from '../service/a-confTypeMachine.service';
import { CommonService } from 'src/app/layout/common/service/common.service';
import { AnswerQueryResponse } from 'src/app/layout/api/index.interface';
import { ConfigurationTypeMachine } from 'src/app/layout/api/agravios_dtos/configurationTypeMachine.interface';
import { Router } from '@angular/router';

@Component({
    selector: 'app-configuration-type-Machine',
    templateUrl: '../view/a-confTypeMachine.component.html',
    styleUrls: ['../view/a-confTypeMachine.component.scss'],
    providers: [MessageService]
})
export class ConfigurationTypeMachineComponent implements OnInit {
    typeMachineDialog: boolean = false;
    deleteTypeMachineDialog: boolean = false;
    typeMachines: ConfigurationTypeMachine[] = [];
    typeMachine: ConfigurationTypeMachine = { name: '',basicCoste: 0 };
    submitted: boolean = false;
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    canCreate: boolean = false;
    canEdit: boolean = false;
    canDelete: boolean = false;

    constructor(
        private configurationTypeMachineService: ConfigurationTypeMachineService,
        private messageService: MessageService,
        private commonService: CommonService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.getTypeMachines();
        this.updatePermissions();
        this.cols = [
            { field: 'name', header: 'Nombre' },
            { field: 'basicCoste', header: 'Costo Basico' },
            { field: 'basicCoste', header: 'Costo Basico por Hora' },
            { field: 'basicCoste', header: 'Costo Basico por Año' },
        ];
    }

    getTypeMachines() {
        this.configurationTypeMachineService.getAll().then(data => {
            this.typeMachines = data;
        });
    }

    openNew() {
        this.typeMachine = { name: '', basicCoste: 0 };
        this.submitted = false;
        this.typeMachineDialog = true;
    }

    editTypeMachine(typeMachine: ConfigurationTypeMachine) {
        this.typeMachine = { ...typeMachine }; 
        this.typeMachineDialog = true;
    }

    async saveTypeMachine() {
        this.submitted = true;
        const emptyFields: string[] = [];
        if (!this.typeMachine.name?.trim()) {
            emptyFields.push('Nombre');
        }
        if (!this.typeMachine.basicCoste) {
            emptyFields.push('Costo Basico');
        }
        if (emptyFields.length > 0) {
            const errorMessage = 'Los siguientes campos son requeridos: ' + emptyFields.join(', ');
            this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
            return;
        }

        const payload = {
            name: this.typeMachine.name,
            basicCoste: typeof this.typeMachine.basicCoste === 'number'
                ? this.typeMachine.basicCoste
                : Number(this.typeMachine.basicCoste)
        };
        console.log("el payload",payload)
        if (this.typeMachine.uuid) {//udpate revisa el uuid
            try {
                const response = await this.configurationTypeMachineService.update(this.typeMachine.uuid, payload);
                if (response.status) {
                    this.getTypeMachines();
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
                const response = await this.configurationTypeMachineService.create(payload);
                if (response.status) {
                    this.getTypeMachines();
                    this.messageService.add({ severity: 'success', summary: 'Realizado', detail: response.message, life: 3000 });
                } else {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message, life: 3000 });
                }
            } catch (error) {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el tipo de Maquina.', life: 3000 });
            }
        }
        this.typeMachineDialog = false;
        this.typeMachine = { name: '', basicCoste: 0 };
    }

    deleteTypeMachine(typeMachine: ConfigurationTypeMachine) {
        this.deleteTypeMachineDialog = true;
        this.typeMachine = { ...typeMachine };
    }

    async confirmDelete() {
        this.deleteTypeMachineDialog = false;
        try {
            const response: AnswerQueryResponse = await this.configurationTypeMachineService.delete(this.typeMachine.uuid!);
            if (response.status) {
                this.typeMachines = this.typeMachines.filter(val => val.uuid !== this.typeMachine.uuid);
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: response.message, life: 3000 });
            } else {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message, life: 3000 });
            }
        } catch (error: any) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al eliminar el tipo de Maquina.', life: 3000 });
        } finally {
            this.typeMachine = { name: '' };
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
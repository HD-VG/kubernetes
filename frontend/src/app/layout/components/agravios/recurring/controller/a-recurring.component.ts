import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { RecurringService} from '../service/a-recurring.service';
import { CommonService } from 'src/app/layout/common/service/common.service';
import { AnswerQueryResponse } from 'src/app/layout/api/index.interface';
import { Recurring } from 'src/app/layout/api/agravios_dtos/recurring.interface';
import { Router } from '@angular/router';

@Component({
    selector: 'app-recurring',
    templateUrl: '../view/a-recurring.component.html',
    styleUrls: ['../view/a-recurring.component.scss'],
    providers: [MessageService]
})
export class RecurringComponent implements OnInit {
    recurringDialog: boolean = false;
    deleterecurringDialog: boolean = false;
    recurrings: Recurring[] = [];
    recurring: Recurring = { name: '',basicCoste: 0 };
    submitted: boolean = false;
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    canCreate: boolean = false;
    canEdit: boolean = false;
    canDelete: boolean = false;

    constructor(
        private RecurringService: RecurringService,
        private messageService: MessageService,
        private commonService: CommonService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.getRecurrings();
        this.updatePermissions();
        this.cols = [
            { field: 'name', header: 'Nombre' },
            { field: 'basicCoste', header: 'Costo Basico' },
        ];
    }

    getRecurrings() {
        this.RecurringService.getAll().then(data => {
            this.recurrings = data;
        });
    }

    openNew() {
        this.recurring = { name: '', basicCoste: 0 };
        this.submitted = false;
        this.recurringDialog = true;
    }

    editRecurring(recurring: Recurring) {
        this.recurring = { ...recurring }; 
        this.recurringDialog = true;
    }

    async saveRecurring() {
        this.submitted = true;
        const emptyFields: string[] = [];
        if (!this.recurring.name?.trim()) {
            emptyFields.push('Nombre');
        }
        if (!this.recurring.basicCoste) {
            emptyFields.push('Costo Basico');
        }
        if (emptyFields.length > 0) {
            const errorMessage = 'Los siguientes campos son requeridos: ' + emptyFields.join(', ');
            this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
            return;
        }

        const payload = {
            name: this.recurring.name,
            basicCoste: typeof this.recurring.basicCoste === 'number'
                ? this.recurring.basicCoste
                : Number(this.recurring.basicCoste)
        };
        console.log("el payload",payload)
        if (this.recurring.uuid) {//udpate revisa el uuid
            try {
                const response = await this.RecurringService.update(this.recurring.uuid, payload);
                if (response.status) {
                    this.getRecurrings();
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
                const response = await this.RecurringService.create(payload);
                if (response.status) {
                    this.getRecurrings();
                    this.messageService.add({ severity: 'success', summary: 'Realizado', detail: response.message, life: 3000 });
                } else {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message, life: 3000 });
                }
            } catch (error) {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el tipo de Maquina.', life: 3000 });
            }
        }
        this.recurringDialog = false;
        this.recurring = { name: '', basicCoste: 0 };
    }

    deleteRecurring(recurring: Recurring) {
        this.deleterecurringDialog = true;
        this.recurring = { ...recurring };
    }

    async confirmDelete() {
        this.deleterecurringDialog = false;
        try {
            const response: AnswerQueryResponse = await this.RecurringService.delete(this.recurring.uuid!);
            if (response.status) {
                this.recurrings = this.recurrings.filter(val => val.uuid !== this.recurring.uuid);
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: response.message, life: 3000 });
            } else {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message, life: 3000 });
            }
        } catch (error: any) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al eliminar el tipo de Maquina.', life: 3000 });
        } finally {
            this.recurring = { name: '' };
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
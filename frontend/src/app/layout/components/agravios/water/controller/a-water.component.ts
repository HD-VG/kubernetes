import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { WaterService} from '../service/a-water.service';
import { CommonService } from 'src/app/layout/common/service/common.service';
import { AnswerQueryResponse } from 'src/app/layout/api/index.interface';
import { Water } from 'src/app/layout/api/agravios_dtos/water.interface';
import { Router } from '@angular/router';

@Component({
    selector: 'app-water',
    templateUrl: '../view/a-water.component.html',
    styleUrls: ['../view/a-water.component.scss'],
    providers: [MessageService]
})
export class WaterComponent implements OnInit {
    waterDialog: boolean = false;
    deleteWaterDialog: boolean = false;
    waters: Water[] = [];
    water: Water = { name: '',basicCoste: 0, height: 0, cohefficientDischarge: 0 };
    submitted: boolean = false;
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    canCreate: boolean = false;
    canEdit: boolean = false;
    canDelete: boolean = false;

    constructor(
        private WaterService: WaterService,
        private messageService: MessageService,
        private commonService: CommonService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.getWaters();
        this.updatePermissions();
        this.cols = [
            { field: 'name', header: 'Nombre' },
            { field: 'basicCoste', header: 'Costo Basico' },
            { field: 'height', header: 'Altura' },
            { field: 'cohefficientDischarge', header: 'Descarga coherente' },
        ];
    }

    getWaters() {
        this.WaterService.getAll().then(data => {
            this.waters = data;
        });
    }

    openNew() {
        this.water = { name: '', basicCoste: 0 };
        this.submitted = false;
        this.waterDialog = true;
    }

    editWater(water: Water) {
        this.water = { ...water }; 
        this.waterDialog = true;
    }

    async saveWater() {
        this.submitted = true;
        const emptyFields: string[] = [];
        if (!this.water.name?.trim()) {
            emptyFields.push('Nombre');
        }
        if (!this.water.basicCoste) {
            emptyFields.push('Costo Basico');
        }
        if (!this.water.height) {
            emptyFields.push('Altura');
        }
        if (!this.water.cohefficientDischarge) {
            emptyFields.push('Descarga coherente');
        }
        if (emptyFields.length > 0) {
            const errorMessage = 'Los siguientes campos son requeridos: ' + emptyFields.join(', ');
            this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
            return;
        }

        const payload = {
            name: this.water.name,
            basicCoste: typeof this.water.basicCoste === 'number'
                ? this.water.basicCoste
                : Number(this.water.basicCoste),
            height: typeof this.water.height === 'number'
                ? this.water.height
                : Number(this.water.height),
            cohefficientDischarge: typeof this.water.cohefficientDischarge === 'number'
                ? this.water.cohefficientDischarge
                : Number(this.water.cohefficientDischarge)
        };
        console.log("el payload",payload)
        if (this.water.uuid) {//udpate revisa el uuid
            try {
                const response = await this.WaterService.update(this.water.uuid, payload);
                if (response.status) {
                    this.getWaters();
                    this.messageService.add({ severity: 'success', summary: 'Realizado', detail: response.message, life: 3000 });
                } else {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message, life: 3000 });
                }
            } catch (error) {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el tipo de Agua.', life: 3000 });
            }
        } else {
            // Create
            try {
                const response = await this.WaterService.create(payload);
                if (response.status) {
                    this.getWaters();
                    this.messageService.add({ severity: 'success', summary: 'Realizado', detail: response.message, life: 3000 });
                } else {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message, life: 3000 });
                }
            } catch (error) {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el tipo de Agua.', life: 3000 });
            }
        }
        this.waterDialog = false;
        this.water = { name: '', basicCoste: 0, height: 0, cohefficientDischarge: 0 };
    }

    deleteWater(water: Water) {
        this.deleteWaterDialog = true;
        this.water = { ...water };
    }

    async confirmDelete() {
        this.deleteWaterDialog = false;
        try {
            const response: AnswerQueryResponse = await this.WaterService.delete(this.water.uuid!);
            if (response.status) {
                this.waters = this.waters.filter(val => val.uuid !== this.water.uuid);
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: response.message, life: 3000 });
            } else {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message, life: 3000 });
            }
        } catch (error: any) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al eliminar el tipo de Agua.', life: 3000 });
        } finally {
            this.water = { name: '' };
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
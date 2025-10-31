import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ConfigurationCarService} from '../service/a-confCar.service';
import { CommonService } from 'src/app/layout/common/service/common.service';
import { AnswerQueryResponse } from 'src/app/layout/api/index.interface';
import { ConfigurationCar, CreateUpdateCar, CarByApi } from 'src/app/layout/api/agravios_dtos/configurationCar.interface';
import { Router } from '@angular/router';

@Component({
    selector: 'app-configuration-car',
    templateUrl: '../view/a-confCar.component.html',
    styleUrls: ['../view/a-confCar.component.scss'],
    providers: [MessageService]
})
export class ConfigurationCarComponent implements OnInit {
    carDialog: boolean = false;
    deleteCarDialog: boolean = false;
    Cars: ConfigurationCar[] = [];
    Car: ConfigurationCar = { idVehiculo: '' ,licensePlate: '',make:'',model : '', basicCoste :0,estado:0,time:''};
    createUpdateCar: CreateUpdateCar;
    CarByApi: CarByApi;
    submitted: boolean = false;
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    canCreate: boolean = false;
    canEdit: boolean = false;
    canDelete: boolean = false;

    constructor(
        private configurationcarService: ConfigurationCarService,
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
        this.configurationcarService.getAll().then(data => {
            this.Cars = data;
        });
    }

    openNew() {
        this.Car = { idVehiculo: '' ,licensePlate: '',make:'',model : '', basicCoste :0,estado:0,time:''};
        this.submitted = false;
        this.carDialog = true;
    }

    editTypeDagme(Car: ConfigurationCar) {
        this.Car = { ...Car }; 
        this.carDialog = true;
    }

    async saveTypeDagme() {
        this.submitted = true;
        const emptyFields: string[] = [];
        if (!this.createUpdateCar.register_id?.trim()) {
            emptyFields.push('Registro');
        }
        if (!this.createUpdateCar.car?.trim()) {
            emptyFields.push('Vehiculo');
        }
        if (!this.createUpdateCar.time?.trim()) {
            emptyFields.push('Tiempo');
        }
        if (emptyFields.length > 0) {
            const errorMessage = 'Los siguientes campos son requeridos: ' + emptyFields.join(', ');
            this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
            return;
        }

        const payload = { register_id: this.createUpdateCar.register_id, car: this.createUpdateCar.car,time: this.createUpdateCar.time };

        if (this.Car.uuid) {//udpate revisa el uuid
            try {
                const response = await this.configurationcarService.update(this.Car.uuid, payload);
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
                const response = await this.configurationcarService.create(payload);
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
        this.carDialog = false;
        this.Car = { name: '' };
    }

    deleteTypeDagme(Car: ConfigurationCar) {
        this.deleteCarDialog = true;
        this.Car = { ...Car };
    }

    async confirmDelete() {
        this.deleteCarDialog = false;
        try {
            const response: AnswerQueryResponse = await this.configurationcarService.delete(this.Car.uuid!);
            if (response.status) {
                this.Cars = this.Cars.filter(val => val.uuid !== this.Car.uuid);
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: response.message, life: 3000 });
            } else {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message, life: 3000 });
            }
        } catch (error: any) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al eliminar el tipo de daño.', life: 3000 });
        } finally {
            this.Car = { name: '' };
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
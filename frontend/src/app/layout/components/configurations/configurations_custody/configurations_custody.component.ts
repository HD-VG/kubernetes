import { MessageService } from 'primeng/api';
import { ConfigurationsService } from '../service/configurations.service';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/layout/common/service/common.service';
import { AnswerQueryResponse, ConfigurationsCustody } from 'src/app/layout/api/index.interface'

@Component({
    selector: 'app-configurations-custody',
    templateUrl: './configurations_custody.component.html',
    styleUrl: './configurations_custody.component.scss'
})
export class ConfigurationsCustodyComponent implements OnInit {
    configurationCustodyDialog: boolean = false;
    deleteConfigurationCustodieDialog: boolean = false;
    deleteConfigurationCustodiesDialog: boolean = false;
    configurationCustodies: ConfigurationsCustody[] = [];
    configurationCustody: ConfigurationsCustody = {};
    selectedConfigurationCustodies: ConfigurationsCustody[] = [];
    submitted: boolean = false;
    cols: any[] = [];
    statuses: any[] = [];
    rowsPerPageOptions = [5, 10, 20];

    permissions = [
        { id: 1, name: 'read' },
        { id: 2, name: 'create' },
        { id: 3, name: 'update' },
        { id: 4, name: 'delete' },
    ];
    permisosSeleccionados: { [id: number]: boolean } = {};
    permissionsUSer: string[] = [];
    canCreate: boolean = false;
    canEdit: boolean = false;
    canDelete: boolean = false;
    constructor(
        private configurationService: ConfigurationsService,
        private messageService: MessageService,
        private commonService: CommonService,
    ) { }
    ngOnInit() {
        this.getConfigurations();
        this.cols = [
            { field: 'code_configuration', header: 'Codigo' },
            { field: 'version_configuration', header: 'Version' },
            { field: 'message_configuration', header: 'Mensaje' },
            { field: 'status_configuration', header: 'Estado' },
            { field: 'created_at', header: 'Fecha de Creacion' },
        ];
    }

    getConfigurations() {
        this.configurationService.getAdminConfigurations().then(data => {
            this.configurationCustodies = data;
        });
        this.updatePermissions();
    }

    getPermissionNameById(id: number): string {
        const permiso = this.permissions.find((permiso) => permiso.id === id);
        return permiso ? permiso.name : 'Unknown';
    }

    updatePermissions() {
        this.canCreate = this.commonService.hasPermission('create');
        this.canEdit = this.commonService.hasPermission('update');
        this.canDelete = this.commonService.hasPermission('delete');
    }

    togglePermiso(permiso: { id: number }) {
        this.permisosSeleccionados[permiso.id] = !this.permisosSeleccionados[permiso.id];
        this.updatePermissions();
    }

    onGlobalFilter(table: any, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openNew() {
        this.configurationCustody = {};
        this.submitted = false;
        this.configurationCustodyDialog = true;
    }

    hideDialog() {
        this.configurationCustodyDialog = false;
        this.submitted = false;
    }

    deleteSelectedConfigurationCustodies() {
        this.deleteConfigurationCustodiesDialog = true;
    }

    deleteConfigurationCustody(configuration: ConfigurationsCustody) {
        this.deleteConfigurationCustodieDialog = true;
        this.configurationCustody = { ...configuration };
    }

    async confirmDelete() {
        this.deleteConfigurationCustodieDialog = false;
        try {
            const response: AnswerQueryResponse = await this.configurationService.deleteAdminConfiguration(this.configurationCustody);
            if (response.status) {
                this.configurationCustodies = this.configurationCustodies.filter(val => val.id !== this.configurationCustody.id);
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
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Ocurrió un error inesperado al eliminar el rol.',
                life: 3000
            });
        } finally {
            this.configurationCustody = {};
        }
    }

    editConfigurationCustody(configurationCustody: ConfigurationsCustody) {
        console.log("Para editar: ",configurationCustody);
        this.configurationCustody = { ...configurationCustody };
        this.configurationCustodyDialog = true;
    }

    async saveConfigurationCustodies() {
        this.submitted = true;
        if (this.configurationCustody.code_configuration?.trim() && this.configurationCustody.message_configuration?.trim() && this.configurationCustody.version_configuration?.trim()) {

            const payload: ConfigurationsCustody = {
                id: this.configurationCustody.id,
                code_configuration: this.configurationCustody.code_configuration,
                message_configuration: this.configurationCustody.message_configuration,
                version_configuration: this.configurationCustody.version_configuration,
            };
            // console.log("Luego ", payload);

            if (this.configurationCustody.id) {
                try {
                    const response = await this.configurationService.updateAdminConfiguration(+this.configurationCustody.id, payload);
                    if (response.status) {
                        // this.configurationCustodie = this.configurationCustodie.map(rol => rol.id === this.configurationCustody.id ? { ...rol, ...response.data, permisos: permisosFinales } : rol);
                        this.getConfigurations();
                        this.updatePermissions();
                        this.messageService.add({ severity: 'success', summary: 'Realizado', detail: response.message, life: 3000 });
                    } else {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message, life: 3000 });
                    }
                } catch (error) {
                    // console.error('Error al crear el rol:', error);
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear/modificar el rol.', life: 3000 });
                }

            } else {
                const payload = {
                    code_configuration: this.configurationCustody.code_configuration,
                    message_configuration: this.configurationCustody.message_configuration,
                    version_configuration: this.configurationCustody.version_configuration,
                };
                console.log(payload)
                try {
                    const response = await this.configurationService.createAdminConfiguration(payload);
                    // console.log('Rol creado:', response);
                    if (response.status) {
                        this.getConfigurations();
                        this.updatePermissions();
                        this.messageService.add({ severity: 'success', summary: 'Realizado', detail: response.message, life: 3000 });
                    } else {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message, life: 3000 });
                    }
                } catch (error) {
                    // console.error('Error al crear el rol:', error);
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el rol.', life: 3000 });
                }
            }
            this.configurationCustodies = [...this.configurationCustodies];
            this.configurationCustodyDialog = false;
            this.configurationCustody = {};
        } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Campos vacios!', life: 3000 });
        }
    }
}

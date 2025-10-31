import { Component, OnInit } from '@angular/core';
import { Rol } from 'src/app/layout/api/rol.interface'
import { MessageService } from 'primeng/api';
import { UserRolService } from '../service/user.service';
import { AnswerQueryResponse, RolPermissions } from '../../../api/index.interface'
import { AuthService } from 'src/app/layout/auth/service/auth.service';
import { CommonService } from 'src/app/layout/common/service/common.service'
@Component({
    selector: 'app-rol',
    //   standalone: true,
    //   imports: [],
    templateUrl: './rol.component.html',
    styleUrl: './rol.component.scss',
    providers: [MessageService]
})
export class RolComponent implements OnInit {
    rolDialog: boolean = false;
    deleteRolDialog: boolean = false;
    deleteRolsDialog: boolean = false;
    rols: Rol[] = [];
    rol: Rol = {};
    selectedRols: Rol[] = [];
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
    // Para manejar
    permissionsUSer: string[] = [];
    canCreate: boolean = false;
    canEdit: boolean = false;
    canDelete: boolean = false;

    constructor(
        private userRolService: UserRolService,
        private messageService: MessageService,
        private authService: AuthService,
        private commonService: CommonService,
    ) { }

    ngOnInit() {
        this.getRoles();
        this.loadPermissions();
        this.cols = [
            { field: 'name', header: 'Rol' },
            { field: 'permisos', header: 'Permisos' },
            { field: 'created_at', header: 'Fecha de Creacion' },
        ];
    }

    getRoles() {
        this.userRolService.getRoles().then(data => {
            this.rols = data.map((rol) => ({
                ...rol,
                permisos: rol.permisos.map((permiso: any) => ({
                    id_permission: permiso.id_permission,
                    name: permiso.name || this.getPermissionNameById(permiso.id_permission),
                }))
            }));
        });
        this.updatePermissions();
    }

    getPermissionNameById(id: number): string {
        const permiso = this.permissions.find((permiso) => permiso.id === id);
        return permiso ? permiso.name : 'Unknown';
    }

    loadPermissions() {
        this.permisosSeleccionados = {};
        if (this.rol.permisos && this.rol.permisos.length > 0) {
            this.rol.permisos.forEach((permiso) => {
                this.permisosSeleccionados[permiso.id_permission] = true;
            });
        }
        this.permissions.forEach((permiso) => {
            if (!(permiso.id in this.permisosSeleccionados)) {
                this.permisosSeleccionados[permiso.id] = false;
            }
        });
        this.updatePermissions();
    }

    updatePermissions() {
        this.canCreate = this.commonService.hasPermission('create');
        // console.log("Create: ",this.canCreate);
        this.canEdit = this.commonService.hasPermission('update');
        // console.log("Update: ", this.canEdit);
        this.canDelete = this.commonService.hasPermission('delete');
        // console.log("Delete: ", this.canDelete);
    }

    togglePermiso(permiso: { id: number }) {
        this.permisosSeleccionados[permiso.id] = !this.permisosSeleccionados[permiso.id];
        this.updatePermissions();
    }

    onGlobalFilter(table: any, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openNew() {
        this.rol = {};
        this.submitted = false;
        this.rolDialog = true;
        this.loadPermissions();
    }

    hideDialog() {
        this.rolDialog = false;
        this.submitted = false;
    }

    deleteSelectedRoles() {
        this.deleteRolsDialog = true;
    }

    deleteRol(rol: Rol) {
        this.deleteRolDialog = true;
        this.rol = { ...rol };
    }

    async confirmDeleteSelected() {
        this.deleteRolsDialog = false;
        try {
            const selectedIds = this.selectedRols.map(rol => rol.id);
            const requestPayload = { id: selectedIds };
            const response: AnswerQueryResponse = await this.userRolService.deleteRols(requestPayload);
            if (response.status) {
                // console.log(selectedIds);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Realizado',
                    detail: response.message,
                    life: 3000,
                });
                this.getRoles();
                // this.rols = this.rols.filter((rol) => !this.selectedRols.includes(rol));
            } else {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message, life: 3000 });
            }
        } catch (error) {
            // console.error('Error al crear el rol:', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el rol.', life: 3000 });
        }

        this.selectedRols = [];
    }

    async confirmDelete() {
        this.deleteRolDialog = false;
        try {
            const response: AnswerQueryResponse = await this.userRolService.deleteRol(this.rol);
            if (response.status) {
                this.rols = this.rols.filter(val => val.id !== this.rol.id);
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
            this.rol = {};
        }
    }

    editRol(rol: Rol) {
        this.rol = { ...rol };
        this.loadPermissions();
        this.rolDialog = true;
    }

    async saveRol() {
        this.submitted = true;
        if (this.rol.name?.trim()) {
            const permisosSeleccionados = Object.keys(this.permisosSeleccionados)
                .filter((key) => this.permisosSeleccionados[key])
                .map((id) => ({
                    id_permission: parseInt(id, 10),
                    name: this.getPermissionNameById(parseInt(id, 10)),
                }));
            const permisosOriginales = Array.isArray(this.rol.permisos) ? this.rol.permisos : [];
            const idsSeleccionados = permisosSeleccionados.map(p => p.id_permission);
            const idsOriginales = permisosOriginales.map(p => p.id_permission);
            const idsNoSeleccionados = idsOriginales.filter(id => !idsSeleccionados.includes(id));
            const permisosFinales: RolPermissions[] = [
                ...permisosSeleccionados.map((permiso) => ({
                    id_permission: permiso.id_permission,
                    name: permiso.name,
                })),
                ...idsNoSeleccionados.map((id) => ({
                    id_aisgnacion: id,
                    name: this.getPermissionNameById(id),
                }))
            ];

            const payload: Rol = {
                id: this.rol.id,
                name: this.rol.name,
                permisos: permisosFinales
            };
            // console.log("Luego ", payload);

            if (this.rol.id) {
                try {
                    const response = await this.userRolService.updateRol(+this.rol.id, payload);
                    if (response.status) {
                        // this.rols = this.rols.map(rol => rol.id === this.rol.id ? { ...rol, ...response.data, permisos: permisosFinales } : rol);
                        this.getRoles();
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
                const { id, ...rolSinId } = this.rol;

                const payload: Rol = {
                    ...rolSinId,
                    permisos: permisosFinales
                };
                try {
                    const response = await this.userRolService.createRol(payload);
                    // console.log('Rol creado:', response);
                    if (response.status) {
                        this.getRoles();
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
            this.rols = [...this.rols];
            this.rolDialog = false;
            this.rol = {};
        } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Campos vacios!', life: 3000 });
        }
    }

}

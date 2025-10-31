import { MessageService } from 'primeng/api';
import { UserRolService } from './../service/user.service';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/layout/common/service/common.service';
import { User, AnswerQueryResponse } from 'src/app/layout/api/index.interface'
import * as CryptoJS from 'crypto-js';
const AES_SECRET_KEY = 'El4p4s2024!';

interface Role {
    id_rol: number;    // ID único del rol
    name: string;  // Nombre del rol
    selected?: boolean; // Si el rol está seleccionado
}
@Component({
    selector: 'app-user',
    //   standalone: true,
    //   imports: [],
    templateUrl: './user.component.html',
    styleUrl: './user.component.scss',
    providers: [MessageService]
})
export class UserComponent implements OnInit {
    userDialog: boolean = false;
    deleteUserDialog: boolean = false;
    deleteUsersDialog: boolean = false;
    users: User[] = [];
    user: User = {};
    selectedUsers: User[] = [];
    submitted: boolean = false;
    cols: any[] = [];
    statuses: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    rolsUser: Role[] = [];
    // Para manejar
    permissionsUSer: string[] = [];
    canCreate: boolean = false;
    canEdit: boolean = false;
    canDelete: boolean = false;
    constructor(
        private userRolService: UserRolService,
        private messageService: MessageService,
        private commonService: CommonService
    ) { }
    ngOnInit() {
        this.getUsers();
        this.cols = [
            { field: 'name', header: 'Usuario' },
            { field: 'username', header: 'Nombre de Usuario' },
            { field: 'email', header: 'Correo' },
            { field: 'rol', header: 'Roles' },
            { field: 'created_at', header: 'Fecha de Creacion' },
        ];
    }

    getUsers() {
        this.userRolService.getUsers().then(data => {
            this.users = data.map((user) => ({
                ...user,
                rol: user.rol.map((rol: any) => ({
                    id_rol: rol.id_rol,
                    id_user_rol: rol.id_user_rol,
                    name: rol.name
                }))
            }))
        })
        this.updatePermissions();
    }
    getRoles() {
        this.userRolService.getRoles().then(data => {
            this.rolsUser = data.map(rol => ({
                id_rol: rol.id,
                name: rol.name,
                selected: false
            }));
        });
    }

    openNew() {
        this.user = {};
        this.submitted = false;
        this.userDialog = true;
        this.getRoles();
    }

    editUser(user: User) {
        this.user = { ...user };

        this.userRolService.getRoles().then(data => {
            this.rolsUser = data.map(rol => ({
                id_rol: rol.id,
                name: rol.name,
                selected: user.rol?.some(userRole => userRole.id_rol === rol.id) || false
            }));
        });
        this.userDialog = true;
    }

    encryptPassword(password: string): string {
        return CryptoJS.AES.encrypt(password, AES_SECRET_KEY).toString();
    }

    async saveUser() {
        this.submitted = true;

        // Validar que los campos requeridos no estén vacíos
        if (this.user.name?.trim() && this.user.username?.trim() && this.user.email?.trim()) {
            // Obtener roles seleccionados
            const selectedRoles = this.rolsUser.filter(role => role.selected);

            if (this.user.id) {
                // **Edición de usuario existente**
                const previousRoles = this.user.rol || []; // Roles actuales asignados al usuario

                // Calcular roles nuevos que se van a añadir
                const rolesToAdd = selectedRoles.filter(
                    selectedRole => !previousRoles.some(prevRole => prevRole.id_rol === selectedRole.id_rol)
                ).map(role => ({ id_rol: role.id_rol }));

                // Calcular roles existentes que se van a eliminar
                const rolesToRemove = previousRoles.filter(
                    prevRole => !selectedRoles.some(selectedRole => selectedRole.id_rol === prevRole.id_rol)
                ).map(role => ({ id_user_rol: role.id_user_rol }));
                const encryptedPassword = this.encryptPassword(this.user.password)
                const payload = {
                    id: this.user.id,
                    name: this.user.name,
                    username: this.user.username,
                    password: encryptedPassword,
                    email: this.user.email,
                    rolesToAdd,
                    rolesToRemove,
                };

                // console.log('Payload de edición listo:', payload);

                try {
                    const response = await this.userRolService.updateUser(this.user.id, payload);
                    if (response.status) {
                        // this.rols = this.rols.map(rol => rol.id === this.rol.id ? { ...rol, ...response.data, permisos: permisosFinales } : rol);
                        this.getUsers();
                        this.updatePermissions();
                        this.messageService.add({ severity: 'success', summary: 'Realizado', detail: response.message, life: 3000 });
                    } else {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message, life: 3000 });
                    }
                } catch (error) {
                    // console.error('Error al crear el rol:', error);
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear/modificar el Usuario.', life: 3000 });
                }
            } else {
                const rolesToAdd = selectedRoles.map(role => ({ id_rol: role.id_rol }));
                const encryptedPassword = this.encryptPassword(this.user.password)
                const payload = {
                    name: this.user.name,
                    username: this.user.username,
                    email: this.user.email,
                    password: encryptedPassword,
                    roles: rolesToAdd,
                };

                // console.log('Payload de creación listo:', payload);
                try {
                    const res = await this.userRolService.createUser(payload);
                    if (res.status) {
                        this.getUsers();
                        this.updatePermissions();
                        this.messageService.add({ severity: 'success', summary: 'Realizado', detail: res.message, life: 3000 });
                    } else {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message, life: 3000 });
                    }
                } catch (error) {
                    // console.error('Error al crear el rol:', error);
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el rol.', life: 3000 });
                }
            }
            this.users = [...this.users];
            this.userDialog = false;
            this.user = {};
        } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Campos vacíos!', life: 3000 });
        }
    }

    updatePermissions() {
        this.canCreate = this.commonService.hasPermission('create');
        // console.log("Create: ",this.canCreate);
        this.canEdit = this.commonService.hasPermission('update');
        // console.log("Update: ", this.canEdit);
        this.canDelete = this.commonService.hasPermission('delete');
        // console.log("Delete: ", this.canDelete);
    }

    onGlobalFilter(table: any, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    hideDialog() {
        this.userDialog = false;
        this.rolsUser = [];
        this.submitted = false;
    }

    deleteSelectedUsers() {
        this.deleteUsersDialog = true;
    }

    deleteUser(user: User) {
        this.deleteUserDialog = true;
        this.user = { ...user };
    }

    async confirmDeleteSelected() {
        this.deleteUsersDialog = false;
        try {
            const selectedIds = this.selectedUsers.map(user => user.id);
            const requestPayload = { id: selectedIds };
            const response: AnswerQueryResponse = await this.userRolService.deleteUsers(requestPayload);
            if (response.status) {
                // console.log(selectedIds);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Realizado',
                    detail: response.message,
                    life: 3000,
                });
                this.getUsers();
                // this.rols = this.rols.filter((rol) => !this.selectedRols.includes(rol));
            } else {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message, life: 3000 });
            }
        } catch (error) {
            // console.error('Error al crear el rol:', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el rol.', life: 3000 });
        }

        this.selectedUsers = [];
    }

    async confirmDelete() {
        this.deleteUserDialog = false;
        try {
            const response: AnswerQueryResponse = await this.userRolService.deleteUser(this.user);
            if (response.status) {
                this.users = this.users.filter(val => val.id !== this.user.id);
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
            this.user = {};
        }
    }
}

import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AuthService } from './auth/service/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {
    // User
    username: string = "";
    // Roles
    roles: string[] = [];
    selectedRole: string;
    items!: MenuItem[];
    // Calendar
    showCalendar = false;
    selectedDate: Date;
    // Rol seleccionado
    @Output() roleChange = new EventEmitter<string>();
    currentRole: string | null = null;

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {

        const roles = this.authService.getRoles();
        this.selectedRole = roles.length > 0 ? roles[0] : null;
        this.getUser()
        this.updateMenuItems(roles);
        this.selectedDate = new Date();
        if (this.selectedRole) {
            this.onRoleChange(this.selectedRole); // Inicializa con el rol seleccionado por defecto
        }
    }
    updateMenuItems(roles: string[]) {
        this.items = [
            {
                label: 'Usuario: ',
                icon: 'pi pi-user',
                items: [
                    {
                        label: this.username,
                        icon: 'pi pi-user',
                        command: () => this.logout(),
                    },
                ],
            },
            {
                label: 'Roles',
                icon: 'pi pi-fw pi-user',
                items: roles.map(role => ({
                    label: role,
                    icon: role === this.selectedRole ? 'pi pi-fw pi-check' : '',
                    command: () => this.onRoleChange(role),
                })),
            },
            {
                separator: true,
            },
            {
                label: 'Cerrar sesión',
                icon: 'pi pi-fw pi-sign-out',
                items: [
                    {
                        label: 'Salir',
                        icon: 'pi pi-fw pi-power-off',
                        command: () => this.logout(),
                    },
                ],
            },
        ];
    }
    onRoleChange(role: string) {
        // console.log("Rol seleccionado:", role);
        localStorage.setItem('activeRole', role);
        this.selectedRole = role;

        const permissions = JSON.parse(localStorage.getItem('permissions') || '{}'); // Cargar todos los permisos
        if (permissions[role]) {
            const activePermissions = permissions[role];
            // console.log(`Permisos para el rol ${role}:`, activePermissions);

            localStorage.setItem('activePermission', JSON.stringify(activePermissions)); // Guardar permisos activos
            this.authService.setActiveRole(role, permissions);
            this.updatePermissions(activePermissions); // Actualiza permisos en el componente
        } else {
            // console.warn(`No se encontraron permisos para el rol ${role}`);
            this.updatePermissions([]); // Limpia permisos si no se encuentra el rol
        }

        this.updateMenuItems(this.authService.getRoles());
        this.layoutService.setMenuItems(role);
        this.roleChange.emit(role);
        this.router.navigate(['/dashboard']);
    }
    updatePermissions(activePermissions: string[] = []) {
        // console.log("Permisos activos recibidos:", activePermissions);

        // this.canCreate = activePermissions.includes('create');
        // this.canEdit = activePermissions.includes('update');
        // this.canDelete = activePermissions.includes('delete');

        // console.log("Create:", this.canCreate);
        // console.log("Update:", this.canEdit);
        // console.log("Delete:", this.canDelete);
    }
    getUser() {
        const user = localStorage.getItem('user');
        // console.log(user);
        this.username = user.toUpperCase();
    }
    toggleCalendar() {
        this.showCalendar = !this.showCalendar;
    }

    closeCalendar() {
        this.showCalendar = false;
    }

    onDateSelect() {
        console.log('Fecha seleccionada:', this.selectedDate);
    }

    onDialogClose() {
        console.log('Calendario cerrado');
    }

    logout() {
        // console.log("CERRAR SESION")
        this.authService.logout();
    }

}

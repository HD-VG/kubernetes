import { Injectable, inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class CommonService {
    constructor(
        private readonly router: Router
    ) { }
    private http = inject(HttpClient);
    private permissions: { [key: string]: boolean } = {};

    getHeaders() {
        const token = localStorage.getItem('token');
        // console.log("Token obtenido: ", token);

        if (!token) {
            this.router.navigateByUrl('/login', { skipLocationChange: true });
            return null;  // Stop further execution if no token is found
        }

        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return headers;
    }

    updatePermissions() {
        const rol = this.getRol(); // Obtener el rol actual
        const activePermissions = JSON.parse(localStorage.getItem('activePermission') || '[]'); // Cargar permisos activos

        // console.log("Rol activo:", rol);
        // console.log("Permisos activos:", activePermissions);

        // Asegurarse de que activePermissions es un arreglo válido y actualizar los permisos
        if (Array.isArray(activePermissions)) {
            this.permissions = {
                create: activePermissions.includes('create'),
                read: activePermissions.includes('read'),
                update: activePermissions.includes('update'),
                delete: activePermissions.includes('delete'),
            };
            // console.log("Permisos asignados:", this.permissions);
        } else {
            console.error('El formato de activePermission no es válido');
            this.permissions = {
                create: false,
                read: false,
                update: false,
                delete: false,
            };
        }
    }

    hasPermission(permission: string): boolean {
        const activePermissions = JSON.parse(localStorage.getItem('activePermission') || '[]');
        return Array.isArray(activePermissions) && activePermissions.includes(permission);
    }


    loadPermissionsIfNeeded() {
        // Si los permisos no están cargados, llamar a updatePermissions
        if (!this.permissions || Object.keys(this.permissions).length === 0) {
            this.updatePermissions();
        }
    }

    getRol(): string {
        // Obtener el rol activo desde localStorage
        const rol = localStorage.getItem('activeRole');
        // console.log("Rol activo:", rol);
        return rol || ''; // Retornar una cadena vacía si no hay rol
    }
}

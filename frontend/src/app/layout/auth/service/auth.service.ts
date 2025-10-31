import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthStatus, LoginResponse } from 'src/app/layout/auth/login/interface/index.interface';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly baseUrl: string = environment.apiUrl;
    private http = inject(HttpClient);
    private router = inject(Router);

    // Estado del rol activo
    private activeRoleSubject = new BehaviorSubject<string | null>(null);
    public activeRole$ = this.activeRoleSubject.asObservable();

    // Estado de los permisos del rol activo
    private activePermissionsSubject = new BehaviorSubject<string[]>([]);
    public activePermissions$ = this.activePermissionsSubject.asObservable();

    // Estado de autenticación y usuario actual
    private _currentUser = signal<string | null>(null);
    private _authStatus = signal<AuthStatus>(AuthStatus.checking);

    // Estado accesible públicamente
    public currentUser = computed(() => this._currentUser());
    public authStatus = computed(() => this._authStatus());
    private roles: string[] = [];

    constructor(private readonly menu: LayoutService) {
        this.checkAuthStatus().subscribe();
        this.loadStoredRole();
    }

    // Función para guardar la autenticación
    private setAuthentication(user: string, token: string, roles: string[], permissions: Record<string, string[]>): boolean {
        this._currentUser.set(user);
        this._authStatus.set(AuthStatus.authenticated);
        localStorage.setItem('token', token);
        localStorage.setItem('user', user);
        localStorage.setItem('roles', JSON.stringify(roles));
        localStorage.setItem('permissions', JSON.stringify(permissions));
        this.initializeRoles(roles, permissions);
        return true;
    }

    // Función para iniciar sesión
    login(username: string, password: string): Observable<boolean> {
        const url = `${this.baseUrl}/auth/login`;
        const body = { username, password };

        return this.http.post<LoginResponse>(url, body).pipe(
            map(({ user, token, access }) => {
                const roles = access.map(role => role.rol);
                const permissions = access.reduce((acc, role) => {
                    acc[role.rol] = role.permissions;
                    return acc;
                }, {} as Record<string, string[]>);
                this.router.navigate(['/dashboard']);
                return this.setAuthentication(user, token, roles, permissions);
            }),
            catchError(err => throwError(() => err.error.message))
        );
    }

    // Función para verificar el estado de autenticación
    checkAuthStatus(): Observable<boolean> {
        const token = localStorage.getItem('token');
        const rol = localStorage.getItem('activeRole');
        const url = `${this.baseUrl}/auth/check-token?rol=${rol}`;
        if (!token) {
            this.logout();
            return of(false);
        }

        const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
        return this.http.get<LoginResponse>(url, { headers }).pipe(
            map(({ user, token, access }) => {
                const roles = access.map(role => role.rol);
                const permissions = access.reduce((acc, role) => {
                    acc[role.rol] = role.permissions;
                    return acc;
                }, {} as Record<string, string[]>);
                return this.setAuthentication(user, token, roles, permissions);
            }),
            catchError(() => {
                this._authStatus.set(AuthStatus.notAuthenticated);
                return of(false);
            })
        );
    }

    // Función para cerrar sesión
    logout(): void {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('roles');
        localStorage.removeItem('permissions');
        localStorage.removeItem('activeRole');
        localStorage.removeItem('activePermission');
        this._currentUser.set(null);
        this._authStatus.set(AuthStatus.notAuthenticated);
        this.router.navigate(['/login']);
    }

    // Comprobar si está autenticado
    isLoggedIn(): boolean {
        return this._authStatus() === AuthStatus.authenticated;
    }

    // Obtener permisos actuales
    getPermissions(): string[] {
        return this.activePermissionsSubject.getValue(); // Retorna los permisos del rol activo
    }

    // Inicializar roles y permisos
    initializeRoles(roles: string[], permissions: Record<string, string[]>) {
        this.roles = roles;
        const defaultRole = roles[0];  // Establecer el primer rol como predeterminado
        this.setActiveRole(defaultRole, permissions); // Inicializamos el rol y permisos
    }

    // Establecer el rol activo y sus permisos
    setActiveRole(role: string, permissions: Record<string, string[]>) {
        this.activeRoleSubject.next(role);
        localStorage.setItem('activeRole', role);
        const rolePermissions = permissions[role] || [];
        this.activePermissionsSubject.next(rolePermissions); // Actualizamos los permisos del rol
        localStorage.setItem('activePermission', JSON.stringify(rolePermissions));
        this.menu.setMenuItems(role);  // Actualiza los permisos en el menú si es necesario
    }

    // Cargar el rol activo y permisos desde localStorage
    private loadStoredRole() {
        const storedRole = localStorage.getItem('activeRole');
        const permissions = JSON.parse(localStorage.getItem('permissions') || '{}');
        if (storedRole && permissions[storedRole]) {
            this.activeRoleSubject.next(storedRole);
            this.activePermissionsSubject.next(permissions[storedRole]);
        }
    }

    // Obtener el rol activo almacenado
    getActiveRole(): string {
        return localStorage.getItem('activeRole') || '';
    }

    // Obtener los roles disponibles
    getRoles(): string[] {
        return JSON.parse(localStorage.getItem('roles') || '[]');
    }

    // Cambiar el rol activo
    changeActiveRole(role: string) {
        const permissions = JSON.parse(localStorage.getItem('permissions') || '{}');
        // console.log("changeActiveRole: ", permissions)
        if (permissions[role]) {
            // console.log("changeActiveRole2: ", role, "  -  ", permissions)
            this.setActiveRole(role, permissions);
        }
    }
}

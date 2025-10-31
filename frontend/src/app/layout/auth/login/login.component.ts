import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from '../service/auth.service';
import { AuthStatus } from 'src/app/layout/auth/login/interface/auth-status.enum'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    username: string = '';
    password: string = '';
    errorMessage: string | null = null;

    constructor(
        public layoutService: LayoutService,
        private readonly authService: AuthService

    ) { }

    onLogin() {
        if (!this.username || !this.password) {
            this.errorMessage = 'Por favor, ingresa tu usuario y contraseña.';
            return;
        }

        this.authService.login(this.username, this.password ).subscribe({
            next: () => {
                // Si el inicio de sesión es exitoso, el servicio AuthService redireccionará al dashboard
                // console.log(this.username, this.password)
            },
            error: () => {
                this.errorMessage = 'Usuario o contraseña incorrectos. Inténtalo de nuevo.'; // Mensaje de error si la autenticación falla
            }
        });
    }

}

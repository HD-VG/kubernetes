import { Injectable, effect, signal } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface AppConfig {
    inputStyle: string;
    colorScheme: string;
    theme: string;
    ripple: boolean;
    menuMode: string;
    scale: number;
}

interface LayoutState {
    staticMenuDesktopInactive: boolean;
    overlayMenuActive: boolean;
    profileSidebarVisible: boolean;
    configSidebarVisible: boolean;
    staticMenuMobileActive: boolean;
    menuHoverActive: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class LayoutService {
    _config: AppConfig = {
        ripple: false,
        inputStyle: 'outlined',
        menuMode: 'static',
        colorScheme: 'light',
        theme: 'lara-light-indigo',
        scale: 14,
    };

    private menuItemsSubject = new BehaviorSubject<any[]>([]);
    public menuItems$ = this.menuItemsSubject.asObservable();

    config = signal<AppConfig>(this._config);

    state: LayoutState = {
        staticMenuDesktopInactive: false,
        overlayMenuActive: false,
        profileSidebarVisible: false,
        configSidebarVisible: false,
        staticMenuMobileActive: false,
        menuHoverActive: false,
    };

    private configUpdate = new Subject<AppConfig>();

    private overlayOpen = new Subject<any>();

    configUpdate$ = this.configUpdate.asObservable();

    overlayOpen$ = this.overlayOpen.asObservable();

    constructor() {
        effect(() => {
            const config = this.config();
            if (this.updateStyle(config)) {
                this.changeTheme();
            }
            this.changeScale(config.scale);
            this.onConfigUpdate();
        });
    }

    updateStyle(config: AppConfig) {
        return (
            config.theme !== this._config.theme ||
            config.colorScheme !== this._config.colorScheme
        );
    }

    onMenuToggle() {
        if (this.isOverlay()) {
            this.state.overlayMenuActive = !this.state.overlayMenuActive;
            if (this.state.overlayMenuActive) {
                this.overlayOpen.next(null);
            }
        }

        if (this.isDesktop()) {
            this.state.staticMenuDesktopInactive =
                !this.state.staticMenuDesktopInactive;
        } else {
            this.state.staticMenuMobileActive =
                !this.state.staticMenuMobileActive;

            if (this.state.staticMenuMobileActive) {
                this.overlayOpen.next(null);
            }
        }
    }

    showProfileSidebar() {
        this.state.profileSidebarVisible = !this.state.profileSidebarVisible;
        if (this.state.profileSidebarVisible) {
            this.overlayOpen.next(null);
        }
    }

    showConfigSidebar() {
        this.state.configSidebarVisible = true;
    }

    isOverlay() {
        return this.config().menuMode === 'overlay';
    }

    isDesktop() {
        return window.innerWidth > 991;
    }

    isMobile() {
        return !this.isDesktop();
    }

    onConfigUpdate() {
        this._config = { ...this.config() };
        this.configUpdate.next(this.config());
    }

    changeTheme() {
        const config = this.config();
        const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
        const themeLinkHref = themeLink.getAttribute('href')!;
        const newHref = themeLinkHref
            .split('/')
            .map((el) =>
                el == this._config.theme
                    ? (el = config.theme)
                    : el == `theme-${this._config.colorScheme}`
                    ? (el = `theme-${config.colorScheme}`)
                    : el
            )
            .join('/');

        this.replaceThemeLink(newHref);
    }
    replaceThemeLink(href: string) {
        const id = 'theme-css';
        let themeLink = <HTMLLinkElement>document.getElementById(id);
        const cloneLinkElement = <HTMLLinkElement>themeLink.cloneNode(true);

        cloneLinkElement.setAttribute('href', href);
        cloneLinkElement.setAttribute('id', id + '-clone');

        themeLink.parentNode!.insertBefore(
            cloneLinkElement,
            themeLink.nextSibling
        );
        cloneLinkElement.addEventListener('load', () => {
            themeLink.remove();
            cloneLinkElement.setAttribute('id', id);
        });
    }

    changeScale(value: number) {
        document.documentElement.style.fontSize = `${value}px`;
    }

    setMenuItems(role: string) {
        let model: any[] = [];
        if (role === 'administrador') {
            model = [
                {
                    label: 'ELAPAS',
                    items: [
                        { label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }
                    ]
                },
                {
                    label: 'Usuarios',
                    items: [
                        { label: 'Roles', icon: 'pi pi-fw pi-globe', routerLink: ['/dashboard/users/rol'] },
                        { label: 'Usuarios', icon: 'pi pi-fw pi-user', routerLink: ['/dashboard/users/user'] },
                    ]
                },
                {
                    label: 'Custodios',
                    items: [
                        { label: 'Registro Custodios', icon: 'pi pi-fw pi-id-card', routerLink: ['/dashboard/custodies/custody'] },
                        { label: 'Configuraciones', icon: 'pi pi-fw pi-wrench', routerLink: ['/dashboard/configuration/configuration_custody'] },
                        // { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'] }
                    ]
                },
                {
                    label: 'Agravios',
                    items: [
                        { label: 'Tipo de Daño', icon: 'pi pi-fw pi-id-card', routerLink: ['/dashboard/configuration-type-dagme'] },
                        { label: 'Tipo de Maquina', icon: 'pi pi-fw pi-wrench', routerLink: ['/dashboard/configuration-type-machine'] },
                        { label: 'Tipo de Trabajo', icon: 'pi pi-fw pi-wrench', routerLink: ['/dashboard/configuration-type-work'] },
                        { label: 'Herramientas', icon: 'pi pi-fw pi-wrench', routerLink: ['/dashboard/configuration-util'] },
                        { label: 'Recurrencia', icon: 'pi pi-fw pi-wrench', routerLink: ['/dashboard/recurring'] },
                        { label: 'Aguas', icon: 'pi pi-fw pi-wrench', routerLink: ['/dashboard/water'] },
                        // { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'] }
                    ]
                },
            ];
        } else if (role === 'registrador') {
            model = [
                {
                    label: 'ELAPAS',
                    items: [
                        { label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }
                    ]
                },
                {
                    label: 'Laboratorios',
                    items: [
                        { label: 'Registro Custodios', icon: 'pi pi-fw pi-id-card', routerLink: ['/dashboard/custodies/custody-laboratory'] },
                        // { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
                        // { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'] }
                    ]
                },
                // {
                //     label: 'UI Components',
                //     items: [
                //         { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
                //         { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
                //         { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'] },
                //         { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },
                //         { label: 'Button', icon: 'pi pi-fw pi-box', routerLink: ['/uikit/button'] },
                //         { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
                //         { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
                //         { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
                //         { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
                //         { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
                //         { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
                //         { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },
                //         { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
                //         { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
                //         { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
                //         { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc'] }
                //     ]
                // },
            ];
        } else {
            model = [
                {
                    label: 'ELAPAS',
                    items: [
                        { label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }
                    ]
                },
                {
                    label: 'Usuarios',
                    items: [
                        { label: 'Roles', icon: 'pi pi-fw pi-globe', routerLink: ['/dashboard/users/rol'] },
                        { label: 'Usuarios', icon: 'pi pi-fw pi-user', routerLink: ['/dashboard/users/user'] },
                    ]
                },
                // {
                //     label: 'Prime Blocks',
                //     items: [
                //         { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks'], badge: 'NEW' },
                //         { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank' },
                //     ]
                // },
                // {
                //     label: 'Utilities',
                //     items: [
                //         { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['/utilities/icons'] },
                //         { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: ['https://www.primefaces.org/primeflex/'], target: '_blank' },
                //     ]
                // }
            ];
        }
        this.menuItemsSubject.next(model);
        // console.log("Rol para el menu: ", role, " Menu: ", model)
    }
}

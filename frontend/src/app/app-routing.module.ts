import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { LoginComponent } from './layout/auth/login/login.component'
import { AppLayoutComponent } from "./layout/app.layout.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', loadChildren: () => import('./layout/auth/login/login.module').then(m => m.LoginModule) },
            { path: 'login', component: LoginComponent },
            { path: 'error', redirectTo: 'auth/error' },
            { path: 'notfound', component: NotfoundComponent },
            {
                path: 'dashboard', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./layout/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'users', loadChildren: () => import('./layout/components/users/users.module').then(m => m.UserModule) },
                    { path: 'custodies', loadChildren: () => import('./layout/components/custody/custody.module').then(m => m.CustodyModule) },
                    { path: 'reports', loadChildren: () => import('./layout/components/reports/reports.module').then(m => m.ReportsModule) },
                    { path: 'configuration', loadChildren: () => import('./layout/components/configurations/configurations.module').then(m => m.ConfigurationsModule) },
                    { path: 'configuration-type-dagme', loadChildren: () => import('./layout/components/agravios/configuration_type_dagme/a-confTypeDagme.module').then(m => m.ConfigurationTypeDagmeModule) },
                    { path: 'configuration-type-machine', loadChildren: () => import('./layout/components/agravios/configuration_type_machine/a-confTypeMachine.module').then(m => m.ConfigurationTypeMachineModule) },
                    { path: 'configuration-type-work', loadChildren: () => import('./layout/components/agravios/configuration_type_work/a-confTypeWork.module').then(m => m.ConfigurationTypeWorkModule) },
                    { path: 'configuration-util', loadChildren: () => import('./layout/components/agravios/configuration_util/a-confUtil.module').then(m => m.ConfigurationUtilModule) },
                    { path: 'recurring', loadChildren: () => import('./layout/components/agravios/recurring/a-recurring.module').then(m => m.RecurringModule) },
                    { path: 'water', loadChildren: () => import('./layout/components/agravios/water/a-water.module').then(m => m.WaterModule) },
                ]
            },
            { path: '**', redirectTo: '/notfound' },
        ], {
            scrollPositionRestoration: 'enabled',
            anchorScrolling: 'enabled',
            onSameUrlNavigation: 'reload',
            // enableTracing: true
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

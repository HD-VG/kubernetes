import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'configuration_custody', loadChildren: () => import('./configurations_custody/configurations_custody.module').then(m => m.ConfigurationsCustodyModule) },
        // { path: 'rol', loadChildren: () => import('./rol/rol.module').then(m => m.RolModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class ConfigurationsRoutingModule { }

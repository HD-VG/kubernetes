import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
        { path: 'rol', loadChildren: () => import('./rol/rol.module').then(m => m.RolModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class UserRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'head', loadChildren: () => import('./head/head.module').then(m => m.HeadModule) },
        { path: 'footer', loadChildren: () => import('./footer/footer.module').then(m => m.FooterModule) },
        { path: 'global', loadChildren: () => import('./report_global/report_global.module').then(m => m.ReportGlobalModule) },
        { path: 'normal/:id', loadChildren: () => import('./report_normal/report_normal.module').then(m => m.ReportNormalModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class ReportsRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReportGlobalComponent } from './report_global.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ReportGlobalComponent }
    ])],
    exports: [RouterModule]
})
export class ReportGlobalRoutingModule { }

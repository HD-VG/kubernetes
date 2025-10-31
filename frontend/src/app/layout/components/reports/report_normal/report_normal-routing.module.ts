import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReportNormalComponent } from './report_normal.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ReportNormalComponent }
    ])],
    exports: [RouterModule]
})
export class ReportNormalRoutingModule { }

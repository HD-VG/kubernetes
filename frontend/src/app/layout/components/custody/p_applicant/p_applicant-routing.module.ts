import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PApplicantComponent } from './p-applicant.component';

@NgModule({
        imports: [RouterModule.forChild([
            { path: '', component: PApplicantComponent }
        ])],
    exports: [RouterModule]
})
export class PApplicanttRoutingModule { }

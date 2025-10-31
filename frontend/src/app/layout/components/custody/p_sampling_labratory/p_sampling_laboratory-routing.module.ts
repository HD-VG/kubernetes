import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PSamplingLaboratoryComponent } from './p-sampling-laboratory.component';

@NgModule({
        imports: [RouterModule.forChild([
            { path: '', component: PSamplingLaboratoryComponent }
        ])],
    exports: [RouterModule]
})
export class PSamplingLaboratoryRoutingModule { }

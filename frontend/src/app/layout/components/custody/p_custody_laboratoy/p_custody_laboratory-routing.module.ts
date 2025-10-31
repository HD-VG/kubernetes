import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PCustodyLaboratoryComponent } from './p_custody_laboratory.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: PCustodyLaboratoryComponent }
    ])],
    exports: [RouterModule]
})
export class PCustodyLaboratoryRoutingModule { }

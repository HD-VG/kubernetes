import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PSamplingComponent } from './p-sampling.component';

@NgModule({
        imports: [RouterModule.forChild([
            { path: '', component: PSamplingComponent }
        ])],
    exports: [RouterModule]
})
export class PSamplingRoutingModule { }

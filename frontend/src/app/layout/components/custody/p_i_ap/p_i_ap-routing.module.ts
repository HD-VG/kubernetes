import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PIApComponent } from './p-i-ap.component';

@NgModule({
        imports: [RouterModule.forChild([
            { path: '', component: PIApComponent }
        ])],
    exports: [RouterModule]
})
export class PIApRoutingModule { }

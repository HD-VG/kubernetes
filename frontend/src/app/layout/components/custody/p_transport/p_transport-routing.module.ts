import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PTransportComponent } from './p-transport.component';

@NgModule({
        imports: [RouterModule.forChild([
            { path: '', component: PTransportComponent }
        ])],
    exports: [RouterModule]
})
export class PTransportRoutingModule { }

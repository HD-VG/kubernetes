import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WaterComponent } from './controller/a-water.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: WaterComponent }
    ])],
    exports: [RouterModule]
})
export class RecurringRoutingModule { }
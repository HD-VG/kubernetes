import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RecurringComponent } from './controller/a-recurring.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: RecurringComponent }
    ])],
    exports: [RouterModule]
})
export class RecurringRoutingModule { }
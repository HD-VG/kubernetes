import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfigurationTypeMachineComponent } from './controller/a-confTypeMachine.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ConfigurationTypeMachineComponent }
    ])],
    exports: [RouterModule]
})
export class ConfigurationTypeMachineRoutingModule { }
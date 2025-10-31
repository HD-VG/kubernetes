import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfigurationTypeWorkComponent } from './controller/a-confTypeWork.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ConfigurationTypeWorkComponent }
    ])],
    exports: [RouterModule]
})
export class ConfigurationTypeWorkRoutingModule { }
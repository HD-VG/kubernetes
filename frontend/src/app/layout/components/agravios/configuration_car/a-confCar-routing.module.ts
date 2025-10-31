import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfigurationCarComponent } from './controller/a-confCar.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ConfigurationCarComponent }
    ])],
    exports: [RouterModule]
})
export class ConfigurationCarRoutingModule { }
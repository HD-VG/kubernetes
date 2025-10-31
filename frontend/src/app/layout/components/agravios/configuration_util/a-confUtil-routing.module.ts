import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfigurationUtilComponent } from './controller/a-confUtil.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ConfigurationUtilComponent }
    ])],
    exports: [RouterModule]
})
export class ConfigurationUtilRoutingModule { }
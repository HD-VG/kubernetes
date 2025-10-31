import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfigurationTypeDagmeComponent } from './controller/a-confTypeDagme.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ConfigurationTypeDagmeComponent }
    ])],
    exports: [RouterModule]
})
export class ConfigurationTypeDagmeRoutingModule { }
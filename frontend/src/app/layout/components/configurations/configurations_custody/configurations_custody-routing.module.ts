import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfigurationsCustodyComponent } from './configurations_custody.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ConfigurationsCustodyComponent }
    ])],
    exports: [RouterModule]
})
export class ConfigurationsCustodyRoutingModule { }

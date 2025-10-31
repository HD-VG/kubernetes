import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PCustodyComponent } from './p_custody.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: PCustodyComponent }
    ])],
    exports: [RouterModule]
})
export class PCustodyRoutingModule { }

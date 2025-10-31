import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeadComponent } from './head.component';

@NgModule({
        imports: [RouterModule.forChild([
            { path: '', component: HeadComponent }
        ])],
    exports: [RouterModule]
})
export class HeadRoutingModule { }

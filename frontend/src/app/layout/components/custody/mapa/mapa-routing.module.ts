import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MapaComponent } from './mapa.component';

@NgModule({
        imports: [RouterModule.forChild([
            { path: '', component: MapaComponent }
        ])],
    exports: [RouterModule]
})
export class MapaRoutingModule { }

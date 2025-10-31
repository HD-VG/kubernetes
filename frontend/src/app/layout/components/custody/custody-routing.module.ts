import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'custody', loadChildren: () => import('./p_custody/p_custody.module').then(m => m.CustodyModule) },
        { path: 'custody-laboratory', loadChildren: () => import('./p_custody_laboratoy/p_custody_laboratory.module').then(m => m.CustodyLaboratoryModule) },
        { path: 'sampling-custodies/:id', loadChildren: () => import('./p_sampling/p-sampling.module').then(m => m.SamplingModule) },
        { path: 'sampling-custodies-laboratory/:id', loadChildren: () => import('./p_sampling_labratory/p-sampling-laboratory.module').then(m => m.SamplingLaboratoryModule) },
        { path: 'transport-custodies/:id', loadChildren: () => import('./p_transport/p-transport.module').then(m => m.PTransportModule) },
        { path: 'applicant-custodies/:id', loadChildren: () => import('./p_applicant/p-applicant.module').then(m => m.PApplicantModule) },
        { path: 'mapa-custodies', loadChildren: () => import('./mapa/mapa.module').then(m => m.MapaModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class CustodyRoutingModule { }

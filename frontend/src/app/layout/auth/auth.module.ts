import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AppLayoutModule } from 'src/app/layout/app.layout.module'
@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        AppLayoutModule
    ]
})
export class AuthModule { }

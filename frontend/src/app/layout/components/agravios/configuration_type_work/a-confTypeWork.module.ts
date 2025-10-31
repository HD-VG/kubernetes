import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationTypeWorkRoutingModule } from './a-confTypeWork-routing.module';
import { ConfigurationTypeWorkComponent } from './controller/a-confTypeWork.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfigurationTypeWorkService } from './service/a-confTypeWork.service';
import { AuthService } from 'src/app/layout/auth/service/auth.service';
import { CommonService } from 'src/app/layout/common/service/common.service';

@NgModule({
    declarations: [
        ConfigurationTypeWorkComponent
    ],
    imports: [
        CommonModule,
        ConfigurationTypeWorkRoutingModule,
        TableModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        InputTextModule,
        DropdownModule,
        DialogModule,
        CheckboxModule,
    ],
    providers: [ConfigurationTypeWorkService, AuthService, CommonService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConfigurationTypeWorkModule { }